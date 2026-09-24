# BPF Digital • Gestão e Avaliação de UAN (RDC 275/2002)

Sistema web para gestão de estabelecimentos e avaliações temporais da **Lista de Verificação das Boas Práticas de Fabricação em Estabelecimentos Produtores/Industrializadores de Alimentos (Resolução ANVISA RDC nº 275/2002)**, adaptada para auditorias e pesquisas em **Unidades de Alimentação e Nutrição (UAN)**.

---

## 🚀 Como Executar

O servidor local está em execução na porta `3000`. Você pode abrir o sistema no seu navegador acessando:

👉 **[http://localhost:3000](http://localhost:3000)**

*(Ou dê dois cliques no arquivo `index.html` para abrir diretamente em qualquer navegador moderno, ou publique no GitHub Pages sem nenhuma etapa de build).*

---

## 🏛️ Nova Estrutura Hierárquica: Lugares $\rightarrow$ Múltiplas Avaliações

Na rotina profissional de consultoria e auditoria em UAN, uma unidade nunca recebe apenas uma visita estática. O ciclo preconizado pela vigilância sanitária é composto por **Diagnóstico Inicial**, **Implantação de Ações Corretivas** e **Reavaliações de Eficácia**.

O sistema reflete essa realidade em 4 níveis integrados:

```
[ 1. Hub de Lugares (UANs) ]
        │
        ├── Escolher um Lugar (ex: Hospital Universitário)
        │       ▼
        ├── [ 2. Linha do Tempo de Avaliações do Lugar ]
        │       ├── Avaliação 1: 10/03/2026 (Diagnóstico Inicial)  ──► 78,5% (G1)
        │       └── Avaliação 2: 15/04/2026 (Pós-Ações Corretivas) ──► 95,4% (G1) ↗ +16,9%
        │               │
        │               ├── Abrir Checklist
        │               ▼
        │       [ 3. Ambiente de Checklist e Diagnóstico (164 itens) ]
        │
        └── Comparar
                ▼
        [ 4. Matriz Comparativa ]
                ├── Comparação Temporal (Antes vs. Depois no mesmo lugar)
                └── Benchmarking (Confronto entre lugares distintos)
```

---

### 1. Hub de Lugares (Tela Inicial)
- Lista todos os estabelecimentos cadastrados (UAN A, UAN B, etc.).
- Cada card exibe:
  - Sigla/Código, Nome do Estabelecimento, Categoria e RT.
  - Total de avaliações realizadas no local.
  - Data e nota da avaliação mais recente com badge oficial da ANVISA.
  - **Indicador de evolução temporal automática**: se houver mais de uma inspeção, exibe o ganho percentual (ex: `↗ +16,9% de evolução`).
- Botão **`+ Novo Lugar`** para cadastrar novos estabelecimentos.
- Botão **`Ver Histórico`** para abrir as avaliações daquele local.

### 2. Histórico & Linha do Tempo do Lugar
- Visão focada exclusivamente no estabelecimento selecionado.
- Exibe o histórico de inspeções cronológicas (da mais recente para a mais antiga).
- Botão **`+ Nova Avaliação neste Lugar`**:
  - Permite criar uma nova inspeção do zero ou marcar a opção **"Copiar respostas da avaliação anterior"** (economiza tempo do auditor para registrar apenas o que foi alterado).
- Botão **`Comparar Evolução deste Lugar`**: confronta lado a lado as avaliações daquele local na tabela por blocos.

### 3. Ambiente de Checklist da Avaliação Ativa
- Breadcrumb de retorno rápido para o histórico do lugar.
- Scorecard com fórmulas oficiais da ANVISA:
  - **Itens Válidos**: $\text{SIM} + \text{NÃO}$ *(itens NA são excluídos)*
  - **Adequação Geral**: $\left(\frac{\text{SIM}}{\text{SIM} + \text{NÃO}}\right) \times 100$
  - **Classificação**: Grupo 1 (76-100%), Grupo 2 (51-75%), Grupo 3 (0-50%)
- Painel interativo com os **7 Blocos da RDC 275**: clicar em um bloco filtra o checklist.
- Checklist de **164 itens oficiais** com botões táteis `SIM`, `NÃO`, `NA` e registro de evidências/anotações.
- Botão de **Imprimir Relatório** formatado nos padrões ABNT/ANVISA com campos para assinatura do RT e do auditor.

### 4. Matriz Comparativa (Tabela da Pesquisa)
- Permite comparar:
  - **Evolução temporal do mesmo local** (ex: *UAN A Diagnóstico vs. UAN A Reavaliação*).
  - **Benchmarking entre locais diferentes** (ex: *UAN A vs. UAN B*).
  - Qualquer combinação arbitrária de avaliações selecionadas via caixas de seleção.
- Botões de **Copiar Tabela** (TSV compatível com Word/Excel) e **Exportar CSV**.
