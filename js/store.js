/**
 * store.js - Gerenciador de persistência local (localStorage) e auditorias de múltiplos estabelecimentos
 */

const STORAGE_KEY = 'bpf_uan_audits_v1';
const ACTIVE_AUDIT_KEY = 'bpf_uan_active_id';

const Store = {
  /**
   * Obtém a lista completa de auditorias salvas
   * @returns {Array} Lista de auditorias
   */
  getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        const defaults = this.getDefaultAudits();
        this.saveAll(defaults);
        return defaults;
      }
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        const defaults = this.getDefaultAudits();
        this.saveAll(defaults);
        return defaults;
      }
      return parsed;
    } catch (e) {
      console.error('Erro ao ler auditorias do localStorage:', e);
      return this.getDefaultAudits();
    }
  },

  /**
   * Salva o array de auditorias no localStorage
   * @param {Array} audits 
   */
  saveAll(audits) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(audits));
    } catch (e) {
      console.error('Erro ao salvar auditorias no localStorage:', e);
    }
  },

  /**
   * Obtém uma auditoria específica por ID
   * @param {string} id 
   * @returns {Object|null}
   */
  get(id) {
    const audits = this.getAll();
    return audits.find(a => a.id === id) || null;
  },

  /**
   * Salva ou atualiza uma auditoria existente
   * @param {Object} audit 
   * @returns {Object}
   */
  save(audit) {
    const audits = this.getAll();
    const index = audits.findIndex(a => a.id === audit.id);
    audit.updatedAt = new Date().toISOString();

    if (index >= 0) {
      audits[index] = audit;
    } else {
      audit.createdAt = audit.createdAt || new Date().toISOString();
      audits.unshift(audit);
    }

    this.saveAll(audits);
    return audit;
  },

  /**
   * Cria uma nova auditoria para um local "Lugar X"
   * @param {Object} initialData 
   * @returns {Object}
   */
  create(initialData = {}) {
    const newId = 'uan-' + Date.now();
    const newAudit = {
      id: newId,
      code: initialData.code || ('UAN ' + String.fromCharCode(65 + (this.getAll().length % 26))),
      title: initialData.title || (initialData.establishment ? `${initialData.code || 'UAN'} - ${initialData.establishment}` : 'Nova Verificação de BPF'),
      establishment: initialData.establishment || '',
      tradeName: initialData.tradeName || '',
      evaluator: initialData.evaluator || '',
      technicalLead: initialData.technicalLead || '',
      date: initialData.date || new Date().toISOString().split('T')[0],
      category: initialData.category || 'Restaurante Comercial / Coletivo',
      inspectionReason: initialData.inspectionReason || 'Inspeção Periódica de Boas Práticas',
      address: initialData.address || '',
      notes: initialData.notes || '',
      answers: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const audits = this.getAll();
    audits.unshift(newAudit);
    this.saveAll(audits);
    this.setActiveId(newId);
    return newAudit;
  },

  /**
   * Duplica uma auditoria existente (útil para reavaliações)
   * @param {string} id 
   * @param {string} newTitle 
   * @returns {Object|null}
   */
  duplicate(id, newTitle) {
    const original = this.get(id);
    if (!original) return null;

    const clonedId = 'uan-' + Date.now();
    const cloned = JSON.parse(JSON.stringify(original));
    cloned.id = clonedId;
    cloned.code = (original.code || 'UAN') + ' (Revisão)';
    cloned.title = newTitle || `${original.title} - Reavaliação (${new Date().toLocaleDateString('pt-BR')})`;
    cloned.date = new Date().toISOString().split('T')[0];
    cloned.createdAt = new Date().toISOString();
    cloned.updatedAt = new Date().toISOString();

    const audits = this.getAll();
    audits.unshift(cloned);
    this.saveAll(audits);
    this.setActiveId(clonedId);
    return cloned;
  },

  /**
   * Exclui uma auditoria
   * @param {string} id 
   * @returns {boolean}
   */
  delete(id) {
    let audits = this.getAll();
    if (audits.length <= 1) {
      alert('É necessário manter pelo menos uma verificação cadastrada.');
      return false;
    }
    audits = audits.filter(a => a.id !== id);
    this.saveAll(audits);

    if (this.getActiveId() === id) {
      this.setActiveId(audits[0].id);
    }
    return true;
  },

  /**
   * Retorna o ID da auditoria ativa
   * @returns {string}
   */
  getActiveId() {
    let activeId = localStorage.getItem(ACTIVE_AUDIT_KEY);
    const audits = this.getAll();
    if (!activeId || !audits.find(a => a.id === activeId)) {
      activeId = audits[0]?.id || 'uan-a-sample';
      this.setActiveId(activeId);
    }
    return activeId;
  },

  /**
   * Define o ID da auditoria ativa
   * @param {string} id 
   */
  setActiveId(id) {
    localStorage.setItem(ACTIVE_AUDIT_KEY, id);
  },

  /**
   * Retorna o objeto da auditoria atualmente ativa
   * @returns {Object}
   */
  getActive() {
    const id = this.getActiveId();
    return this.get(id) || this.getAll()[0];
  },

  /**
   * Atualiza a resposta de um item na auditoria ativa
   * @param {string} itemId 
   * @param {string} response 'SIM' | 'NAO' | 'NA'
   * @param {string} observation Opcional
   */
  setAnswer(itemId, response, observation = null) {
    const audit = this.getActive();
    if (!audit) return;

    if (!audit.answers) audit.answers = {};

    // Se clicar no mesmo botão já marcado, desmarca (volta para pendente)
    if (audit.answers[itemId] === response) {
      delete audit.answers[itemId];
    } else {
      audit.answers[itemId] = response;
    }

    if (observation !== null) {
      audit.answers[`${itemId}_obs`] = observation;
    }

    this.save(audit);
    return audit;
  },

  /**
   * Define respostas em lote para uma lista de IDs (ex: marcar todo bloco como SIM)
   * @param {Array<string>} itemIds 
   * @param {string} response 
   */
  batchSetAnswers(itemIds, response) {
    const audit = this.getActive();
    if (!audit) return;
    if (!audit.answers) audit.answers = {};

    itemIds.forEach(id => {
      if (response === null) {
        delete audit.answers[id];
      } else {
        audit.answers[id] = response;
      }
    });

    this.save(audit);
    return audit;
  },

  /**
   * Exporta todas as auditorias para arquivo JSON
   */
  exportJSON() {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      audits: this.getAll()
    };
    return JSON.stringify(data, null, 2);
  },

  /**
   * Importa auditorias de um arquivo JSON
   * @param {string} jsonString 
   * @returns {boolean}
   */
  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      const incomingAudits = parsed.audits || (Array.isArray(parsed) ? parsed : null);
      if (!incomingAudits || !Array.isArray(incomingAudits) || incomingAudits.length === 0) {
        throw new Error('Formato de arquivo inválido.');
      }
      this.saveAll(incomingAudits);
      this.setActiveId(incomingAudits[0].id);
      return true;
    } catch (e) {
      console.error('Falha ao importar JSON:', e);
      return false;
    }
  },

  /**
   * Restaura os dados iniciais padrão (UAN A e UAN B da pesquisa)
   */
  resetToDefaults() {
    const defaults = this.getDefaultAudits();
    this.saveAll(defaults);
    this.setActiveId(defaults[0].id);
    return defaults;
  },

  /**
   * Dados padrão pré-carregados (reproduzindo fielmente a tabela da foto do usuário)
   */
  getDefaultAudits() {
    // Carregado de default_audits se disponível
    if (typeof DEFAULT_AUDITS_DATA !== 'undefined') {
      return JSON.parse(JSON.stringify(DEFAULT_AUDITS_DATA));
    }
    return [
      {
        id: 'uan-a-sample',
        code: 'UAN A',
        title: 'UAN A - Hospital Universitário (Nutrição e Produção)',
        establishment: 'Hospital Universitário Regional',
        tradeName: 'UAN A',
        evaluator: 'Dra. Camila Silveira (Nutricionista RT - CRN 9823)',
        technicalLead: 'Dra. Camila Silveira',
        date: '2026-03-10',
        category: 'Hospitalar / Cozinha Central',
        inspectionReason: 'Inspeção de Rotina e Pesquisa Científica',
        address: 'Av. Universitária, 1500 - Bloco Saúde',
        notes: 'Avaliação diagnóstica de Boas Práticas de Fabricação para levantamento de adequação percentual conforme RDC 275/2002.',
        answers: {},
        createdAt: '2026-03-10T10:00:00.000Z',
        updatedAt: '2026-03-10T14:30:00.000Z'
      }
    ];
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Store;
}
