/**
 * defaults.js - Dados iniciais da pesquisa com estrutura hierárquica:
 * Lugar (Estabelecimento / UAN) -> Múltiplas Avaliações ao longo do tempo (Diagnóstico e Reavaliação)
 */

// Cópia base de respostas para o diagnóstico inicial
const UAN_A_DIAG_ANSWERS = {
  "1.1.1": "SIM", "1.1.2": "SIM", "1.2.1": "SIM", "1.3.1": "SIM",
  "1.4.1": "SIM", "1.4.2": "NAO", "1.4.3": "NAO", "1.5.1": "SIM", "1.5.2": "SIM",
  "1.6.1": "SIM", "1.6.2": "NAO", "1.6.3": "SIM", "1.7.1": "SIM", "1.7.2": "SIM", "1.7.3": "SIM",
  "1.8.1": "SIM", "1.8.2": "NAO", "1.8.3": "SIM", "1.9.1": "SIM", "1.9.2": "SIM",
  "1.10.1": "SIM", "1.10.2": "SIM", "1.10.3": "SIM", "1.10.4": "SIM", "1.10.5": "SIM",
  "1.10.6": "SIM", "1.10.7": "SIM", "1.10.8": "SIM", "1.10.9": "SIM", "1.10.10": "SIM",
  "1.10.11": "SIM", "1.10.12": "SIM", "1.10.13": "SIM", "1.10.14": "SIM", "1.10.15": "SIM",
  "1.11.1": "SIM", "1.12.1": "SIM", "1.12.2": "SIM", "1.13.1": "SIM", "1.13.2": "SIM", "1.13.3": "SIM",
  "1.14.1": "SIM", "1.14.2": "SIM", "1.14.3": "SIM", "1.14.4": "SIM", "1.14.5": "SIM", "1.14.6": "SIM", "1.14.7": "SIM",
  "1.15.1": "SIM", "1.15.2": "SIM", "1.15.3": "SIM", "1.15.4": "SIM", "1.15.5": "SIM", "1.15.6": "SIM", "1.15.7": "SIM", "1.15.8": "SIM", "1.15.9": "SIM",
  "1.16.1": "SIM", "1.16.2": "NAO", "1.16.3": "SIM",
  "1.17.1": "SIM", "1.17.2": "SIM", "1.17.3": "SIM", "1.17.4": "NAO", "1.17.5": "NAO", "1.17.6": "NAO", "1.17.7": "NAO", "1.17.8": "NAO",
  "1.17.9": "NA", "1.17.10": "NA", "1.17.11": "NA", "1.17.12": "NA", "1.17.13": "NA",
  "1.18.1": "NA", "1.18.2": "NA", "1.18.3": "NA", "1.19.1": "NA", "1.20.1": "NA", "1.20.2": "NA",
  "2.1.1": "SIM", "2.1.2": "SIM", "2.1.3": "SIM", "2.1.4": "SIM", "2.1.5": "SIM", "2.1.6": "SIM", "2.1.7": "SIM", "2.1.8": "SIM",
  "2.2.1": "SIM", "2.2.2": "SIM", "2.3.1": "SIM", "2.3.2": "SIM",
  "2.4.1": "SIM", "2.4.2": "SIM", "2.4.3": "SIM", "2.4.4": "SIM", "2.4.5": "SIM", "2.4.6": "SIM", "2.4.7": "NAO", "2.4.8": "NAO", "2.4.9": "NA",
  "3.1.1": "SIM", "3.1.2": "SIM", "3.1.3": "SIM", "3.2.1": "SIM", "3.2.2": "SIM", "3.2.3": "SIM",
  "3.3.1": "SIM", "3.4.1": "SIM", "3.4.2": "SIM", "3.5.1": "SIM",
  "3.6.1": "SIM", "3.6.2": "SIM", "3.6.3": "SIM", "3.6.4": "SIM",
  "4.1.1": "SIM", "4.1.2": "SIM", "4.1.3": "SIM", "4.1.4": "SIM", "4.1.5": "SIM", "4.1.6": "SIM", "4.1.7": "SIM", "4.1.8": "SIM", "4.1.9": "SIM", "4.1.10": "SIM", "4.1.11": "SIM",
  "4.2.1": "SIM", "4.2.2": "SIM", "4.2.3": "SIM", "4.2.4": "SIM",
  "4.3.1": "SIM", "4.3.2": "SIM", "4.3.3": "SIM", "4.3.4": "SIM", "4.3.5": "SIM", "4.3.6": "SIM", "4.3.7": "SIM", "4.3.8": "SIM", "4.3.9": "SIM",
  "4.4.1": "SIM", "4.4.2": "SIM", "4.4.3": "SIM", "4.4.4": "SIM",
  "4.5.1": "SIM", "4.5.2": "SIM", "4.5.3": "SIM", "4.5.4": "SIM", "4.5.5": "SIM",
  "5.1.1": "SIM",
  "5.2.1.1": "SIM", "5.2.1.2": "SIM", "5.2.2.1": "SIM", "5.2.2.2": "SIM",
  "5.2.3.1": "SIM", "5.2.3.2": "SIM", "5.2.4.1": "SIM", "5.2.4.2": "SIM",
  "5.2.5.1": "SIM", "5.2.5.2": "SIM", "5.2.6.1": "SIM", "5.2.6.2": "SIM",
  "5.2.7.1": "SIM", "5.2.7.2": "SIM", "5.2.8.1": "SIM", "5.2.8.2": "SIM",
  "1.4.2_obs": "Piso com trincas na área de panelas.",
  "1.4.3_obs": "Ralo sem tampa sifonada.",
  "1.6.2_obs": "Paredes com descascamento no pré-preparo de vegetais.",
  "1.8.2_obs": "Tela da janela dos fundos com furos.",
  "1.16.2_obs": "Filtros da coifa com gordura excessiva."
};

