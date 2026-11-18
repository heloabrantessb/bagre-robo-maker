# Decisões pendentes — Bagre Robô Maker

Registro das decisões de infraestrutura e de processo que dependem do responsável.

**Última atualização:** 18/11/2026, após o merge da `dev` na `main` (PR #6).

> A análise original de cada questão (opções, consequências e passos) está no histórico do Git deste arquivo, no commit `186861a`.

## 1. Situação atual do repositório

| Item | Estado |
|------|--------|
| Visibilidade | **Público** |
| Branch padrão | `main` |
| `main` | `b2dcf7c`, com o mesmo conteúdo da `dev` |
| `dev` | `614831a` (merge do PR #5) |
| Issues | #1 e #3 fechadas e integradas |
| Branches já integradas | `claude/laughing-einstein-6xy9bf`, `feat/1-estrutura-inicial-do-projeto`, `feat/3-interface-principal-e-navegacao` |
| Proteção de branches | Nenhuma (`main` e `dev` sem proteção) |
| GitHub Pages | **Não configurado** |
| GitHub Actions | Nenhum workflow |

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
| D | Stack e verificações | Stack aprovada e verificações obrigatórias `tsc` e build (`AGENTS.md`, seção 6). |

## 3. Pendências

| # | Pendência | Quem executa | Bloqueia |
|---|-----------|--------------|----------|
| P1 | Ativar o GitHub Pages com origem "GitHub Actions" | Responsável | Publicação do site |
| P2 | Criar o workflow de publicação | Claude Code, numa Issue própria | Publicação do site |
| P3 | Proteger as branches `main` e `dev` | Responsável | Nada (recomendado) |
| P4 | Apagar as branches já integradas | Responsável | Nada (opcional) |
| P5 | Tornar o ESLint verificação obrigatória? | Responsável | Nada |
| P6 | Atualizar o `AGENTS.md` com a visibilidade pública | Responsável decide; Claude Code executa | Nada |
| P7 | Local deste arquivo | Responsável | Nada |
| P8 | Confirmar o `verify:modules` no Node 20.19 | Responsável ou Claude Code | Nada |
| P9 | Atualização do TypeScript 7 | Responsável | Nada |
| P10 | Conteúdo dos módulos | Equipe do projeto | Issues de conteúdo |

### P1 — Ativar o GitHub Pages

- **O que fazer:** em *Settings → Pages → Build and deployment → Source*, selecionar **GitHub Actions**.
- **Por quê:** a publicação será feita por um workflow que gera o build do Vite e publica a pasta `dist/`. Sem essa configuração, a etapa de deploy falha.
- **Resultado esperado:** o site ficará em `https://heloabrantessb.github.io/bagre-robo-maker/`, compatível com o `base: '/bagre-robo-maker/'` já configurado.

### P2 — Workflow de publicação

- **O que fazer:** abrir uma Issue para criar `.github/workflows/deploy.yml`, disparado a cada push na `main` e também manualmente. O workflow roda `npm ci`, `npm run build`, envia o `dist/` e publica com `actions/deploy-pages`.
- **Depende de:** P1 para a validação final.
- **Observação:** com o workflow, cada merge da `dev` na `main` passa a atualizar o site automaticamente.

### P3 — Proteção de branches

- **Recomendação:** em *Settings → Branches* (ou *Rules*), proteger a `main` e a `dev`:
  - exigir PR;
  - bloquear push direto e force push;
  - bloquear a exclusão das duas branches.
- **Por quê:** reforça na prática as regras da seção 10 do `AGENTS.md`.

### P4 — Branches já integradas

- **Branches:** `claude/laughing-einstein-6xy9bf`, `feat/1-estrutura-inicial-do-projeto` e `feat/3-interface-principal-e-navegacao`. Todo o conteúdo delas já está na `main`.
- **O que fazer:** o responsável pode apagá-las no GitHub. Isso é opcional, e o Claude Code não apaga branches sem autorização.

### P5 — ESLint como verificação obrigatória

- **Situação:** a seção 6.3 do `AGENTS.md` define como obrigatórias só o `tsc` e o build. O ESLint fica a critério do responsável.
- **Na prática:** a Issue #3 já exigiu o `npm run lint` nos critérios de aceite, e o projeto passa sem apontamentos.
- **O que decidir:** se o `npm run lint` passa a ser obrigatório. Se sim, atualizar o `AGENTS.md`, seções 6.3 e 14.

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
- **O que fazer (opcional):** rodar `npm run verify:modules` num Node 20.19 para confirmar.

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

1. Ativar o Pages (P1) e abrir a Issue do workflow de publicação (P2), para que a plataforma fique acessível aos participantes.
2. Proteger a `main` e a `dev` (P3).
3. Decidir P5, P6 e P7 e atualizar a documentação numa única tarefa.
4. Fornecer o conteúdo dos módulos (P10) para as próximas Issues.
