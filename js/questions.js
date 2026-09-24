// Base oficial dos 164 itens de verificação da RDC 275/2002 (ANVISA)
// Adaptada com as 7 categorias da pesquisa em Unidades de Alimentação e Nutrição (UAN)

const UAN_CATEGORIES = [
  {
    "id": "cat_1",
    "name": "Edificação e instalações",
    "shortName": "Edificação e instalações",
    "icon": "fa-building",
    "color": "emerald"
  },
  {
    "id": "cat_2",
    "name": "Equipamentos, móveis e utensílios",
    "shortName": "Equipamentos e utensílios",
    "icon": "fa-blender",
    "color": "cyan"
  },
  {
    "id": "cat_3",
    "name": "Manipuladores",
    "shortName": "Manipuladores",
    "icon": "fa-user-nurse",
    "color": "indigo"
  },
  {
    "id": "cat_4",
    "name": "Matérias-primas, ingredientes e embalagens",
    "shortName": "Matérias-primas e ingredientes",
    "icon": "fa-boxes-stacked",
    "color": "amber"
  },
  {
    "id": "cat_5",
    "name": "Preparação do alimento",
    "shortName": "Preparação do alimento",
    "icon": "fa-fire-burner",
    "color": "orange"
  },
  {
    "id": "cat_6",
    "name": "Exposição ao consumo do alimento preparado",
    "shortName": "Exposição e consumo",
    "icon": "fa-utensils",
    "color": "rose"
  },
  {
    "id": "cat_7",
    "name": "Documentação e registro",
    "shortName": "Documentação e registro",
    "icon": "fa-file-signature",
    "color": "violet"
  }
];

const RDC_BLOCKS = [
  {
    "id": 1,
    "name": "1. Edificação e instalações",
    "shortName": "Edificação"
  },
  {
    "id": 2,
    "name": "2. Equipamentos, móveis e utensílios",
    "shortName": "Equipamentos"
  },
  {
    "id": 3,
    "name": "3. Manipuladores",
    "shortName": "Manipuladores"
  },
  {
    "id": 4,
    "name": "4. Produção e transporte do alimento",
    "shortName": "Produção e transporte"
  },
  {
    "id": 5,
    "name": "5. Documentação",
    "shortName": "Documentação"
  }
];

