/**
 * drive-sync.js - Sincronização descentralizada com o Google Drive (AppData)
 * 
 * Utiliza a pasta oculta de dados de aplicativo (appDataFolder) do próprio Google Drive
 * do usuário como banco de dados NoSQL/JSON em nuvem da aplicação.
 * 
 * Escopo exclusivo: 'https://www.googleapis.com/auth/drive.appdata'
 * (Garante privacidade absoluta: o app NÃO acessa nenhum outro arquivo do Drive do usuário).
 */

const GoogleDriveSync = (function() {
  const DB_FILENAME = 'bpf_uan_database.json';
  const TOKEN_KEY = 'bpf_uan_gdrive_access_token';
  const TOKEN_EXPIRY_KEY = 'bpf_uan_gdrive_token_expires_at';
  const FILE_ID_KEY = 'bpf_uan_gdrive_file_id';
  const LAST_SYNC_KEY = 'bpf_uan_gdrive_last_sync';
  const CLIENT_ID_STORAGE_KEY = 'bpf_uan_google_client_id';
  const USER_INFO_KEY = 'bpf_uan_gdrive_user_info';

  // Status possíveis
  const STATUS = {
    UNCONFIGURED: 'UNCONFIGURED', // Falta Client ID
    DISCONNECTED: 'DISCONNECTED', // Client ID pronto, mas não autenticado
    CONNECTING: 'CONNECTING',     // Conectando / autenticando
    SYNCING: 'SYNCING',           // Sincronizando (upload ou download)
    SYNCED: 'SYNCED',             // Sincronizado e ativo
    ERROR: 'ERROR'                // Falha de autenticação ou rede
  };

  let currentStatus = STATUS.UNCONFIGURED;
  let statusMessage = '';
  let tokenClient = null;
  let debouncePushTimer = null;
  let statusListeners = [];

  /**
   * Obtém o Client ID configurado (prioriza window.APP_ENV > localStorage)
   */
  function getClientId() {
    if (window.APP_ENV && window.APP_ENV.GOOGLE_CLIENT_ID) {
      const id = String(window.APP_ENV.GOOGLE_CLIENT_ID).trim();
      if (id && !id.includes('SEU_GOOGLE_CLIENT_ID')) {
        return id;
      }
    }
    return localStorage.getItem(CLIENT_ID_STORAGE_KEY) || '';
  }

  /**
   * Identifica de onde o Client ID atual foi carregado
   * @returns {'FILE'|'STORAGE'|null}
   */
  function getClientIdSource() {
    if (window.APP_ENV && window.APP_ENV.GOOGLE_CLIENT_ID) {
      const id = String(window.APP_ENV.GOOGLE_CLIENT_ID).trim();
      if (id && !id.includes('SEU_GOOGLE_CLIENT_ID')) {
        return 'FILE';
      }
    }
    const stored = localStorage.getItem(CLIENT_ID_STORAGE_KEY);
    if (stored && stored.trim()) {
      return 'STORAGE';
    }
    return null;
  }

  /**
   * Salva Client ID fornecido pelo usuário via UI
   */
  function setClientId(clientId) {
    if (!clientId) {
      localStorage.removeItem(CLIENT_ID_STORAGE_KEY);
    } else {
      localStorage.setItem(CLIENT_ID_STORAGE_KEY, clientId.trim());
    }
    init();
  }

  /**
   * Notifica ouvintes sobre mudança de estado
   */
  function setStatus(status, message = '') {
    currentStatus = status;
    statusMessage = message;
    statusListeners.forEach(listener => {
      try {
        listener(currentStatus, statusMessage);
      } catch (err) {
        console.error('Erro no listener de status do Drive:', err);
      }
    });

    window.dispatchEvent(new CustomEvent('bpf-drive-status-change', {
      detail: { status: currentStatus, message: statusMessage }
    }));
  }

  function getStatus() {
    return {
      status: currentStatus,
      message: statusMessage,
      isConnected: isConnected(),
      lastSync: getLastSyncTime(),
      user: getUserInfo(),
      clientIdSource: getClientIdSource(),
      clientId: getClientId()
    };
  }

  function onStatusChange(callback) {
    if (typeof callback === 'function') {
      statusListeners.push(callback);
      callback(currentStatus, statusMessage);
    }
  }

  function getUserInfo() {
    try {
      const data = localStorage.getItem(USER_INFO_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function getLastSyncTime() {
    return localStorage.getItem(LAST_SYNC_KEY) || null;
  }

  /**
   * Verifica se há um access token válido
   */
  function isConnected() {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiresAt = parseInt(localStorage.getItem(TOKEN_EXPIRY_KEY) || '0', 10);
    return Boolean(token && expiresAt > Date.now());
  }

  function getValidAccessToken() {
    if (!isConnected()) return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Inicializa o cliente do Google Identity Services (GIS)
   */
  function init() {
    const clientId = getClientId();
    if (!clientId) {
      setStatus(STATUS.UNCONFIGURED, 'Configure o Google Client ID no env.js ou nas opções.');
      return;
    }

    if (typeof google === 'undefined' || !google.accounts || !google.accounts.oauth2) {
      // O script do Google ainda pode estar carregando de forma assíncrona
      setTimeout(init, 300);
      return;
    }

    try {
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'https://www.googleapis.com/auth/drive.appdata',
        callback: async (tokenResponse) => {
          if (tokenResponse.error) {
            console.warn('Resposta da autenticação do Google:', tokenResponse);
            if (tokenResponse.error === 'popup_closed_by_user') {
              setStatus(STATUS.DISCONNECTED, 'Janela de login fechada.');
            } else if (tokenResponse.error === 'access_denied') {
              setStatus(STATUS.DISCONNECTED, 'Acesso cancelado pelo usuário.');
            } else {
              setStatus(STATUS.ERROR, `Erro ao autenticar: ${tokenResponse.error}`);
            }
            return;
          }

          // Salva token e tempo de expiração (com margem de segurança de 60s)
          const expiresInMs = (parseInt(tokenResponse.expires_in, 10) - 60) * 1000;
          const expiresAt = Date.now() + Math.max(expiresInMs, 60000);

          localStorage.setItem(TOKEN_KEY, tokenResponse.access_token);
          localStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt.toString());

          setStatus(STATUS.SYNCING, 'Carregando perfil e sincronizando...');
          await fetchUserProfile();
          await pullFromDrive(true);
        }
      });

      if (isConnected()) {
        setStatus(STATUS.SYNCED, 'Conectado ao Google Drive AppData');
        // Sincronização em background no carregamento
        pullFromDrive(false);
      } else {
        setStatus(STATUS.DISCONNECTED, 'Pronto para conectar ao Google Drive');
      }
    } catch (err) {
      console.error('Falha ao inicializar Google Identity Services:', err);
      setStatus(STATUS.ERROR, 'Falha ao inicializar API do Google');
    }
  }

  /**
   * Abre o fluxo de consentimento do Google
   */
  function signIn() {
    const clientId = getClientId();
    if (!clientId) {
      alert('Por favor, informe seu Google Client ID nas configurações antes de conectar.');
      return;
    }

    if (!tokenClient) {
      init();
    }

    if (tokenClient) {
      setStatus(STATUS.CONNECTING, 'Aguardando autorização da conta Google...');
      // 'consent' força a exibição da tela de consentimento se ainda não autorizou
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      alert('A biblioteca de autenticação do Google ainda está carregando. Tente novamente em alguns segundos.');
    }
  }

  /**
   * Desconecta e revoga o token de acesso
   */
  function signOut() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && typeof google !== 'undefined' && google.accounts && google.accounts.oauth2) {
      try {
        google.accounts.oauth2.revoke(token, () => {
          console.log('Token do Google revogado com sucesso.');
        });
      } catch (e) {
        console.warn('Erro ao revogar token:', e);
      }
    }

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    localStorage.removeItem(FILE_ID_KEY);
    localStorage.removeItem(USER_INFO_KEY);

    setStatus(STATUS.DISCONNECTED, 'Desconectado do Google Drive');
  }

  /**
   * Busca dados do usuário (nome, email, avatar) através da API do Drive
   * (Sem precisar de escopo extra de perfil)
   */
  async function fetchUserProfile() {
    const token = getValidAccessToken();
    if (!token) return null;

    try {
      const res = await fetch('https://www.googleapis.com/drive/v3/about?fields=user', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          const info = {
            displayName: data.user.displayName || 'Usuário Google',
            emailAddress: data.user.emailAddress || '',
            photoLink: data.user.photoLink || ''
          };
          localStorage.setItem(USER_INFO_KEY, JSON.stringify(info));
          return info;
        }
      }
    } catch (e) {
      console.warn('Não foi possível obter dados do perfil do Drive:', e);
    }
    return null;
  }

  /**
   * Procura o arquivo de banco de dados na pasta oculta AppData
   */
  async function findDatabaseFile(token) {
    const cachedFileId = localStorage.getItem(FILE_ID_KEY);
    if (cachedFileId) {
      try {
        // Valida se o arquivo ainda existe
        const checkRes = await fetch(`https://www.googleapis.com/drive/v3/files/${cachedFileId}?fields=id,name,trashed`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (checkRes.ok) {
          const fileData = await checkRes.json();
          if (!fileData.trashed) return cachedFileId;
        }
      } catch (e) {
        console.warn('Cache de FileID expirou ou falhou, pesquisando novamente...');
      }
    }

    // Pesquisa na pasta 'appDataFolder'
    const query = new URLSearchParams({
      spaces: 'appDataFolder',
      q: `name = '${DB_FILENAME}' and trashed = false`,
      fields: 'files(id, name, modifiedTime)'
    });

    const res = await fetch(`https://www.googleapis.com/drive/v3/files?${query.toString()}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      if (res.status === 401) {
        handleExpiredToken();
      }
      throw new Error(`Falha ao buscar banco no Drive (${res.status})`);
    }

    const data = await res.json();
    if (data.files && data.files.length > 0) {
      const fileId = data.files[0].id;
      localStorage.setItem(FILE_ID_KEY, fileId);
      return fileId;
    }

    return null;
  }

  /**
   * Puxa os dados da nuvem para o aplicativo
   */
  async function pullFromDrive(interactive = false) {
    const token = getValidAccessToken();
    if (!token) return false;

    setStatus(STATUS.SYNCING, 'Buscando dados no Google Drive AppData...');

    try {
      const fileId = await findDatabaseFile(token);

      if (!fileId) {
        // Arquivo ainda não existe na nuvem: cria o primeiro backup a partir do local
        console.log('Banco de dados ainda não existe no Google Drive AppData. Criando arquivo inicial...');
        await pushToDrive();
        return true;
      }

      // Baixa o conteúdo do arquivo
      const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        throw new Error(`Erro ao baixar banco do Drive (${res.status})`);
      }

      const remoteData = await res.json();
      const updatedTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

      // Aplica os dados remotos à Store
      if (typeof Store !== 'undefined' && Store.applyRemoteData) {
        const applied = Store.applyRemoteData(remoteData);
        if (applied) {
          localStorage.setItem(LAST_SYNC_KEY, updatedTime);
          setStatus(STATUS.SYNCED, `Sincronizado às ${updatedTime}`);
          
          window.dispatchEvent(new CustomEvent('bpf-data-updated', {
            detail: { source: 'google-drive', interactive }
          }));
          return true;
        }
      }

      setStatus(STATUS.SYNCED, `Sincronizado às ${updatedTime}`);
      return true;
    } catch (err) {
      console.error('Erro na sincronização (Pull):', err);
      setStatus(STATUS.ERROR, `Erro ao baixar do Drive: ${err.message}`);
      return false;
    }
  }

  /**
   * Envia os dados locais atuais para o Google Drive AppData
   */
  async function pushToDrive() {
    const token = getValidAccessToken();
    if (!token) return false;

    setStatus(STATUS.SYNCING, 'Salvando alterações no Google Drive AppData...');

    try {
      const payloadString = (typeof Store !== 'undefined' && Store.exportJSON)
        ? Store.exportJSON()
        : JSON.stringify({ places: [] });

      let fileId = localStorage.getItem(FILE_ID_KEY);

      if (!fileId) {
        fileId = await findDatabaseFile(token);
      }

      let res;
      if (fileId) {
        // Atualiza arquivo existente via PATCH
        res = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json; charset=UTF-8'
          },
          body: payloadString
        });
      } else {
        // Cria novo arquivo na pasta oculta 'appDataFolder' via Multipart Upload
        const boundary = '-------bpfUanDriveBoundary' + Date.now();
        const delimiter = `\r\n--${boundary}\r\n`;
        const closeDelim = `\r\n--${boundary}--`;

        const metadata = {
          name: DB_FILENAME,
          parents: ['appDataFolder']
        };

        const multipartBody =
          delimiter +
          'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
          JSON.stringify(metadata) +
          delimiter +
          'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
          payloadString +
          closeDelim;

        res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': `multipart/related; boundary="${boundary}"`
          },
          body: multipartBody
        });
      }

      if (!res.ok) {
        if (res.status === 401) {
          handleExpiredToken();
        } else if (res.status === 404 && fileId) {
          // Arquivo foi excluído externamente, limpa cache e tenta recriar
          localStorage.removeItem(FILE_ID_KEY);
          return pushToDrive();
        }
        throw new Error(`Falha no upload para o Drive (${res.status})`);
      }

      const responseData = await res.json();
      if (responseData.id) {
        localStorage.setItem(FILE_ID_KEY, responseData.id);
      }

      const updatedTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      localStorage.setItem(LAST_SYNC_KEY, updatedTime);
      setStatus(STATUS.SYNCED, `Salvo no Drive às ${updatedTime}`);
      return true;
    } catch (err) {
      console.error('Erro na sincronização (Push):', err);
      setStatus(STATUS.ERROR, `Erro ao salvar no Drive: ${err.message}`);
      return false;
    }
  }

  /**
   * Agenda salvamento automático com debounce de 1.5s
   * (Evita múltiplas requisições ao clicar repetidamente em botões de checklist)
   */
  function schedulePush() {
    if (!isConnected()) return;

    setStatus(STATUS.SYNCING, 'Alterações pendentes...');
    if (debouncePushTimer) {
      clearTimeout(debouncePushTimer);
    }

    debouncePushTimer = setTimeout(() => {
      pushToDrive();
    }, 1500);
  }

  /**
   * Trata expiração do token de autenticação
   */
  function handleExpiredToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    setStatus(STATUS.DISCONNECTED, 'Sessão do Google Drive expirada. Clique para reconectar.');
  }

  // Inicialização automática ao carregar o script
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 50);
  }

  return {
    STATUS,
    init,
    signIn,
    signOut,
    getClientId,
    getClientIdSource,
    setClientId,
    isConnected,
    getStatus,
    onStatusChange,
    getUserInfo,
    getLastSyncTime,
    pullFromDrive,
    pushToDrive,
    schedulePush
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GoogleDriveSync;
}
