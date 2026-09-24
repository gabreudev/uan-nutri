# BPF Digital • Lista de Verificação de Boas Práticas (RDC 275/2002 - UAN)

Sistema web interativo para digitalização, gestão por estabelecimento e cálculo estatístico da **Lista de Verificação das Boas Práticas de Fabricação em Estabelecimentos Produtores/Industrializadores de Alimentos (Resolução ANVISA RDC nº 275/2002)**, adaptada para auditorias e pesquisas em **Unidades de Alimentação e Nutrição (UAN)**.

---

## 🚀 Como Executar

O servidor local está em execução na porta `3000`. Você pode abrir o sistema no seu navegador acessando:

👉 **[http://localhost:3000](http://localhost:3000)**

*(Ou dê dois cliques no arquivo `index.html` para abrir diretamente em qualquer navegador moderno).*

---

## 🧭 Novo Fluxo de Navegação (Hub de Análises)

Para suportar múltiplas avaliações sem sobrecarregar a tela com todas as tabelas juntas, o sistema adota uma arquitetura em 3 etapas:

```
[ Hub de Análises ]  ──( Escolher uma análise )──►  [ Ambiente de Trabalho da UAN ]
        │                                                     │
        │                                                     ▼
        └──( Selecionar múltiplas )──────────────►  [ Matriz Comparativa da Pesquisa ]
```

### 1. Painel de Análises (Tela Inicial / Hub)
- Lista todas as auditorias cadastradas em cards com informações de identificação:
  - Sigla/Código (`UAN A`, `UAN B`), Razão Social e Segmento.
  - Data da avaliação e Responsável Técnico / Avaliador.
  - Placar direto de Adequação (`%`), itens não conformes e Classificação Oficial ANVISA (`Grupo 1`, `2` ou `3`).
  - Barra de progresso de preenchimento (`X/164`).
- **Ações disponíveis**:
  - **Analisar / Ver Checklist**: Abre o ambiente de trabalho dedicado àquela análise.
  - **Nova Análise**: Cadastra um novo estabelecimento para verificação do zero.
  - **Comparar Selecionadas**: Marque 2 ou mais análises com as caixas de seleção para abrir o confronto direto.
  - **Ações rápidas**: Editar dados, Duplicar (para reavaliações) e Excluir.

### 2. Ambiente de Trabalho da Análise Selecionada
- Foco total na inspeção do local ativo:
  - Botão de retorno rápido: `← Voltar para lista de análises`.
  - Scorecard de conformidade (`Adequação Geral`, `Fora do Padrão`, `Grupo ANVISA`, `Progresso`).
  - Painel com os **7 Blocos da RDC 275**: clique em qualquer bloco para filtrar instantaneamente as questões correspondentes.
  - **Checklist interativo de 164 itens**: botões táteis `SIM`, `NÃO`, `NA`, campo para anotações/evidências e filtro por status.
  - **Relatório Oficial para Impressão**: Formatação ABNT/ANVISA com campos de assinatura para RT e auditor.

### 3. Matriz Comparativa (Tabela da Pesquisa)
- Permite comparar lado a lado o desempenho por bloco de estabelecimentos selecionados.
- Filtro por checkboxes para escolher exatamente quais UANs compõem a tabela.
- Botões de **Copiar Tabela** (formato compatível com Word e Excel) e **Exportar CSV**.
- Linha de rodapé com fonte de pesquisa editável.

---

## 📐 Fórmulas Sanitárias Oficiais (RDC 275/2002)

- **Itens Válidos**: $\text{SIM} + \text{NÃO}$ *(itens NA são excluídos do denominador)*
- **Porcentagem de Adequação**:
  $$\% \text{ Adequação} = \left(\frac{\text{SIM}}{\text{SIM} + \text{NÃO}}\right) \times 100$$
- **Porcentagem Fora do Padrão**:
  $$\% \text{ Fora do Padrão} = \left(\frac{\text{NÃO}}{\text{SIM} + \text{NÃO}}\right) \times 100$$
- **Classificação ANVISA**:
  - **Grupo 1**: 76% a 100% de adequação
  - **Grupo 2**: 51% a 75% de adequação
  - **Grupo 3**: 0% a 50% de adequação
