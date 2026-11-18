# TASKS-1 — Estrutura inicial do projeto

> **Status:** planejamento **aprovado** pelo responsável em 18/11/2026. Implementação em andamento na branch `feat/1-estrutura-inicial-do-projeto`.
>
> As decisões D1 a D8 (seção 12) foram aprovadas conforme as propostas: auxiliares do ESLint instalados; Prism.js adiado; rota provisória de módulos; slugs propostos; `README.md` curto; `DECISOES-PENDENTES.md` fora desta Issue; campo `engines` no `package.json`; prefixo `chore:`. A aprovação do plano inclui o envio da branch e a abertura do PR para a `dev`.

## 1. Identificação da Issue

| Campo | Valor |
|-------|-------|
| Issue | [#1 — Configurar estrutura inicial com Vite, React, TypeScript, Tailwind CSS e React Router](https://github.com/heloabrantessb/bagre-robo-maker/issues/1) |
| Estado | Aberta, sem comentários |
| Branch prevista | `feat/1-estrutura-inicial-do-projeto` (criada a partir da `main`) |
| Destino do PR | `dev` |
| Relatório final previsto | `docs/relatorios/AAAA-MM-DD-issue-1-estrutura-inicial.md` |

## 2. Objetivo da implementação

Criar a base técnica do Bagre Robô Maker como aplicação web estática, usando a stack aprovada (`AGENTS.md`, seção 6). Ao final, o projeto deve:

- compilar e rodar localmente;
- usar `HashRouter` e a base `/bagre-robo-maker/`;
- ter uma página inicial mínima;
- estar organizado para receber os cinco módulos educacionais, **sem implementá-los**.

## 3. Diagnóstico da estrutura atual

Análise feita em 18/11/2026, depois de um `git fetch`.

### 3.1 Git e GitHub

| Item | Situação |
|------|----------|
| Branches remotas | `main`, `dev` e `claude/laughing-einstein-6xy9bf` |
| `main` e `dev` | As duas apontam para `186861a` (`docs: consolidar stack, fluxo de entregas e decisões pendentes`), sem divergência entre si |
| Branch padrão | `main` |
| Branch local atual | `claude/laughing-einstein-6xy9bf`, também em `186861a`, com a árvore de trabalho limpa (exceto por este rascunho) |
| Visibilidade | Privado |
| GitHub Pages | Não configurado (fora do escopo desta Issue) |
| GitHub Actions | Nenhum workflow |
| Branches `feat/*` | Nenhuma |

### 3.2 Arquivos existentes

```
.
├── AGENTS.md
├── CLAUDE.md
├── DECISOES-PENDENTES.md
└── docs/
    └── relatorios/
        └── 2026-11-18-revisao-da-documentacao.md
```

- Não há `package.json`, `package-lock.json`, `node_modules/`, configuração do Vite, TypeScript, Tailwind ou ESLint, `src/`, `public/`, `index.html` nem `.gitignore`.
- **Nenhuma configuração ou dependência anterior** que conflite com o escopo.

### 3.3 Ambiente local

- Node.js `v22.23.5` e npm `10.9.9`, compatíveis com as versões atuais do Vite.

### 3.4 Conflitos identificados

- **Nenhum conflito de arquivos.** Os arquivos da Issue são todos novos.
- **Risco na inicialização:** o comando `npm create vite@latest .` em um diretório que já tem arquivos pode oferecer a opção de **apagar o conteúdo existente**. Isso apagaria `AGENTS.md`, `CLAUDE.md` e `docs/`. Por isso o template será gerado **fora do repositório** e só os arquivos necessários serão copiados (etapa B).
- **Documento desatualizado:** o `DECISOES-PENDENTES.md` ainda descreve `main` e `dev` como inexistentes. Corrigi-lo está fora do escopo desta Issue (ver seção 12, decisão D6).

## 4. Escopo e limitações

### Dentro do escopo

- [ ] Inicializar o projeto com Vite, React e TypeScript.
- [ ] Configurar o Tailwind CSS.
- [ ] Configurar o React Router com `HashRouter`.
- [ ] Instalar o Lucide React e usá-lo pelo menos uma vez, para comprovar que funciona.
- [ ] Organizar os diretórios.
- [ ] Configurar os scripts do `package.json`.
- [ ] Configurar o ESLint.
- [ ] Definir `base: '/bagre-robo-maker/'` no Vite.
- [ ] Criar a página inicial mínima.
- [ ] Preparar a estrutura para os cinco módulos: uma lista de dados com os títulos já documentados no `AGENTS.md`, seção 3.

### Fora do escopo (conforme a Issue)

- Conteúdo dos cinco módulos, conteúdo didático, circuitos, simuladores e quiz.
- Integração com o Tinkercad.
- Modo Aluno/Professor, Diário de Bancada e realce de código (Prism.js).
- Persistência, autenticação, banco de dados e backend.
- Configuração do GitHub Pages, workflows de publicação e CI/CD.
- Identidade visual definitiva (cores, logotipo, imagens), que ainda está pendente no `AGENTS.md`, seção 15.

### Limitações

- Os títulos dos módulos vêm do `AGENTS.md`. Nenhum outro texto técnico ou pedagógico será criado.
- O visual da página inicial será neutro e provisório, só para validar o Tailwind e o Lucide.

## 5. Dependências previstas

As versões exatas serão as estáveis disponíveis no momento da instalação e ficarão registradas no `package-lock.json`.

### 5.1 Dependências de execução (`dependencies`)

| Pacote | Finalidade | Na stack aprovada? |
|--------|------------|--------------------|
| `react` | Interface | Sim |
| `react-dom` | Renderização no navegador | Sim (parte do React) |
| `react-router` | Roteamento com `HashRouter` | Sim |
| `lucide-react` | Ícones | Sim |

> **Sobre o React Router:** a partir da versão 7, o pacote principal é `react-router`, que já exporta o `HashRouter`. O pacote `react-router-dom` passou a ser só uma reexportação. A proposta é usar `react-router` diretamente.

### 5.2 Dependências de desenvolvimento (`devDependencies`)

| Pacote | Finalidade | Situação |
|--------|------------|----------|
| `vite` | Build e servidor de desenvolvimento | Stack aprovada |
| `@vitejs/plugin-react` | Integração oficial do React com o Vite | Auxiliar obrigatório do Vite + React |
| `typescript` | Linguagem e `tsc` | Stack aprovada |
| `@types/react`, `@types/react-dom` | Tipos do React para TypeScript | Auxiliares obrigatórios do TypeScript + React |
| `tailwindcss` | Estilos | Stack aprovada |
| `@tailwindcss/vite` | Plugin oficial do Tailwind v4 para o Vite | Auxiliar obrigatório do Tailwind + Vite |
| `eslint` | Análise estática | Stack aprovada |
| `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals` | Regras de ESLint para TypeScript e React | **Auxiliares do ESLint. Fazem parte do template oficial do Vite, mas precisam de aprovação (decisão D1)** |

### 5.3 Não serão instaladas nesta Issue

- `prismjs`: será instalado na Issue que implementar a apresentação do código C++ (decisão D2).
- `vitest`: sem necessidade justificada ainda.
- Prettier, bibliotecas de componentes, bibliotecas de estado, `react-router-dom` ou qualquer outra ferramenta fora da stack.

## 6. Estrutura de diretórios proposta

```
.
├── public/
│   └── favicon.svg            # ícone do site (provisório)
├── src/
│   ├── main.tsx               # ponto de entrada: monta o React e o HashRouter
│   ├── App.tsx                # componente raiz: aplica o layout e as rotas
│   ├── routes/
│   │   └── AppRoutes.tsx      # definição centralizada das rotas
│   ├── pages/
│   │   ├── HomePage.tsx       # página inicial mínima
│   │   ├── ModulePage.tsx     # página provisória de módulo (decisão D3)
│   │   └── NotFoundPage.tsx   # rota não encontrada
│   ├── components/
│   │   └── layout/
│   │       └── AppLayout.tsx  # estrutura comum: cabeçalho, <main> e rodapé
│   ├── data/
│   │   └── modules.ts         # lista tipada dos 5 módulos (id, slug, título)
│   ├── styles/
│   │   └── index.css          # importação do Tailwind e estilos globais mínimos
│   └── assets/                # imagens importadas pelo código (vazio por ora)
├── index.html                 # HTML base (lang="pt-BR", título, viewport)
├── vite.config.ts             # Vite: plugins React e Tailwind, base
├── tsconfig.json              # referências de projeto TypeScript
├── tsconfig.app.json          # configuração do código da aplicação
├── tsconfig.node.json         # configuração dos arquivos de config (vite.config.ts)
├── eslint.config.js           # configuração do ESLint (flat config)
├── package.json
├── package-lock.json
└── .gitignore
```

### Para que serve cada diretório

| Diretório | Finalidade |
|-----------|------------|
| `public/` | Arquivos estáticos copiados sem processamento para o build (favicon e, no futuro, arquivos referenciados por URL fixa). |
| `src/routes/` | Rotas centralizadas num único lugar, para facilitar a inclusão dos módulos. |
| `src/pages/` | Uma página por rota. Os módulos futuros entram aqui ou em subpastas, por exemplo `pages/modules/`. |
| `src/components/` | Componentes compartilhados. `layout/` guarda a estrutura comum das páginas; componentes reutilizáveis futuros (botões, cartões, indicadores de situação) ficam ao lado. |
| `src/data/` | Dados estáticos tipados, como a lista de módulos. Separa o conteúdo da apresentação e prepara o terreno para os módulos, o quiz e o Diário de Bancada. |
| `src/styles/` | CSS global com a importação do Tailwind. |
| `src/assets/` | Imagens e recursos importados pelo código, otimizados pelo Vite no build. |
| Raiz | Arquivos de configuração (Vite, TypeScript, ESLint, npm, Git). |

**Princípio:** nada de camadas extras (serviços, contextos, hooks globais) sem necessidade real. As pastas novas só serão criadas quando uma Issue futura precisar delas.

### Rotas previstas

| Rota (`HashRouter`) | URL no Pages | Página |
|---------------------|--------------|--------|
| `/` | `/bagre-robo-maker/#/` | `HomePage` |
| `/modulos/:moduleSlug` | `/bagre-robo-maker/#/modulos/biomimetica-garrafa-pet` | `ModulePage` (provisória, decisão D3) |
| `*` | `/bagre-robo-maker/#/qualquer-coisa` | `NotFoundPage` |

Os slugs dos módulos são uma proposta (decisão D4): `biomimetica-garrafa-pet`, `eletronica-transistor-c1815`, `sensor-ultrassonico-sonar`, `programacao-espreita-ataque` e `desafio-quiz`.

## 7. Etapas de implementação

Só começam **depois da aprovação deste documento**.

### Etapa A — Preparação da branch

- [ ] Rodar `git fetch origin` e confirmar que a `main` local corresponde a `origin/main`.
- [ ] Confirmar que a árvore de trabalho está limpa, exceto pelo `TASKS-1.md`.
- [ ] Criar `feat/1-estrutura-inicial-do-projeto` a partir de `origin/main`.
- [ ] Adicionar o `TASKS-1.md` à branch.
- [ ] Commit: `docs: adicionar planejamento TASKS-1 da estrutura inicial`

### Etapa B — Inicialização com Vite, React e TypeScript

- [ ] Gerar o template oficial `react-ts` do Vite num diretório temporário, **fora do repositório**.
- [ ] Copiar para o repositório: `index.html`, `vite.config.ts`, os `tsconfig*.json`, `eslint.config.js`, `.gitignore`, `src/main.tsx` e `src/App.tsx`.
- [ ] Ajustar o `package.json`: nome `bagre-robo-maker`, `"private": true`, `"type": "module"` e os scripts da seção 9.
- [ ] Remover o conteúdo de demonstração do template: contador, logos e `App.css`.
- [ ] Ajustar o `index.html`: `lang="pt-BR"`, título "Bagre Robô Maker" e meta viewport.
- [ ] Rodar `npm install` para gerar o `package-lock.json`.
- [ ] Verificar: `npm run typecheck` e `npm run build`.
- [ ] Commit: `feat: inicializar projeto com Vite, React e TypeScript`

### Etapa C — Base do Vite

- [ ] Definir `base: '/bagre-robo-maker/'` no `vite.config.ts`.
- [ ] Verificar que o servidor de desenvolvimento responde em `/bagre-robo-maker/`.
- [ ] Verificar que os arquivos gerados em `dist/` usam o prefixo `/bagre-robo-maker/assets/`.
- [ ] Commit: `feat: configurar base do Vite para o GitHub Pages`

### Etapa D — Tailwind CSS

- [ ] Instalar `tailwindcss` e `@tailwindcss/vite`.
- [ ] Registrar o plugin no `vite.config.ts`.
- [ ] Criar `src/styles/index.css` com `@import "tailwindcss";` e importá-lo no `main.tsx`.
- [ ] Verificar que classes utilitárias aplicadas na página aparecem no build.
- [ ] Commit: `feat: configurar Tailwind CSS`

### Etapa E — React Router com `HashRouter`

- [ ] Instalar `react-router`.
- [ ] Envolver a aplicação com `HashRouter` no `main.tsx`.
- [ ] Criar `src/routes/AppRoutes.tsx` com as rotas da seção 6.
- [ ] Criar `HomePage`, `ModulePage` (provisória) e `NotFoundPage`.
- [ ] Commit: `feat: configurar React Router com HashRouter`

### Etapa F — Estrutura para os módulos, layout e Lucide React

- [ ] Instalar `lucide-react`.
- [ ] Criar `src/data/modules.ts` com o tipo `EducationalModule` e a lista dos 5 módulos (`id`, `slug`, `title`), usando só os títulos do `AGENTS.md`.
- [ ] Criar `AppLayout` com HTML semântico: `<header>`, `<main>`, `<footer>` e link "Pular para o conteúdo".
- [ ] Página inicial mínima com o nome do projeto, uma frase curta baseada no `AGENTS.md`, seção 1, e a lista dos módulos com links para as rotas provisórias.
- [ ] Usar pelo menos um ícone do Lucide React, importado individualmente, com `aria-hidden` quando for decorativo.
- [ ] `ModulePage` mostra o título do módulo e o aviso "Conteúdo em preparação". `NotFoundPage` mostra um link de volta ao início.
- [ ] Commit: `feat: criar layout e página inicial com lista de módulos`

### Etapa G — ESLint

- [ ] Revisar o `eslint.config.js` do template: ignorar `dist`, usar as regras recomendadas de TypeScript e de React Hooks.
- [ ] Rodar `npm run lint` e corrigir os apontamentos.
- [ ] Commit, se houver ajustes: `chore: ajustar configuração do ESLint`

### Etapa H — Validação completa (seção 10)

- [ ] Executar todos os critérios de validação e registrar os resultados.

### Etapa I — Encerramento

- [ ] Atualizar este `TASKS-1.md` com o andamento real e marcar os checklists.
- [ ] Criar o relatório final em `docs/relatorios/`.
- [ ] Commit: `docs: atualizar TASKS-1 e adicionar relatório da Issue 1`
- [ ] Enviar a branch e abrir o PR para a `dev`, com título e descrição em português e referência a `#1`.
- [ ] **Não realizar o merge.**

## 8. Arquivos que serão criados ou modificados

| Arquivo | Ação |
|---------|------|
| `TASKS-1.md` | Criar (já existe como rascunho local) |
| `package.json`, `package-lock.json` | Criar |
| `index.html` | Criar |
| `vite.config.ts` | Criar |
| `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` | Criar |
| `eslint.config.js` | Criar |
| `.gitignore` | Criar (`node_modules`, `dist`, `*.local`, arquivos de editor e logs) |
| `public/favicon.svg` | Criar (provisório) |
| `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts` | Criar |
| `src/routes/AppRoutes.tsx` | Criar |
| `src/pages/HomePage.tsx`, `ModulePage.tsx`, `NotFoundPage.tsx` | Criar |
| `src/components/layout/AppLayout.tsx` | Criar |
| `src/data/modules.ts` | Criar |
| `src/styles/index.css` | Criar |
| `docs/relatorios/AAAA-MM-DD-issue-1-estrutura-inicial.md` | Criar no encerramento |
| `README.md` | Criar **somente se aprovado** (decisão D5) |

**Não serão alterados:** `AGENTS.md`, `CLAUDE.md`, `DECISOES-PENDENTES.md` e o relatório já existente.

## 9. Comandos previstos

### Scripts do `package.json`

| Script | Comando | Finalidade |
|--------|---------|------------|
| `dev` | `vite` | Servidor de desenvolvimento |
| `typecheck` | `tsc -b` | Verificação de tipos (obrigatória) |
| `build` | `tsc -b && vite build` | Build de produção, com verificação de tipos |
| `lint` | `eslint .` | Análise estática |
| `preview` | `vite preview` | Servir o build localmente para validação |

### Comandos de execução

```bash
git fetch origin
git switch -c feat/1-estrutura-inicial-do-projeto origin/main
npm install
npm install react-router lucide-react
npm install -D tailwindcss @tailwindcss/vite
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
git push -u origin feat/1-estrutura-inicial-do-projeto
```

O template será gerado fora do repositório com `npm create vite@latest <diretorio-temporario> -- --template react-ts`, **nunca** na raiz do projeto.

## 10. Critérios de validação

| # | Validação | Como verificar | Resultado esperado |
|---|-----------|----------------|--------------------|
| V1 | Servidor de desenvolvimento | `npm run dev`, depois acessar `http://localhost:5173/bagre-robo-maker/` | Página inicial carrega sem erros no console |
| V2 | Verificação de tipos | `npm run typecheck` | Sai sem erros |
| V3 | ESLint | `npm run lint` | Sem erros; avisos tratados ou justificados |
| V4 | Build de produção | `npm run build` | Gera `dist/` sem erros |
| V5 | Base `/bagre-robo-maker/` | Inspecionar `dist/index.html` | Scripts e CSS referenciados como `/bagre-robo-maker/assets/...` |
| V6 | Preview | `npm run preview`, depois acessar `http://localhost:4173/bagre-robo-maker/` | Aplicação funciona servida a partir do build |
| V7 | Navegação com `HashRouter` | No preview, clicar em um módulo, depois voltar e avançar no navegador | A URL muda para `#/modulos/...` e a página correspondente aparece |
| V8 | Link direto e recarga | Abrir `http://localhost:4173/bagre-robo-maker/#/modulos/desafio-quiz` diretamente e recarregar a página | A página do módulo aparece, sem erro 404 |
| V9 | Rota inexistente | Acessar `#/rota-inexistente` | A `NotFoundPage` aparece |
| V10 | Tailwind CSS | Conferir os estilos aplicados no preview | Classes utilitárias funcionando |
| V11 | Lucide React | Conferir o ícone na página | Ícone renderizado |
| V12 | Responsividade | Larguras de 375 px e 1280 px | Sem rolagem horizontal |
| V13 | Teclado e acessibilidade básica | Navegar com Tab | Foco visível, link de pular conteúdo, `lang="pt-BR"` |
| V14 | Console | Abrir o console do navegador em todas as rotas | Nenhum erro |
| V15 | Lockfile | `git status` | `package-lock.json` versionado; `node_modules/` e `dist/` ignorados |

- **Não** será aberto o `dist/index.html` diretamente pelo sistema de arquivos.
- As validações V7 a V14 podem ser automatizadas com o Playwright **já instalado no ambiente de desenvolvimento do agente**, sem adicioná-lo ao projeto. As capturas de tela ficam fora do repositório.

## 11. Critérios de conclusão

- [ ] Todos os critérios de aceitação da Issue #1 foram atendidos.
- [ ] As validações V1 a V15 foram executadas, com os resultados registrados no relatório final.
- [ ] Nenhuma dependência fora da seção 5 foi adicionada.
- [ ] Nenhum conteúdo educacional além da página inicial mínima foi implementado.
- [ ] Os textos visíveis estão em português brasileiro e os identificadores em inglês.
- [ ] Os commits são atômicos, com mensagens em português e prefixos convencionais.
- [ ] O `TASKS-1.md` está atualizado e o relatório final está em `docs/relatorios/`.
- [ ] O PR está aberto para a `dev`, sem merge.

## 12. Riscos e decisões que dependem de aprovação

### Decisões

| # | Decisão | Proposta |
|---|---------|----------|
| **D1** | Aprovar os pacotes auxiliares do ESLint (`@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`) | **Aprovar.** São o conjunto mínimo do template oficial do Vite; sem eles o ESLint não analisa TypeScript nem React. |
| **D2** | Momento de instalar o Prism.js | **Adiar** para a Issue da apresentação de código C++, evitando uma dependência sem uso. |
| **D3** | Rota provisória `/modulos/:moduleSlug` com o aviso "Conteúdo em preparação" | **Aprovar.** Permite validar a navegação com `HashRouter` (V7 e V8) sem implementar conteúdo. A alternativa é ter só a página inicial e a 404, o que dificulta validar a navegação. |
| **D4** | Slugs das rotas dos módulos (seção 6) | **Aprovar** os slugs propostos, ou indicar outros. Eles fazem parte das URLs compartilhadas em aula. |
| **D5** | Criar um `README.md` curto (descrição, requisitos e comandos) | **Aprovar.** O repositório não tem README, e a Issue pede estrutura "documentada quando necessário". |
| **D6** | Atualizar o `DECISOES-PENDENTES.md`, que está desatualizado em relação a `main` e `dev` | Fazer **fora desta Issue**, numa tarefa de documentação própria. |
| **D7** | Fixar a versão do Node.js (campo `engines` no `package.json` ou arquivo `.nvmrc`) | **Opcional.** Recomendo `engines` com a versão mínima exigida pelo Vite instalado, o que ajuda no futuro workflow do Pages. |
| **D8** | Prefixo `chore:` para ajustes de configuração (Etapa G) | **Aprovar.** É um prefixo convencional, mas não está entre os exemplos do `AGENTS.md`. |

### Riscos

| Risco | Mitigação |
|-------|-----------|
| O template do Vite sobrescrever os arquivos existentes | Gerar o template fora do repositório e copiar só os arquivos necessários (seção 3.4). |
| Mudanças de API em versões recentes (React Router 7, Tailwind 4, ESLint 9 com flat config) | Seguir a documentação oficial da versão instalada e registrar as versões no relatório final. |
| Esquecer o `base` em links ou recursos | Usar sempre o roteamento (`Link`) e imports do Vite, nunca caminhos absolutos fixos; checar com V5 e V6. |
| Esta sessão do Claude Code está configurada para enviar alterações apenas à branch `claude/laughing-einstein-6xy9bf` | Enviar a branch `feat/1-estrutura-inicial-do-projeto` exige sua autorização explícita na aprovação deste plano. |
| O site ainda não pode ser publicado (Pages não configurado, repositório privado) | Fora do escopo. A validação é toda local, com `npm run preview`. |