// Respostas para reavaliação pós-ações corretivas da UAN A (evolução positiva)
const UAN_A_REVAL_ANSWERS = {
  ...UAN_A_DIAG_ANSWERS,
  "1.4.2": "SIM", // Piso reformado
  "1.4.3": "SIM", // Ralo sifonado instalado
  "1.6.2": "SIM", // Parede repintada com tinta epóxi lavável
  "1.8.2": "SIM", // Tela milimétrica substituída
  "1.16.2": "SIM", // Higienização profunda da coifa e filtros
  "1.4.2_obs": "Piso reformado com revestimento cerâmico antiderrapante de alta resistência.",
  "1.4.3_obs": "Ralos sifonados instalados com fecho hídrico e grelha rotativa.",
  "1.6.2_obs": "Revestimento restaurado com acabamento liso e lavável.",
  "1.8.2_obs": "Nova tela milimétrica com caixilho removível para higienização.",
  "1.16.2_obs": "Plano de higienização semanal da coifa implantado com registro."
};

// Respostas da UAN B (Restaurante Universitário Central)
const UAN_B_ANSWERS = {
  "1.1.1": "SIM", "1.1.2": "SIM", "1.2.1": "SIM", "1.3.1": "SIM",
  "1.4.1": "SIM", "1.4.2": "SIM", "1.4.3": "SIM", "1.5.1": "SIM", "1.5.2": "SIM",
  "1.6.1": "SIM", "1.6.2": "SIM", "1.6.3": "SIM", "1.7.1": "SIM", "1.7.2": "SIM", "1.7.3": "SIM",
  "1.8.1": "SIM", "1.8.2": "SIM", "1.8.3": "SIM", "1.9.1": "SIM", "1.9.2": "SIM",
  "1.10.1": "SIM", "1.10.2": "SIM", "1.10.3": "SIM", "1.10.4": "SIM", "1.10.5": "SIM",
  "1.10.6": "SIM", "1.10.7": "SIM", "1.10.8": "SIM", "1.10.9": "SIM", "1.10.10": "SIM",
  "1.10.11": "SIM", "1.10.12": "SIM", "1.10.13": "SIM", "1.10.14": "SIM", "1.10.15": "SIM",
  "1.11.1": "SIM", "1.12.1": "SIM", "1.12.2": "SIM", "1.13.1": "SIM", "1.13.2": "SIM", "1.13.3": "SIM",
  "1.14.1": "SIM", "1.14.2": "SIM", "1.14.3": "SIM", "1.14.4": "SIM", "1.14.5": "SIM", "1.14.6": "SIM", "1.14.7": "SIM",
  "1.15.1": "SIM", "1.15.2": "SIM", "1.15.3": "SIM", "1.15.4": "SIM", "1.15.5": "SIM", "1.15.6": "SIM", "1.15.7": "SIM",
  "1.15.8": "NAO", "1.15.9": "NAO",
  "1.16.1": "NA", "1.16.2": "NA", "1.16.3": "NA",
  "1.17.1": "NA", "1.17.2": "NA", "1.17.3": "NA", "1.17.4": "NA", "1.17.5": "NA", "1.17.6": "NA", "1.17.7": "NA", "1.17.8": "NA", "1.17.9": "NA", "1.17.10": "NA", "1.17.11": "NA", "1.17.12": "NA", "1.17.13": "NA",
  "1.18.1": "NA", "1.18.2": "NA", "1.18.3": "NA", "1.19.1": "NA", "1.20.1": "NA", "1.20.2": "NA",
  "2.1.1": "SIM", "2.1.2": "SIM", "2.1.3": "SIM", "2.1.4": "SIM", "2.1.5": "SIM", "2.1.6": "SIM", "2.1.7": "SIM", "2.1.8": "SIM",
  "2.2.1": "SIM", "2.2.2": "SIM", "2.3.1": "SIM", "2.3.2": "SIM",
  "2.4.1": "SIM", "2.4.2": "SIM", "2.4.3": "SIM", "2.4.4": "SIM", "2.4.5": "SIM", "2.4.6": "SIM", "2.4.7": "SIM", "2.4.8": "SIM", "2.4.9": "NA",
  "3.1.1": "SIM", "3.1.2": "SIM", "3.1.3": "SIM", "3.2.1": "SIM", "3.2.2": "SIM", "3.2.3": "SIM",
  "3.3.1": "SIM", "3.4.1": "SIM", "3.4.2": "SIM", "3.5.1": "SIM",
  "3.6.1": "SIM", "3.6.2": "SIM", "3.6.3": "SIM", "3.6.4": "SIM",
  "4.1.1": "SIM", "4.1.2": "SIM", "4.1.3": "SIM", "4.1.4": "SIM", "4.1.5": "SIM", "4.1.6": "SIM", "4.1.7": "SIM", "4.1.8": "SIM", "4.1.9": "SIM", "4.1.10": "SIM", "4.1.11": "SIM",
  "4.2.1": "SIM", "4.2.2": "SIM", "4.2.3": "SIM", "4.2.4": "SIM",
  "4.3.1": "SIM", "4.3.2": "SIM", "4.3.3": "SIM", "4.3.4": "SIM", "4.3.5": "SIM", "4.3.6": "SIM", "4.3.7": "SIM", "4.3.8": "SIM", "4.3.9": "SIM",
  "4.4.1": "SIM", "4.4.2": "SIM", "4.4.3": "SIM", "4.4.4": "SIM",
  "4.5.1": "SIM", "4.5.2": "SIM", "4.5.3": "SIM", "4.5.4": "SIM", "4.5.5": "SIM",
  "5.1.1": "SIM",
  "5.2.1.1": "SIM", "5.2.1.2": "SIM", "5.2.2.1": "SIM", "5.2.2.2": "SIM",
  "5.2.3.1": "SIM", "5.2.3.2": "SIM", "5.2.4.1": "SIM", "5.2.4.2": "SIM",
  "5.2.5.1": "SIM", "5.2.5.2": "SIM", "5.2.6.1": "SIM", "5.2.6.2": "SIM",
  "5.2.7.1": "SIM", "5.2.7.2": "SIM", "5.2.8.1": "SIM", "5.2.8.2": "SIM",
  "1.15.8_obs": "Termômetro da estufa de distribuição aguardando calibração periódica.",
  "1.15.9_obs": "Planilha de monitoramento de temperatura preenchida com pequeno atraso no turno matutino."
};

