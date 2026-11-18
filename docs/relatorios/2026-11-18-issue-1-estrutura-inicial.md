# Relatório final — Issue #1: estrutura inicial do projeto

**Data:** 18/11/2026

## 1. Identificação

| Campo | Valor |
|-------|-------|
| Issue | [#1 — Configurar estrutura inicial com Vite, React, TypeScript, Tailwind CSS e React Router](https://github.com/heloabrantessb/bagre-robo-maker/issues/1) |
| Planejamento | `TASKS-1.md` (raiz do repositório), aprovado em 18/11/2026 |
| Branch | `feat/1-estrutura-inicial-do-projeto`, criada a partir de `main` (`186861a`) |
| Pull Request | [#2](https://github.com/heloabrantessb/bagre-robo-maker/pull/2), com destino à `dev`, aguardando revisão (sem merge pelo agente) |

## 2. Resumo

A base técnica do Bagre Robô Maker foi criada como aplicação estática com a stack aprovada:
- **Configuração:** Vite, React e TypeScript; Tailwind CSS v4; React Router com `HashRouter`; Lucide React; ESLint.
- **Publicação:** base `/bagre-robo-maker/`, compatível com o GitHub Pages.
- **Páginas:**
  - página inicial mínima com a lista dos cinco módulos;
  - rota provisória de módulo, com o aviso "Conteúdo em preparação";
  - página de rota não encontrada.

Nenhum conteúdo educacional foi implementado, e nenhum texto técnico sobre o robô foi criado. Os títulos dos módulos vêm do `AGENTS.md`, seção 3.

## 3. Dependências instaladas

| Pacote | Versão | Tipo |
|--------|--------|------|
| `react`, `react-dom` | 19.3.1 | execução |
| `react-router` | 8.5.2 | execução |
| `lucide-react` | 1.75.0 | execução |
| `vite` | 8.3.8 | desenvolvimento |
| `@vitejs/plugin-react` | 6.3.0 | desenvolvimento |
| `typescript` | 6.0.3 (`~6.0.3`) | desenvolvimento |
| `@types/react`, `@types/react-dom` | 19.3.0 | desenvolvimento |
| `tailwindcss`, `@tailwindcss/vite` | 4.3.5 | desenvolvimento |
| `eslint` | 10.15.0 | desenvolvimento |
| `@eslint/js` | 10.0.1 | desenvolvimento |
| `typescript-eslint` | 8.73.0 | desenvolvimento |
| `eslint-plugin-react-hooks` | 7.1.1 | desenvolvimento |
| `eslint-plugin-react-refresh` | 0.5.8 | desenvolvimento |
| `globals` | 17.14.0 | desenvolvimento |

`npm audit`: 0 vulnerabilidades. Não foram instalados: `prismjs` (adiado, decisão D2), `vitest`, `@types/node`, `oxlint`.

## 4. Arquivos criados

| Arquivo | Finalidade |
|---------|------------|
| `TASKS-1.md` | Planejamento e registro de execução |
| `README.md` | Requisitos, comandos, estrutura e rotas |
| `package.json`, `package-lock.json` | Dependências, scripts e `engines` (Node `^20.19.0 \|\| >=22.12.0`) |
| `index.html` | HTML base (`lang="pt-BR"`, título, descrição, viewport) |
| `vite.config.ts` | Plugins React e Tailwind; `base: '/bagre-robo-maker/'` |
| `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` | Configuração do TypeScript |
| `eslint.config.js` | ESLint (flat config) |
| `.gitignore` | Ignora `node_modules`, `dist`, `*.local`, logs e arquivos de editor |
| `public/favicon.svg` | Ícone provisório (do template do Vite) |
| `src/main.tsx` | Ponto de entrada com `HashRouter` |
| `src/App.tsx` | Componente raiz (layout + rotas) |
| `src/routes/AppRoutes.tsx` | Rotas `/`, `/modulos/:moduleSlug` e `*` |
| `src/pages/HomePage.tsx`, `ModulePage.tsx`, `NotFoundPage.tsx` | Páginas |
| `src/components/layout/AppLayout.tsx` | Cabeçalho, `<main>`, rodapé e link "Pular para o conteúdo" |
| `src/components/BackToHomeLink.tsx` | Link compartilhado de volta ao início |
| `src/data/modules.ts` | Tipo `EducationalModule`, lista dos 5 módulos e funções auxiliares |
| `src/styles/index.css` | Importação do Tailwind CSS |
| `src/assets/.gitkeep` | Mantém a pasta de recursos no Git |
| `docs/relatorios/2026-11-18-issue-1-estrutura-inicial.md` | Este relatório |

Nenhum arquivo existente foi modificado ou removido (`AGENTS.md`, `CLAUDE.md`, `DECISOES-PENDENTES.md` e o relatório anterior continuam intactos).

## 5. Commits

| SHA | Mensagem |
|-----|----------|
| `b8acae5` | `docs: adicionar planejamento TASKS-1 da estrutura inicial` |
| `0a70ab8` | `feat: inicializar projeto com Vite, React e TypeScript` |
| `8845e37` | `feat: configurar base do Vite para o GitHub Pages` |
| `7df9edc` | `feat: configurar Tailwind CSS` |
| `16226e6` | `feat: configurar React Router com HashRouter` |
| `24d0391` | `feat: criar layout e página inicial com lista de módulos` |
| `3f2c744` | `chore: fixar TypeScript 6.0 para compatibilidade com o ESLint` |
| `45ba2a1` | `chore: configurar ESLint` |
| `0fab2fc` | `docs: adicionar README com requisitos, comandos e estrutura` |
| `e2a78f9` | `docs: atualizar TASKS-1 e adicionar relatório da Issue 1` |
| último | `docs: registrar link do PR no TASKS-1 e no relatório` |

## 6. Testes e validações

Todas as 15 validações planejadas (V1 a V15) passaram. O detalhamento está no `TASKS-1.md`, seção 13.3. Em resumo:

| Verificação | Resultado |
|-------------|-----------|
| `npm run typecheck` (`tsc -b`) | Sem erros |
| `npm run lint` | Sem erros nem avisos |
| `npm run build` | Sem erros; JS 84,79 kB e CSS 3,39 kB (gzip) |
| Base `/bagre-robo-maker/` no build | Confirmada |
| `npm run dev` e `npm run preview` | Funcionando |
| Navegação `HashRouter` (clique, voltar, avançar, link direto, recarga, rota inexistente) | Funcionando, sem 404 |
| Responsividade (375 px e 1280 px) | Sem rolagem horizontal |
| Teclado e acessibilidade básica | Link de pular, foco visível, `lang="pt-BR"` |
| Console do navegador | Sem erros |

As validações no navegador foram automatizadas com o Playwright do ambiente do agente, sem adicioná-lo ao projeto. O `dist/index.html` não foi aberto diretamente pelo sistema de arquivos.

## 7. Desvios do plano

1. **ESLint configurado manualmente:** o template atual do Vite traz `oxlint` em vez do ESLint, e o `oxlint` não foi adotado.
2. **TypeScript fixado em `~6.0.3`:** o template instala o TypeScript 7, mas o `typescript-eslint` ainda não o suporta.
3. **`@types/node` não instalado:** não é necessário e não estava aprovado.
4. **`src/data/modules.ts` antecipado** da etapa F para a etapa E.
5. **`react-router` na versão 8.5.2** (o plano citava a 7), com a mesma API usada.
6. **Componente `BackToHomeLink`**, não previsto, para evitar duplicação e importação circular.

## 8. Pendências e limitações

- **TypeScript 7:** quando o `typescript-eslint` passar a suportá-lo, a atualização pode ser avaliada numa Issue própria.
- **ESLint obrigatório?** Decidir se o `npm run lint` passa a ser verificação obrigatória (hoje passa sem erros).
- **Favicon e identidade visual:** o favicon é o provisório do Vite; a identidade visual continua pendente (`AGENTS.md`, seção 15).
- **Publicação:** GitHub Pages e workflow de publicação continuam fora do escopo; dependem da configuração do Pages pelo responsável e de uma Issue própria.
- **`DECISOES-PENDENTES.md`:** está desatualizado em relação a `main` e `dev` (decisão D6, tarefa à parte).
- **Rolagem ao navegar:** o `HashRouter` não restaura a rolagem ao topo automaticamente. Hoje as páginas são curtas e isso não afeta o uso; deve ser avaliado quando os módulos ganharem conteúdo longo.
