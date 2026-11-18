# Relatório final — Issue #3: interface principal e navegação

**Data:** 18/11/2026

## 1. Identificação

| Campo | Valor |
|-------|-------|
| Issue | [#3 — Implementar interface principal e navegação entre módulos](https://github.com/heloabrantessb/bagre-robo-maker/issues/3) |
| Planejamento | `TASKS-3.md` (raiz do repositório), aprovado em 18/11/2026 |
| Branch | `feat/3-interface-principal-e-navegacao`, criada a partir de `main` (`713884b`) |
| Pull Request | Aberto para a `dev`; o link é registrado no `TASKS-3.md` |

## 2. Resumo

A interface provisória da Issue #1 foi substituída pela interface principal, seguindo a identidade visual aprovada a partir da imagem de referência:

- **Layout:** cabeçalho verde ("Bagre Robô Maker — Plataforma Educacional"), navegação azul-marinho ("Visão geral" e "Módulos") com indicação da área ativa, fundo cinza-claro e cartões brancos.
- **Visão geral (`/`):**
  - apresentação, duração e público da aula;
  - os 8 objetivos educacionais;
  - os cinco módulos em cartões;
  - o botão "Começar pelo Módulo 1".
- **Módulos (`/modulos`):** os cinco módulos na sequência didática.
- **Módulo (`/modulos/:slug`):** página provisória com:
  - lista dos módulos (coluna lateral no desktop, faixa compacta no celular e no tablet);
  - indicador estático "Módulo n de 5";
  - aviso "Conteúdo em preparação";
  - navegação para o módulo anterior e o próximo.
- **Melhorias da Issue #1:** a página volta ao topo ao trocar de rota, e o link "Pular para o conteúdo" não sobrepõe mais o cabeçalho.

Todos os textos vêm do `AGENTS.md`, seções 1 a 3 (decisão D3). Nenhum conteúdo didático foi implementado.

## 3. Decisões aplicadas (aprovadas no `TASKS-3.md`)

| # | Decisão |
|---|---------|
| D1 | Navegação com "Visão geral" e "Módulos"; as abas de Circuito, Código e Quiz ficam para as Issues dessas funcionalidades |
| D2 | Indicador de posição na sequência ("Módulo n de 5"), sem progresso individual |
| D3 | Textos apenas do `AGENTS.md`, seções 1 a 3 |
| D4 | Subtítulo "Plataforma Educacional" |
| D5 | Fonte padrão do sistema, sem fontes externas |

### Paleta (tokens em `src/styles/index.css`)

`brand` `#18684b`, `brand-strong` `#12553d`, `brand-soft` `#e3f1ea`, `brand-light` `#6ee7b7`, `ink` `#1f2c3a`, `ink-soft` `#2c3b4b`, `surface-muted` `#eff1f3`, `line` `#dfe1e5`.

## 4. Arquivos

| Arquivo | Ação |
|---------|------|
| `TASKS-3.md` | Criado |
| `src/styles/index.css` | Modificado: tokens `@theme` e estilo base do `body` |
| `src/data/modules.ts` | Modificado: `TOTAL_MODULES`, `getModulePosition`, `getAdjacentModules` |
| `src/components/layout/AppLayout.tsx` | Modificado: novo cabeçalho, navegação, volta ao topo e link de pular |
| `src/components/layout/MainNavigation.tsx` | Criado |
| `src/components/layout/ScrollToTop.tsx` | Criado |
| `src/components/modules/ModuleCard.tsx` | Criado |
| `src/components/modules/ModuleSidebar.tsx` | Criado |
| `src/components/modules/ModulePosition.tsx` | Criado |
| `src/components/modules/ModulePager.tsx` | Criado |
| `src/components/BackToHomeLink.tsx` | Modificado: visual do tema |
| `src/pages/HomePage.tsx` | Modificado: página de apresentação |
| `src/pages/ModulesPage.tsx` | Criado |
| `src/pages/ModulePage.tsx` | Modificado: layout de módulo |
| `src/pages/NotFoundPage.tsx` | Modificado: visual do tema |
| `src/routes/AppRoutes.tsx` | Modificado: rota `/modulos` |
| `README.md` | Modificado: rotas e estrutura |
| `docs/relatorios/2026-11-18-issue-3-interface-principal.md` | Criado (este relatório) |

Nenhum arquivo foi removido. Nenhuma dependência foi adicionada (`package.json` e `package-lock.json` inalterados).

## 5. Commits

| SHA | Mensagem |
|-----|----------|
| `70b27bc` | `docs: adicionar planejamento TASKS-3 da interface principal` |
| `8b68bec` | `feat: adicionar tokens de cor da identidade visual` |
| `4d4d18b` | `feat: adicionar funções de sequência dos módulos` |
| `f08c3a3` | `feat: implementar cabeçalho e navegação principal` |
| `48ea7cd` | `feat: criar página de módulos com cartões de acesso` |
| `1c6197c` | `feat: implementar página inicial de apresentação` |
| `6558cf1` | `feat: implementar página provisória de módulo com navegação sequencial` |
| `c7eaf0a` | `feat: ajustar página não encontrada ao tema` |
| `fbb3e13` | `docs: atualizar rotas no README` |
| último | `docs: atualizar TASKS-3 e adicionar relatório da Issue 3` |

## 6. Testes e validações

As 17 validações planejadas (V1 a V17) passaram, num total de 62 verificações automatizadas no build de produção. O detalhamento está no `TASKS-3.md`, seção 11.2.

| Verificação | Resultado |
|-------------|-----------|
| `npm run typecheck` | Sem erros |
| `npm run lint` | Sem erros nem avisos |
| `npm run build` | Sem erros; JS 87,01 kB e CSS 4,48 kB (gzip) |
| `npm run preview` | Funcionando em `/bagre-robo-maker/` |
| Navegação (cabeçalho, 5 módulos, anterior/próximo, voltar do navegador, link direto, recarga, 404) | Funcionando com `HashRouter` |
| Responsividade (360 a 1440 px) | Sem rolagem horizontal; lista lateral ≥ 1024 px |
| Contraste (medido no navegador) | De 5,81:1 a 14,19:1 (WCAG AA) |
| Teclado | Link de pular, foco visível em todos os links, ativação por Enter |
| Volta ao topo | Funcionando |
| Console | Sem erros |

As validações no navegador usaram o Playwright do ambiente do agente, sem adicioná-lo ao projeto. As capturas de tela foram enviadas ao responsável fora do repositório.

## 7. Problemas encontrados durante a implementação

- **Rolagem horizontal no celular:** a página de módulo chegava a 699 px de largura em telas de 390 px. A causa eram os textos para leitores de tela (`sr-only`) dentro da faixa com rolagem interna. A correção foi aplicar `relative` aos links, e o problema foi resolvido antes do commit.
- **Duas falhas iniciais do script de validação** (foco no `<body>` após o último link e página curta demais para rolar) eram limitações do próprio script e foram corrigidas nele. Não havia problema na aplicação.

## 8. Pendências e limitações

- **Modo Aluno/Professor (RF03):** fora desta Issue.
- **Abas Circuito & Hardware, Código C++ e Quiz:** previstas para as Issues de cada funcionalidade (D1).
- **Logotipo oficial e imagens:** continuam pendentes; o ícone `Fish` do Lucide React é provisório.
- **Favicon:** continua o provisório do Vite.
- **`DECISOES-PENDENTES.md`:** continua desatualizado (tarefa à parte).
- **ESLint obrigatório?** Continua a decisão sobre tornar o ESLint verificação obrigatória no `AGENTS.md`; a Issue #3 já o exigiu e ele passa sem apontamentos.
- **Publicação no GitHub Pages:** continua fora do escopo.
