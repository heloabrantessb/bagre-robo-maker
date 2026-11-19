# Relatório final — Issue #9: publicação no GitHub Pages

**Data:** 19/11/2026

## 1. Identificação

| Campo | Valor |
|-------|-------|
| Issue | [#9 — Publicar a plataforma no GitHub Pages com GitHub Actions](https://github.com/heloabrantessb/bagre-robo-maker/issues/9) |
| Branch | `feat/9-publicacao-github-pages`, criada a partir da `main` (`d182873`) |
| Pull Request | Aberto para a `dev` (link registrado na seção 8) |
| Planejamento | `TASKS-9.md`, local e não versionado (`AGENTS.md`, seção 12.1); resumo na seção 2 |

## 2. Resumo do planejamento aprovado

Aprovado pelo responsável em 19/11/2026, com as decisões abaixo, todas conforme as recomendações:

| # | Decisão |
|---|---------|
| D1 | O workflow também valida os PRs para a `dev` e para a `main` (verificações e build, sem publicar) |
| D2 | A validação roda no Node.js 20.19 e 22, os extremos da faixa do `engines` |
| D3 | O ESLint passa a ser verificação obrigatória e etapa do workflow |
| D4 | As ações oficiais são fixadas pela versão principal (*major*) |
| D5 | A Issue foi criada pelo Claude Code com o texto aprovado |

## 3. Diagnóstico que motivou a Issue

Antes da implementação, o site em `https://heloabrantessb.github.io/bagre-robo-maker/` aparecia **em branco**. A causa foi identificada pelas execuções do GitHub Actions:
- a única execução era a "pages build and deployment" (evento `dynamic`, commit `d182873` da `main`);
- isso indica que o Pages foi ativado com a origem **"Deploy from a branch"**;
- nesse modo, o GitHub publica os arquivos do repositório sem build;
- o `index.html` de desenvolvimento carrega `/src/main.tsx`, caminho absoluto fora de `/bagre-robo-maker/` e que só funciona com o build do Vite;
- resultado: sobra apenas o `<div id="root">` vazio.

**Correção:** o workflow desta Issue gera e publica o `dist/`. O responsável precisa trocar a origem do Pages para **"GitHub Actions"** (*Settings → Pages → Build and deployment → Source*).

## 4. O que foi implementado

### Workflow `.github/workflows/deploy.yml`

| Evento | Jobs |
|--------|------|
| Pull Request para `dev` ou `main` | "Verificações e build" no Node.js 20.19 e 22: `npm ci`, `typecheck`, `lint`, `verify:modules`, `build`. **Sem publicação.** |
| Push na `main` | Mesmas verificações; envio do `dist/` como artefato (só no Node.js 22); job "Publicar no GitHub Pages" com `actions/deploy-pages` |
| Disparo manual na `main` | Igual ao push na `main` |

- **Permissões:**
  - `contents: read` no nível do workflow;
  - `pages: write` e `id-token: write` só no job de publicação.
- **Concorrência:**
  - execuções antigas de um mesmo PR são canceladas;
  - publicações na `main` nunca são interrompidas.
- **Ações:** `actions/checkout@v7`, `actions/setup-node@v7` (com cache do npm), `actions/upload-pages-artifact@v5` e `actions/deploy-pages@v5`. As versões e as entradas usadas (`node-version`, `cache`, `path`) foram conferidas no `action.yml` de cada versão.
- **Sem `actions/configure-pages`:** o `base` já está fixo no Vite, e essa ação pode ativar o Pages automaticamente, o que é uma configuração que cabe ao responsável.

### Documentação

- **`AGENTS.md`:**
  - seção 6.3: ESLint obrigatório, e o workflow do PR passa a fazer parte das verificações;
  - seção 6.4: publicação pelo workflow e alerta sobre a origem "Deploy from a branch";
  - seção 14: critério 2 atualizado.
- **`CLAUDE.md`:** verificações obrigatórias com o ESLint e conferência do workflow no PR.
- **`README.md`:** nova seção "Publicação" com o endereço, os eventos e o pré-requisito.
- **`DECISOES-PENDENTES.md`:**
  - P1 reescrita (trocar a origem do Pages);
  - P2 em revisão;
  - P5 resolvida (decisão F);
  - P8 encaminhada ao workflow.

Nenhuma dependência nova e nenhuma alteração na aplicação.

## 5. Arquivos

| Arquivo | Ação |
|---------|------|
| `.github/workflows/deploy.yml` | Criado |
| `AGENTS.md` | Modificado |
| `CLAUDE.md` | Modificado |
| `README.md` | Modificado |
| `DECISOES-PENDENTES.md` | Modificado |
| `docs/relatorios/2026-11-19-issue-9-publicacao-github-pages.md` | Criado (este relatório) |

## 6. Commits

| SHA | Mensagem |
|-----|----------|
| `f5b803c` | `feat: adicionar workflow de publicação no GitHub Pages` |
| `468a6c8` | `docs: tornar o ESLint verificação obrigatória e registrar a publicação` |
| `551cb2f` | `docs: documentar a publicação no GitHub Pages no README` |
| `7a0d3de` | `docs: atualizar decisões pendentes com a situação da publicação` |
| último | `docs: adicionar relatório da Issue 9` |

## 7. Validações

| # | Validação | Como | Resultado |
|---|-----------|------|-----------|
| V1 | Sintaxe e estrutura do workflow | Leitura com PyYAML, já disponível no ambiente, conferindo gatilhos, permissões, matriz, condições e etapas | OK |
| V1b | Entradas das ações | Leitura do `action.yml` das versões `checkout` v7.0.1, `setup-node` v7.1.0, `upload-pages-artifact` v5.0.0 e `deploy-pages` v5.0.1 | OK |
| V2 | Comandos do projeto (Node.js 22.23.5 local) | `npm ci`, `npm run typecheck`, `npm run lint`, `npm run verify:modules`, `npm run build` | OK; `dist/` com `index.html`, `assets/` e `favicon.svg` |
| V3 | Job de build no GitHub (Node.js 20.19 e 22) | Execução disparada pelo próprio PR | Registrado na seção 8 |
| V4 | Publicação | Execução no push da `main`, depois do merge pelo responsável | Pendente (seção 9) |
| V5 | Site publicado | Rotas, link direto, recarga, rota inexistente e console | Pendente (seção 9) |

## 8. Resultado no Pull Request

*(Preenchido depois da execução do workflow no PR.)*

## 9. Pendências e limitações

- **Pré-requisito do responsável:** trocar a origem do Pages para "GitHub Actions" antes do merge na `main`. Se o merge acontecer antes, o job de publicação falha; basta trocar a origem e reexecutar o workflow (*Run workflow* na `main`).
- **V4 e V5** só podem ser feitas depois que o responsável integrar a `dev` na `main`.
- **Acesso ao site:** o ambiente do agente não acessa `github.io` (o proxy bloqueia o endereço). A V5 depende do responsável. Roteiro sugerido:
  1. abrir `https://heloabrantessb.github.io/bagre-robo-maker/` e ver a página "Visão geral";
  2. clicar em "Módulos" e abrir um módulo;
  3. recarregar a página do módulo;
  4. abrir `.../#/modulos/desafio-quiz` diretamente;
  5. abrir `.../#/rota-inexistente` e ver "Página não encontrada";
  6. conferir o console do navegador (F12) sem erros.
- **Fora desta Issue (ver `DECISOES-PENDENTES.md`):**
  - P3: proteção de branches;
  - P6: visibilidade no `AGENTS.md`;
  - P7: local do arquivo de decisões.
