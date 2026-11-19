# Decisões pendentes — Bagre Robô Maker

Registro das decisões de infraestrutura e de processo que dependem do responsável.

**Última atualização:** 19/11/2026, durante a Issue #9 (publicação no GitHub Pages).

> A análise original de cada questão (opções, consequências e passos) está no histórico do Git deste arquivo, no commit `186861a`.

## 1. Situação atual do repositório

| Item | Estado |
|------|--------|
| Visibilidade | **Público** |
| Branch padrão | `main` |
| `main` | `d182873`, com o mesmo conteúdo da `dev` |
| `dev` | `7322438` (merge do PR #7) |
| Issues | #1 e #3 fechadas e integradas; #9 (publicação) em andamento |
| Branches já integradas | `claude/laughing-einstein-6xy9bf`, `feat/1-estrutura-inicial-do-projeto`, `feat/3-interface-principal-e-navegacao` |
| Proteção de branches | Nenhuma (`main` e `dev` sem proteção) |
| GitHub Pages | Ativado com a origem **"Deploy from a branch"**: publica os arquivos sem build e o site fica **em branco** (ver P1) |
| GitHub Actions | Workflow `.github/workflows/deploy.yml` em revisão na Issue #9; na `main`, só a execução automática "pages build and deployment" |

## 2. Decisões resolvidas

| # | Questão | Resolução |
|---|---------|-----------|
| 1 | Visibilidade do repositório / plano do GitHub | O repositório está **público**, o que permite o GitHub Pages no plano gratuito. A verificação do plano pago deixou de ser necessária. |
| 2 | Criação de `main` e `dev` | Criadas. A `main` saiu do commit atualizado da documentação (`186861a`) e a `dev` saiu da `main`. |
| 3 | Branch padrão | Alterada para `main` pelo responsável. |
| A | Onde versionar a documentação inicial | Commit na branch de trabalho inicial antes de criar a `main`. |
| B | Local dos relatórios | `docs/relatorios/`, versionando só os relatórios relevantes e permanentes (`AGENTS.md`, seção 12.1). |
| C | Prefixos de branch | `feat/`, `fix/`, `refactor/` e `docs/` (este último aprovado em 18/11/2026), sempre a partir da `main`, com PR para a `dev` (`AGENTS.md`, seções 9 e 10). |
| E | Versionamento dos `TASKS-[n].md` | **Opção A** (18/11/2026): o `TASKS` fica só local e é ignorado pelo Git (`TASKS-*.md` no `.gitignore`); o registro permanente fica no relatório final. O `TASKS-1.md` e o `TASKS-3.md` foram retirados; o conteúdo está no histórico do Git (`d2c8872` e `4ecee67`). |
| D | Stack e verificações | Stack aprovada e verificações obrigatórias `tsc`, ESLint e build (`AGENTS.md`, seção 6). |
| F | ESLint obrigatório (antiga P5) | **Sim** (19/11/2026, Issue #9): `npm run lint` obrigatório e executado pelo workflow em todo PR (`AGENTS.md`, seções 6.3 e 14). |

## 3. Pendências

| # | Pendência | Quem executa | Bloqueia |
|---|-----------|--------------|----------|
| P1 | Trocar a origem do GitHub Pages para "GitHub Actions" | Responsável | Publicação do site |
| P2 | Workflow de publicação | Claude Code (Issue #9, em revisão) | Publicação do site |
| P3 | Proteger as branches `main` e `dev` | Responsável | Nada (recomendado) |
| P4 | Apagar as branches já integradas | Responsável | Nada (opcional) |
| P6 | Atualizar o `AGENTS.md` com a visibilidade pública | Responsável decide; Claude Code executa | Nada |
| P7 | Local deste arquivo | Responsável | Nada |
| P8 | Confirmar o `verify:modules` no Node 20.19 | Workflow da Issue #9 (Node.js 20.19 na matriz) | Nada |
| P9 | Atualização do TypeScript 7 | Responsável | Nada |
| P10 | Conteúdo dos módulos | Equipe do projeto | Issues de conteúdo |

### P1 — Trocar a origem do GitHub Pages

- **Situação:** o Pages foi ativado com a origem **"Deploy from a branch"** (execução automática "pages build and deployment" sobre o commit `d182873` da `main`). Nesse modo, o GitHub publica os arquivos do repositório **sem build**. O `index.html` de desenvolvimento carrega `/src/main.tsx`, que não existe no endereço publicado e só funciona depois do build do Vite. Resultado: página em branco.
- **O que fazer:** em *Settings → Pages → Build and deployment → Source*, trocar para **GitHub Actions**, antes do merge da Issue #9 na `main`.
- **Resultado esperado:** com a origem certa e o workflow na `main`, o site fica em `https://heloabrantessb.github.io/bagre-robo-maker/`.

### P2 — Workflow de publicação

- **Situação:** implementado na Issue #9 (`.github/workflows/deploy.yml`), em revisão.
- **Como funciona:**
  - nos PRs para a `dev` e a `main`: verificações e build no Node.js 20.19 e 22, sem publicar;
  - no push na `main` e no disparo manual: verificações, build e publicação.
- **Depende de:** P1, para a publicação funcionar depois do merge na `main`.

### P3 — Proteção de branches

- **Recomendação:** em *Settings → Branches* (ou *Rules*), proteger a `main` e a `dev`:
  - exigir PR;
  - bloquear push direto e force push;
  - bloquear a exclusão das duas branches.
- **Por quê:** reforça na prática as regras da seção 10 do `AGENTS.md`.

### P4 — Branches já integradas

- **Branches:** `claude/laughing-einstein-6xy9bf`, `feat/1-estrutura-inicial-do-projeto` e `feat/3-interface-principal-e-navegacao`. Todo o conteúdo delas já está na `main`.
- **O que fazer:** o responsável pode apagá-las no GitHub. Isso é opcional, e o Claude Code não apaga branches sem autorização.

### P6 — Visibilidade no `AGENTS.md`

- **Situação:** a seção 15 do `AGENTS.md` ainda diz que o repositório "continua **privado**" e que haveria auditoria antes de qualquer mudança de visibilidade. O repositório agora é público.
- **O que fazer:** atualizar o `AGENTS.md` e registrar se a auditoria de conteúdo foi feita. Este arquivo não tem esse registro.

### P7 — Local deste arquivo

- **Situação:** pela seção 12.1 do `AGENTS.md`, registros de decisões permanentes ficam em `docs/relatorios/`. Este arquivo continua na raiz.
- **O que decidir:**
  - mantê-lo na raiz, como documento vivo de pendências; ou
  - movê-lo para `docs/relatorios/`.

### P8 — `verify:modules` no Node 20.19

- **Situação:** o `npm run verify:modules` foi validado no Node 22.23.5, com e sem a execução de TypeScript. Isso simula o Node 20.19 e o 22.12 a 22.17, mas o script não foi executado num Node 20.19 real.
- **Encaminhamento:** o workflow da Issue #9 roda o `verify:modules` (e as demais verificações) num Node.js 20.19 real em todo PR. A pendência fica resolvida quando esse job passar.

### P9 — TypeScript 7

- **Situação:** o TypeScript está fixado em `~6.0.3`, porque o `typescript-eslint` não suporta a versão 7.
- **O que fazer:** avaliar a atualização numa Issue própria quando houver suporte.

### P10 — Conteúdo dos módulos

Itens listados no `AGENTS.md`, seção 15:
- código C++ oficial do robô;
- componentes, esquema elétrico e ligações;
- link do Tinkercad;
- conteúdo do Diário de Bancada;
- quiz e desafios;
- regras da máquina de estados;
- diferenças entre o Modo Aluno e o Modo Professor;
- distribuição de tempo da aula;
- identidade visual oficial, incluindo logotipo e favicon.

## 4. Próximos passos sugeridos

1. Trocar a origem do Pages para "GitHub Actions" (P1) e integrar a Issue #9 (P2), para que a plataforma fique acessível aos participantes.
2. Proteger a `main` e a `dev` (P3).
3. Decidir P6 e P7 e atualizar a documentação numa única tarefa.
4. Fornecer o conteúdo dos módulos (P10) para as próximas Issues.
