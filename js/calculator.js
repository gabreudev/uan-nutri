/**
 * calculator.js - Módulo de cálculos estatísticos e adequação sanitária
 * Resolução ANVISA RDC nº 275/2002 e Avaliação em UAN
 */

const Calculator = {
  /**
   * Calcula as estatísticas completas de uma auditoria
   * @param {Object} answers - Mapeamento { [itemId]: 'SIM' | 'NAO' | 'NA' }
   * @param {Array} items - Lista de questões (CHECKLIST_ITEMS)
   * @param {Array} categories - Categorias UAN (UAN_CATEGORIES)
   * @param {Array} blocks - Blocos RDC (RDC_BLOCKS)
   * @returns {Object} Estatísticas gerais, por categoria UAN e por bloco RDC
   */
  calculate(answers = {}, items = CHECKLIST_ITEMS, categories = UAN_CATEGORIES, blocks = RDC_BLOCKS) {
    let totalItems = items.length;
    let sim = 0;
    let nao = 0;
    let na = 0;
    let pending = 0;

    // Inicializa acumuladores por categoria UAN
    const categoryStats = {};
    categories.forEach(cat => {
      categoryStats[cat.name] = {
        id: cat.id,
        name: cat.name,
        shortName: cat.shortName,
        icon: cat.icon,
        color: cat.color,
        total: 0,
        sim: 0,
        nao: 0,
        na: 0,
        pending: 0,
        applicable: 0,
        adequacyPct: 0,
        inadequacyPct: 0
      };
    });

    // Inicializa acumuladores por bloco RDC
    const blockStats = {};
    blocks.forEach(b => {
      blockStats[b.id] = {
        id: b.id,
        name: b.name,
        shortName: b.shortName,
        total: 0,
        sim: 0,
        nao: 0,
        na: 0,
        pending: 0,
        applicable: 0,
        adequacyPct: 0,
        inadequacyPct: 0
      };
    });

    const nonConformities = [];

    // Itera por todos os itens avaliados
    items.forEach(item => {
      const resp = answers[item.id];
      const cat = categoryStats[item.uan_category];
      const blk = blockStats[item.block_id];

      if (cat) cat.total++;
      if (blk) blk.total++;

      if (resp === 'SIM') {
        sim++;
        if (cat) cat.sim++;
        if (blk) blk.sim++;
      } else if (resp === 'NAO') {
        nao++;
        if (cat) cat.nao++;
        if (blk) blk.nao++;
        nonConformities.push({
          id: item.id,
          uan_category: item.uan_category,
          sub_id: item.sub_id,
          sub_title: item.sub_title,
          text: item.text,
          observation: answers[`${item.id}_obs`] || ''
        });
      } else if (resp === 'NA') {
        na++;
        if (cat) cat.na++;
        if (blk) blk.na++;
      } else {
        pending++;
        if (cat) cat.pending++;
        if (blk) blk.pending++;
      }
    });

    const applicable = sim + nao;
    const answered = sim + nao + na;
    const completionPct = totalItems > 0 ? (answered / totalItems) * 100 : 0;
    
    // Adequação = SIM / (SIM + NÃO) * 100
    const adequacyPct = applicable > 0 ? (sim / applicable) * 100 : 0;
    
    // Fora do padrão (Inadequação) = NÃO / (SIM + NÃO) * 100
    const inadequacyPct = applicable > 0 ? (nao / applicable) * 100 : 0;

    // Calcula percentuais das categorias UAN
    Object.values(categoryStats).forEach(c => {
      c.applicable = c.sim + c.nao;
      c.adequacyPct = c.applicable > 0 ? (c.sim / c.applicable) * 100 : 0;
      c.inadequacyPct = c.applicable > 0 ? (c.nao / c.applicable) * 100 : 0;
    });

    // Calcula percentuais dos blocos RDC
    Object.values(blockStats).forEach(b => {
      b.applicable = b.sim + b.nao;
      b.adequacyPct = b.applicable > 0 ? (b.sim / b.applicable) * 100 : 0;
      b.inadequacyPct = b.applicable > 0 ? (b.nao / b.applicable) * 100 : 0;
    });

    // Classificação Oficial ANVISA RDC 275/2002
    // Grupo 1: 76 a 100% de atendimento
    // Grupo 2: 51 a 75% de atendimento
    // Grupo 3: 0 a 50% de atendimento
    let classification = {
      group: 'Pendente',
      code: 'G0',
      label: 'Preenchimento incompleto',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
      description: 'Responda as questões para classificar o estabelecimento.'
    };

    if (applicable > 0) {
      if (adequacyPct >= 76) {
        classification = {
          group: 'GRUPO 1',
          code: 'G1',
          label: '76 a 100% de adequação',
          color: 'emerald',
          badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          badgeGradient: 'from-emerald-500 to-teal-600',
          description: 'Nível Excelente/Satisfatório. Estabelecimento atende à grande maioria dos requisitos de BPF.'
        };
      } else if (adequacyPct >= 51) {
        classification = {
          group: 'GRUPO 2',
          code: 'G2',
          label: '51 a 75% de adequação',
          color: 'amber',
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
          badgeGradient: 'from-amber-500 to-orange-500',
          description: 'Nível Regular. Necessita de plano de ação corretivo para itens não atendidos.'
        };
      } else {
        classification = {
          group: 'GRUPO 3',
          code: 'G3',
          label: '0 a 50% de adequação',
          color: 'rose',
          badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
          badgeGradient: 'from-rose-500 to-red-600',
          description: 'Nível Crítico/Deficiente. Risco sanitário acentuado, exigindo intervenções imediatas.'
        };
      }
    }

    return {
      totalItems,
      sim,
      nao,
      na,
      pending,
      applicable,
      answered,
      completionPct,
      adequacyPct,
      inadequacyPct,
      classification,
      categoryStats,
      blockStats,
      nonConformities
    };
  },

  /**
   * Formata número decimal para percentual no padrão brasileiro (ex: 92,6%)
   * @param {number} value 
   * @param {number} decimals 
   * @returns {string}
   */
  formatPct(value, decimals = 1) {
    if (value === null || value === undefined || isNaN(value)) return '0,0%';
    // Se for 100 inteiro, pode exibir '100' ou '100,0'
    if (Math.round(value * 10) / 10 === 100) return '100%';
    return value.toFixed(decimals).replace('.', ',') + '%';
  },

  /**
   * Formata número decimal simples sem símbolo de porcentagem (ex: 92,6) como na imagem
   * @param {number} value 
   * @param {number} decimals 
   * @returns {string}
   */
  formatNumber(value, decimals = 1) {
    if (value === null || value === undefined || isNaN(value)) return '0,0';
    if (Math.round(value * 10) / 10 === 100) return '100';
    return value.toFixed(decimals).replace('.', ',');
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Calculator;
}