/**
 * Estrutura Hierárquica: Lugares (UANs) com Múltiplas Avaliações
 */
const DEFAULT_PLACES_DATA = [
  {
    id: "place-uan-a",
    code: "UAN A",
    name: "Hospital Universitário Regional",
    category: "Hospitalar / Cozinha Central",
    technicalLead: "Dra. Camila Silveira (Nutricionista RT - CRN 9823)",
    evaluator: "Dra. Camila Silveira",
    address: "Av. Universitária, 1500 - Bloco de Saúde",
    notes: "Unidade hospitalar de médio porte com produção centralizada de dietas gerais e enterais.",
    createdAt: "2026-03-01T08:00:00.000Z",
    updatedAt: "2026-04-15T16:00:00.000Z",
    evaluations: [
      {
        id: "eval-uan-a-01",
        title: "Diagnóstico Inicial de BPF",
        type: "DIAGNOSTICO",
        date: "2026-03-10",
        evaluator: "Dra. Camila Silveira (CRN 9823)",
        inspectionReason: "Levantamento Diagnóstico de Boas Práticas (Linha de Base)",
        notes: "Primeira inspeção diagnóstica para identificação de não conformidades e formulação do plano de ação.",
        answers: UAN_A_DIAG_ANSWERS,
        createdAt: "2026-03-10T10:00:00.000Z",
        updatedAt: "2026-03-10T14:30:00.000Z"
      },
      {
        id: "eval-uan-a-02",
        title: "Reavaliação Pós-Ações Corretivas",
        type: "REAVALIACAO",
        date: "2026-04-15",
        evaluator: "Dra. Camila Silveira (CRN 9823)",
        inspectionReason: "Verificação da Eficácia das Ações Corretivas e Reformas",
        notes: "Reavaliação após reformas no piso, instalação de ralos sifonados e retreinamento de manipuladores.",
        answers: UAN_A_REVAL_ANSWERS,
        createdAt: "2026-04-15T09:00:00.000Z",
        updatedAt: "2026-04-15T15:00:00.000Z"
      }
    ]
  },
  {
    id: "place-uan-b",
    code: "UAN B",
    name: "Restaurante Universitário Central",
    category: "Restaurante Universitário / Coletividade",
    technicalLead: "Dr. Lucas Mendes (Nutricionista Fiscal - CRN 11450)",
    evaluator: "Dr. Lucas Mendes",
    address: "Campus Central - Prédio de Convivência Estudantil",
    notes: "Restaurante universitário com atendimento de 3.500 refeições/dia.",
    createdAt: "2026-03-05T09:00:00.000Z",
    updatedAt: "2026-03-15T16:00:00.000Z",
    evaluations: [
      {
        id: "eval-uan-b-01",
        title: "Auditoria Periódica de Qualidade",
        type: "ROTINA",
        date: "2026-03-15",
        evaluator: "Dr. Lucas Mendes (CRN 11450)",
        inspectionReason: "Auditoria Semestral de Qualidade e Boas Práticas",
        notes: "Unidade com alto padrão higiênico-sanitário, procedimentos padronizados implantados e monitorados.",
        answers: UAN_B_ANSWERS,
        createdAt: "2026-03-15T09:00:00.000Z",
        updatedAt: "2026-03-15T16:00:00.000Z"
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULT_PLACES_DATA };
}