const CHECKLIST_ITEMS = [
  {
    "id": "1.1.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.1",
    "sub_title": "ÁREA EXTERNA",
    "uan_category": "Edificação e instalações",
    "text": "Área externa livre de focos de insalubridade, de objetos em desuso ou estranhos ao ambiente, de vetores e outros animais no pátio e vizinhança; de focos de poeira; de acúmulo de lixo nas imediações, de água estagnada, dentre outros"
  },
  {
    "id": "1.1.2",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.1",
    "sub_title": "ÁREA EXTERNA",
    "uan_category": "Edificação e instalações",
    "text": "Vias de acesso interno com superfície dura ou pavimentada, adequada ao trânsito sobre rodas, escoamento adequado e limpas"
  },
  {
    "id": "1.2.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.2",
    "sub_title": "ACESSO",
    "uan_category": "Edificação e instalações",
    "text": "Direto, não comum a outros usos ( habitação)"
  },
  {
    "id": "1.3.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.3",
    "sub_title": "ÁREA INTERNA",
    "uan_category": "Edificação e instalações",
    "text": "Área interna livre de objetos em desuso ou estranhos ao ambiente"
  },
  {
    "id": "1.4.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.4",
    "sub_title": "PISO",
    "uan_category": "Edificação e instalações",
    "text": "Material que permite fácil e apropriada higienização (liso, resistente, drenados com declive, impermeável e outros)"
  },
  {
    "id": "1.4.2",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.4",
    "sub_title": "PISO",
    "uan_category": "Edificação e instalações",
    "text": "Em adequado estado de conservação (livre de defeitos, rachaduras, trincas, buracos e outros)"
  },
  {
    "id": "1.4.3",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.4",
    "sub_title": "PISO",
    "uan_category": "Edificação e instalações",
    "text": "Sistema de drenagem dimensionado adequadamente, sem acúmulo de resíduos Drenos, ralos sifonados e grelhas colocados em locais adequados de forma a facilitar o escoamento e proteger contra a entrada de baratas, roedores etc"
  },
  {
    "id": "1.5.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.5",
    "sub_title": "TETOS",
    "uan_category": "Edificação e instalações",
    "text": "Acabamento liso, em cor clara, impermeável, de fácil limpeza e, quando for o caso, desinfecção"
  },
  {
    "id": "1.5.2",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.5",
    "sub_title": "TETOS",
    "uan_category": "Edificação e instalações",
    "text": "Em adequado estado de conservação (livre de trincas, rachaduras, umidade, bolor, descascamentos e outros)"
  },
  {
    "id": "1.6.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.6",
    "sub_title": "PAREDES E DIVISÓRIAS",
    "uan_category": "Edificação e instalações",
    "text": "Acabamento liso, impermeável e de fácil higienização até uma altura adequada para todas as operações De cor clara"
  },
  {
    "id": "1.6.2",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.6",
    "sub_title": "PAREDES E DIVISÓRIAS",
    "uan_category": "Edificação e instalações",
    "text": "Em adequado estado de conservação (livres de falhas, rachaduras, umidade, descascamento e outros)"
  },
  {
    "id": "1.6.3",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.6",
    "sub_title": "PAREDES E DIVISÓRIAS",
    "uan_category": "Edificação e instalações",
    "text": "Existência de ângulos abaulados entre as paredes e o piso e entre as paredes e o teto"
  },
  {
    "id": "1.7.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.7",
    "sub_title": "PORTAS",
    "uan_category": "Edificação e instalações",
    "text": "Com superfície lisa, de fácil higienização, ajustadas aos batentes, sem falhas de revestimento"
  },
  {
    "id": "1.7.2",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.7",
    "sub_title": "PORTAS",
    "uan_category": "Edificação e instalações",
    "text": "Portas externas com fechamento automático (mola, sistema eletrônico ou outro) e com barreiras adequadas para impedir entrada de vetores e outros animais (telas milimétricas ou outro sistema)"
  },
  {
    "id": "1.7.3",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.7",
    "sub_title": "PORTAS",
    "uan_category": "Edificação e instalações",
    "text": "Em adequado estado de conservação (livres de falhas, rachaduras, umidade, descascamento e outros)"
  },
  {
    "id": "1.8.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.8",
    "sub_title": "JANELAS         E     OUTRAS",
    "uan_category": "Edificação e instalações",
    "text": "Com superfície lisa, de fácil higienização, ajustadas aos batentes, sem falhas de revestimento"
  },
  {
    "id": "1.8.2",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.8",
    "sub_title": "JANELAS         E     OUTRAS",
    "uan_category": "Edificação e instalações",
    "text": "Existência de proteção contra insetos e roedores (telas milimétricas ou outro sistema)"
  },
  {
    "id": "1.8.3",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.8",
    "sub_title": "JANELAS         E     OUTRAS",
    "uan_category": "Edificação e instalações",
    "text": "Em adequado estado de conservação (livres de falhas, rachaduras, umidade, descascamento e outros)"
  },
  {
    "id": "1.9.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.9",
    "sub_title": "ESCADAS, ELEVADORES DE",
    "uan_category": "Edificação e instalações",
    "text": "Construídos, localizados e utilizados de forma a não serem fontes de contaminação"
  },
  {
    "id": "1.9.2",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.9",
    "sub_title": "ESCADAS, ELEVADORES DE",
    "uan_category": "Edificação e instalações",
    "text": "De material apropriado, resistente, liso e impermeável, em adequado estado de conservação"
  },
  {
    "id": "1.10.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.10",
    "sub_title": "INSTALAÇÕES SANITÁRIAS",
    "uan_category": "Edificação e instalações",
    "text": "Quando localizados isolados da área de produção, acesso realizado por passagens cobertas e calçadas"
  },
  {
    "id": "1.10.2",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.10",
    "sub_title": "INSTALAÇÕES SANITÁRIAS",
    "uan_category": "Edificação e instalações",
    "text": "Independentes para cada sexo (conforme legislação específica), identificados e de uso exclusivo para manipuladores de alimentos"
  },
  {
    "id": "1.10.3",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.10",
    "sub_title": "INSTALAÇÕES SANITÁRIAS",
    "uan_category": "Edificação e instalações",
    "text": "Instalações sanitárias com vasos sanitários; mictórios e lavatórios íntegros e em proporção adequada ao número de empregados (conforme legislação específica)"
  },
  {
    "id": "1.10.4",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.10",
    "sub_title": "INSTALAÇÕES SANITÁRIAS",
    "uan_category": "Edificação e instalações",
    "text": "Instalações sanitárias servidas de água corrente, dotadas preferencialmente de torneira com acionamento automático e conectadas à rede de esgoto ou fossa séptica"
  },
  {
    "id": "1.10.5",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.10",
    "sub_title": "INSTALAÇÕES SANITÁRIAS",
    "uan_category": "Edificação e instalações",
    "text": "Ausência de comunicação direta (incluindo sistema de exaustão) com a área de trabalho e de refeições"
  },
  {
    "id": "1.10.6",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.10",
    "sub_title": "INSTALAÇÕES SANITÁRIAS",
    "uan_category": "Edificação e instalações",
    "text": "Portas com fechamento automático (mola, sistema eletrônico ou outro)"
  },
  {
    "id": "1.10.7",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.10",
    "sub_title": "INSTALAÇÕES SANITÁRIAS",
    "uan_category": "Edificação e instalações",
    "text": "Pisos e paredes adequadas e apresentando satisfatório estado de conservação"
  },
  {
    "id": "1.10.8",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.10",
    "sub_title": "INSTALAÇÕES SANITÁRIAS",
    "uan_category": "Edificação e instalações",
    "text": "Iluminação e ventilação adequadas"
  },
  {
    "id": "1.10.9",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.10",
    "sub_title": "INSTALAÇÕES SANITÁRIAS",
    "uan_category": "Edificação e instalações",
    "text": "Instalações sanitárias dotadas de produtos destinados à higiene pessoal: papel higiênico, sabonete líquido inodoro anti-séptico ou sabonete líquido inodoro e anti-séptico, toalhas de papel não reciclado para as mãos ou outro sistema higiênico e seguro para secagem"
  },
  {
    "id": "1.10.10",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.10",
    "sub_title": "INSTALAÇÕES SANITÁRIAS",
    "uan_category": "Edificação e instalações",
    "text": "Presença de lixeiras com tampas e com acionamento não manual"
  },
  {
    "id": "1.10.11",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.10",
    "sub_title": "INSTALAÇÕES SANITÁRIAS",
    "uan_category": "Edificação e instalações",
    "text": "Coleta freqüente do lixo"
  },
  {
    "id": "1.10.12",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.10",
    "sub_title": "INSTALAÇÕES SANITÁRIAS",
    "uan_category": "Edificação e instalações",
    "text": "Presença de avisos com os procedimentos para lavagem das mãos"
  },
  {
    "id": "1.10.13",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.10",
    "sub_title": "INSTALAÇÕES SANITÁRIAS",
    "uan_category": "Edificação e instalações",
    "text": "Vestiários com área compatível e armários individuais para todos os manipuladores"
  },
  {
    "id": "1.10.14",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.10",
    "sub_title": "INSTALAÇÕES SANITÁRIAS",
    "uan_category": "Edificação e instalações",
    "text": "Duchas ou chuveiros em número suficiente (conforme legislação específica), com água fria ou com água quente e fria"
  },
  {
    "id": "1.10.15",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.10",
    "sub_title": "INSTALAÇÕES SANITÁRIAS",
    "uan_category": "Edificação e instalações",
    "text": "Apresentam-se organizados e em adequado estado de conservação"
  },
  {
    "id": "1.11.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.11",
    "sub_title": "INSTALAÇÕES SANITÁRIAS PARA VISITANTES E OUTROS",
    "uan_category": "Edificação e instalações",
    "text": "Instaladas totalmente independentes da área de produção e higienizados"
  },
  {
    "id": "1.12.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.12",
    "sub_title": "LAVATÓRIOS NA ÁREA DE PRODUÇÃO",
    "uan_category": "Edificação e instalações",
    "text": "Existência de lavatórios na área de manipulação com água corrente, dotados preferencialmente de torneira com acionamento automático, em posições adequadas em relação ao fluxo de produção e serviço, e em número suficiente de modo a atender toda a área de produção"
  },
  {
    "id": "1.12.2",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.12",
    "sub_title": "LAVATÓRIOS NA ÁREA DE PRODUÇÃO",
    "uan_category": "Edificação e instalações",
    "text": "Lavatórios em condições de higiene, dotados de sabonete líquido inodoro anti-séptico ou sabonete líquido inodoro e anti-séptico, toalhas de papel não reciclado ou outro sistema higiênico e seguro de secagem e coletor de papel acionados sem contato manual"
  },
  {
    "id": "1.13.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.13",
    "sub_title": "ILUMINAÇÃO E INSTALAÇÃO ELÉTRICA",
    "uan_category": "Edificação e instalações",
    "text": "Natural ou artificial adequada à atividade desenvolvida, sem ofuscamento, reflexos fortes, sombras e contrastes excessivos"
  },
  {
    "id": "1.13.2",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.13",
    "sub_title": "ILUMINAÇÃO E INSTALAÇÃO ELÉTRICA",
    "uan_category": "Edificação e instalações",
    "text": "Luminárias com proteção adequada contra quebras e em adequado estado de conservação"
  },
  {
    "id": "1.13.3",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.13",
    "sub_title": "ILUMINAÇÃO E INSTALAÇÃO ELÉTRICA",
    "uan_category": "Edificação e instalações",
    "text": "Instalações elétricas embutidas ou quando exteriores revestidas por tubulações isolantes e presas a paredes e tetos"
  },
  {
    "id": "1.14.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.14",
    "sub_title": "VENTILAÇÃO                 E",
    "uan_category": "Edificação e instalações",
    "text": "Ventilação e circulação de ar capazes de garantir o conforto térmico e o ambiente livre de fungos, gases, fumaça, pós, partículas em suspensão e condensação de vapores sem causar danos à produção"
  },
  {
    "id": "1.14.2",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.14",
    "sub_title": "VENTILAÇÃO                 E",
    "uan_category": "Edificação e instalações",
    "text": "Ventilação artificial por meio de equipamento(s) higienizado(s) e com manutenção adequada ao tipo de equipamento"
  },
  {
    "id": "1.14.3",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.14",
    "sub_title": "VENTILAÇÃO                 E",
    "uan_category": "Edificação e instalações",
    "text": "Ambientes climatizados artificialmente com filtros adequados"
  },
  {
    "id": "1.14.4",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.14",
    "sub_title": "VENTILAÇÃO                 E",
    "uan_category": "Edificação e instalações",
    "text": "Existência de registro periódico dos procedimentos de limpeza e manutenção dos componentes do sistema de climatização (conforme legislação específica) afixado em local visível"
  },
  {
    "id": "1.14.5",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.14",
    "sub_title": "VENTILAÇÃO                 E",
    "uan_category": "Edificação e instalações",
    "text": "Sistema de exaustão e ou insuflamento com troca de ar capaz de prevenir contaminações"
  },
  {
    "id": "1.14.6",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.14",
    "sub_title": "VENTILAÇÃO                 E",
    "uan_category": "Edificação e instalações",
    "text": "Sistema de exaustão e ou insuflamento dotados de filtros adequados"
  },
  {
    "id": "1.14.7",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.14",
    "sub_title": "VENTILAÇÃO                 E",
    "uan_category": "Edificação e instalações",
    "text": "Captação e direção da corrente de ar não seguem a direção da área contaminada para área limpa"
  },
  {
    "id": "1.15.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.15",
    "sub_title": "HIGIENIZAÇÃO           DAS",
    "uan_category": "Edificação e instalações",
    "text": "Existência de um responsável pela operação de higienização comprovadamente capacitado"
  },
  {
    "id": "1.15.2",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.15",
    "sub_title": "HIGIENIZAÇÃO           DAS",
    "uan_category": "Edificação e instalações",
    "text": "Freqüência de higienização das instalações adequada"
  },
  {
    "id": "1.15.3",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.15",
    "sub_title": "HIGIENIZAÇÃO           DAS",
    "uan_category": "Edificação e instalações",
    "text": "Existência de registro da higienização"
  },
  {
    "id": "1.15.4",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.15",
    "sub_title": "HIGIENIZAÇÃO           DAS",
    "uan_category": "Edificação e instalações",
    "text": "Produtos de higienização regularizados pelo Ministério da Saúde"
  },
  {
    "id": "1.15.5",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.15",
    "sub_title": "HIGIENIZAÇÃO           DAS",
    "uan_category": "Edificação e instalações",
    "text": "Disponibilidade dos produtos de higienização necessários à realização da operação"
  },
  {
    "id": "1.15.6",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.15",
    "sub_title": "HIGIENIZAÇÃO           DAS",
    "uan_category": "Edificação e instalações",
    "text": "A diluição dos produtos de higienização, tempo de contato e modo de uso/aplicação obedecem às instruções recomendadas pelo fabricante"
  },
  {
    "id": "1.15.7",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.15",
    "sub_title": "HIGIENIZAÇÃO           DAS",
    "uan_category": "Edificação e instalações",
    "text": "Produtos de higienização identificados e guardados em local adequado"
  },
  {
    "id": "1.15.8",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.15",
    "sub_title": "HIGIENIZAÇÃO           DAS",
    "uan_category": "Edificação e instalações",
    "text": "Disponibilidade e adequação dos utensílios (escovas, esponjas etc ) necessários à realização da operação Em bom estado de conservação"
  },
  {
    "id": "1.15.9",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.15",
    "sub_title": "HIGIENIZAÇÃO           DAS",
    "uan_category": "Edificação e instalações",
    "text": "Higienização adequada"
  },
  {
    "id": "1.16.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.16",
    "sub_title": "CONTROLE INTEGRADO",
    "uan_category": "Edificação e instalações",
    "text": "Ausência de vetores e pragas urbanas ou qualquer evidência de sua presença como fezes, ninhos e outros"
  },
  {
    "id": "1.16.2",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.16",
    "sub_title": "CONTROLE INTEGRADO",
    "uan_category": "Edificação e instalações",
    "text": "Adoção de medidas preventivas e corretivas com o objetivo de impedir a atração, o abrigo, o acesso e ou proliferação de vetores e pragas urbanas"
  },
  {
    "id": "1.16.3",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.16",
    "sub_title": "CONTROLE INTEGRADO",
    "uan_category": "Edificação e instalações",
    "text": "Em caso de adoção de controle químico, existência de comprovante de execução do serviço expedido por empresa especializada"
  },
  {
    "id": "1.17.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.17",
    "sub_title": "ABASTECIMENTO           DE",
    "uan_category": "Edificação e instalações",
    "text": "Sistema de abastecimento ligado à rede pública"
  },
  {
    "id": "1.17.2",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.17",
    "sub_title": "ABASTECIMENTO           DE",
    "uan_category": "Edificação e instalações",
    "text": "Sistema de captação própria, protegido, revestido e distante de fonte de contaminação"
  },
  {
    "id": "1.17.3",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.17",
    "sub_title": "ABASTECIMENTO           DE",
    "uan_category": "Edificação e instalações",
    "text": "Reservatório de água acessível com instalação hidráulica com volume, pressão e temperatura adequados, dotado de tampas, em satisfatória condição de uso, livre de vazamentos, infiltrações e descascamentos"
  },
  {
    "id": "1.17.4",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.17",
    "sub_title": "ABASTECIMENTO           DE",
    "uan_category": "Edificação e instalações",
    "text": "Existência de responsável comprovadamente capacitado para a higienização do reservatório da água"
  },
  {
    "id": "1.17.5",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.17",
    "sub_title": "ABASTECIMENTO           DE",
    "uan_category": "Edificação e instalações",
    "text": "Apropriada freqüência de higienização do reservatório de água"
  },
  {
    "id": "1.17.6",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.17",
    "sub_title": "ABASTECIMENTO           DE",
    "uan_category": "Edificação e instalações",
    "text": "Existência de registro da higienização do reservatório de água ou comprovante de execução de serviço em caso de terceirização"
  },
  {
    "id": "1.17.7",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.17",
    "sub_title": "ABASTECIMENTO           DE",
    "uan_category": "Edificação e instalações",
    "text": "Encanamento em estado satisfatório e ausência de infiltrações e interconexões, evitando conexão cruzada entre água potável e não potável"
  },
  {
    "id": "1.17.8",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.17",
    "sub_title": "ABASTECIMENTO           DE",
    "uan_category": "Edificação e instalações",
    "text": "Existência de planilha de registro da troca periódica do elemento filtrante"
  },
  {
    "id": "1.17.9",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.17",
    "sub_title": "ABASTECIMENTO           DE",
    "uan_category": "Edificação e instalações",
    "text": "Potabilidade da água atestada por meio de laudos laboratoriais, com adequada periodicidade, assinados por técnico responsável pela análise ou expedidos por empresa terceirizada"
  },
  {
    "id": "1.17.10",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.17",
    "sub_title": "ABASTECIMENTO           DE",
    "uan_category": "Edificação e instalações",
    "text": "Disponibilidade de reagentes e equipamentos necessários à análise da potabilidade de água realizadas no estabelecimento"
  },
  {
    "id": "1.17.11",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.17",
    "sub_title": "ABASTECIMENTO           DE",
    "uan_category": "Edificação e instalações",
    "text": "Controle de potabilidade realizado por técnico comprovadamente capacitado"
  },
  {
    "id": "1.17.12",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.17",
    "sub_title": "ABASTECIMENTO           DE",
    "uan_category": "Edificação e instalações",
    "text": "Gelo produzido com água potável, fabricado, manipulado e estocado sob condições sanitárias satisfatórias, quando destinado a entrar em contato com alimento ou superfície que entre em contato com alimento"
  },
  {
    "id": "1.17.13",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.17",
    "sub_title": "ABASTECIMENTO           DE",
    "uan_category": "Edificação e instalações",
    "text": "Vapor gerado a partir de água potável quando utilizado em contato com o alimento ou superfície que entre em contato com o alimento"
  },
  {
    "id": "1.18.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.18",
    "sub_title": "MANEJO DOS RESÍDUOS",
    "uan_category": "Edificação e instalações",
    "text": "Recipientes para coleta de resíduos no interior do estabelecimento de fácil higienização e transporte, devidamente identificados e higienizados constantemente; uso de sacos de lixo apropriados Quando necessário, recipientes tampados com acionamento não manual"
  },
  {
    "id": "1.18.2",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.18",
    "sub_title": "MANEJO DOS RESÍDUOS",
    "uan_category": "Edificação e instalações",
    "text": "Retirada freqüente dos resíduos da área de processamento, evitando focos de contaminação"
  },
  {
    "id": "1.18.3",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.18",
    "sub_title": "MANEJO DOS RESÍDUOS",
    "uan_category": "Edificação e instalações",
    "text": "Existência de área adequada para estocagem dos resíduos"
  },
  {
    "id": "1.19.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.19",
    "sub_title": "ESGOTAMENTO",
    "uan_category": "Edificação e instalações",
    "text": "Fossas, esgoto conectado à rede pública, caixas de gordura em adequado estado de conservação e funcionamento"
  },
  {
    "id": "1.20.1",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.20",
    "sub_title": "LEIAUTE",
    "uan_category": "Edificação e instalações",
    "text": "Leiaute adequado ao processo produtivo: número, capacidade e distribuição das dependências de acordo com o ramo de atividade, volume de produção e expedição"
  },
  {
    "id": "1.20.2",
    "block_id": 1,
    "block_title": "Edificação e instalações",
    "sub_id": "1.20",
    "sub_title": "LEIAUTE",
    "uan_category": "Edificação e instalações",
    "text": "Áreas para recepção e depósito de matéria-prima, ingredientes e embalagens distintas das áreas de produção, armazenamento e expedição de produto final"
  },
  {
    "id": "2.1.1",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.1",
    "sub_title": "EQUIPAMENTOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Equipamentos da linha de produção com desenho e número adequado ao ramo"
  },
  {
    "id": "2.1.2",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.1",
    "sub_title": "EQUIPAMENTOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Dispostos de forma a permitir fácil acesso e higienização adequada"
  },
  {
    "id": "2.1.3",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.1",
    "sub_title": "EQUIPAMENTOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Superfícies em contato com alimentos lisas, íntegras, impermeáveis, resistentes à corrosão, de fácil higienização e de material não contaminante"
  },
  {
    "id": "2.1.4",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.1",
    "sub_title": "EQUIPAMENTOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Em adequado estado de conservação e funcionamento"
  },
  {
    "id": "2.1.5",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.1",
    "sub_title": "EQUIPAMENTOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Equipamentos de conservação dos alimentos (refrigeradores, congeladores, câmaras frigoríficas e outros), bem como os destinados ao processamento térmico, com medidor de temperatura localizado em local apropriado e em adequado funcionamento"
  },
  {
    "id": "2.1.6",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.1",
    "sub_title": "EQUIPAMENTOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Existência de planilhas de registro da temperatura, conservadas durante período adequado"
  },
  {
    "id": "2.1.7",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.1",
    "sub_title": "EQUIPAMENTOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Existência de registros que comprovem que os equipamentos e maquinários passam por manutenção preventiva"
  },
  {
    "id": "2.1.8",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.1",
    "sub_title": "EQUIPAMENTOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Existência de registros que comprovem a calibração dos instrumentos e equipamentos de medição ou comprovante da execução do serviço quando a calibração for realizada por empresas terceirizadas"
  },
  {
    "id": "2.2.1",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.2",
    "sub_title": "MÓVEIS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Em número suficiente, de material apropriado, resistentes, impermeáveis; em adequado estado de conservação, com superfícies íntegras"
  },
  {
    "id": "2.2.2",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.2",
    "sub_title": "MÓVEIS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Com desenho que permita uma fácil higienização (lisos, sem rugosidades e frestas)"
  },
  {
    "id": "2.3.1",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.3",
    "sub_title": "UTENSÍLIOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Material não contaminante, resistentes à corrosão, de tamanho e forma que permitam fácil higienização: em adequado estado de conservação e em número suficiente e apropriado ao tipo de operação utilizada"
  },
  {
    "id": "2.3.2",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.3",
    "sub_title": "UTENSÍLIOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Armazenados em local apropriado, de forma organizada e protegidos contra a contaminação"
  },
  {
    "id": "2.4.1",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.4",
    "sub_title": "HIGIENIZAÇÃO                DOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Existência de um responsável pela operação de higienização comprovadamente capacitado"
  },
  {
    "id": "2.4.2",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.4",
    "sub_title": "HIGIENIZAÇÃO                DOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Freqüência de higienização adequada"
  },
  {
    "id": "2.4.3",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.4",
    "sub_title": "HIGIENIZAÇÃO                DOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Existência de registro da higienização"
  },
  {
    "id": "2.4.4",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.4",
    "sub_title": "HIGIENIZAÇÃO                DOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Produtos de higienização regularizados pelo Ministério da Saúde"
  },
  {
    "id": "2.4.5",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.4",
    "sub_title": "HIGIENIZAÇÃO                DOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Disponibilidade dos produtos de higienização necessários à realização da operação"
  },
  {
    "id": "2.4.6",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.4",
    "sub_title": "HIGIENIZAÇÃO                DOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Diluição dos produtos de higienização, tempo de contato e modo de uso/aplicação obedecem às instruções recomendadas pelo fabricante"
  },
  {
    "id": "2.4.7",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.4",
    "sub_title": "HIGIENIZAÇÃO                DOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Produtos de higienização identificados e guardados em local adequado"
  },
  {
    "id": "2.4.8",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.4",
    "sub_title": "HIGIENIZAÇÃO                DOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Disponibilidade e adequação dos utensílios necessários à realização da operação Em bom estado de conservação"
  },
  {
    "id": "2.4.9",
    "block_id": 2,
    "block_title": "Equipamentos, móveis e utensílios",
    "sub_id": "2.4",
    "sub_title": "HIGIENIZAÇÃO                DOS",
    "uan_category": "Equipamentos, móveis e utensílios",
    "text": "Adequada higienização"
  },
  {
    "id": "3.1.1",
    "block_id": 3,
    "block_title": "Manipuladores",
    "sub_id": "3.1",
    "sub_title": "VESTUÁRIO",
    "uan_category": "Manipuladores",
    "text": "Utilização de uniforme de trabalho de cor clara, adequado à atividade e exclusivo para área de produção"
  },
  {
    "id": "3.1.2",
    "block_id": 3,
    "block_title": "Manipuladores",
    "sub_id": "3.1",
    "sub_title": "VESTUÁRIO",
    "uan_category": "Manipuladores",
    "text": "Limpos e em adequado estado de conservação"
  },
  {
    "id": "3.1.3",
    "block_id": 3,
    "block_title": "Manipuladores",
    "sub_id": "3.1",
    "sub_title": "VESTUÁRIO",
    "uan_category": "Manipuladores",
    "text": "Asseio pessoal: boa apresentação, asseio corporal, mãos limpas, unhas curtas, sem esmalte, sem adornos (anéis, pulseiras, brincos, etc ); manipuladores barbeados, com os cabelos protegidos"
  },
  {
    "id": "3.2.1",
    "block_id": 3,
    "block_title": "Manipuladores",
    "sub_id": "3.2",
    "sub_title": "HÁBITOS HIGIÊNICOS",
    "uan_category": "Manipuladores",
    "text": "Lavagem cuidadosa das mãos antes da manipulação de alimentos, principalmente após qualquer interrupção e depois do uso de sanitários"
  },
  {
    "id": "3.2.2",
    "block_id": 3,
    "block_title": "Manipuladores",
    "sub_id": "3.2",
    "sub_title": "HÁBITOS HIGIÊNICOS",
    "uan_category": "Manipuladores",
    "text": "Manipuladores não espirram sobre os alimentos, não cospem, não tossem, não fumam, não manipulam dinheiro ou não praticam outros atos que possam contaminar o alimento"
  },
  {
    "id": "3.2.3",
    "block_id": 3,
    "block_title": "Manipuladores",
    "sub_id": "3.2",
    "sub_title": "HÁBITOS HIGIÊNICOS",
    "uan_category": "Manipuladores",
    "text": "Cartazes de orientação aos manipuladores sobre a correta lavagem das mãos e demais hábitos de higiene, afixados em locais apropriados"
  },
  {
    "id": "3.3.1",
    "block_id": 3,
    "block_title": "Manipuladores",
    "sub_id": "3.3",
    "sub_title": "ESTADO DE SAÚDE",
    "uan_category": "Manipuladores",
    "text": "Ausência de afecções cutâneas, feridas e supurações; ausência de sintomas e infecções respiratórias, gastrointestinais e oculares"
  },
  {
    "id": "3.4.1",
    "block_id": 3,
    "block_title": "Manipuladores",
    "sub_id": "3.4",
    "sub_title": "PROGRAMA DE CONTROLE",
    "uan_category": "Manipuladores",
    "text": "Existência de supervisão periódica do estado de saúde dos manipuladores"
  },
  {
    "id": "3.4.2",
    "block_id": 3,
    "block_title": "Manipuladores",
    "sub_id": "3.4",
    "sub_title": "PROGRAMA DE CONTROLE",
    "uan_category": "Manipuladores",
    "text": "Existência de registro dos exames realizados"
  },
  {
    "id": "3.5.1",
    "block_id": 3,
    "block_title": "Manipuladores",
    "sub_id": "3.5",
    "sub_title": "EQUIPAMENTO             DE",
    "uan_category": "Manipuladores",
    "text": "Utilização de Equipamento de Proteção Individual"
  },
  {
    "id": "3.6.1",
    "block_id": 3,
    "block_title": "Manipuladores",
    "sub_id": "3.6",
    "sub_title": "PROGRAMA             DE",
    "uan_category": "Manipuladores",
    "text": "Existência de programa de capacitação adequado e contínuo relacionado à higiene pessoal e à manipulação dos alimentos"
  },
  {
    "id": "3.6.2",
    "block_id": 3,
    "block_title": "Manipuladores",
    "sub_id": "3.6",
    "sub_title": "PROGRAMA             DE",
    "uan_category": "Manipuladores",
    "text": "Existência de registros dessas capacitações"
  },
  {
    "id": "3.6.3",
    "block_id": 3,
    "block_title": "Manipuladores",
    "sub_id": "3.6",
    "sub_title": "PROGRAMA             DE",
    "uan_category": "Manipuladores",
    "text": "Existência de supervisão da higiene pessoal e manipulação dos alimentos"
  },
  {
    "id": "3.6.4",
    "block_id": 3,
    "block_title": "Manipuladores",
    "sub_id": "3.6",
    "sub_title": "PROGRAMA             DE",
    "uan_category": "Manipuladores",
    "text": "Existência de supervisor comprovadamente capacitado"
  },
  {
    "id": "4.1.1",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.1",
    "sub_title": "MATÉRIA-PRIMA, INGREDIENTES E EMBALAGENS",
    "uan_category": "Matérias-primas, ingredientes e embalagens",
    "text": "Operações de recepção da matéria-prima, ingredientes e embalagens são realizadas em local protegido e isolado da área de processamento"
  },
  {
    "id": "4.1.2",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.1",
    "sub_title": "MATÉRIA-PRIMA, INGREDIENTES E EMBALAGENS",
    "uan_category": "Matérias-primas, ingredientes e embalagens",
    "text": "Matérias - primas, ingredientes e embalagens inspecionados na recepção"
  },
  {
    "id": "4.1.3",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.1",
    "sub_title": "MATÉRIA-PRIMA, INGREDIENTES E EMBALAGENS",
    "uan_category": "Matérias-primas, ingredientes e embalagens",
    "text": "Existência de planilhas de controle na recepção (temperatura e características sensoriais, condições de transporte e outros)"
  },
  {
    "id": "4.1.4",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.1",
    "sub_title": "MATÉRIA-PRIMA, INGREDIENTES E EMBALAGENS",
    "uan_category": "Matérias-primas, ingredientes e embalagens",
    "text": "Matérias-primas e ingredientes aguardando liberação e aqueles aprovados estão devidamente identificados"
  },
  {
    "id": "4.1.5",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.1",
    "sub_title": "MATÉRIA-PRIMA, INGREDIENTES E EMBALAGENS",
    "uan_category": "Matérias-primas, ingredientes e embalagens",
    "text": "Matérias-primas, ingredientes e embalagens reprovados no controle efetuado na recepção são devolvidos imediatamente ou identificados e armazenados em local separado"
  },
  {
    "id": "4.1.6",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.1",
    "sub_title": "MATÉRIA-PRIMA, INGREDIENTES E EMBALAGENS",
    "uan_category": "Matérias-primas, ingredientes e embalagens",
    "text": "Rótulos da matéria-prima e ingredientes atendem à legislação"
  },
  {
    "id": "4.1.7",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.1",
    "sub_title": "MATÉRIA-PRIMA, INGREDIENTES E EMBALAGENS",
    "uan_category": "Matérias-primas, ingredientes e embalagens",
    "text": "Critérios estabelecidos para a seleção das matérias-primas são baseados na segurança do alimento"
  },
  {
    "id": "4.1.8",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.1",
    "sub_title": "MATÉRIA-PRIMA, INGREDIENTES E EMBALAGENS",
    "uan_category": "Matérias-primas, ingredientes e embalagens",
    "text": "Armazenamento em local adequado e organizado; sobre estrados distantes do piso, ou sobre paletes, bem conservados e limpos, ou sobre outro sistema aprovado, afastados das paredes e distantes do teto de forma que permita apropriada higienização, iluminação e circulação de ar"
  },
  {
    "id": "4.1.9",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.1",
    "sub_title": "MATÉRIA-PRIMA, INGREDIENTES E EMBALAGENS",
    "uan_category": "Matérias-primas, ingredientes e embalagens",
    "text": "Uso das matérias-primas, ingredientes e embalagens respeita a ordem de entrada dos mesmos, sendo observado o prazo de validade"
  },
  {
    "id": "4.1.10",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.1",
    "sub_title": "MATÉRIA-PRIMA, INGREDIENTES E EMBALAGENS",
    "uan_category": "Matérias-primas, ingredientes e embalagens",
    "text": "Acondicionamento adequado das embalagens a serem utilizadas"
  },
  {
    "id": "4.1.11",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.1",
    "sub_title": "MATÉRIA-PRIMA, INGREDIENTES E EMBALAGENS",
    "uan_category": "Matérias-primas, ingredientes e embalagens",
    "text": "Rede de frio adequada ao volume e aos diferentes tipos de matérias-primas e ingredientes"
  },
  {
    "id": "4.2.1",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.2",
    "sub_title": "FLUXO DE PRODUÇÃO",
    "uan_category": "Preparação do alimento",
    "text": "Locais para pré - preparo (\"área suja\") isolados da área de preparo por barreira física ou técnica"
  },
  {
    "id": "4.2.2",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.2",
    "sub_title": "FLUXO DE PRODUÇÃO",
    "uan_category": "Preparação do alimento",
    "text": "Controle da circulação e acesso do pessoal"
  },
  {
    "id": "4.2.3",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.2",
    "sub_title": "FLUXO DE PRODUÇÃO",
    "uan_category": "Preparação do alimento",
    "text": "Conservação adequada de materiais destinados ao reprocessamento"
  },
  {
    "id": "4.2.4",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.2",
    "sub_title": "FLUXO DE PRODUÇÃO",
    "uan_category": "Preparação do alimento",
    "text": "Ordenado, linear e sem cruzamento"
  },
  {
    "id": "4.3.1",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.3",
    "sub_title": "ROTULAGEM E ARMAZENAMENTO DO PRODUTO-FINAL",
    "uan_category": "Exposição ao consumo do alimento preparado",
    "text": "Dizeres de rotulagem com identificação visível e de acordo com a legislação vigente"
  },
  {
    "id": "4.3.2",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.3",
    "sub_title": "ROTULAGEM E ARMAZENAMENTO DO PRODUTO-FINAL",
    "uan_category": "Exposição ao consumo do alimento preparado",
    "text": "Produto final acondicionado em embalagens adequadas e íntegras"
  },
  {
    "id": "4.3.3",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.3",
    "sub_title": "ROTULAGEM E ARMAZENAMENTO DO PRODUTO-FINAL",
    "uan_category": "Exposição ao consumo do alimento preparado",
    "text": "Alimentos armazenados separados por tipo ou grupo, sobre estrados distantes do piso, ou sobre paletes, bem conservados e limpos ou sobre outro sistema aprovado, afastados das paredes e distantes do teto de forma a permitir apropriada higienização, iluminação e circulação de ar"
  },
  {
    "id": "4.3.4",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.3",
    "sub_title": "ROTULAGEM E ARMAZENAMENTO DO PRODUTO-FINAL",
    "uan_category": "Exposição ao consumo do alimento preparado",
    "text": "Ausência de material estranho, estragado ou tóxico"
  },
  {
    "id": "4.3.5",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.3",
    "sub_title": "ROTULAGEM E ARMAZENAMENTO DO PRODUTO-FINAL",
    "uan_category": "Exposição ao consumo do alimento preparado",
    "text": "Armazenamento em local limpo e conservado"
  },
  {
    "id": "4.3.6",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.3",
    "sub_title": "ROTULAGEM E ARMAZENAMENTO DO PRODUTO-FINAL",
    "uan_category": "Exposição ao consumo do alimento preparado",
    "text": "Controle adequado e existência de planilha de registro de temperatura, para ambientes com controle térmico"
  },
  {
    "id": "4.3.7",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.3",
    "sub_title": "ROTULAGEM E ARMAZENAMENTO DO PRODUTO-FINAL",
    "uan_category": "Exposição ao consumo do alimento preparado",
    "text": "Rede de frio adequada ao volume e aos diferentes tipos de alimentos"
  },
  {
    "id": "4.3.8",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.3",
    "sub_title": "ROTULAGEM E ARMAZENAMENTO DO PRODUTO-FINAL",
    "uan_category": "Exposição ao consumo do alimento preparado",
    "text": "Produtos avariados, com prazo de validade vencido, devolvidos ou recolhidos do mercado devidamente identificados e armazenados em local separado e de forma organizada"
  },
  {
    "id": "4.3.9",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.3",
    "sub_title": "ROTULAGEM E ARMAZENAMENTO DO PRODUTO-FINAL",
    "uan_category": "Exposição ao consumo do alimento preparado",
    "text": "Produtos finais aguardando resultado analítico ou em quarentena e aqueles aprovados devidamente identificados"
  },
  {
    "id": "4.4.1",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.4",
    "sub_title": "CONTROLE            DE",
    "uan_category": "Exposição ao consumo do alimento preparado",
    "text": "Existência de controle de qualidade do produto final"
  },
  {
    "id": "4.4.2",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.4",
    "sub_title": "CONTROLE            DE",
    "uan_category": "Exposição ao consumo do alimento preparado",
    "text": "Existência de programa de amostragem para análise laboratorial do produto final"
  },
  {
    "id": "4.4.3",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.4",
    "sub_title": "CONTROLE            DE",
    "uan_category": "Exposição ao consumo do alimento preparado",
    "text": "Existência de laudo laboratorial atestando o controle de qualidade do produto final, assinado pelo técnico da empresa responsável pela análise ou expedido por empresa terceirizada"
  },
  {
    "id": "4.4.4",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.4",
    "sub_title": "CONTROLE            DE",
    "uan_category": "Exposição ao consumo do alimento preparado",
    "text": "Existência de equipamentos e materiais necessários para análise do produto final realizadas no estabelecimento"
  },
  {
    "id": "4.5.1",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.5",
    "sub_title": "TRANSPORTE           DO",
    "uan_category": "Exposição ao consumo do alimento preparado",
    "text": "Produto transportado na temperatura especificada no rótulo"
  },
  {
    "id": "4.5.2",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.5",
    "sub_title": "TRANSPORTE           DO",
    "uan_category": "Exposição ao consumo do alimento preparado",
    "text": "Veículo limpo, com cobertura para proteção de carga Ausência de vetores e pragas urbanas ou qualquer evidência de sua presença como fezes, ninhos e outros"
  },
  {
    "id": "4.5.3",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.5",
    "sub_title": "TRANSPORTE           DO",
    "uan_category": "Exposição ao consumo do alimento preparado",
    "text": "Transporte mantém a integridade do produto"
  },
  {
    "id": "4.5.4",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.5",
    "sub_title": "TRANSPORTE           DO",
    "uan_category": "Exposição ao consumo do alimento preparado",
    "text": "Veículo não transporta outras cargas que comprometam a segurança do produto"
  },
  {
    "id": "4.5.5",
    "block_id": 4,
    "block_title": "Produção e transporte do alimento",
    "sub_id": "4.5",
    "sub_title": "TRANSPORTE           DO",
    "uan_category": "Exposição ao consumo do alimento preparado",
    "text": "Presença de equipamento para controle de temperatura quando se transporta alimentos que necessitam de condições especiais de conservação"
  },
  {
    "id": "5.1.1",
    "block_id": 5,
    "block_title": "Documentação",
    "sub_id": "5.1",
    "sub_title": "MANUAL DE BOAS PRÁTICAS DE FABRICAÇÃO",
    "uan_category": "Documentação e registro",
    "text": "Operações executadas no estabelecimento estão de acordo com o Manual de Boas Práticas de Fabricação"
  },
  {
    "id": "5.2.1.1",
    "block_id": 5,
    "block_title": "Documentação",
    "sub_id": "5.2.1",
    "sub_title": "Higienização       das",
    "uan_category": "Documentação e registro",
    "text": "Existência de POP estabelecido para este item"
  },
  {
    "id": "5.2.1.2",
    "block_id": 5,
    "block_title": "Documentação",
    "sub_id": "5.2.1",
    "sub_title": "Higienização       das",
    "uan_category": "Documentação e registro",
    "text": "POP descrito está sendo cumprido"
  },
  {
    "id": "5.2.2.1",
    "block_id": 5,
    "block_title": "Documentação",
    "sub_id": "5.2.2",
    "sub_title": "Controle de potabilidade",
    "uan_category": "Documentação e registro",
    "text": "Existência de POP estabelecido para controle de potabilidade da água"
  },
  {
    "id": "5.2.2.2",
    "block_id": 5,
    "block_title": "Documentação",
    "sub_id": "5.2.2",
    "sub_title": "Controle de potabilidade",
    "uan_category": "Documentação e registro",
    "text": "POP descrito está sendo cumprido"
  },
  {
    "id": "5.2.3.1",
    "block_id": 5,
    "block_title": "Documentação",
    "sub_id": "5.2.3",
    "sub_title": "Higiene     e   saúde    dos",
    "uan_category": "Documentação e registro",
    "text": "Existência de POP estabelecido para este item"
  },
  {
    "id": "5.2.3.2",
    "block_id": 5,
    "block_title": "Documentação",
    "sub_id": "5.2.3",
    "sub_title": "Higiene     e   saúde    dos",
    "uan_category": "Documentação e registro",
    "text": "POP descrito está sendo cumprido"
  },
  {
    "id": "5.2.4.1",
    "block_id": 5,
    "block_title": "Documentação",
    "sub_id": "5.2.4",
    "sub_title": "Manejo dos resíduos",
    "uan_category": "Documentação e registro",
    "text": "Existência de POP estabelecido para este item"
  },
  {
    "id": "5.2.4.2",
    "block_id": 5,
    "block_title": "Documentação",
    "sub_id": "5.2.4",
    "sub_title": "Manejo dos resíduos",
    "uan_category": "Documentação e registro",
    "text": "O POP descrito está sendo cumprido"
  },
  {
    "id": "5.2.5.1",
    "block_id": 5,
    "block_title": "Documentação",
    "sub_id": "5.2.5",
    "sub_title": "Manutenção preventiva e",
    "uan_category": "Documentação e registro",
    "text": "Existência de POP estabelecido para este item"
  },
  {
    "id": "5.2.5.2",
    "block_id": 5,
    "block_title": "Documentação",
    "sub_id": "5.2.5",
    "sub_title": "Manutenção preventiva e",
    "uan_category": "Documentação e registro",
    "text": "O POP descrito está sendo cumprido"
  },
  {
    "id": "5.2.6.1",
    "block_id": 5,
    "block_title": "Documentação",
    "sub_id": "5.2.6",
    "sub_title": "Controle     integrado   de",
    "uan_category": "Documentação e registro",
    "text": "Existência de POP estabelecido para este item"
  },
  {
    "id": "5.2.6.2",
    "block_id": 5,
    "block_title": "Documentação",
    "sub_id": "5.2.6",
    "sub_title": "Controle     integrado   de",
    "uan_category": "Documentação e registro",
    "text": "O POP descrito está sendo cumprido"
  },
  {
    "id": "5.2.7.1",
    "block_id": 5,
    "block_title": "Documentação",
    "sub_id": "5.2.7",
    "sub_title": "Seleção   das   matérias-",
    "uan_category": "Documentação e registro",
    "text": "Existência de POP estabelecido para este item"
  },
  {
    "id": "5.2.7.2",
    "block_id": 5,
    "block_title": "Documentação",
    "sub_id": "5.2.7",
    "sub_title": "Seleção   das   matérias-",
    "uan_category": "Documentação e registro",
    "text": "O POP descrito está sendo cumprido"
  },
  {
    "id": "5.2.8.1",
    "block_id": 5,
    "block_title": "Documentação",
    "sub_id": "5.2.8",
    "sub_title": "Programa de recolhimento",
    "uan_category": "Documentação e registro",
    "text": "Existência de POP estabelecido para este item"
  },
  {
    "id": "5.2.8.2",
    "block_id": 5,
    "block_title": "Documentação",
    "sub_id": "5.2.8",
    "sub_title": "Programa de recolhimento",
    "uan_category": "Documentação e registro",
    "text": "O POP descrito está sendo cumprido"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { UAN_CATEGORIES, RDC_BLOCKS, CHECKLIST_ITEMS };
}
