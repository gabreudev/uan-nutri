/**
 * env.example.js - Modelo de Configuração de Ambiente para Google Drive AppData
 *
 * Como utilizar:
 * 1. Copie este arquivo para um novo arquivo chamado 'env.js':
 *    cp env.example.js env.js
 * 
 * 2. Crie suas credenciais no Google Cloud Console:
 *    - Crie um projeto no Google Cloud Console (https://console.cloud.google.com/)
 *    - Ative a "Google Drive API" em APIs e Serviços
 *    - Configure a Tela de Consentimento OAuth (Usuários Externos, escopo 'drive.appdata')
 *    - Crie uma credencial do tipo "ID do cliente OAuth 2.0" -> "Aplicativo da Web"
 *    - Adicione as origens autorizadas (ex: http://localhost:3000 ou https://seu-usuario.github.io)
 *    - Copie o Client ID gerado e cole abaixo:
 */

window.APP_ENV = {
  // ID do Cliente OAuth 2.0 do Google Cloud
  // Exemplo: "123456789012-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com"
  GOOGLE_CLIENT_ID: "SEU_GOOGLE_CLIENT_ID_AQUI.apps.googleusercontent.com",

  // Chave de API Google (opcional)
  GOOGLE_API_KEY: ""
};
