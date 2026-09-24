/**
 * store.js - Camada de persistência hierárquica (localStorage)
 * Modelo: Lugares (Estabelecimentos / UANs) -> Múltiplas Avaliações ao longo do tempo
 */

const STORAGE_PLACES_KEY = 'bpf_uan_places_v2';
const ACTIVE_PLACE_KEY = 'bpf_uan_active_place_id';
const ACTIVE_EVAL_KEY = 'bpf_uan_active_eval_id';

// Chave da versão anterior para migração automática transparente
const LEGACY_STORAGE_KEY = 'bpf_uan_audits_v1';

const Store = {
  /**
   * Obtém todos os lugares cadastrados com suas avaliações
   * @returns {Array} Lista de lugares
   */
  getPlaces() {
    try {
      const data = localStorage.getItem(STORAGE_PLACES_KEY);
      if (!data) {
        // Tenta migrar dados legados se existirem
        const legacyData = localStorage.getItem(LEGACY_STORAGE_KEY);
        if (legacyData) {
          const migrated = this.migrateLegacyData(JSON.parse(legacyData));
          if (migrated && migrated.length > 0) {
            this.savePlaces(migrated);
            return migrated;
          }
        }

        const defaults = this.getDefaultPlaces();
        this.savePlaces(defaults);
        return defaults;
      }

      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        const defaults = this.getDefaultPlaces();
        this.savePlaces(defaults);
        return defaults;
      }
      return parsed;
    } catch (e) {
      console.error('Erro ao ler dados de lugares do localStorage:', e);
      return this.getDefaultPlaces();
    }
  },

  /**
   * Salva a lista de lugares no localStorage
   * @param {Array} places 
   */
  savePlaces(places) {
    try {
      localStorage.setItem(STORAGE_PLACES_KEY, JSON.stringify(places));
    } catch (e) {
      console.error('Erro ao salvar lugares no localStorage:', e);
    }
  },

  /**
   * Obtém um lugar específico por ID
   * @param {string} placeId 
   * @returns {Object|null}
   */
  getPlace(placeId) {
    const places = this.getPlaces();
    return places.find(p => p.id === placeId) || null;
  },

  /**
   * Salva ou atualiza um lugar
   * @param {Object} placeData 
   * @returns {Object}
   */
  savePlace(placeData) {
    const places = this.getPlaces();
    const index = places.findIndex(p => p.id === placeData.id);
    placeData.updatedAt = new Date().toISOString();

    if (index >= 0) {
      // Preserva avaliações se não foram passadas
      if (!placeData.evaluations && places[index].evaluations) {
        placeData.evaluations = places[index].evaluations;
      }
      places[index] = placeData;
    } else {
      placeData.id = placeData.id || ('place-' + Date.now());
      placeData.evaluations = placeData.evaluations || [];
      placeData.createdAt = placeData.createdAt || new Date().toISOString();
      places.unshift(placeData);
    }

    this.savePlaces(places);
    return placeData;
  },

  /**
   * Cria um novo lugar com ou sem avaliação inicial
   * @param {Object} placeData 
   * @param {boolean} createFirstEvaluation 
   * @returns {Object}
   */
  createPlace(placeData = {}, createFirstEvaluation = true) {
    const places = this.getPlaces();
    const nextLetter = String.fromCharCode(65 + (places.length % 26));
    const newPlaceId = 'place-' + Date.now();

    const newPlace = {
      id: newPlaceId,
      code: placeData.code || ('UAN ' + nextLetter),
      name: placeData.name || (placeData.establishment ? placeData.establishment : `Novo Estabelecimento ${nextLetter}`),
      establishment: placeData.name || placeData.establishment || `Novo Estabelecimento ${nextLetter}`,
      category: placeData.category || 'Restaurante Comercial / Coletivo',
      technicalLead: placeData.technicalLead || '',
      evaluator: placeData.evaluator || placeData.technicalLead || '',
      address: placeData.address || '',
      notes: placeData.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      evaluations: []
    };

    if (createFirstEvaluation) {
      const firstEval = {
        id: 'eval-' + Date.now(),
        title: 'Diagnóstico Inicial de BPF',
        type: 'DIAGNOSTICO',
        date: placeData.date || new Date().toISOString().split('T')[0],
        evaluator: newPlace.technicalLead || '',
        inspectionReason: 'Diagnóstico Inicial de Conformidade Sanitária',
        notes: 'Primeira avaliação para diagnóstico de conformidade com a RDC 275/2002.',
        answers: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      newPlace.evaluations.push(firstEval);
      this.setActiveEvalId(firstEval.id);
    }

    places.unshift(newPlace);
    this.savePlaces(places);
    this.setActivePlaceId(newPlaceId);
    return newPlace;
  },

  /**
   * Exclui um lugar e suas avaliações
   * @param {string} placeId 
   * @returns {boolean}
   */
  deletePlace(placeId) {
    let places = this.getPlaces();
    if (places.length <= 1) {
      alert('É necessário manter pelo menos um estabelecimento cadastrado.');
      return false;
    }
    places = places.filter(p => p.id !== placeId);
    this.savePlaces(places);

    if (this.getActivePlaceId() === placeId) {
      this.setActivePlaceId(places[0].id);
      this.setActiveEvalId(places[0].evaluations[0]?.id || null);
    }
    return true;
  },

  // ==========================================================================
  // GESTÃO DE AVALIAÇÕES (MÚLTIPLAS POR LUGAR)
  // ==========================================================================

  /**
   * Obtém uma avaliação específica e seu lugar de origem
   * @param {string} evalId 
   * @returns {{ place: Object, evaluation: Object }|null}
   */
  getEvaluation(evalId) {
    const places = this.getPlaces();
    for (const place of places) {
      const evaluation = (place.evaluations || []).find(e => e.id === evalId);
      if (evaluation) {
        return { place, evaluation };
      }
    }
    return null;
  },

  /**
   * Cria uma nova avaliação em um lugar existente
   * @param {string} placeId 
   * @param {Object} evalData 
   * @param {string|null} cloneAnswersFromEvalId - Opcional: clona respostas da anterior para reavaliação rápida
   * @returns {Object|null}
   */
  createEvaluation(placeId, evalData = {}, cloneAnswersFromEvalId = null) {
    const place = this.getPlace(placeId);
    if (!place) return null;

    if (!place.evaluations) place.evaluations = [];

    let initialAnswers = {};
    if (cloneAnswersFromEvalId) {
      const sourceEval = place.evaluations.find(e => e.id === cloneAnswersFromEvalId);
      if (sourceEval && sourceEval.answers) {
        initialAnswers = JSON.parse(JSON.stringify(sourceEval.answers));
      }
    }

    const evalNumber = place.evaluations.length + 1;
    const newEvalId = 'eval-' + Date.now();
    const newEval = {
      id: newEvalId,
      title: evalData.title || (evalNumber === 2 ? 'Reavaliação Pós-Ações Corretivas' : `Avaliação #${evalNumber}`),
      type: evalData.type || (evalNumber === 1 ? 'DIAGNOSTICO' : 'REAVALIACAO'),
      date: evalData.date || new Date().toISOString().split('T')[0],
      evaluator: evalData.evaluator || place.technicalLead || '',
      inspectionReason: evalData.inspectionReason || 'Acompanhamento de Boas Práticas',
      notes: evalData.notes || '',
      answers: initialAnswers,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    place.evaluations.unshift(newEval);
    this.savePlace(place);
    this.setActiveEvalId(newEvalId);
    return newEval;
  },

  /**
   * Atualiza dados cadastrais de uma avaliação existente
   * @param {string} evalId 
   * @param {Object} updatedFields 
   * @returns {Object|null}
   */
  updateEvaluation(evalId, updatedFields = {}) {
    const found = this.getEvaluation(evalId);
    if (!found) return null;

    const { place, evaluation } = found;
    Object.assign(evaluation, updatedFields);
    evaluation.updatedAt = new Date().toISOString();

    this.savePlace(place);
    return evaluation;
  },

  /**
   * Exclui uma avaliação específica de um lugar
   * @param {string} evalId 
   * @returns {boolean}
   */
  deleteEvaluation(evalId) {
    const found = this.getEvaluation(evalId);
    if (!found) return false;

    const { place } = found;
    if (place.evaluations.length <= 1) {
      alert('Cada local precisa manter pelo menos uma avaliação. Se desejar, exclua o local inteiro.');
      return false;
    }

    place.evaluations = place.evaluations.filter(e => e.id !== evalId);
    this.savePlace(place);

    if (this.getActiveEvalId() === evalId) {
      this.setActiveEvalId(place.evaluations[0].id);
    }
    return true;
  },

  /**
   * Atualiza a resposta de um item em uma avaliação específica
   * @param {string} evalId 
   * @param {string} itemId 
   * @param {string} response 'SIM' | 'NAO' | 'NA'
   * @param {string|null} observation 
   */
  setAnswer(evalId, itemId, response, observation = null) {
    const found = this.getEvaluation(evalId);
    if (!found) return;

    const { place, evaluation } = found;
    if (!evaluation.answers) evaluation.answers = {};

    if (evaluation.answers[itemId] === response) {
      delete evaluation.answers[itemId];
    } else {
      evaluation.answers[itemId] = response;
    }

    if (observation !== null) {
      evaluation.answers[`${itemId}_obs`] = observation;
    }

    evaluation.updatedAt = new Date().toISOString();
    this.savePlace(place);
    return evaluation;
  },

  /**
   * Resposta em lote (ex: marcar itens de um bloco como SIM)
   * @param {string} evalId 
   * @param {Array<string>} itemIds 
   * @param {string} response 
   */
  batchSetAnswers(evalId, itemIds, response) {
    const found = this.getEvaluation(evalId);
    if (!found) return;

    const { place, evaluation } = found;
    if (!evaluation.answers) evaluation.answers = {};

    itemIds.forEach(id => {
      if (response === null) {
        delete evaluation.answers[id];
      } else {
        evaluation.answers[id] = response;
      }
    });

    evaluation.updatedAt = new Date().toISOString();
    this.savePlace(place);
    return evaluation;
  },

  // ==========================================================================
  // HELPERS DE CONSULTA E COMPARAÇÃO
  // ==========================================================================

  /**
   * Retorna lista de todas as avaliações de todos os lugares com metadados para comparação
   * @returns {Array} Lista plana de avaliações enriquecidas
   */
  getAllEvaluationsFlat() {
    const places = this.getPlaces();
    const result = [];

    places.forEach(place => {
      (place.evaluations || []).forEach(evaluation => {
        result.push({
          placeId: place.id,
          placeCode: place.code,
          placeName: place.name || place.establishment,
          placeCategory: place.category,
          evalId: evaluation.id,
          evalTitle: evaluation.title,
          evalType: evaluation.type,
          evalDate: evaluation.date,
          evaluator: evaluation.evaluator || place.technicalLead,
          displayLabel: `[${place.code}] ${evaluation.title} (${evaluation.date})`,
          answers: evaluation.answers || {}
        });
      });
    });

    return result;
  },

  // IDs ativos no fluxo
  getActivePlaceId() {
    let activeId = localStorage.getItem(ACTIVE_PLACE_KEY);
    const places = this.getPlaces();
    if (!activeId || !places.find(p => p.id === activeId)) {
      activeId = places[0]?.id || 'place-uan-a';
      this.setActivePlaceId(activeId);
    }
    return activeId;
  },

  setActivePlaceId(id) {
    localStorage.setItem(ACTIVE_PLACE_KEY, id);
  },

  getActiveEvalId() {
    let evalId = localStorage.getItem(ACTIVE_EVAL_KEY);
    const places = this.getPlaces();
    const allFlat = this.getAllEvaluationsFlat();
    if (!evalId || !allFlat.find(e => e.evalId === evalId)) {
      evalId = allFlat[0]?.evalId || 'eval-uan-a-01';
      this.setActiveEvalId(evalId);
    }
    return evalId;
  },

  setActiveEvalId(id) {
    localStorage.setItem(ACTIVE_EVAL_KEY, id);
  },

  /**
   * Exporta banco de dados completo para JSON
   */
  exportJSON() {
    const data = {
      version: '2.0-hierarchical',
      exportedAt: new Date().toISOString(),
      places: this.getPlaces()
    };
    return JSON.stringify(data, null, 2);
  },

  /**
   * Importa banco de dados de JSON
   * @param {string} jsonString 
   * @returns {boolean}
   */
  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      let incomingPlaces = null;

      if (parsed.places && Array.isArray(parsed.places)) {
        incomingPlaces = parsed.places;
      } else if (Array.isArray(parsed)) {
        if (parsed[0]?.evaluations) {
          incomingPlaces = parsed;
        } else {
          incomingPlaces = this.migrateLegacyData(parsed);
        }
      } else if (parsed.audits) {
        incomingPlaces = this.migrateLegacyData(parsed.audits);
      }

      if (!incomingPlaces || incomingPlaces.length === 0) {
        throw new Error('Formato inválido.');
      }

      this.savePlaces(incomingPlaces);
      this.setActivePlaceId(incomingPlaces[0].id);
      this.setActiveEvalId(incomingPlaces[0].evaluations[0]?.id || null);
      return true;
    } catch (e) {
      console.error('Falha ao importar JSON:', e);
      return false;
    }
  },

  /**
   * Restaura dados padrão com UAN A (diagnóstico e reavaliação) e UAN B
   */
  resetToDefaults() {
    const defaults = this.getDefaultPlaces();
    this.savePlaces(defaults);
    this.setActivePlaceId(defaults[0].id);
    this.setActiveEvalId(defaults[0].evaluations[0].id);
    return defaults;
  },

  /**
   * Migra dados legados da versão plana (v1) para a hierárquica (v2)
   */
  migrateLegacyData(legacyAudits) {
    if (!Array.isArray(legacyAudits) || legacyAudits.length === 0) return null;

    const placesMap = {};
    legacyAudits.forEach(audit => {
      const code = audit.code || 'UAN A';
      const key = code.toUpperCase().trim();

      if (!placesMap[key]) {
        placesMap[key] = {
          id: 'place-' + audit.id,
          code: audit.code || 'UAN',
          name: audit.establishment || audit.title || 'Estabelecimento',
          establishment: audit.establishment || audit.title || 'Estabelecimento',
          category: audit.category || 'Alimentação Coletiva',
          technicalLead: audit.technicalLead || '',
          evaluator: audit.evaluator || audit.technicalLead || '',
          address: audit.address || '',
          notes: audit.notes || '',
          createdAt: audit.createdAt || new Date().toISOString(),
          updatedAt: audit.updatedAt || new Date().toISOString(),
          evaluations: []
        };
      }

      placesMap[key].evaluations.push({
        id: audit.id,
        title: audit.title || `Avaliação (${audit.date || 'Atual'})`,
        type: 'DIAGNOSTICO',
        date: audit.date || new Date().toISOString().split('T')[0],
        evaluator: audit.evaluator || audit.technicalLead || '',
        inspectionReason: audit.inspectionReason || 'Inspeção de Boas Práticas',
        notes: audit.notes || '',
        answers: audit.answers || {},
        createdAt: audit.createdAt || new Date().toISOString(),
        updatedAt: audit.updatedAt || new Date().toISOString()
      });
    });

    return Object.values(placesMap);
  },

  getDefaultPlaces() {
    if (typeof DEFAULT_PLACES_DATA !== 'undefined') {
      return JSON.parse(JSON.stringify(DEFAULT_PLACES_DATA));
    }
    return [];
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Store;
}
