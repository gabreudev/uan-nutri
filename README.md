# BPF Digital • Gestão e Avaliação de UAN (RDC 275/2002)

Sistema web para gestão de estabelecimentos e avaliações temporais da **Lista de Verificação das Boas Práticas de Fabricação em Estabelecimentos Produtores/Industrializadores de Alimentos (Resolução ANVISA RDC nº 275/2002)**, adaptada para auditorias e pesquisas em **Unidades de Alimentação e Nutrição (UAN)**.

---

## 🚀 Acesso e Demonstração Online

O sistema está publicado e acessível diretamente no GitHub Pages:

👉 **[https://gabreudev.github.io/uan-nutri/](https://gabreudev.github.io/uan-nutri/)**

### Execução Local
Se preferir executar localmente, o servidor está na porta `3000`:
👉 **[http://localhost:3000](http://localhost:3000)** *(ou abra diretamente o arquivo `index.html` em qualquer navegador moderno)*.

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

---

## ☁️ Banco de Dados em Nuvem: Google Drive AppData (Serverless & Privado)

A aplicação **não depende de nenhum banco de dados tradicional (SQL/NoSQL) ou servidor backend pago**. O banco de dados da aplicação é a pasta oculta de dados de aplicativo (**`appDataFolder`**) do próprio Google Drive do usuário.

```
[ Usuário / Auditor ] ──► [ BPF Digital (Web App) ]
                                 │
                                 ├── Cache Local (localStorage instantâneo 0ms)
                                 │
                                 ▼ (OAuth 2.0 / GIS)
               [ Google Drive do Usuário ]
                         │
                         └── [ appDataFolder (Pasta Oculta Privada) ]
                                   └── bpf_uan_database.json
```

### Principais Vantagens:
- **Zero Custo de Servidor**: Hospedagem estática (GitHub Pages / Vercel / Localhost) sem backend.
- **Sigilo e Privacidade Absoluta**: O escopo utilizado é exclusivo (`drive.appdata`). O aplicativo **NÃO** tem acesso aos seus arquivos pessoais do Drive e nenhuma outra pessoa ou aplicativo acessa os seus dados de auditoria.
- **Sincronização Automática**: Edições, novas UANs ou respostas no checklist salvam localmente com latência zero e sincronizam automaticamente na nuvem com *debounce* inteligente.
- **Multi-dispositivo**: Abra o sistema em qualquer computador ou tablet, conecte ao seu Google Drive e acesse seus estabelecimentos e relatórios imediatamente.

---

## 🛠️ Como Configurar a Chave do Google Drive (`env`)

Para ativar o banco de dados do Google Drive na sua cópia do projeto, você só precisa de um **Google Client ID**.

### Método 1: Via Arquivo de Ambiente (`env.js`) — Recomendado para Desenvolvimento
1. Duplique o arquivo modelo `env.example.js` criando o arquivo `env.js`:
   ```bash
   cp env.example.js env.js
   ```
2. Abra `env.js` e insira o seu Client ID:
   ```javascript
   window.APP_ENV = {
     GOOGLE_CLIENT_ID: "SEU_CLIENT_ID.apps.googleusercontent.com",
     GOOGLE_API_KEY: ""
   };
   ```
*(O arquivo `env.js` está no `.gitignore` para nunca expor suas credenciais).*

### Método 2: Diretamente na Interface Web
Se você estiver utilizando a versão online (ex: GitHub Pages) e não quiser editar código:
1. Abra o sistema e clique no botão **Google Drive** no topo superior direito.
2. Cole o seu **Google Client ID** no campo correspondente e clique em **Salvar**.

---

## 🔑 Passo a Passo: Como Gerar o Google Client ID no Google Cloud Console

1. Acesse o **[Google Cloud Console](https://console.cloud.google.com/)** e faça login com sua conta Google.
2. Crie um novo projeto (exemplo: `BPF Digital UAN`).
3. No menu lateral, acesse **APIs e Serviços > Biblioteca**.
   - Pesquise por **Google Drive API** e clique em **Ativar**.
4. Acesse **APIs e Serviços > Tela de permissão OAuth**:
   - Selecione **Usuários externos** e clique em *Criar*.
   - Preencha o nome do app (`BPF Digital`) e seu e-mail de suporte.
   - Em **Escopos**, adicione o escopo: `https://www.googleapis.com/auth/drive.appdata`.
   - Em **Usuários de teste**, adicione o seu e-mail do Google.
5. Acesse **APIs e Serviços > Credenciais**:
   - Clique em **+ Criar Credenciais > ID do cliente OAuth**.
   - Tipo de aplicativo: **Aplicativo da Web**.
   - Em **Origens JavaScript autorizadas**, adicione as URLs onde você usará a aplicação:
     - `http://localhost:3000`
     - `http://localhost:8080`
     - `http://127.0.0.1:5500`
     - `https://seu-usuario.github.io` *(se for publicar no GitHub Pages)*
   - Clique em **Criar** e copie o **ID do cliente** gerado (formato `xxxxx-xxxx.apps.googleusercontent.com`).
6. Cole o ID no seu `env.js` ou na janela de configuração do Google Drive na aplicação!
