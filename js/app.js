/**
 * app.js - Arquitetura Hierárquica: Lugares (UANs) -> Múltiplas Avaliações Temporais
 * Resolução ANVISA RDC nº 275/2002
 */

document.addEventListener('DOMContentLoaded', () => {
  // Estado central da aplicação
  const state = {
    currentView: 'PLACES', // 'PLACES' | 'PLACE_HISTORY' | 'CHECKLIST' | 'COMPARE'
    activePlaceId: null,
    activeEvalId: null,

    // Filtros do Hub de Lugares
    placeSearchQuery: '',

    // Filtros do Checklist
    checklistCategory: 'ALL',
    checklistStatus: 'ALL',
    checklistSearchQuery: '',

    // Comparações Selecionadas
    comparedEvalIds: new Set()
  };

  // Mapeamento DOM
  const dom = {
    // Top Bar
    navLogo: document.getElementById('navLogo'),
    navBtnPlaces: document.getElementById('navBtnPlaces'),
    navBtnCompare: document.getElementById('navBtnCompare'),
    btnHeaderNewPlace: document.getElementById('btnHeaderNewPlace'),
    btnOpenBackup: document.getElementById('btnOpenBackup'),

    // Visões
    viewPlacesList: document.getElementById('viewPlacesList'),
    viewPlaceHistory: document.getElementById('viewPlaceHistory'),
    viewChecklistWorkspace: document.getElementById('viewChecklistWorkspace'),
    viewComparative: document.getElementById('viewComparative'),

    // View 1: Hub de Lugares
    badgeTotalPlacesCount: document.getElementById('badgeTotalPlacesCount'),
    btnQuickCompareAll: document.getElementById('btnQuickCompareAll'),
    btnCreatePlaceHero: document.getElementById('btnCreatePlaceHero'),
    searchPlaceInput: document.getElementById('searchPlaceInput'),
    placesCardsContainer: document.getElementById('placesCardsContainer'),
    placesEmptyState: document.getElementById('placesEmptyState'),
    btnEmptyCreatePlace: document.getElementById('btnEmptyCreatePlace'),

    // View 2: Histórico do Lugar Selecionado
    btnBackToPlaces: document.getElementById('btnBackToPlaces'),
    btnEditPlaceData: document.getElementById('btnEditPlaceData'),
    btnComparePlaceEvals: document.getElementById('btnComparePlaceEvals'),
    btnCreateEvalInPlace: document.getElementById('btnCreateEvalInPlace'),
    placeHistoryBadgeCode: document.getElementById('placeHistoryBadgeCode'),
    placeHistoryCategory: document.getElementById('placeHistoryCategory'),
    placeHistoryEvalsCount: document.getElementById('placeHistoryEvalsCount'),
    placeHistoryName: document.getElementById('placeHistoryName'),
    placeHistoryLead: document.getElementById('placeHistoryLead'),
    placeHistoryAddress: document.getElementById('placeHistoryAddress'),
    placeHistoryEvolutionBox: document.getElementById('placeHistoryEvolutionBox'),
    evaluationsTimelineContainer: document.getElementById('evaluationsTimelineContainer'),

    // View 3: Checklist Workspace
    btnBackToPlaceHistory: document.getElementById('btnBackToPlaceHistory'),
    btnBackToPlaceText: document.getElementById('btnBackToPlaceText'),
    btnDetailEditEval: document.getElementById('btnDetailEditEval'),
    btnDetailDuplicateEval: document.getElementById('btnDetailDuplicateEval'),
    btnDetailCompareThis: document.getElementById('btnDetailCompareThis'),
    btnDetailPrintReport: document.getElementById('btnDetailPrintReport'),
    evalBadgePlaceCode: document.getElementById('evalBadgePlaceCode'),
    evalBadgeType: document.getElementById('evalBadgeType'),
    evalDateFormatted: document.getElementById('evalDateFormatted'),
    evalPlaceAndTitle: document.getElementById('evalPlaceAndTitle'),
    evalLeadAndEvaluator: document.getElementById('evalLeadAndEvaluator'),
    selectQuickEvalSwitch: document.getElementById('selectQuickEvalSwitch'),
    evalAdequacyPct: document.getElementById('evalAdequacyPct'),
    evalSimRatio: document.getElementById('evalSimRatio'),
    evalInadequacyPct: document.getElementById('evalInadequacyPct'),
    evalNaoRatio: document.getElementById('evalNaoRatio'),
    evalGroupBadge: document.getElementById('evalGroupBadge'),
    evalGroupDesc: document.getElementById('evalGroupDesc'),
    evalCompletionText: document.getElementById('evalCompletionText'),
    evalProgressBar: document.getElementById('evalProgressBar'),
    evalSimCount: document.getElementById('evalSimCount'),
    evalNaoCount: document.getElementById('evalNaoCount'),
    evalNaCount: document.getElementById('evalNaCount'),
    evalPendingCount: document.getElementById('evalPendingCount'),
    evalBlockCardsGrid: document.getElementById('evalBlockCardsGrid'),
    filteredItemsCount: document.getElementById('filteredItemsCount'),
    searchInput: document.getElementById('searchInput'),
    blockTabsContainer: document.getElementById('blockTabsContainer'),
    btnMarkAllYes: document.getElementById('btnMarkAllYes'),
    checklistItemsList: document.getElementById('checklistItemsList'),

    // View 4: Matriz Comparativa
    btnBackFromCompare: document.getElementById('btnBackFromCompare'),
    btnCopyTable: document.getElementById('btnCopyTable'),
    btnExportCSV: document.getElementById('btnExportCSV'),
    compareEvaluationsGroupedContainer: document.getElementById('compareEvaluationsGroupedContainer'),
    tableUanComparative: document.getElementById('tableUanComparative'),
    comparativeTableBody: document.getElementById('comparativeTableBody'),
    tableSourceInput: document.getElementById('tableSourceInput'),

    // Modais Lugar
    modalPlaceForm: document.getElementById('modalPlaceForm'),
    modalPlaceTitle: document.getElementById('modalPlaceTitle'),
    btnClosePlaceForm: document.getElementById('btnClosePlaceForm'),
    btnCancelPlaceForm: document.getElementById('btnCancelPlaceForm'),
    formPlace: document.getElementById('formPlace'),
    formPlaceId: document.getElementById('formPlaceId'),
    formPlaceCode: document.getElementById('formPlaceCode'),
    formPlaceCategory: document.getElementById('formPlaceCategory'),
    formPlaceName: document.getElementById('formPlaceName'),
    formPlaceLead: document.getElementById('formPlaceLead'),
    formPlaceAddress: document.getElementById('formPlaceAddress'),
    btnDeletePlace: document.getElementById('btnDeletePlace'),

    // Modais Avaliação
    modalEvalForm: document.getElementById('modalEvalForm'),
    modalEvalTitle: document.getElementById('modalEvalTitle'),
    btnCloseEvalForm: document.getElementById('btnCloseEvalForm'),
    btnCancelEvalForm: document.getElementById('btnCancelEvalForm'),
    formEval: document.getElementById('formEval'),
    formEvalId: document.getElementById('formEvalId'),
    formEvalPlaceId: document.getElementById('formEvalPlaceId'),
    formEvalTitleText: document.getElementById('formEvalTitleText'),
    formEvalDate: document.getElementById('formEvalDate'),
    formEvalType: document.getElementById('formEvalType'),
    formEvalEvaluator: document.getElementById('formEvalEvaluator'),
    boxCloneFromPrevious: document.getElementById('boxCloneFromPrevious'),
    chkCloneAnswers: document.getElementById('chkCloneAnswers'),
    formEvalNotes: document.getElementById('formEvalNotes'),
    btnDeleteEval: document.getElementById('btnDeleteEval'),

    // Modal Backup
    modalBackup: document.getElementById('modalBackup'),
    btnCloseBackup: document.getElementById('btnCloseBackup'),
    btnExportJSON: document.getElementById('btnExportJSON'),
    inputImportJSON: document.getElementById('inputImportJSON'),
    btnResetDefaults: document.getElementById('btnResetDefaults'),

    // Impressão
    printEstablishment: document.getElementById('printEstablishment'),
    printCode: document.getElementById('printCode'),
    printEvalTitle: document.getElementById('printEvalTitle'),
    printDate: document.getElementById('printDate'),
    printTechnicalLead: document.getElementById('printTechnicalLead'),
    printEvaluator: document.getElementById('printEvaluator'),
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

  function showToast(message) {
    dom.toastMessage.textContent = message;
    dom.toastNotification.classList.remove('translate-y-16', 'opacity-0', 'pointer-events-none');
    setTimeout(() => {
      dom.toastNotification.classList.add('translate-y-16', 'opacity-0', 'pointer-events-none');
    }, 2800);
  }

  function init() {
    renderChecklistBlockTabs();
    parseUrlHash();
    attachEventListeners();
    window.addEventListener('hashchange', parseUrlHash);
  }

  let isNavigating = false;

  /**
   * Roteamento baseado em hash (#places, #place/:id, #eval/:id, #compare)
   */
  function parseUrlHash() {
    if (isNavigating) return;
    const hash = window.location.hash || '#places';

    if (hash.startsWith('#place/')) {
      const placeId = hash.replace('#place/', '');
      const place = Store.getPlace(placeId);
      if (place) {
        state.activePlaceId = placeId;
        switchView('PLACE_HISTORY');
        return;
      }
    } else if (hash.startsWith('#eval/')) {
      const evalId = hash.replace('#eval/', '');
      const found = Store.getEvaluation(evalId);
      if (found) {
        state.activePlaceId = found.place.id;
        state.activeEvalId = evalId;
        switchView('CHECKLIST');
        return;
      }
    } else if (hash === '#compare') {
      switchView('COMPARE');
      return;
    }

    // Padrão: Hub de Lugares
    switchView('PLACES');
  }

  function switchView(viewName, params = {}) {
    state.currentView = viewName;
    if (params.placeId) state.activePlaceId = params.placeId;
    if (params.evalId) state.activeEvalId = params.evalId;

    // Oculta todas as visões
    dom.viewPlacesList.classList.add('hidden');
    dom.viewPlaceHistory.classList.add('hidden');
    dom.viewChecklistWorkspace.classList.add('hidden');
    dom.viewComparative.classList.add('hidden');

    // Estilos da navbar
    dom.navBtnPlaces.className = 'px-3 py-1.5 rounded-lg transition text-slate-600 hover:text-slate-900 hover:bg-slate-100';
    dom.navBtnCompare.className = 'px-3 py-1.5 rounded-lg transition text-slate-600 hover:text-slate-900 hover:bg-slate-100';

    if (viewName === 'PLACES') {
      dom.viewPlacesList.classList.remove('hidden');
      dom.navBtnPlaces.className = 'px-3 py-1.5 rounded-lg transition bg-slate-100 text-slate-900 font-bold';
      if (window.location.hash !== '#places') {
        isNavigating = true;
        window.location.hash = '#places';
        setTimeout(() => { isNavigating = false; }, 60);
      }
      renderPlacesList();
    } else if (viewName === 'PLACE_HISTORY') {
      dom.viewPlaceHistory.classList.remove('hidden');
      const targetHash = `#place/${state.activePlaceId}`;
      if (window.location.hash !== targetHash) {
        isNavigating = true;
        window.location.hash = targetHash;
        setTimeout(() => { isNavigating = false; }, 60);
      }
      renderPlaceHistory();
    } else if (viewName === 'CHECKLIST') {
      dom.viewChecklistWorkspace.classList.remove('hidden');
      const targetHash = `#eval/${state.activeEvalId}`;
      if (window.location.hash !== targetHash) {
        isNavigating = true;
        window.location.hash = targetHash;
        setTimeout(() => { isNavigating = false; }, 60);
      }
      renderChecklistWorkspace();
    } else if (viewName === 'COMPARE') {
      dom.viewComparative.classList.remove('hidden');
      dom.navBtnCompare.className = 'px-3 py-1.5 rounded-lg transition bg-slate-100 text-slate-900 font-bold';
      if (window.location.hash !== '#compare') {
        isNavigating = true;
        window.location.hash = '#compare';
        setTimeout(() => { isNavigating = false; }, 60);
      }
      renderComparativeView();
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // ==========================================================================
  // VIEW 1: HUB DE LUGARES (LISTA DE ESTABELECIMENTOS)
  // ==========================================================================

  function renderPlacesList() {
    const places = Store.getPlaces();
    const query = state.placeSearchQuery.toLowerCase().trim();

    dom.badgeTotalPlacesCount.textContent = `${places.length} ${places.length === 1 ? 'lugar cadastrado' : 'lugares cadastrados'}`;

    const filtered = places.filter(p => {
      if (!query) return true;
      const matchCode = (p.code || '').toLowerCase().includes(query);
      const matchName = (p.name || p.establishment || '').toLowerCase().includes(query);
      const matchLead = (p.technicalLead || '').toLowerCase().includes(query);
      const matchCat = (p.category || '').toLowerCase().includes(query);
      return matchCode || matchName || matchLead || matchCat;
    });

    dom.placesCardsContainer.innerHTML = '';

    if (filtered.length === 0) {
      dom.placesEmptyState.classList.remove('hidden');
      return;
    }
    dom.placesEmptyState.classList.add('hidden');

    filtered.forEach(place => {
      const card = document.createElement('div');
      card.className = 'interactive-card bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between transition';

      const evals = place.evaluations || [];
      const evalsCount = evals.length;

      // Avaliação mais recente
      const latestEval = evals[0] || null;
      let latestStats = null;
      if (latestEval) {
        latestStats = Calculator.calculate(latestEval.answers || {}, CHECKLIST_ITEMS, UAN_CATEGORIES, RDC_BLOCKS);
      }

      // Comparação temporal se houver mais de uma avaliação
      let evolutionHtml = '';
      if (evalsCount > 1) {
        const oldestEval = evals[evals.length - 1];
        const oldestStats = Calculator.calculate(oldestEval.answers || {}, CHECKLIST_ITEMS, UAN_CATEGORIES, RDC_BLOCKS);
        const diff = latestStats.adequacyPct - oldestStats.adequacyPct;
        const sign = diff >= 0 ? '+' : '';
        const isPositive = diff >= 0;

        evolutionHtml = `
          <div class="mt-2 text-xs flex items-center justify-between bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg">
            <span class="text-slate-500 font-medium">Evolução no local:</span>
            <span class="font-bold font-mono ${isPositive ? 'text-emerald-700' : 'text-rose-700'}">
              <i class="fa-solid ${isPositive ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'} mr-1"></i>
              ${sign}${Calculator.formatNumber(diff, 1)}% (${Calculator.formatPct(oldestStats.adequacyPct)} → ${Calculator.formatPct(latestStats.adequacyPct)})
            </span>
          </div>
        `;
      }

      let groupBadgeHtml = '';
      if (latestStats) {
        const groupCode = latestStats.classification.code;
        const pctFormatted = Calculator.formatPct(latestStats.adequacyPct);
        if (groupCode === 'G1') {
          groupBadgeHtml = `<span class="badge-group-1 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1"><i class="fa-solid fa-circle-check text-[11px]"></i>${latestStats.classification.group} • ${pctFormatted}</span>`;
        } else if (groupCode === 'G2') {
          groupBadgeHtml = `<span class="badge-group-2 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1"><i class="fa-solid fa-triangle-exclamation text-[11px]"></i>${latestStats.classification.group} • ${pctFormatted}</span>`;
        } else if (groupCode === 'G3') {
          groupBadgeHtml = `<span class="badge-group-3 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1"><i class="fa-solid fa-circle-xmark text-[11px]"></i>${latestStats.classification.group} • ${pctFormatted}</span>`;
        } else {
          groupBadgeHtml = `<span class="badge-group-pending text-xs font-bold px-2 py-0.5 rounded">Pendente</span>`;
        }
      } else {
        groupBadgeHtml = `<span class="badge-group-pending text-xs font-bold px-2 py-0.5 rounded">Sem avaliações</span>`;
      }

      card.innerHTML = `
        <div>
          <!-- Topo do Card -->
          <div class="flex items-start justify-between gap-3 mb-2.5">
            <div class="flex items-center gap-2">
              <span class="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">${place.code || 'UAN'}</span>
              <span class="text-xs text-slate-500 font-semibold bg-slate-50 px-2 py-0.5 rounded border border-slate-100">${place.category || 'Alimentação Coletiva'}</span>
            </div>
            <div>${groupBadgeHtml}</div>
          </div>

          <!-- Nome do Lugar -->
          <h3 class="font-bold text-base text-slate-900 tracking-tight leading-snug line-clamp-1 mb-1">
            ${place.name || place.establishment}
          </h3>

          <div class="space-y-0.5 text-xs text-slate-500 mb-3">
            <p class="truncate"><i class="fa-regular fa-user text-[11px] text-slate-400 mr-1.5"></i>${place.technicalLead || 'Responsável Técnico não informado'}</p>
            <p class="truncate"><i class="fa-solid fa-location-dot text-[11px] text-slate-400 mr-1.5"></i>${place.address || 'Endereço não cadastrado'}</p>
          </div>

          <!-- Histórico / Status -->
          <div class="bg-slate-50/80 rounded-lg p-3 border border-slate-200 mb-2">
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="text-slate-500 font-medium">Avaliações realizadas:</span>
              <span class="font-bold text-slate-800 font-mono">${evalsCount} ${evalsCount === 1 ? 'inspeção' : 'inspeções'}</span>
            </div>
            <div class="flex items-center justify-between text-xs text-slate-500">
              <span>Última avaliação:</span>
              <span class="font-bold font-mono text-slate-700">${latestEval ? (latestEval.title + ' • ' + new Date(latestEval.date + 'T12:00:00').toLocaleDateString('pt-BR')) : 'Nenhuma'}</span>
            </div>
            ${evolutionHtml}
          </div>
        </div>

        <!-- Ações do Card -->
        <div class="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
          <div class="flex items-center gap-1">
            <button class="btn-card-edit-place p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded text-xs transition" data-id="${place.id}" title="Editar dados do lugar">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class="btn-card-delete-place p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded text-xs transition" data-id="${place.id}" title="Excluir lugar">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>

          <div class="flex items-center gap-2">
            <button class="btn-card-new-eval px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-xs" data-id="${place.id}" title="Cadastrar nova avaliação neste lugar">
              <i class="fa-solid fa-plus text-[10px]"></i>
              <span>Nova Avaliação</span>
            </button>
            <button class="btn-open-place px-3 py-1.5 bg-slate-900 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs" data-id="${place.id}">
              <span>Ver Histórico</span>
              <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
          </div>
        </div>
      `;

      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('input') || e.target.closest('select') || e.target.closest('a')) {
          return;
        }
        switchView('PLACE_HISTORY', { placeId: place.id });
      });

      dom.placesCardsContainer.appendChild(card);
      });

      // Eventos dos botões dos cards
      dom.placesCardsContainer.querySelectorAll('.btn-open-place').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = e.currentTarget.getAttribute('data-id');
          switchView('PLACE_HISTORY', { placeId: id });
        });
      });

      dom.placesCardsContainer.querySelectorAll('.btn-card-new-eval').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = e.currentTarget.getAttribute('data-id');
          openEvalModal(id, null);
        });
      });

      dom.placesCardsContainer.querySelectorAll('.btn-card-edit-place').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = e.currentTarget.getAttribute('data-id');
          const place = Store.getPlace(id);
          if (place) openPlaceModal(place);
        });
      });

      dom.placesCardsContainer.querySelectorAll('.btn-card-delete-place').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = e.currentTarget.getAttribute('data-id');
          const place = Store.getPlace(id);
          if (!place) return;
          if (confirm(`Tem certeza que deseja excluir o lugar "${place.code} - ${place.name}" e todas as suas avaliações?`)) {
            if (Store.deletePlace(id)) {
              renderPlacesList();
              showToast('Lugar excluído.');
            }
          }
        });
      });
    }

  // ==========================================================================
  // VIEW 2: HISTÓRICO DE AVALIAÇÕES DO LUGAR SELECIONADO
  // ==========================================================================

  function renderPlaceHistory() {
    const place = Store.getPlace(state.activePlaceId);
    if (!place) {
      switchView('PLACES');
      return;
    }

    dom.placeHistoryBadgeCode.textContent = place.code || 'UAN';
    dom.placeHistoryCategory.textContent = place.category || 'Alimentação Coletiva';
    dom.placeHistoryName.textContent = place.name || place.establishment;
    dom.placeHistoryLead.textContent = `Responsável Técnico (RT): ${place.technicalLead || 'Não informado'}`;
    dom.placeHistoryAddress.textContent = place.address || 'Endereço não cadastrado';

    const evals = place.evaluations || [];
    dom.placeHistoryEvalsCount.textContent = `${evals.length} ${evals.length === 1 ? 'avaliação registrada' : 'avaliações registradas'}`;

    // Caixa de evolução se houver múltiplas avaliações
    if (evals.length > 1) {
      const latestStats = Calculator.calculate(evals[0].answers || {});
      const oldestStats = Calculator.calculate(evals[evals.length - 1].answers || {});
      const diff = latestStats.adequacyPct - oldestStats.adequacyPct;
      const sign = diff >= 0 ? '+' : '';
      const isPositive = diff >= 0;

      dom.placeHistoryEvolutionBox.innerHTML = `
        <span class="text-slate-400 block text-[10px] font-semibold uppercase">Evolução Temporal</span>
        <div class="flex items-center gap-1.5 justify-end font-bold font-mono text-sm ${isPositive ? 'text-emerald-700' : 'text-rose-700'}">
          <i class="fa-solid ${isPositive ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}"></i>
          <span>${sign}${Calculator.formatNumber(diff, 1)}%</span>
        </div>
        <span class="text-[11px] text-slate-500 block">De ${Calculator.formatPct(oldestStats.adequacyPct)} para ${Calculator.formatPct(latestStats.adequacyPct)}</span>
      `;
      dom.placeHistoryEvolutionBox.classList.remove('hidden');
    } else {
      dom.placeHistoryEvolutionBox.classList.add('hidden');
    }

    dom.evaluationsTimelineContainer.innerHTML = '';

    evals.forEach((evaluation, index) => {
      const stats = Calculator.calculate(evaluation.answers || {});
      const card = document.createElement('div');
      card.className = 'bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:border-slate-300 interactive-card cursor-pointer';

      const isLatest = index === 0;
      const pctFormatted = Calculator.formatPct(stats.adequacyPct);
      const groupCode = stats.classification.code;

      let badgeHtml = '';
      if (groupCode === 'G1') {
        badgeHtml = `<span class="badge-group-1 text-xs font-bold px-2.5 py-1 rounded flex items-center gap-1"><i class="fa-solid fa-circle-check text-[11px]"></i>${stats.classification.group} • ${pctFormatted}</span>`;
      } else if (groupCode === 'G2') {
        badgeHtml = `<span class="badge-group-2 text-xs font-bold px-2.5 py-1 rounded flex items-center gap-1"><i class="fa-solid fa-triangle-exclamation text-[11px]"></i>${stats.classification.group} • ${pctFormatted}</span>`;
      } else if (groupCode === 'G3') {
        badgeHtml = `<span class="badge-group-3 text-xs font-bold px-2 py-1 rounded flex items-center gap-1"><i class="fa-solid fa-circle-xmark text-[11px]"></i>${stats.classification.group} • ${pctFormatted}</span>`;
      } else {
        badgeHtml = `<span class="badge-group-pending text-xs font-bold px-2.5 py-1 rounded">Pendente</span>`;
      }

      card.innerHTML = `
        <div class="space-y-1.5 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            ${isLatest ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-700 text-white">MAIS RECENTE</span>` : ''}
            <span class="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">${evaluation.type || 'AVALIAÇÃO'}</span>
            <span class="text-xs text-slate-500 font-mono font-medium">${evaluation.date ? new Date(evaluation.date + 'T12:00:00').toLocaleDateString('pt-BR') : '-'}</span>
          </div>

          <h4 class="font-extrabold text-base text-slate-900 tracking-tight">
            ${evaluation.title}
          </h4>

          <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            <span><i class="fa-regular fa-user text-slate-400 mr-1"></i>${evaluation.evaluator || place.technicalLead || 'Avaliador não informado'}</span>
            <span><i class="fa-solid fa-list-check text-slate-400 mr-1"></i>${stats.answered}/${stats.totalItems} respondidos</span>
            <span class="font-mono text-rose-600 font-bold">${stats.nao} fora do padrão</span>
          </div>

          ${evaluation.notes ? `<p class="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 mt-2 max-w-2xl italic"><i class="fa-regular fa-comment mr-1 text-slate-400"></i>${evaluation.notes}</p>` : ''}
        </div>

        <div class="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div>${badgeHtml}</div>

          <div class="flex items-center gap-1.5">
            <button class="btn-timeline-edit p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded text-xs transition" data-eval-id="${evaluation.id}" title="Editar dados da avaliação">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class="btn-timeline-duplicate p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded text-xs transition" data-eval-id="${evaluation.id}" title="Duplicar para nova inspeção">
              <i class="fa-regular fa-copy"></i>
            </button>
            <button class="btn-timeline-print p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded text-xs transition" data-eval-id="${evaluation.id}" title="Imprimir relatório">
              <i class="fa-solid fa-print"></i>
            </button>
            <button class="btn-timeline-delete p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded text-xs transition" data-eval-id="${evaluation.id}" title="Excluir avaliação">
              <i class="fa-regular fa-trash-can"></i>
            </button>
            <button class="btn-timeline-open px-3.5 py-1.5 bg-slate-900 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs" data-eval-id="${evaluation.id}">
              <span>Abrir Checklist</span>
              <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
          </div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('input') || e.target.closest('select') || e.target.closest('a')) {
          return;
        }
        switchView('CHECKLIST', { evalId: evaluation.id });
      });

      dom.evaluationsTimelineContainer.appendChild(card);
    });

    // Eventos na Linha do Tempo
    dom.evaluationsTimelineContainer.querySelectorAll('.btn-timeline-open').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const evalId = e.currentTarget.getAttribute('data-eval-id');
        switchView('CHECKLIST', { evalId });
      });
    });

    dom.evaluationsTimelineContainer.querySelectorAll('.btn-timeline-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const evalId = e.currentTarget.getAttribute('data-eval-id');
        const found = Store.getEvaluation(evalId);
        if (found) openEvalModal(found.place.id, found.evaluation);
      });
    });

    dom.evaluationsTimelineContainer.querySelectorAll('.btn-timeline-duplicate').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const evalId = e.currentTarget.getAttribute('data-eval-id');
        const found = Store.getEvaluation(evalId);
        if (found) {
          const newEval = Store.createEvaluation(found.place.id, {
            title: `Reavaliação (${new Date().toLocaleDateString('pt-BR')})`,
            type: 'REAVALIACAO',
            date: new Date().toISOString().split('T')[0]
          }, evalId);
          showToast('Avaliação duplicada com respostas anteriores copiadas!');
          renderPlaceHistory();
        }
      });
    });

    dom.evaluationsTimelineContainer.querySelectorAll('.btn-timeline-print').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const evalId = e.currentTarget.getAttribute('data-eval-id');
        const found = Store.getEvaluation(evalId);
        if (found) printEvaluationReport(found.place, found.evaluation);
      });
    });

    dom.evaluationsTimelineContainer.querySelectorAll('.btn-timeline-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const evalId = e.currentTarget.getAttribute('data-eval-id');
        const found = Store.getEvaluation(evalId);
        if (!found) return;
        if (confirm(`Deseja excluir a avaliação "${found.evaluation.title}"?`)) {
          if (Store.deleteEvaluation(evalId)) {
            renderPlaceHistory();
            showToast('Avaliação excluída.');
          }
        }
      });
    });
  }

  // ==========================================================================
  // VIEW 3: AMBIENTE DE CHECKLIST DA AVALIAÇÃO ATIVA
  // ==========================================================================

  function renderChecklistWorkspace() {
    const found = Store.getEvaluation(state.activeEvalId);
    if (!found) {
      switchView('PLACES');
      return;
    }

    const { place, evaluation } = found;
    state.activePlaceId = place.id;

    const stats = Calculator.calculate(evaluation.answers || {});

    // Breadcrumb e Identificação
    dom.btnBackToPlaceText.textContent = `Voltar para histórico de [${place.code}] ${place.name}`;
    dom.evalBadgePlaceCode.textContent = place.code || 'UAN';
    dom.evalBadgeType.textContent = evaluation.type || 'AVALIAÇÃO';
    dom.evalDateFormatted.textContent = evaluation.date ? new Date(evaluation.date + 'T12:00:00').toLocaleDateString('pt-BR') : '-';
    dom.evalPlaceAndTitle.textContent = `${place.name} • ${evaluation.title}`;
    dom.evalLeadAndEvaluator.textContent = `Avaliador: ${evaluation.evaluator || place.technicalLead || 'Não informado'} | RT: ${place.technicalLead || 'Não informado'}`;

    // Popula seletor rápido com avaliações deste lugar
    populateQuickEvalSwitch(place, evaluation);

    // Scorecard
    dom.evalAdequacyPct.textContent = Calculator.formatPct(stats.adequacyPct);
    dom.evalSimRatio.textContent = `(${stats.sim}/${stats.applicable} válidos)`;

    dom.evalInadequacyPct.textContent = Calculator.formatPct(stats.inadequacyPct);
    dom.evalNaoRatio.textContent = `(${stats.nao} fora do padrão)`;

    dom.evalGroupBadge.textContent = stats.classification.group;
    dom.evalGroupBadge.className = `inline-flex items-center px-2.5 py-1 rounded text-xs font-bold border ${stats.classification.badgeClass}`;
    dom.evalGroupDesc.textContent = stats.classification.description;

    const answered = stats.answered;
    const total = stats.totalItems;
    const pct = Math.round(stats.completionPct);
    dom.evalCompletionText.textContent = `${answered}/${total} (${pct}%)`;
    dom.evalProgressBar.style.width = `${pct}%`;

    dom.evalSimCount.textContent = `${stats.sim} SIM`;
    dom.evalNaoCount.textContent = `${stats.nao} NÃO`;
    dom.evalNaCount.textContent = `${stats.na} NA`;
    dom.evalPendingCount.textContent = `${stats.pending} pendentes`;

    // 7 Blocos
    renderEvalBlocksGrid(stats);

    // Checklist
    renderChecklist(evaluation.answers || {});
  }

  function populateQuickEvalSwitch(place, activeEval) {
    dom.selectQuickEvalSwitch.innerHTML = '';
    (place.evaluations || []).forEach(e => {
      const opt = document.createElement('option');
      opt.value = e.id;
      opt.textContent = `${e.title} (${e.date})`;
      if (e.id === activeEval.id) opt.selected = true;
      dom.selectQuickEvalSwitch.appendChild(opt);
    });
  }

  function renderEvalBlocksGrid(stats) {
    dom.evalBlockCardsGrid.innerHTML = '';

    UAN_CATEGORIES.forEach((cat, idx) => {
      const bStat = stats.categoryStats[cat.name] || { adequacyPct: 0, sim: 0, nao: 0, na: 0 };
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
        const found = Store.getEvaluation(state.activeEvalId);
        if (found) {
          const s = Calculator.calculate(found.evaluation.answers || {});
          renderEvalBlocksGrid(s);
          renderChecklist(found.evaluation.answers || {});
        }
        document.getElementById('checklistItemsList').scrollIntoView({ behavior: 'smooth' });
      });

      dom.evalBlockCardsGrid.appendChild(card);
    });
  }

  function renderChecklistBlockTabs() {
    dom.blockTabsContainer.innerHTML = '';

    const btnAll = document.createElement('button');
    btnAll.className = 'btn-tab px-3 py-1.5 rounded-lg font-bold border transition whitespace-nowrap active bg-slate-900 text-white border-slate-900';
    btnAll.setAttribute('data-cat', 'ALL');
    btnAll.textContent = 'Todos (164)';
    dom.blockTabsContainer.appendChild(btnAll);

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
        const found = Store.getEvaluation(state.activeEvalId);
        if (found) {
          const s = Calculator.calculate(found.evaluation.answers || {});
          renderEvalBlocksGrid(s);
          renderChecklist(found.evaluation.answers || {});
        }
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

  function renderChecklist(answers = {}) {
    dom.checklistItemsList.innerHTML = '';
    const query = state.checklistSearchQuery.toLowerCase().trim();
    const catFilter = state.checklistCategory;
    const statusFilter = state.checklistStatus;

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
        Store.setAnswer(state.activeEvalId, id, val);
        
        const found = Store.getEvaluation(state.activeEvalId);
        if (found) {
          const stats = Calculator.calculate(found.evaluation.answers || {});
          
          dom.evalAdequacyPct.textContent = Calculator.formatPct(stats.adequacyPct);
          dom.evalSimRatio.textContent = `(${stats.sim}/${stats.applicable} válidos)`;
          dom.evalInadequacyPct.textContent = Calculator.formatPct(stats.inadequacyPct);
          dom.evalNaoRatio.textContent = `(${stats.nao} fora do padrão)`;

          dom.evalGroupBadge.textContent = stats.classification.group;
          dom.evalGroupBadge.className = `inline-flex items-center px-2.5 py-1 rounded text-xs font-bold border ${stats.classification.badgeClass}`;

          dom.evalCompletionText.textContent = `${stats.answered}/${stats.totalItems} (${Math.round(stats.completionPct)}%)`;
          dom.evalProgressBar.style.width = `${Math.round(stats.completionPct)}%`;

          dom.evalSimCount.textContent = `${stats.sim} SIM`;
          dom.evalNaoCount.textContent = `${stats.nao} NÃO`;
          dom.evalNaCount.textContent = `${stats.na} NA`;
          dom.evalPendingCount.textContent = `${stats.pending} pendentes`;

          renderEvalBlocksGrid(stats);
          updateSingleItemButtons(id, found.evaluation.answers);
        }
      });
    });

    // Observações
    dom.checklistItemsList.querySelectorAll('.btn-note').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const found = Store.getEvaluation(state.activeEvalId);
        const currentObs = found?.evaluation?.answers?.[`${id}_obs`] || '';
        const newObs = prompt('Observação / Evidência para este item:', currentObs);
        if (newObs !== null) {
          Store.setAnswer(state.activeEvalId, id, found?.evaluation?.answers?.[id], newObs.trim());
          const reloaded = Store.getEvaluation(state.activeEvalId);
          renderChecklist(reloaded.evaluation.answers || {});
          showToast('Observação salva.');
        }
      });
    });
  }

  function updateSingleItemButtons(itemId, answers) {
    const row = dom.checklistItemsList.querySelector(`[data-id="${itemId}"]`);
    if (!row) return;

    const resp = answers[itemId];
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
  // VIEW 4: MATRIZ COMPARATIVA (TEMPORAL OU MULTI-LUGAR)
  // ==========================================================================

  function renderComparativeView() {
    const allFlat = Store.getAllEvaluationsFlat();

    // Se nenhuma avaliação estiver selecionada para comparação, seleciona todas por padrão
    if (state.comparedEvalIds.size === 0) {
      allFlat.forEach(e => state.comparedEvalIds.add(e.evalId));
    }

    renderComparativeCheckboxes();
    renderComparativeTable();
  }

  function renderComparativeCheckboxes() {
    const places = Store.getPlaces();
    dom.compareEvaluationsGroupedContainer.innerHTML = '';

    places.forEach(place => {
      const placeBlock = document.createElement('div');
      placeBlock.className = 'p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2';

      placeBlock.innerHTML = `
        <div class="flex items-center justify-between border-b border-slate-200 pb-1.5">
          <span class="font-bold text-xs text-slate-800 flex items-center gap-1.5">
            <span class="font-mono bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded text-[11px]">${place.code || 'UAN'}</span>
            <span>${place.name || place.establishment}</span>
          </span>
          <span class="text-[11px] text-slate-400 font-mono">${(place.evaluations || []).length} avaliações</span>
        </div>
        <div class="flex flex-wrap items-center gap-2" id="chkGroup_${place.id}"></div>
      `;

      const chkGroup = placeBlock.querySelector(`#chkGroup_${place.id}`);

      (place.evaluations || []).forEach(evaluation => {
        const isChecked = state.comparedEvalIds.has(evaluation.id);
        const label = document.createElement('label');
        label.className = `px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition ${
          isChecked ? 'bg-emerald-50 text-emerald-900 border-emerald-400' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
        }`;

        label.innerHTML = `
          <input type="checkbox" class="rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 h-3.5 w-3.5 cursor-pointer" ${isChecked ? 'checked' : ''} data-eval-id="${evaluation.id}">
          <span>${evaluation.title} (${evaluation.date})</span>
        `;

        label.querySelector('input').addEventListener('change', (e) => {
          const evalId = e.target.getAttribute('data-eval-id');
          if (e.target.checked) {
            state.comparedEvalIds.add(evalId);
          } else {
            if (state.comparedEvalIds.size <= 1) {
              alert('Mantenha pelo menos uma avaliação selecionada para a tabela.');
              e.target.checked = true;
              return;
            }
            state.comparedEvalIds.delete(evalId);
          }
          renderComparativeCheckboxes();
          renderComparativeTable();
        });

        chkGroup.appendChild(label);
      });

      dom.compareEvaluationsGroupedContainer.appendChild(placeBlock);
    });
  }

  function renderComparativeTable() {
    const allFlat = Store.getAllEvaluationsFlat();
    const evalsToCompare = allFlat.filter(e => state.comparedEvalIds.has(e.evalId));

    const theadTr = dom.tableUanComparative.querySelector('thead tr');
    const tfootTrTotal = dom.tableUanComparative.querySelector('tfoot tr:first-child');
    const tfootTrGroup = dom.tableUanComparative.querySelector('tfoot tr:last-child');

    while (theadTr.children.length > 1) theadTr.removeChild(theadTr.lastChild);
    while (tfootTrTotal.children.length > 1) tfootTrTotal.removeChild(tfootTrTotal.lastChild);
    while (tfootTrGroup.children.length > 1) tfootTrGroup.removeChild(tfootTrGroup.lastChild);

    // Cabeçalho das Colunas
    evalsToCompare.forEach(item => {
      const th = document.createElement('th');
      th.className = 'py-3 px-3 text-center border-l border-slate-300 font-extrabold text-xs sm:text-sm';
      th.innerHTML = `
        <button class="btn-th-eval font-extrabold text-emerald-800 hover:underline block mx-auto leading-tight" data-eval-id="${item.evalId}" title="Clique para abrir esta avaliação">
          <span class="block font-mono text-[11px] text-slate-500">${item.placeCode}</span>
          <span>${item.evalTitle}</span>
          <span class="block font-mono text-[10px] text-slate-400 font-normal">${item.evalDate}</span>
        </button>
      `;
      theadTr.appendChild(th);
    });

    const statsList = evalsToCompare.map(item => ({
      item,
      stats: Calculator.calculate(item.answers || {})
    }));

    // 7 Linhas dos Blocos
    dom.comparativeTableBody.innerHTML = '';
    UAN_CATEGORIES.forEach(cat => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-emerald-50/50 cursor-pointer transition border-b border-slate-200';
      tr.setAttribute('title', `Clique para abrir o bloco "${cat.name}"`);

      const tdName = document.createElement('td');
      tdName.className = 'py-2 px-4 font-semibold text-slate-800';
      tdName.textContent = cat.name;
      tr.appendChild(tdName);

      statsList.forEach(({ stats }) => {
        const tdVal = document.createElement('td');
        tdVal.className = 'py-2 px-3 text-center font-bold border-l border-slate-200 font-mono';
        const bStat = stats.categoryStats[cat.name];
        const val = bStat ? bStat.adequacyPct : 0;
        tdVal.textContent = Calculator.formatNumber(val, 1);
        tr.appendChild(tdVal);
      });

      dom.comparativeTableBody.appendChild(tr);
    });

    // Linha Total
    statsList.forEach(({ stats }) => {
      const tdTotal = document.createElement('td');
      tdTotal.className = 'py-2.5 px-3 text-center font-black border-l border-slate-300 text-sm text-emerald-800 font-mono';
      tdTotal.textContent = Calculator.formatNumber(stats.adequacyPct, 1);
      tfootTrTotal.appendChild(tdTotal);

      const tdGroup = document.createElement('td');
      tdGroup.className = 'py-2 px-3 text-center font-bold border-l border-slate-200 text-xs text-slate-700';
      tdGroup.textContent = stats.classification.group;
      tfootTrGroup.appendChild(tdGroup);
    });

    dom.tableUanComparative.querySelectorAll('.btn-th-eval').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const evalId = e.currentTarget.getAttribute('data-eval-id');
        switchView('CHECKLIST', { evalId });
      });
    });
  }

  // ==========================================================================
  // MODAIS & IMPRESSÃO
  // ==========================================================================

  function openPlaceModal(placeToEdit = null) {
    if (placeToEdit) {
      dom.modalPlaceTitle.textContent = `Editar Lugar: ${placeToEdit.code || 'UAN'}`;
      dom.formPlaceId.value = placeToEdit.id;
      dom.formPlaceCode.value = placeToEdit.code || '';
      dom.formPlaceName.value = placeToEdit.name || placeToEdit.establishment || '';
      dom.formPlaceCategory.value = placeToEdit.category || 'Hospitalar / Cozinha Central';
      dom.formPlaceLead.value = placeToEdit.technicalLead || '';
      dom.formPlaceAddress.value = placeToEdit.address || '';
      dom.btnDeletePlace.classList.remove('hidden');
    } else {
      dom.modalPlaceTitle.textContent = 'Cadastrar Novo Lugar';
      dom.formPlaceId.value = '';
      dom.formPlaceCode.value = `UAN ${String.fromCharCode(65 + (Store.getPlaces().length % 26))}`;
      dom.formPlaceName.value = '';
      dom.formPlaceCategory.value = 'Hospitalar / Cozinha Central';
      dom.formPlaceLead.value = '';
      dom.formPlaceAddress.value = '';
      dom.btnDeletePlace.classList.add('hidden');
    }

    dom.modalPlaceForm.classList.remove('hidden');
    dom.modalPlaceForm.classList.add('flex');
    dom.formPlaceCode.focus();
  }

  function closePlaceModal() {
    dom.modalPlaceForm.classList.add('hidden');
    dom.modalPlaceForm.classList.remove('flex');
  }

  function openEvalModal(placeId, evalToEdit = null) {
    const place = Store.getPlace(placeId);
    if (!place) return;

    dom.formEvalPlaceId.value = placeId;

    if (evalToEdit) {
      dom.modalEvalTitle.textContent = `Editar Avaliação em ${place.code}`;
      dom.formEvalId.value = evalToEdit.id;
      dom.formEvalTitleText.value = evalToEdit.title;
      dom.formEvalDate.value = evalToEdit.date || new Date().toISOString().split('T')[0];
      dom.formEvalType.value = evalToEdit.type || 'DIAGNOSTICO';
      dom.formEvalEvaluator.value = evalToEdit.evaluator || place.technicalLead || '';
      dom.formEvalNotes.value = evalToEdit.notes || '';
      dom.boxCloneFromPrevious.classList.add('hidden');
      dom.btnDeleteEval.classList.remove('hidden');
    } else {
      const evalCount = (place.evaluations || []).length;
      dom.modalEvalTitle.textContent = `Nova Avaliação em [${place.code}] ${place.name}`;
      dom.formEvalId.value = '';
      dom.formEvalTitleText.value = evalCount === 0 ? 'Diagnóstico Inicial de BPF' : `Reavaliação #${evalCount + 1}`;
      dom.formEvalDate.value = new Date().toISOString().split('T')[0];
      dom.formEvalType.value = evalCount === 0 ? 'DIAGNOSTICO' : 'REAVALIACAO';
      dom.formEvalEvaluator.value = place.technicalLead || '';
      dom.formEvalNotes.value = '';
      dom.btnDeleteEval.classList.add('hidden');

      if (evalCount > 0) {
        dom.boxCloneFromPrevious.classList.remove('hidden');
        dom.chkCloneAnswers.checked = true;
      } else {
        dom.boxCloneFromPrevious.classList.add('hidden');
      }
    }

    dom.modalEvalForm.classList.remove('hidden');
    dom.modalEvalForm.classList.add('flex');
    dom.formEvalTitleText.focus();
  }

  function closeEvalModal() {
    dom.modalEvalForm.classList.add('hidden');
    dom.modalEvalForm.classList.remove('flex');
  }

  function printEvaluationReport(place, evaluation) {
    const stats = Calculator.calculate(evaluation.answers || {});

    dom.printEstablishment.textContent = place.name || place.establishment || '-';
    dom.printCode.textContent = place.code || 'UAN';
    dom.printEvalTitle.textContent = evaluation.title;
    dom.printDate.textContent = evaluation.date ? new Date(evaluation.date + 'T12:00:00').toLocaleDateString('pt-BR') : '-';
    dom.printTechnicalLead.textContent = place.technicalLead || '-';
    dom.printEvaluator.textContent = evaluation.evaluator || place.technicalLead || '-';
    dom.printSignLead.textContent = place.technicalLead || 'Nutricionista Responsável Técnico';

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
  // EVENT LISTENERS GLOBAIS
  // ==========================================================================

  function attachEventListeners() {
    // Top Bar Links
    dom.navLogo.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('PLACES');
    });

    dom.navBtnPlaces.addEventListener('click', () => switchView('PLACES'));
    dom.navBtnCompare.addEventListener('click', () => switchView('COMPARE'));

    dom.btnBackToPlaces.addEventListener('click', () => switchView('PLACES'));
    dom.btnBackToPlaceHistory.addEventListener('click', () => switchView('PLACE_HISTORY', { placeId: state.activePlaceId }));
    dom.btnBackFromCompare.addEventListener('click', () => {
      if (state.activePlaceId) {
        switchView('PLACE_HISTORY', { placeId: state.activePlaceId });
      } else {
        switchView('PLACES');
      }
    });

    // Botões de Criar Lugar
    dom.btnHeaderNewPlace.addEventListener('click', () => openPlaceModal(null));
    dom.btnCreatePlaceHero.addEventListener('click', () => openPlaceModal(null));
    dom.btnEmptyCreatePlace.addEventListener('click', () => openPlaceModal(null));
    dom.btnQuickCompareAll.addEventListener('click', () => switchView('COMPARE'));

    // Busca no Hub de Lugares
    dom.searchPlaceInput.addEventListener('input', (e) => {
      state.placeSearchQuery = e.target.value;
      renderPlacesList();
    });

    // Ações do Histórico do Lugar
    dom.btnEditPlaceData.addEventListener('click', () => {
      const place = Store.getPlace(state.activePlaceId);
      if (place) openPlaceModal(place);
    });

    dom.btnCreateEvalInPlace.addEventListener('click', () => {
      openEvalModal(state.activePlaceId, null);
    });

    dom.btnComparePlaceEvals.addEventListener('click', () => {
      const place = Store.getPlace(state.activePlaceId);
      if (place) {
        state.comparedEvalIds.clear();
        (place.evaluations || []).forEach(e => state.comparedEvalIds.add(e.id));
        switchView('COMPARE');
      }
    });

    // Ações do Checklist
    dom.selectQuickEvalSwitch.addEventListener('change', (e) => {
      switchView('CHECKLIST', { evalId: e.target.value });
    });

    dom.btnDetailEditEval.addEventListener('click', () => {
      const found = Store.getEvaluation(state.activeEvalId);
      if (found) openEvalModal(found.place.id, found.evaluation);
    });

    dom.btnDetailDuplicateEval.addEventListener('click', () => {
      const found = Store.getEvaluation(state.activeEvalId);
      if (found) {
        const newEval = Store.createEvaluation(found.place.id, {
          title: `Reavaliação (${new Date().toLocaleDateString('pt-BR')})`,
          type: 'REAVALIACAO',
          date: new Date().toISOString().split('T')[0]
        }, found.evaluation.id);
        showToast('Avaliação duplicada com respostas copiadas!');
        switchView('CHECKLIST', { evalId: newEval.id });
      }
    });

    dom.btnDetailCompareThis.addEventListener('click', () => {
      state.comparedEvalIds.clear();
      const place = Store.getPlace(state.activePlaceId);
      if (place) {
        (place.evaluations || []).forEach(e => state.comparedEvalIds.add(e.id));
      }
      switchView('COMPARE');
    });

    dom.btnDetailPrintReport.addEventListener('click', () => {
      const found = Store.getEvaluation(state.activeEvalId);
      if (found) printEvaluationReport(found.place, found.evaluation);
    });

    dom.searchInput.addEventListener('input', (e) => {
      state.checklistSearchQuery = e.target.value;
      const found = Store.getEvaluation(state.activeEvalId);
      if (found) renderChecklist(found.evaluation.answers || {});
    });

    document.querySelectorAll('.btn-status-filter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.btn-status-filter').forEach(b => {
          b.className = 'btn-status-filter px-2 py-0.5 rounded text-xs font-semibold text-slate-600 hover:bg-slate-100';
        });
        e.currentTarget.className = 'btn-status-filter px-2 py-0.5 rounded text-xs font-semibold bg-slate-900 text-white';
        state.checklistStatus = e.currentTarget.getAttribute('data-status');
        const found = Store.getEvaluation(state.activeEvalId);
        if (found) renderChecklist(found.evaluation.answers || {});
      });
    });

    dom.btnMarkAllYes.addEventListener('click', () => {
      const rows = dom.checklistItemsList.querySelectorAll('[data-id]');
      const ids = Array.from(rows).map(r => r.getAttribute('data-id'));
      if (ids.length === 0) return;

      if (confirm(`Marcar todos os ${ids.length} itens filtrados como SIM?`)) {
        Store.batchSetAnswers(state.activeEvalId, ids, 'SIM');
        renderChecklistWorkspace();
        showToast(`${ids.length} itens marcados como SIM!`);
      }
    });

    // Copiar Tabela & Exportar CSV
    dom.btnCopyTable.addEventListener('click', async () => {
      const allFlat = Store.getAllEvaluationsFlat();
      const evalsToCompare = allFlat.filter(e => state.comparedEvalIds.has(e.evalId));
      const statsList = evalsToCompare.map(item => ({
        label: `${item.placeCode} - ${item.evalTitle} (${item.evalDate})`,
        stats: Calculator.calculate(item.answers || {})
      }));

      let tsv = 'ITENS AVALIADOS\t' + statsList.map(s => s.label).join('\t') + '\n';
      UAN_CATEGORIES.forEach(cat => {
        const row = [cat.name];
        statsList.forEach(({ stats }) => {
          row.push(Calculator.formatNumber(stats.categoryStats[cat.name]?.adequacyPct || 0, 1));
        });
        tsv += row.join('\t') + '\n';
      });
      tsv += 'ADEQUAÇÃO GERAL (%)\t' + statsList.map(s => Calculator.formatNumber(s.stats.adequacyPct, 1)).join('\t') + '\n';
      tsv += `Fonte: ${dom.tableSourceInput.value}\n`;

      try {
        await navigator.clipboard.writeText(tsv);
        showToast('Tabela copiada para a área de transferência!');
      } catch (err) {
        showToast('Erro ao copiar tabela.');
      }
    });

    dom.btnExportCSV.addEventListener('click', () => {
      const allFlat = Store.getAllEvaluationsFlat();
      const evalsToCompare = allFlat.filter(e => state.comparedEvalIds.has(e.evalId));
      const statsList = evalsToCompare.map(item => ({
        label: `${item.placeCode} - ${item.evalTitle} (${item.evalDate})`,
        stats: Calculator.calculate(item.answers || {})
      }));

      let csv = 'data:text/csv;charset=utf-8,\uFEFF';
      csv += '"ITENS AVALIADOS";' + statsList.map(s => `"${s.label}"`).join(';') + '\r\n';
      UAN_CATEGORIES.forEach(cat => {
        const row = [`"${cat.name}"`];
        statsList.forEach(({ stats }) => {
          row.push(`"${Calculator.formatNumber(stats.categoryStats[cat.name]?.adequacyPct || 0, 1)}"`);
        });
        csv += row.join(';') + '\r\n';
      });
      csv += '"ADEQUAÇÃO GERAL (%)";' + statsList.map(s => `"${Calculator.formatNumber(s.stats.adequacyPct, 1)}"`).join(';') + '\r\n';
      csv += `"${dom.tableSourceInput.value}";\r\n`;

      const link = document.createElement('a');
      link.href = encodeURI(csv);
      link.download = `comparativo_uan_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      showToast('CSV baixado.');
    });

    // Form Lugar
    dom.btnClosePlaceForm.addEventListener('click', closePlaceModal);
    dom.btnCancelPlaceForm.addEventListener('click', closePlaceModal);

    dom.formPlace.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = dom.formPlaceId.value;
      const data = {
        code: dom.formPlaceCode.value.trim(),
        name: dom.formPlaceName.value.trim(),
        establishment: dom.formPlaceName.value.trim(),
        category: dom.formPlaceCategory.value,
        technicalLead: dom.formPlaceLead.value.trim(),
        address: dom.formPlaceAddress.value.trim()
      };

      if (id) {
        const place = Store.getPlace(id);
        if (place) {
          Object.assign(place, data);
          Store.savePlace(place);
          showToast('Lugar atualizado!');
        }
      } else {
        const newPlace = Store.createPlace(data, true);
        showToast('Novo lugar cadastrado!');
        state.activePlaceId = newPlace.id;
      }

      closePlaceModal();
      if (state.currentView === 'PLACES') {
        renderPlacesList();
      } else if (state.currentView === 'PLACE_HISTORY') {
        renderPlaceHistory();
      }
    });

    dom.btnDeletePlace.addEventListener('click', () => {
      const id = dom.formPlaceId.value;
      if (!id) return;
      if (confirm('Tem certeza que deseja excluir este lugar e todas as suas avaliações?')) {
        if (Store.deletePlace(id)) {
          closePlaceModal();
          showToast('Lugar excluído.');
          switchView('PLACES');
        }
      }
    });

    // Form Avaliação
    dom.btnCloseEvalForm.addEventListener('click', closeEvalModal);
    dom.btnCancelEvalForm.addEventListener('click', closeEvalModal);

    dom.formEval.addEventListener('submit', (e) => {
      e.preventDefault();
      const placeId = dom.formEvalPlaceId.value;
      const evalId = dom.formEvalId.value;
      const data = {
        title: dom.formEvalTitleText.value.trim(),
        date: dom.formEvalDate.value,
        type: dom.formEvalType.value,
        evaluator: dom.formEvalEvaluator.value.trim(),
        notes: dom.formEvalNotes.value.trim()
      };

      if (evalId) {
        Store.updateEvaluation(evalId, data);
        showToast('Dados da avaliação salvos!');
      } else {
        const place = Store.getPlace(placeId);
        const latestEval = place?.evaluations?.[0];
        const cloneId = (dom.chkCloneAnswers.checked && latestEval) ? latestEval.id : null;
        const newEval = Store.createEvaluation(placeId, data, cloneId);
        showToast('Nova avaliação cadastrada!');
        state.activeEvalId = newEval.id;
      }

      closeEvalModal();

      if (state.currentView === 'PLACE_HISTORY') {
        renderPlaceHistory();
      } else if (state.currentView === 'CHECKLIST') {
        renderChecklistWorkspace();
      } else {
        switchView('PLACE_HISTORY', { placeId });
      }
    });

    dom.btnDeleteEval.addEventListener('click', () => {
      const evalId = dom.formEvalId.value;
      if (!evalId) return;
      if (confirm('Excluir esta avaliação?')) {
        if (Store.deleteEvaluation(evalId)) {
          closeEvalModal();
          showToast('Avaliação excluída.');
          if (state.currentView === 'CHECKLIST') {
            switchView('PLACE_HISTORY', { placeId: state.activePlaceId });
          } else {
            renderPlaceHistory();
          }
        }
      }
    });

    // Backup
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
      a.download = `backup_bpf_uan_hierarquico_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Backup exportado com sucesso!');
    });

    dom.inputImportJSON.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (Store.importJSON(event.target.result)) {
          dom.modalBackup.classList.add('hidden');
          dom.modalBackup.classList.remove('flex');
          showToast('Backup restaurado!');
          switchView('PLACES');
        } else {
          alert('Arquivo de backup inválido.');
        }
      };
      reader.readAsText(file);
    });

    dom.btnResetDefaults.addEventListener('click', () => {
      if (confirm('Restaurar dados originais da pesquisa? Os dados atuais serão substituídos.')) {
        Store.resetToDefaults();
        dom.modalBackup.classList.add('hidden');
        dom.modalBackup.classList.remove('flex');
        showToast('Dados restaurados!');
        switchView('PLACES');
      }
    });

    // Fechar modais ao clicar no fundo escuro (backdrop)
    [dom.modalPlaceForm, dom.modalEvalForm, dom.modalBackup].forEach(modal => {
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
          }
        });
      }
    });
  }

  init();
});
