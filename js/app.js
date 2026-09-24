/**
 * app.js - Arquitetura de Múltiplas Análises e Design Profissional (UAN - RDC 275/2002)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Estado central da aplicação
  const state = {
    currentView: 'LIST', // 'LIST' | 'DETAIL' | 'COMPARE'
    activeAuditId: null,
    activeAudit: null,
    currentStats: null,
    
    // Filtros da Lista de Análises
    auditSearchQuery: '',
    auditGroupFilter: 'ALL', // 'ALL' | 'G1' | 'G2' | 'G3'
    selectedAuditIdsForComparison: new Set(),

    // Filtros do Checklist
    checklistCategory: 'ALL',
    checklistStatus: 'ALL',
    checklistSearchQuery: '',

    // Filtros da Matriz Comparativa
    comparedAuditIds: new Set()
  };

  // Mapeamento dos elementos DOM
  const dom = {
    // Navegação Global
    navLogo: document.getElementById('navLogo'),
    navBtnList: document.getElementById('navBtnList'),
    navBtnCompare: document.getElementById('navBtnCompare'),
    btnHeaderNewAudit: document.getElementById('btnHeaderNewAudit'),
    btnOpenBackup: document.getElementById('btnOpenBackup'),

    // Visões
    viewAnalysesList: document.getElementById('viewAnalysesList'),
    viewAuditDetail: document.getElementById('viewAuditDetail'),
    viewComparative: document.getElementById('viewComparative'),

    // View 1: Hub de Análises
    badgeTotalAuditsCount: document.getElementById('badgeTotalAuditsCount'),
    btnCompareSelected: document.getElementById('btnCompareSelected'),
    compareSelectedCount: document.getElementById('compareSelectedCount'),
    btnCreateAuditHero: document.getElementById('btnCreateAuditHero'),
    auditFilterTabs: document.getElementById('auditFilterTabs'),
    countFilterAll: document.getElementById('countFilterAll'),
    countFilterG1: document.getElementById('countFilterG1'),
    countFilterG2: document.getElementById('countFilterG2'),
    countFilterG3: document.getElementById('countFilterG3'),
    searchAuditInput: document.getElementById('searchAuditInput'),
    analysesCardsContainer: document.getElementById('analysesCardsContainer'),
    analysesEmptyState: document.getElementById('analysesEmptyState'),
    btnEmptyCreateAudit: document.getElementById('btnEmptyCreateAudit'),

    // View 2: Detalhe / Checklist
    btnBackToAnalysesList: document.getElementById('btnBackToAnalysesList'),
    btnDetailEdit: document.getElementById('btnDetailEdit'),
    btnDetailDuplicate: document.getElementById('btnDetailDuplicate'),
    btnDetailCompare: document.getElementById('btnDetailCompare'),
    btnDetailPrint: document.getElementById('btnDetailPrint'),
    detailBadgeCode: document.getElementById('detailBadgeCode'),
    detailDate: document.getElementById('detailDate'),
    detailCategory: document.getElementById('detailCategory'),
    detailEstablishment: document.getElementById('detailEstablishment'),
    detailTechnicalLead: document.getElementById('detailTechnicalLead'),
    detailQuickSwitch: document.getElementById('detailQuickSwitch'),
    detailAdequacyPct: document.getElementById('detailAdequacyPct'),
    detailSimRatio: document.getElementById('detailSimRatio'),
    detailInadequacyPct: document.getElementById('detailInadequacyPct'),
    detailNaoRatio: document.getElementById('detailNaoRatio'),
    detailGroupBadge: document.getElementById('detailGroupBadge'),
    detailGroupDesc: document.getElementById('detailGroupDesc'),
    detailCompletionText: document.getElementById('detailCompletionText'),
    detailProgressBar: document.getElementById('detailProgressBar'),
    detailSimCount: document.getElementById('detailSimCount'),
    detailNaoCount: document.getElementById('detailNaoCount'),
    detailNaCount: document.getElementById('detailNaCount'),
    detailPendingCount: document.getElementById('detailPendingCount'),
    detailBlockCardsGrid: document.getElementById('detailBlockCardsGrid'),
    filteredItemsCount: document.getElementById('filteredItemsCount'),
    searchInput: document.getElementById('searchInput'),
    blockTabsContainer: document.getElementById('blockTabsContainer'),
    btnMarkAllYes: document.getElementById('btnMarkAllYes'),
    checklistItemsList: document.getElementById('checklistItemsList'),

    // View 3: Comparativo
    btnBackFromCompare: document.getElementById('btnBackFromCompare'),
    btnCopyTable: document.getElementById('btnCopyTable'),
    btnExportCSV: document.getElementById('btnExportCSV'),
    compareUanCheckboxesContainer: document.getElementById('compareUanCheckboxesContainer'),
    tableUanComparative: document.getElementById('tableUanComparative'),
    comparativeTableBody: document.getElementById('comparativeTableBody'),
    tableSourceInput: document.getElementById('tableSourceInput'),

    // Modais
    modalAuditForm: document.getElementById('modalAuditForm'),
    modalAuditTitle: document.getElementById('modalAuditTitle'),
    btnCloseAuditForm: document.getElementById('btnCloseAuditForm'),
    btnCancelAuditForm: document.getElementById('btnCancelAuditForm'),
    formAudit: document.getElementById('formAudit'),
    formAuditId: document.getElementById('formAuditId'),
    formCode: document.getElementById('formCode'),
    formDate: document.getElementById('formDate'),
    formEstablishment: document.getElementById('formEstablishment'),
    formTechnicalLead: document.getElementById('formTechnicalLead'),
    formCategory: document.getElementById('formCategory'),
    formNotes: document.getElementById('formNotes'),
    btnDeleteAudit: document.getElementById('btnDeleteAudit'),

    modalBackup: document.getElementById('modalBackup'),
    btnCloseBackup: document.getElementById('btnCloseBackup'),
    btnExportJSON: document.getElementById('btnExportJSON'),
    inputImportJSON: document.getElementById('inputImportJSON'),
    btnResetDefaults: document.getElementById('btnResetDefaults'),

    // Impressão
    printEstablishment: document.getElementById('printEstablishment'),
    printCode: document.getElementById('printCode'),
    printDate: document.getElementById('printDate'),
    printTechnicalLead: document.getElementById('printTechnicalLead'),
    printAdequacy: document.getElementById('printAdequacy'),
    printInadequacy: document.getElementById('printInadequacy'),
    printGroup: document.getElementById('printGroup'),
    printBlocksTableBody: document.getElementById('printBlocksTableBody'),
    printNonConformitiesList: document.getElementById('printNonConformitiesList'),
    printSignLead: document.getElementById('printSignLead'),

    // Toast
    toastNotification: document.getElementById('toastNotification'),
    toastMessage: document.getElementById('toastMessage')
  };

  /**
   * Notificação toast discreta e profissional
   */
  function showToast(message) {
    dom.toastMessage.textContent = message;
    dom.toastNotification.classList.remove('translate-y-16', 'opacity-0', 'pointer-events-none');
    setTimeout(() => {
      dom.toastNotification.classList.add('translate-y-16', 'opacity-0', 'pointer-events-none');
    }, 2800);
  }

  /**
   * Inicialização do sistema
   */
  function init() {
    renderChecklistBlockTabs();
    parseUrlHash();
    attachEventListeners();
    window.addEventListener('hashchange', parseUrlHash);
  }

  /**
   * Roteamento simples baseado em Hash da URL
   */
  function parseUrlHash() {
    const hash = window.location.hash || '#list';
    if (hash.startsWith('#audit/')) {
      const id = hash.replace('#audit/', '');
      const audit = Store.get(id);
      if (audit) {
        state.activeAuditId = id;
        switchView('DETAIL');
        return;
      }
    } else if (hash === '#compare') {
      switchView('COMPARE');
      return;
    }
    // Padrão: Lista de análises
    switchView('LIST');
  }

  /**
   * Alternância entre as 3 telas principais
   */
  function switchView(viewName, auditId = null) {
    state.currentView = viewName;
    if (auditId) {
      state.activeAuditId = auditId;
    }

    // Oculta todas as visões
    dom.viewAnalysesList.classList.add('hidden');
    dom.viewAuditDetail.classList.add('hidden');
    dom.viewComparative.classList.add('hidden');

    // Atualiza estados dos botões da navbar
    dom.navBtnList.className = 'px-3 py-1.5 rounded-lg transition text-slate-600 hover:text-slate-900 hover:bg-slate-100';
    dom.navBtnCompare.className = 'px-3 py-1.5 rounded-lg transition text-slate-600 hover:text-slate-900 hover:bg-slate-100';

    if (viewName === 'LIST') {
      dom.viewAnalysesList.classList.remove('hidden');
      dom.navBtnList.className = 'px-3 py-1.5 rounded-lg transition bg-slate-100 text-slate-900 font-bold';
      window.location.hash = '#list';
      renderAnalysesList();
    } else if (viewName === 'DETAIL') {
      dom.viewAuditDetail.classList.remove('hidden');
      if (state.activeAuditId) {
        Store.setActiveId(state.activeAuditId);
        window.location.hash = `#audit/${state.activeAuditId}`;
      }
      loadActiveAuditDetail();
    } else if (viewName === 'COMPARE') {
      dom.viewComparative.classList.remove('hidden');
      dom.navBtnCompare.className = 'px-3 py-1.5 rounded-lg transition bg-slate-100 text-slate-900 font-bold';
      window.location.hash = '#compare';
      renderComparativeView();
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // ==========================================================================
  // VIEW 1: HUB / LISTA DE ANÁLISES
  // ==========================================================================

  function renderAnalysesList() {
    const audits = Store.getAll();
    const query = state.auditSearchQuery.toLowerCase().trim();
    const groupFilter = state.auditGroupFilter;

    // Calcula estatísticas para todas
    const listWithStats = audits.map(audit => {
      const stats = Calculator.calculate(audit.answers || {}, CHECKLIST_ITEMS, UAN_CATEGORIES, RDC_BLOCKS);
      return { audit, stats };
    });

    // Contadores para abas de filtro
    let countG1 = 0, countG2 = 0, countG3 = 0;
    listWithStats.forEach(({ stats }) => {
      if (stats.classification.code === 'G1') countG1++;
      else if (stats.classification.code === 'G2') countG2++;
      else if (stats.classification.code === 'G3') countG3++;
    });

    dom.badgeTotalAuditsCount.textContent = `${audits.length} ${audits.length === 1 ? 'cadastrada' : 'cadastradas'}`;
    dom.countFilterAll.textContent = audits.length;
    dom.countFilterG1.textContent = countG1;
    dom.countFilterG2.textContent = countG2;
    dom.countFilterG3.textContent = countG3;

    // Filtra lista
    const filtered = listWithStats.filter(({ audit, stats }) => {
      if (groupFilter !== 'ALL' && stats.classification.code !== groupFilter) {
        return false;
      }
      if (query) {
        const matchCode = (audit.code || '').toLowerCase().includes(query);
        const matchEst = (audit.establishment || '').toLowerCase().includes(query);
        const matchLead = (audit.technicalLead || '').toLowerCase().includes(query);
        const matchCat = (audit.category || '').toLowerCase().includes(query);
        if (!matchCode && !matchEst && !matchLead && !matchCat) return false;
      }
      return true;
    });

    dom.analysesCardsContainer.innerHTML = '';

    if (filtered.length === 0) {
      dom.analysesEmptyState.classList.remove('hidden');
      return;
    }
    dom.analysesEmptyState.classList.add('hidden');

    // Renderiza cada card de análise
    filtered.forEach(({ audit, stats }) => {
      const card = document.createElement('div');
      card.className = 'interactive-card bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between transition relative';

      const isChecked = state.selectedAuditIdsForComparison.has(audit.id);
      const isComplete = stats.answered === stats.totalItems;
      const pctNumber = Calculator.formatNumber(stats.adequacyPct, 1);
      const groupCode = stats.classification.code;

      let groupBadgeHtml = '';
      if (groupCode === 'G1') {
        groupBadgeHtml = `<span class="badge-group-1 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1"><i class="fa-solid fa-circle-check text-[11px]"></i>Grupo 1 • ${pctNumber}%</span>`;
      } else if (groupCode === 'G2') {
        groupBadgeHtml = `<span class="badge-group-2 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1"><i class="fa-solid fa-triangle-exclamation text-[11px]"></i>Grupo 2 • ${pctNumber}%</span>`;
      } else if (groupCode === 'G3') {
        groupBadgeHtml = `<span class="badge-group-3 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1"><i class="fa-solid fa-circle-xmark text-[11px]"></i>Grupo 3 • ${pctNumber}%</span>`;
      } else {
        groupBadgeHtml = `<span class="badge-group-pending text-xs font-bold px-2 py-0.5 rounded">Pendente</span>`;
      }

      card.innerHTML = `
        <div>
          <!-- Cabeçalho do Card: Checkbox + Código + Data + Grupo -->
          <div class="flex items-start justify-between gap-3 mb-2.5">
            <div class="flex items-center gap-2">
              <label class="flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-slate-700 text-xs" title="Selecionar para comparar com outras UANs">
                <input type="checkbox" class="chk-select-audit rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 cursor-pointer h-4 w-4" data-id="${audit.id}" ${isChecked ? 'checked' : ''}>
              </label>
              <span class="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">${audit.code || 'UAN'}</span>
              <span class="text-xs text-slate-400 font-medium">${audit.date ? new Date(audit.date + 'T12:00:00').toLocaleDateString('pt-BR') : '-'}</span>
            </div>
            <div>${groupBadgeHtml}</div>
          </div>

          <!-- Nome do Estabelecimento -->
          <h3 class="font-bold text-base text-slate-900 tracking-tight leading-snug line-clamp-1 mb-1">
            ${audit.establishment || audit.title || 'Estabelecimento sem nome'}
          </h3>

          <!-- Categoria e Responsável -->
          <div class="space-y-0.5 text-xs text-slate-500 mb-4">
            <p class="truncate"><i class="fa-solid fa-utensils text-[11px] text-slate-400 mr-1.5"></i>${audit.category || 'Alimentação Coletiva'}</p>
            <p class="truncate"><i class="fa-regular fa-user text-[11px] text-slate-400 mr-1.5"></i>${audit.technicalLead || 'Responsável técnico não informado'}</p>
          </div>

          <!-- Métricas Resumidas em Grid -->
          <div class="bg-slate-50 rounded-lg p-3 border border-slate-100 mb-4">
            <div class="grid grid-cols-3 gap-2 text-center">
              <div>
                <span class="text-[10px] text-slate-400 font-semibold block">Adequação</span>
                <span class="text-base font-black text-emerald-700 font-mono">${Calculator.formatPct(stats.adequacyPct)}</span>
              </div>
              <div>
                <span class="text-[10px] text-slate-400 font-semibold block">Fora Padrão</span>
                <span class="text-base font-black text-rose-600 font-mono">${stats.nao} itens</span>
              </div>
              <div>
                <span class="text-[10px] text-slate-400 font-semibold block">Progresso</span>
                <span class="text-xs font-bold text-slate-700 font-mono block mt-1">${stats.answered}/${stats.totalItems}</span>
              </div>
            </div>

            <!-- Mini barra de progresso -->
            <div class="w-full bg-slate-200 rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div class="bg-emerald-600 h-1.5 rounded-full" style="width: ${Math.round(stats.completionPct)}%"></div>
            </div>
          </div>
        </div>

        <!-- Rodapé do Card: Ações -->
        <div class="flex items-center justify-between pt-3 border-t border-slate-100">
          <div class="flex items-center gap-1">
            <button class="btn-card-edit p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded text-xs transition" data-id="${audit.id}" title="Editar dados">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class="btn-card-duplicate p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded text-xs transition" data-id="${audit.id}" title="Duplicar">
              <i class="fa-regular fa-copy"></i>
            </button>
            <button class="btn-card-print p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded text-xs transition" data-id="${audit.id}" title="Imprimir relatório">
              <i class="fa-solid fa-print"></i>
            </button>
            <button class="btn-card-delete p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded text-xs transition" data-id="${audit.id}" title="Excluir">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>

          <button class="btn-open-audit px-3.5 py-1.5 bg-slate-900 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs" data-id="${audit.id}">
            <span>${isComplete ? 'Ver / Revisar' : 'Analisar'}</span>
            <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
        </div>
      `;

      dom.analysesCardsContainer.appendChild(card);
    });

    // Eventos nos botões dos cards
    dom.analysesCardsContainer.querySelectorAll('.btn-open-audit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        switchView('DETAIL', id);
      });
    });

    dom.analysesCardsContainer.querySelectorAll('.chk-select-audit').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        if (e.currentTarget.checked) {
          state.selectedAuditIdsForComparison.add(id);
        } else {
          state.selectedAuditIdsForComparison.delete(id);
        }
        updateComparisonToolbar();
      });
    });

    dom.analysesCardsContainer.querySelectorAll('.btn-card-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const audit = Store.get(id);
        if (audit) openAuditModal(audit);
      });
    });

    dom.analysesCardsContainer.querySelectorAll('.btn-card-duplicate').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const duplicated = Store.duplicate(id);
        if (duplicated) {
          showToast(`Análise duplicada com sucesso como "${duplicated.code}"`);
          renderAnalysesList();
        }
      });
    });

    dom.analysesCardsContainer.querySelectorAll('.btn-card-print').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const audit = Store.get(id);
        if (audit) printAuditReport(audit);
      });
    });

    dom.analysesCardsContainer.querySelectorAll('.btn-card-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const audit = Store.get(id);
        if (!audit) return;
        if (confirm(`Tem certeza que deseja excluir a análise "${audit.code} - ${audit.establishment || audit.title}"?`)) {
          if (Store.delete(id)) {
            state.selectedAuditIdsForComparison.delete(id);
            updateComparisonToolbar();
            renderAnalysesList();
            showToast('Análise excluída.');
          }
        }
      });
    });

    updateComparisonToolbar();
  }

  function updateComparisonToolbar() {
    const count = state.selectedAuditIdsForComparison.size;
    dom.compareSelectedCount.textContent = count;
    if (count >= 2) {
      dom.btnCompareSelected.disabled = false;
      dom.btnCompareSelected.className = 'px-3.5 py-2 text-xs font-bold rounded-lg border border-emerald-600 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition flex items-center gap-1.5 shadow-xs cursor-pointer';
    } else {
      dom.btnCompareSelected.disabled = true;
      dom.btnCompareSelected.className = 'px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white text-slate-400 cursor-not-allowed transition flex items-center gap-1.5 shadow-xs';
    }
  }

  // ==========================================================================
  // VIEW 2: AMBIENTE DE DETALHE / CHECKLIST DA ANÁLISE SELECIONADA
  // ==========================================================================

  function loadActiveAuditDetail() {
    if (!state.activeAuditId) {
      state.activeAuditId = Store.getActiveId();
    }

    state.activeAudit = Store.get(state.activeAuditId);
    if (!state.activeAudit) {
      const all = Store.getAll();
      state.activeAudit = all[0] || Store.create({ establishment: 'Estabelecimento Modelo' });
      state.activeAuditId = state.activeAudit.id;
    }

    state.currentStats = Calculator.calculate(
      state.activeAudit.answers || {},
      CHECKLIST_ITEMS,
      UAN_CATEGORIES,
      RDC_BLOCKS
    );

    // Popula seletor rápido
    populateQuickSwitch();

    // Cabeçalho da UAN
    dom.detailBadgeCode.textContent = state.activeAudit.code || 'UAN';
    dom.detailDate.textContent = state.activeAudit.date ? new Date(state.activeAudit.date + 'T12:00:00').toLocaleDateString('pt-BR') : '-';
    dom.detailCategory.textContent = state.activeAudit.category || 'Alimentação Coletiva';
    dom.detailEstablishment.textContent = state.activeAudit.establishment || state.activeAudit.title || 'Estabelecimento';
    dom.detailTechnicalLead.textContent = `Responsável Técnico / Avaliador: ${state.activeAudit.technicalLead || 'Não informado'}`;

    // Scorecard
    renderDetailScorecard();

    // Blocos da UAN
    renderDetailBlocksGrid();

    // Checklist
    renderChecklist();
  }

  function populateQuickSwitch() {
    const audits = Store.getAll();
    dom.detailQuickSwitch.innerHTML = '';
    audits.forEach(a => {
      const opt = document.createElement('option');
      opt.value = a.id;
      opt.textContent = `[${a.code || 'UAN'}] ${a.establishment || a.title || 'Lugar X'}`;
      if (a.id === state.activeAuditId) opt.selected = true;
      dom.detailQuickSwitch.appendChild(opt);
    });
  }

  function renderDetailScorecard() {
    const stats = state.currentStats;

    dom.detailAdequacyPct.textContent = Calculator.formatPct(stats.adequacyPct);
    dom.detailSimRatio.textContent = `(${stats.sim}/${stats.applicable} válidos)`;

    dom.detailInadequacyPct.textContent = Calculator.formatPct(stats.inadequacyPct);
    dom.detailNaoRatio.textContent = `(${stats.nao} fora do padrão)`;

    dom.detailGroupBadge.textContent = stats.classification.group;
    dom.detailGroupBadge.className = `inline-flex items-center px-2.5 py-1 rounded text-xs font-bold border ${stats.classification.badgeClass}`;
    dom.detailGroupDesc.textContent = stats.classification.description;

    const answered = stats.answered;
    const total = stats.totalItems;
    const pct = Math.round(stats.completionPct);
    dom.detailCompletionText.textContent = `${answered}/${total} (${pct}%)`;
    dom.detailProgressBar.style.width = `${pct}%`;

    dom.detailSimCount.textContent = `${stats.sim} SIM`;
    dom.detailNaoCount.textContent = `${stats.nao} NÃO`;
    dom.detailNaCount.textContent = `${stats.na} NA`;
    dom.detailPendingCount.textContent = `${stats.pending} pendentes`;
  }

  /**
   * Renderiza os 7 Blocos da RDC 275 com percentuais e gatilho de filtro rápido
   */
  function renderDetailBlocksGrid() {
    dom.detailBlockCardsGrid.innerHTML = '';
    const stats = state.currentStats;

    UAN_CATEGORIES.forEach((cat, idx) => {
      const bStat = stats.categoryStats[cat.name] || { adequacyPct: 0, sim: 0, nao: 0, na: 0, applicable: 0, total: 0 };
      const card = document.createElement('div');
      const isSelected = state.checklistCategory === cat.name;

      card.className = `p-3 rounded-lg border transition cursor-pointer flex flex-col justify-between ${
        isSelected ? 'bg-emerald-50 border-emerald-500 shadow-xs' : 'bg-slate-50/60 hover:bg-slate-100 border-slate-200'
      }`;

      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1">
            <span>Bloco ${idx + 1}</span>
            <span class="font-mono text-emerald-700 text-xs font-extrabold">${Calculator.formatPct(bStat.adequacyPct)}</span>
          </div>
          <h4 class="text-xs font-bold text-slate-800 line-clamp-1 leading-tight mb-2">
            ${cat.shortName}
          </h4>
        </div>
        <div class="flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>${bStat.sim} SIM • ${bStat.nao} NÃO</span>
          <span>${bStat.na} NA</span>
        </div>
      `;

      card.addEventListener('click', () => {
        state.checklistCategory = cat.name;
        updateChecklistTabsUi();
        renderDetailBlocksGrid();
        renderChecklist();
        document.getElementById('checklistItemsList').scrollIntoView({ behavior: 'smooth' });
      });

      dom.detailBlockCardsGrid.appendChild(card);
    });
  }

  function renderChecklistBlockTabs() {
    dom.blockTabsContainer.innerHTML = '';

    // Aba Todos
    const btnAll = document.createElement('button');
    btnAll.className = 'btn-tab px-3 py-1.5 rounded-lg font-bold border transition whitespace-nowrap active bg-slate-900 text-white border-slate-900';
    btnAll.setAttribute('data-cat', 'ALL');
    btnAll.textContent = 'Todos (164)';
    dom.blockTabsContainer.appendChild(btnAll);

    // 7 Categorias
    UAN_CATEGORIES.forEach((cat, index) => {
      const btn = document.createElement('button');
      btn.className = 'btn-tab px-3 py-1.5 rounded-lg font-semibold border transition whitespace-nowrap bg-white text-slate-700 border-slate-300 hover:bg-slate-50';
      btn.setAttribute('data-cat', cat.name);
      btn.textContent = `${index + 1}. ${cat.shortName}`;
      dom.blockTabsContainer.appendChild(btn);
    });

    dom.blockTabsContainer.querySelectorAll('.btn-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        state.checklistCategory = e.currentTarget.getAttribute('data-cat');
        updateChecklistTabsUi();
        renderDetailBlocksGrid();
        renderChecklist();
      });
    });
  }

  function updateChecklistTabsUi() {
    dom.blockTabsContainer.querySelectorAll('.btn-tab').forEach(t => {
      if (t.getAttribute('data-cat') === state.checklistCategory) {
        t.className = 'btn-tab px-3 py-1.5 rounded-lg font-bold border transition whitespace-nowrap active bg-slate-900 text-white border-slate-900';
      } else {
        t.className = 'btn-tab px-3 py-1.5 rounded-lg font-semibold border transition whitespace-nowrap bg-white text-slate-700 border-slate-300 hover:bg-slate-50';
      }
    });
  }

  function renderChecklist() {
    dom.checklistItemsList.innerHTML = '';
    const query = state.checklistSearchQuery.toLowerCase().trim();
    const catFilter = state.checklistCategory;
    const statusFilter = state.checklistStatus;
    const answers = state.activeAudit?.answers || {};

    const visibleItems = CHECKLIST_ITEMS.filter(item => {
      if (catFilter !== 'ALL' && item.uan_category !== catFilter) return false;

      const resp = answers[item.id];
      if (statusFilter === 'SIM' && resp !== 'SIM') return false;
      if (statusFilter === 'NAO' && resp !== 'NAO') return false;
      if (statusFilter === 'NA' && resp !== 'NA') return false;
      if (statusFilter === 'PENDING' && resp) return false;

      if (query) {
        const matchId = item.id.toLowerCase().includes(query);
        const matchText = item.text.toLowerCase().includes(query);
        if (!matchId && !matchText) return false;
      }

      return true;
    });

    dom.filteredItemsCount.textContent = `${visibleItems.length} itens`;

    if (visibleItems.length === 0) {
      dom.checklistItemsList.innerHTML = `
        <div class="py-12 text-center text-slate-400 text-xs">
          Nenhuma pergunta encontrada para os filtros selecionados.
        </div>
      `;
      return;
    }

    visibleItems.forEach(item => {
      const resp = answers[item.id];
      const obs = answers[`${item.id}_obs`] || '';
      const hasObs = obs.trim().length > 0;

      const itemRow = document.createElement('div');
      itemRow.className = 'py-3 px-4 hover:bg-slate-50/70 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs';
      itemRow.setAttribute('data-id', item.id);

      itemRow.innerHTML = `
        <div class="flex-1 pr-2">
          <div class="flex items-center gap-2 mb-1">
            <span class="font-mono font-bold text-slate-800 text-[11px] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">${item.id}</span>
            <span class="text-[11px] text-slate-400 font-medium">${item.uan_category}</span>
          </div>
          <p class="text-xs text-slate-800 leading-relaxed">${item.text}</p>
          ${hasObs ? `<p class="text-[11px] text-amber-800 bg-amber-50/60 border border-amber-200 px-2 py-1 rounded mt-1.5 font-medium"><i class="fa-regular fa-comment-dots mr-1"></i>${obs}</p>` : ''}
        </div>

        <div class="flex items-center gap-1.5 shrink-0">
          <button class="btn-choice btn-choice-sim px-3 py-1.5 rounded-lg font-bold border text-xs ${
            resp === 'SIM' ? 'active' : 'bg-white text-emerald-800 border-slate-300 hover:bg-emerald-50'
          }" data-id="${item.id}" data-val="SIM">
            SIM
          </button>
          <button class="btn-choice btn-choice-nao px-3 py-1.5 rounded-lg font-bold border text-xs ${
            resp === 'NAO' ? 'active' : 'bg-white text-rose-800 border-slate-300 hover:bg-rose-50'
          }" data-id="${item.id}" data-val="NAO">
            NÃO
          </button>
          <button class="btn-choice btn-choice-na px-2.5 py-1.5 rounded-lg font-bold border text-xs ${
            resp === 'NA' ? 'active' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
          }" data-id="${item.id}" data-val="NA">
            NA
          </button>
          <button class="btn-note p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded text-xs ml-1" data-id="${item.id}" title="Adicionar evidência ou observação">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
        </div>
      `;

      dom.checklistItemsList.appendChild(itemRow);
    });

    // Eventos dos botões de resposta
    dom.checklistItemsList.querySelectorAll('.btn-choice').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const val = e.currentTarget.getAttribute('data-val');
        Store.setAnswer(id, val);
        state.activeAudit = Store.get(state.activeAuditId);
        state.currentStats = Calculator.calculate(state.activeAudit.answers);

        renderDetailScorecard();
        renderDetailBlocksGrid();
        updateSingleItemButtons(id);
      });
    });

    // Eventos de observação
    dom.checklistItemsList.querySelectorAll('.btn-note').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const currentObs = state.activeAudit.answers[`${id}_obs`] || '';
        const newObs = prompt('Observação / Evidência para este item:', currentObs);
        if (newObs !== null) {
          Store.setAnswer(id, state.activeAudit.answers[id], newObs.trim());
          renderChecklist();
          showToast('Observação salva.');
        }
      });
    });
  }

  function updateSingleItemButtons(itemId) {
    const row = dom.checklistItemsList.querySelector(`[data-id="${itemId}"]`);
    if (!row) return;

    const resp = state.activeAudit.answers[itemId];
    const btnSim = row.querySelector('[data-val="SIM"]');
    const btnNao = row.querySelector('[data-val="NAO"]');
    const btnNa = row.querySelector('[data-val="NA"]');

    btnSim.className = `btn-choice btn-choice-sim px-3 py-1.5 rounded-lg font-bold border text-xs ${
      resp === 'SIM' ? 'active' : 'bg-white text-emerald-800 border-slate-300 hover:bg-emerald-50'
    }`;
    btnNao.className = `btn-choice btn-choice-nao px-3 py-1.5 rounded-lg font-bold border text-xs ${
      resp === 'NAO' ? 'active' : 'bg-white text-rose-800 border-slate-300 hover:bg-rose-50'
    }`;
    btnNa.className = `btn-choice btn-choice-na px-2.5 py-1.5 rounded-lg font-bold border text-xs ${
      resp === 'NA' ? 'active' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
    }`;
  }

  // ==========================================================================
  // VIEW 3: MATRIZ COMPARATIVA (TABELA DE PESQUISA)
  // ==========================================================================

  function renderComparativeView() {
    const allAudits = Store.getAll();

    // Se houver seleção prévia pela lista de análises, usa essa seleção
    if (state.selectedAuditIdsForComparison.size >= 2) {
      state.comparedAuditIds = new Set(state.selectedAuditIdsForComparison);
    } else if (state.comparedAuditIds.size === 0) {
      // Padrão: inclui todas as cadastradas
      state.comparedAuditIds = new Set(allAudits.map(a => a.id));
    }

    renderCompareCheckboxes();
    renderComparativeTable();
  }

  function renderCompareCheckboxes() {
    const allAudits = Store.getAll();
    dom.compareUanCheckboxesContainer.innerHTML = '';

    allAudits.forEach(audit => {
      const isChecked = state.comparedAuditIds.has(audit.id);
      const label = document.createElement('label');
      label.className = `px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition ${
        isChecked ? 'bg-emerald-50 text-emerald-900 border-emerald-400' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
      }`;

      label.innerHTML = `
        <input type="checkbox" class="rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 h-3.5 w-3.5 cursor-pointer" ${isChecked ? 'checked' : ''} data-id="${audit.id}">
        <span>[${audit.code || 'UAN'}] ${audit.establishment || audit.title || 'Lugar X'}</span>
      `;

      label.querySelector('input').addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        if (e.target.checked) {
          state.comparedAuditIds.add(id);
        } else {
          if (state.comparedAuditIds.size <= 1) {
            alert('Mantenha pelo menos um estabelecimento selecionado para comparar.');
            e.target.checked = true;
            return;
          }
          state.comparedAuditIds.delete(id);
        }
        renderCompareCheckboxes();
        renderComparativeTable();
      });

      dom.compareUanCheckboxesContainer.appendChild(label);
    });
  }

  function renderComparativeTable() {
    const allAudits = Store.getAll();
    const auditsToCompare = allAudits.filter(a => state.comparedAuditIds.has(a.id));

    const theadTr = dom.tableUanComparative.querySelector('thead tr');
    const tfootTrTotal = dom.tableUanComparative.querySelector('tfoot tr:first-child');
    const tfootTrGroup = dom.tableUanComparative.querySelector('tfoot tr:last-child');

    // Remove colunas anteriores
    while (theadTr.children.length > 1) theadTr.removeChild(theadTr.lastChild);
    while (tfootTrTotal.children.length > 1) tfootTrTotal.removeChild(tfootTrTotal.lastChild);
    while (tfootTrGroup.children.length > 1) tfootTrGroup.removeChild(tfootTrGroup.lastChild);

    // Cabeçalho das UANs
    auditsToCompare.forEach(audit => {
      const th = document.createElement('th');
      th.className = 'py-3 px-3 text-center border-l border-slate-300 font-extrabold uppercase text-xs sm:text-sm';
      th.innerHTML = `
        <button class="btn-th-uan font-extrabold text-emerald-800 hover:underline uppercase" data-id="${audit.id}" title="Clique para abrir esta análise">
          ${audit.code || 'UAN'}
        </button>
      `;
      theadTr.appendChild(th);
    });

    // Calcula estatísticas para as UANs selecionadas
    const auditStatsList = auditsToCompare.map(a => ({
      audit: a,
      stats: Calculator.calculate(a.answers || {}, CHECKLIST_ITEMS, UAN_CATEGORIES, RDC_BLOCKS)
    }));

    // 7 Linhas dos blocos
    dom.comparativeTableBody.innerHTML = '';
    UAN_CATEGORIES.forEach(cat => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-emerald-50/50 cursor-pointer transition border-b border-slate-200';
      tr.setAttribute('title', `Clique para abrir o bloco "${cat.name}" na análise ativa`);

      const tdName = document.createElement('td');
      tdName.className = 'py-2 px-4 font-semibold text-slate-800';
      tdName.textContent = cat.name;
      tr.appendChild(tdName);

      auditStatsList.forEach(({ stats }) => {
        const tdVal = document.createElement('td');
        tdVal.className = 'py-2 px-3 text-center font-bold border-l border-slate-200 font-mono';
        const bStat = stats.categoryStats[cat.name];
        const val = bStat ? bStat.adequacyPct : 0;
        tdVal.textContent = Calculator.formatNumber(val, 1);
        tr.appendChild(tdVal);
      });

      // Clicar na linha redireciona para o detalhe com aquele bloco filtrado
      tr.addEventListener('click', () => {
        state.checklistCategory = cat.name;
        const targetId = auditsToCompare[0]?.audit.id;
        if (targetId) {
          switchView('DETAIL', targetId);
          setTimeout(() => {
            updateChecklistTabsUi();
            renderChecklist();
          }, 50);
        }
      });

      dom.comparativeTableBody.appendChild(tr);
    });

    // Linha de Adequação Geral
    auditStatsList.forEach(({ stats }) => {
      const tdTotal = document.createElement('td');
      tdTotal.className = 'py-2.5 px-3 text-center font-black border-l border-slate-300 text-sm text-emerald-800 font-mono';
      tdTotal.textContent = Calculator.formatNumber(stats.adequacyPct, 1);
      tfootTrTotal.appendChild(tdTotal);

      const tdGroup = document.createElement('td');
      tdGroup.className = 'py-2 px-3 text-center font-bold border-l border-slate-200 text-xs text-slate-700';
      tdGroup.textContent = stats.classification.group;
      tfootTrGroup.appendChild(tdGroup);
    });

    // Clique no cabeçalho das UANs abre a análise
    dom.tableUanComparative.querySelectorAll('.btn-th-uan').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.getAttribute('data-id');
        switchView('DETAIL', id);
      });
    });
  }

  // ==========================================================================
  // MODAIS (NOVO LUGAR, EDITAR, BACKUP)
  // ==========================================================================

  function openAuditModal(auditToEdit = null) {
    if (auditToEdit) {
      dom.modalAuditTitle.textContent = `Editar Análise: ${auditToEdit.code || 'UAN'}`;
      dom.formAuditId.value = auditToEdit.id;
      dom.formCode.value = auditToEdit.code || '';
      dom.formDate.value = auditToEdit.date || new Date().toISOString().split('T')[0];
      dom.formEstablishment.value = auditToEdit.establishment || '';
      dom.formTechnicalLead.value = auditToEdit.technicalLead || '';
      dom.formCategory.value = auditToEdit.category || 'Hospitalar / Cozinha Central';
      dom.formNotes.value = auditToEdit.notes || '';
      dom.btnDeleteAudit.classList.remove('hidden');
    } else {
      dom.modalAuditTitle.textContent = 'Cadastrar Nova Análise';
      dom.formAuditId.value = '';
      dom.formCode.value = `UAN ${String.fromCharCode(65 + (Store.getAll().length % 26))}`;
      dom.formDate.value = new Date().toISOString().split('T')[0];
      dom.formEstablishment.value = '';
      dom.formTechnicalLead.value = '';
      dom.formCategory.value = 'Hospitalar / Cozinha Central';
      dom.formNotes.value = '';
      dom.btnDeleteAudit.classList.add('hidden');
    }

    dom.modalAuditForm.classList.remove('hidden');
    dom.modalAuditForm.classList.add('flex');
    dom.formCode.focus();
  }

  function closeAuditModal() {
    dom.modalAuditForm.classList.add('hidden');
    dom.modalAuditForm.classList.remove('flex');
  }

  function printAuditReport(audit) {
    const stats = Calculator.calculate(audit.answers || {}, CHECKLIST_ITEMS, UAN_CATEGORIES, RDC_BLOCKS);

    dom.printEstablishment.textContent = audit.establishment || audit.title || '-';
    dom.printCode.textContent = audit.code || 'UAN';
    dom.printDate.textContent = audit.date ? new Date(audit.date + 'T12:00:00').toLocaleDateString('pt-BR') : '-';
    dom.printTechnicalLead.textContent = audit.technicalLead || '-';
    dom.printSignLead.textContent = audit.technicalLead || 'Nutricionista Responsável Técnico';

    dom.printAdequacy.textContent = Calculator.formatPct(stats.adequacyPct);
    dom.printInadequacy.textContent = Calculator.formatPct(stats.inadequacyPct);
    dom.printGroup.textContent = stats.classification.group;

    dom.printBlocksTableBody.innerHTML = '';
    Object.values(stats.categoryStats).forEach(b => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="border border-black p-1 font-medium">${b.name}</td>
        <td class="border border-black p-1 text-center font-mono">${b.sim}</td>
        <td class="border border-black p-1 text-center font-mono">${b.nao}</td>
        <td class="border border-black p-1 text-center font-mono">${b.na}</td>
        <td class="border border-black p-1 text-center font-bold font-mono">${Calculator.formatPct(b.adequacyPct)}</td>
      `;
      dom.printBlocksTableBody.appendChild(tr);
    });

    dom.printNonConformitiesList.innerHTML = '';
    if (stats.nonConformities.length === 0) {
      dom.printNonConformitiesList.innerHTML = '<p class="italic text-slate-500">Nenhum item não conforme registrado nesta avaliação.</p>';
    } else {
      stats.nonConformities.forEach(nc => {
        const div = document.createElement('div');
        div.className = 'py-0.5';
        div.innerHTML = `• <strong>${nc.id}</strong>: ${nc.text} ${nc.observation ? `<em class="text-slate-600">(${nc.observation})</em>` : ''}`;
        dom.printNonConformitiesList.appendChild(div);
      });
    }

    window.print();
  }

  // ==========================================================================
  // EVENT LISTENERS
  // ==========================================================================

  function attachEventListeners() {
    // Navegação do Topo
    dom.navLogo.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('LIST');
    });

    dom.navBtnList.addEventListener('click', () => switchView('LIST'));
    dom.navBtnCompare.addEventListener('click', () => switchView('COMPARE'));

    dom.btnBackToAnalysesList.addEventListener('click', () => switchView('LIST'));
    dom.btnBackFromCompare.addEventListener('click', () => switchView('LIST'));

    // Botões de Criar Nova Análise
    dom.btnHeaderNewAudit.addEventListener('click', () => openAuditModal(null));
    dom.btnCreateAuditHero.addEventListener('click', () => openAuditModal(null));
    dom.btnEmptyCreateAudit.addEventListener('click', () => openAuditModal(null));

    // Botão de Comparar Selecionadas
    dom.btnCompareSelected.addEventListener('click', () => {
      if (state.selectedAuditIdsForComparison.size >= 2) {
        state.comparedAuditIds = new Set(state.selectedAuditIdsForComparison);
        switchView('COMPARE');
      }
    });

    // Filtros por Grupo na Lista de Análises
    dom.auditFilterTabs.querySelectorAll('.btn-audit-filter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        dom.auditFilterTabs.querySelectorAll('.btn-audit-filter').forEach(b => {
          b.className = 'btn-audit-filter px-2.5 py-1.5 rounded-lg font-semibold text-slate-600 hover:bg-slate-100 transition whitespace-nowrap';
        });
        e.currentTarget.className = 'btn-audit-filter px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap active bg-slate-900 text-white';
        state.auditGroupFilter = e.currentTarget.getAttribute('data-filter');
        renderAnalysesList();
      });
    });

    // Busca na Lista de Análises
    dom.searchAuditInput.addEventListener('input', (e) => {
      state.auditSearchQuery = e.target.value;
      renderAnalysesList();
    });

    // Troca Rápida de Auditoria na Barra de Detalhe
    dom.detailQuickSwitch.addEventListener('change', (e) => {
      switchView('DETAIL', e.target.value);
    });

    // Ações do Detalhe
    dom.btnDetailEdit.addEventListener('click', () => openAuditModal(state.activeAudit));
    dom.btnDetailDuplicate.addEventListener('click', () => {
      const duplicated = Store.duplicate(state.activeAuditId);
      if (duplicated) {
        showToast('Análise duplicada com sucesso!');
        switchView('DETAIL', duplicated.id);
      }
    });
    dom.btnDetailCompare.addEventListener('click', () => {
      state.comparedAuditIds = new Set(Store.getAll().map(a => a.id));
      switchView('COMPARE');
    });
    dom.btnDetailPrint.addEventListener('click', () => {
      if (state.activeAudit) printAuditReport(state.activeAudit);
    });

    // Busca no Checklist
    dom.searchInput.addEventListener('input', (e) => {
      state.checklistSearchQuery = e.target.value;
      renderChecklist();
    });

    // Filtros de Status no Checklist (Todos, Pendentes, SIM, NÃO, NA)
    document.querySelectorAll('.btn-status-filter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.btn-status-filter').forEach(b => {
          b.className = 'btn-status-filter px-2 py-0.5 rounded text-xs font-semibold text-slate-600 hover:bg-slate-100';
        });
        e.currentTarget.className = 'btn-status-filter px-2 py-0.5 rounded text-xs font-semibold bg-slate-900 text-white';
        state.checklistStatus = e.currentTarget.getAttribute('data-status');
        renderChecklist();
      });
    });

    // Marcar Itens Filtrados como SIM
    dom.btnMarkAllYes.addEventListener('click', () => {
      const rows = dom.checklistItemsList.querySelectorAll('[data-id]');
      const ids = Array.from(rows).map(r => r.getAttribute('data-id'));
      if (ids.length === 0) return;

      if (confirm(`Deseja marcar todos os ${ids.length} itens visíveis como SIM?`)) {
        Store.batchSetAnswers(ids, 'SIM');
        loadActiveAuditDetail();
        showToast(`${ids.length} itens marcados como SIM!`);
      }
    });

    // Copiar Tabela Comparativa (TSV para Word/Excel)
    dom.btnCopyTable.addEventListener('click', async () => {
      const allAudits = Store.getAll();
      const auditsToCompare = allAudits.filter(a => state.comparedAuditIds.has(a.id));
      const auditStatsList = auditsToCompare.map(a => ({
        code: a.code || 'UAN',
        stats: Calculator.calculate(a.answers || {})
      }));

      let tsv = 'ITENS AVALIADOS\t' + auditStatsList.map(a => a.code).join('\t') + '\n';
      UAN_CATEGORIES.forEach(cat => {
        const row = [cat.name];
        auditStatsList.forEach(({ stats }) => {
          row.push(Calculator.formatNumber(stats.categoryStats[cat.name]?.adequacyPct || 0, 1));
        });
        tsv += row.join('\t') + '\n';
      });
      tsv += 'ADEQUAÇÃO GERAL (%)\t' + auditStatsList.map(a => Calculator.formatNumber(a.stats.adequacyPct, 1)).join('\t') + '\n';
      tsv += `Fonte: ${dom.tableSourceInput.value}\n`;

      try {
        await navigator.clipboard.writeText(tsv);
        showToast('Tabela copiada! Cole diretamente no Word ou Excel.');
      } catch (e) {
        showToast('Erro ao copiar a tabela.');
      }
    });

    // Exportar CSV
    dom.btnExportCSV.addEventListener('click', () => {
      const allAudits = Store.getAll();
      const auditsToCompare = allAudits.filter(a => state.comparedAuditIds.has(a.id));
      const auditStatsList = auditsToCompare.map(a => ({
        code: a.code || 'UAN',
        stats: Calculator.calculate(a.answers || {})
      }));

      let csv = 'data:text/csv;charset=utf-8,\uFEFF';
      csv += '"ITENS AVALIADOS";' + auditStatsList.map(a => `"${a.code}"`).join(';') + '\r\n';
      UAN_CATEGORIES.forEach(cat => {
        const row = [`"${cat.name}"`];
        auditStatsList.forEach(({ stats }) => {
          row.push(`"${Calculator.formatNumber(stats.categoryStats[cat.name]?.adequacyPct || 0, 1)}"`);
        });
        csv += row.join(';') + '\r\n';
      });
      csv += '"ADEQUAÇÃO GERAL (%)";' + auditStatsList.map(a => `"${Calculator.formatNumber(a.stats.adequacyPct, 1)}"`).join(';') + '\r\n';
      csv += `"${dom.tableSourceInput.value}";\r\n`;

      const link = document.createElement('a');
      link.href = encodeURI(csv);
      link.download = `matriz_comparativa_uan_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      showToast('CSV baixado.');
    });

    // Modal Auditoria (Submit e Fechar)
    dom.btnCloseAuditForm.addEventListener('click', closeAuditModal);
    dom.btnCancelAuditForm.addEventListener('click', closeAuditModal);

    dom.formAudit.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = dom.formAuditId.value;
      const data = {
        code: dom.formCode.value.trim(),
        date: dom.formDate.value,
        establishment: dom.formEstablishment.value.trim(),
        technicalLead: dom.formTechnicalLead.value.trim(),
        category: dom.formCategory.value,
        notes: dom.formNotes.value.trim()
      };

      if (id) {
        const audit = Store.get(id);
        if (audit) {
          Object.assign(audit, data);
          audit.title = `${data.code} - ${data.establishment}`;
          Store.save(audit);
          showToast('Dados salvos com sucesso!');
        }
      } else {
        data.title = `${data.code} - ${data.establishment}`;
        const newAudit = Store.create(data);
        showToast('Nova análise cadastrada!');
        state.activeAuditId = newAudit.id;
      }

      closeAuditModal();

      if (state.currentView === 'LIST') {
        renderAnalysesList();
      } else {
        loadActiveAuditDetail();
      }
    });

    dom.btnDeleteAudit.addEventListener('click', () => {
      const id = dom.formAuditId.value;
      if (!id) return;
      if (confirm('Tem certeza que deseja excluir esta análise?')) {
        if (Store.delete(id)) {
          closeAuditModal();
          showToast('Análise excluída.');
          switchView('LIST');
        }
      }
    });

    // Modal Backup & Restaurar
    dom.btnOpenBackup.addEventListener('click', () => {
      dom.modalBackup.classList.remove('hidden');
      dom.modalBackup.classList.add('flex');
    });

    dom.btnCloseBackup.addEventListener('click', () => {
      dom.modalBackup.classList.add('hidden');
      dom.modalBackup.classList.remove('flex');
    });

    dom.btnExportJSON.addEventListener('click', () => {
      const jsonStr = Store.exportJSON();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup_bpf_uan_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Backup exportado!');
    });

    dom.inputImportJSON.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (Store.importJSON(event.target.result)) {
          dom.modalBackup.classList.add('hidden');
          dom.modalBackup.classList.remove('flex');
          showToast('Backup restaurado com sucesso!');
          switchView('LIST');
        } else {
          alert('Arquivo de backup inválido.');
        }
      };
      reader.readAsText(file);
    });

    dom.btnResetDefaults.addEventListener('click', () => {
      if (confirm('Restaurar os dados originais da pesquisa (UAN A e UAN B)? As modificações atuais serão substituídas.')) {
        Store.resetToDefaults();
        dom.modalBackup.classList.add('hidden');
        dom.modalBackup.classList.remove('flex');
        showToast('Dados originais restaurados!');
        switchView('LIST');
      }
    });
  }

  init();
});
