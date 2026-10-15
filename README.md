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
- **Zero Custo de Servidor**: Hospedagem estática (GitHub Pages / Vercel / Localhost) sem qualquer backend.
- **Sigilo e Privacidade Absoluta**: O escopo utilizado é exclusivo (`drive.appdata`). O aplicativo **NÃO** tem acesso aos seus arquivos pessoais do Drive e nenhuma outra pessoa ou aplicativo acessa os seus dados de auditoria.
- **Sincronização Automática**: Edições, novas UANs ou respostas no checklist salvam localmente com latência zero e sincronizam automaticamente na nuvem com *debounce* inteligente.
- **Multi-dispositivo**: Abra o sistema em qualquer computador, notebook ou tablet, conecte ao seu Google Drive e acesse seus estabelecimentos e relatórios imediatamente.

---

## 🔑 Tutorial Completo: Como Criar o Google Client ID e Ativar o Banco de Dados

Siga este passo a passo detalhado para gerar sua credencial no Google Cloud Console em menos de 5 minutos:

### Passo 1: Criar o Projeto no Google Cloud
1. Acesse o **[Google Cloud Console](https://console.cloud.google.com/)** e faça login com sua conta Google.
2. No menu superior esquerdo (ao lado do logo *Google Cloud*), clique no seletor de projetos e em **Novo Projeto** (*New Project*).
3. Nome do projeto: `BPF Digital UAN` (ou o nome que preferir) e clique em **Criar** (*Create*).
4. Verifique se o projeto recém-criado está selecionado no topo da tela.

### Passo 2: Ativar a Google Drive API
1. Acesse o link direto da biblioteca: 👉 **[Google Drive API na Biblioteca](https://console.cloud.google.com/apis/library/drive.googleapis.com)**.
2. Clique no botão azul **Ativar** (*Enable*).

### Passo 3: Configurar a Tela de Permissão OAuth (Google Auth Platform)
1. No menu lateral, acesse **APIs e Serviços > Tela de permissão OAuth** (ou **Google Auth Platform**):
   * Selecione o tipo de usuário: **Usuários externos** (*External*) e clique em **Criar**.
2. Preencha as informações básicas do aplicativo:
   * **Nome do app**: `BPF Digital UAN`
   * **E-mail de suporte do usuário**: Selecione o seu e-mail Google.
   * **Dados de contato do desenvolvedor**: Digite seu e-mail novamente.
   * Clique em **Salvar e Continuar** (*Save and Continue*).
3. Na etapa de **Escopos** (*Scopes*):
   * Pode clicar direto em **Salvar e Continuar**.
4. Na etapa de **Usuários de teste** (*Audience / Test users*):
   * Clique em **+ ADD USERS** (*Adicionar usuários*).
   * Digite o seu endereço de e-mail do Google (com o qual você fará login na aplicação) e clique em **Salvar**.
   * *(Opcional)*: Para que qualquer e-mail possa logar sem você ter que adicioná-lo manualmente como teste, basta clicar no botão **Publish app** (*Publicar aplicativo*) na aba *Audience*.

### Passo 4: Gerar o ID do Cliente OAuth (Web App)
1. No menu lateral, acesse **Credenciais** (*Credentials*) ou a aba **Clients**:
   * Clique em **+ Criar Credenciais** (*+ Create Credentials*) $\rightarrow$ **ID do cliente OAuth** (*OAuth client ID*).
2. Em **Tipo de aplicativo** (*Application type*), selecione: **Aplicativo da Web** (*Web application*).
3. Em **Nome**: pode deixar `Cliente da Web 1`.
4. Role até a seção **Origens JavaScript autorizadas** (*Authorized JavaScript origins*) e clique em **+ Adicionar URI**:
   * Adicione a URL local: `http://localhost:3000` (ou a porta que estiver usando).
   * Adicione a URL do GitHub Pages: `https://gabreudev.github.io` *(substitua pelo seu usuário caso tenha feito fork)*.
5. Clique no botão azul **Criar** (*Create*).
6. Uma janela com o título **Cliente OAuth criado** (*OAuth client created*) será exibida com o seu **Client ID** (formato: `xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com`). Copie esse valor!

---

## 🚀 Como Fazer a Aplicação Funcionar com a Chave

Você pode vincular o Client ID ao sistema de duas formas:

### Opção A: Via Arquivo `env.js` (Recomendado para Desenvolvimento Local)
1. Na raiz do projeto, copie o modelo `env.example.js` criando o arquivo `env.js`:
   ```bash
   cp env.example.js env.js
   ```
2. Abra `env.js` e cole o seu Client ID:
   ```javascript
   window.APP_ENV = {
     GOOGLE_CLIENT_ID: "SEU_CLIENT_ID.apps.googleusercontent.com",
     GOOGLE_API_KEY: ""
   };
   ```
*(O arquivo `env.js` já está protegido pelo `.gitignore` para nunca ser enviado ao GitHub público).*

### Opção B: Diretamente na Interface Web (GitHub Pages)
Se estiver usando a versão hospedada no GitHub Pages sem clonar o código:
1. Abra a aplicação no navegador.
2. Clique no botão **Google Drive** no topo superior direito da barra de navegação.
3. Cole o seu **Google Client ID** no campo indicado e clique em **Salvar**.

---

## 🟢 Conectando e Ativando o Banco de Dados

1. Abra a aplicação no navegador (ex: `http://localhost:3000`).
2. Clique no botão **Google Drive** no canto superior direito.
3. No modal, confirme que a chave está identificada (badge verde `Definido em env.js` ou azul `Salvo no Navegador`).
4. Clique no botão preto **Conectar com Google Drive**.
5. Na janela de autorização do Google:
   * Selecione a sua conta Google.
   * Se aparecer o aviso de segurança *"O Google não verificou este app"* (*Google hasn't verified this app*), clique na palavra **`Continue`** à esquerda (aviso padrão porque o app é pessoal e está em modo de desenvolvimento).
   * Marque a caixinha permitindo acesso à pasta de dados do aplicativo e clique em **Permitir** (*Allow*).
6. A janela fechará automaticamente e o indicador no cabeçalho mudará para **🟢 Verde ("Drive Conectado")**, exibindo seu avatar, e-mail e a hora da última sincronização.

Pronto! Todas as alterações feitas na aplicação agora são salvas de forma automática e descentralizada na sua própria nuvem do Google Drive!

