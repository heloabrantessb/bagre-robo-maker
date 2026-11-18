# Relatório final — Issue #3: interface principal e navegação

**Data:** 18/11/2026

## 1. Identificação

| Campo | Valor |
|-------|-------|
| Issue | [#3 — Implementar interface principal e navegação entre módulos](https://github.com/heloabrantessb/bagre-robo-maker/issues/3) |
| Planejamento | `TASKS-3.md` (raiz do repositório), aprovado em 18/11/2026 |
| Branch | `feat/3-interface-principal-e-navegacao`, criada a partir de `main` (`713884b`) |
| Pull Request | [#5](https://github.com/heloabrantessb/bagre-robo-maker/pull/5), com destino à `dev`, aguardando revisão (sem merge pelo agente) |

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
| `517ad82` | `docs: atualizar TASKS-3 e adicionar relatório da Issue 3` |
| `1ad5ed4` | `docs: registrar link do PR no TASKS-3 e no relatório` |
| `e5f7fc9` | `fix: localizar módulos pelo id nas funções de sequência` (revisão) |
| `24c61b1` | `test: adicionar verificação das funções de sequência dos módulos` (revisão) |
| `6cd6fcd` | `docs: detalhar procedimento das validações e registrar ajustes da revisão` (revisão) |
| `1e9c0ba` | `fix: tornar verify:modules compatível com a faixa de Node.js declarada` (segunda revisão) |
| último | `docs: registrar ajuste de compatibilidade do verify:modules` (segunda revisão) |

## 6. Testes e validações

As 17 validações planejadas (V1 a V17) passaram. O detalhamento por item está no `TASKS-3.md`, seção 11.2. Elas foram feitas de três formas diferentes, que **não** devem ser confundidas com uma suíte de testes do projeto.

### 6.1 Comandos do projeto (reproduzíveis por qualquer pessoa)

Executados a partir da raiz do repositório, com as dependências do `package-lock.json` (`npm ci`):

| Validação | Comando | Resultado |
|-----------|---------|-----------|
| V1 | `npm run typecheck` | Sem erros |
| V2 | `npm run lint` | Sem erros nem avisos |
| V3 | `npm run build` | Sem erros; JS 87,03 kB e CSS 4,49 kB (gzip) após a revisão |
| — | `npm run verify:modules` | Todas as verificações passam em toda a faixa de Node.js suportada (adicionado na revisão; ver seção 9) |
| V4 (servidor) | `npm run preview` | Aplicação servida em `http://localhost:4173/bagre-robo-maker/` |

### 6.2 Validação pontual de navegador com Playwright (ambiente de trabalho do agente)

- **O que foi:** um script Node.js, executado no ambiente de trabalho do agente, onde o Playwright e o Chromium já estavam instalados globalmente. O Playwright **não** foi adicionado ao projeto, o script **não** é executado por nenhum comando do `package.json` nem por CI, e por isso **não é um teste automatizado versionado**.
- **Cobertura:** 62 verificações sobre o build de produção servido pelo `npm run preview`, cobrindo V4 (status da página), V5 a V15, V16 (erros no console) e V17.
- **Registro do procedimento:** o script foi anexado, sem alterações de lógica, em [`docs/relatorios/anexos/2026-11-18-issue-3-validacao-navegador.cjs`](anexos/2026-11-18-issue-3-validacao-navegador.cjs). O cabeçalho do arquivo traz os passos para reproduzir: `npm ci`, `npm run build`, `npx vite preview --port 4173 --strictPort` e `node docs/relatorios/anexos/2026-11-18-issue-3-validacao-navegador.cjs`.
- **Histórico das execuções:**
  1. A primeira execução teve 60/62 verificações aprovadas. As duas falhas eram do próprio script (seção 7), que foi corrigido.
  2. A segunda execução teve 62/62.
  3. Depois das alterações da revisão, uma nova execução também teve 62/62.

| Validação | O que o script verifica |
|-----------|-------------------------|
| V5 | `aria-current="page"` no item certo da navegação em `/`, `/modulos`, `/modulos/:slug` e na página não encontrada |
| V6 | Cliques em "Visão geral", "Módulos" e no logotipo |
| V7 | Para cada um dos 5 módulos: abrir pela página inicial, voltar e avançar pelo histórico, voltar pelo link "Visão geral" |
| V8 | 8 objetivos, 5 cartões e o botão "Começar pelo Módulo 1" |
| V9 | Título, "Módulo n de 5", "Conteúdo em preparação", módulo atual destacado e título da aba, nos 5 módulos |
| V10 | Sequência 1 → 5 por "Próximo" e 5 → 1 por "Anterior"; ausência de "anterior" no Módulo 1 e de "próximo" no Módulo 5 |
| V11 | Link direto e recarga em `#/modulos` e `#/modulos/sensor-ultrassonico-sonar` |
| V12 | `scrollWidth` do documento ≤ largura da janela em 360, 390, 768, 1024, 1280 e 1440 px, nas 4 rotas; orientação da lista de módulos |
| V13 | Contraste entre a cor do texto e a cor de fundo calculadas pelo navegador, em 8 elementos (mínimo de 4,5:1) |
| V14 | Link de pular (visível, sem sobrepor o cabeçalho, movendo o foco); contorno de foco nos links alcançados por Tab; ativação por Enter |
| V15 | `window.scrollY` igual a 0 após trocar de módulo com a página rolada |
| V16 | Nenhum erro no console durante toda a execução |
| V17 | Rota e slug inexistentes mostram "Página não encontrada" |

**Outra verificação pontual com Playwright, não anexada:** durante a etapa 6, um script curto mediu o `scrollWidth` e gerou capturas da página de módulo. Foi ele que revelou a rolagem horizontal de 699 px (seção 7). A mesma medição foi repetida de forma completa na V12 do script anexado.

### 6.3 Verificações manuais

| Verificação | Como foi feita |
|-------------|----------------|
| Inspeção visual (parte da V16) | Leitura, pelo agente, das 9 capturas de tela geradas com Playwright (celular, tablet e desktop), também enviadas ao responsável fora do repositório |
| Contrastes planejados (seção 5.1 do `TASKS-3.md`) | Cálculo prévio, com uma fórmula WCAG em Python, das combinações de cores propostas, antes da implementação. Depois foram confirmados no navegador (V13) |
| Fidelidade dos textos ao `AGENTS.md` (D3) | Comparação manual dos textos das páginas com as seções 1 a 3 do `AGENTS.md` |

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

## 9. Ajustes após a revisão do PR

Em resposta à revisão técnica do responsável no [PR #5](https://github.com/heloabrantessb/bagre-robo-maker/pull/5):

1. **Robustez das funções de sequência** (`src/data/modules.ts`):
   - `getModulePosition` e `getAdjacentModules` passaram a localizar o módulo pelo `id`, e não pela referência do objeto (`indexOf`).
   - Comportamento explícito para um módulo desconhecido: `getModulePosition` retorna `undefined` e `getAdjacentModules` retorna `{ previousModule: undefined, nextModule: undefined }`. O `ModulePosition` não exibe o indicador nesse caso.
   - **Verificação do caso-limite:** `scripts/verify-modules.mjs`, executado com `npm run verify:modules`. Usa só o `node:assert` e o pacote `typescript`, já instalado (sem Vitest e sem dependências novas), e cobre:
     - as posições dos 5 módulos;
     - um objeto equivalente criado separadamente;
     - as extremidades da sequência;
     - um módulo desconhecido.
   - O mesmo script, executado contra a versão anterior (`indexOf`), falha: o objeto equivalente recebe a posição `0` em vez de `2`. Isso confirma que a verificação detecta o problema apontado.
   - **Compatibilidade com o Node (segunda revisão):**
     - A primeira versão do script (`scripts/verify-modules.ts`) dependia da execução nativa de TypeScript pelo Node.js, disponível só a partir do 22.18. Isso contrariava a faixa declarada no `package.json` (`^20.19.0 || >=22.12.0`).
     - O script foi reescrito como `scripts/verify-modules.mjs`: o `src/data/modules.ts` é convertido para JavaScript em memória com `ts.transpileModule`, do pacote `typescript` (dependência de desenvolvimento existente), e carregado por uma URL `data:`.
     - Os recursos usados (`import.meta.url`, importação de URL `data:`, `await` no nível superior e `node:assert/strict`) existem em todas as versões da faixa declarada. O `typescript` 6.0 exige Node `>=14.17`.
     - Nem a versão mínima do Node nem as dependências foram alteradas.
   - **Como foi validado:**
     - No Node 22.23.5 do ambiente, com e sem a execução de TypeScript (`node --no-experimental-strip-types`). A execução sem TypeScript reproduz a condição do Node 20.19 e do 22.12 a 22.17: nela, a versão `.ts` anterior falha com `ERR_UNKNOWN_FILE_EXTENSION` e a nova passa.
     - Não foi possível executar binários do Node 20 ou 22.12 no ambiente, porque o download foi bloqueado.
   - **Limitações:**
     - O `src/data/modules.ts` não pode importar outros arquivos locais, porque o módulo convertido é carregado de uma URL `data:`.
     - O script não passa pelo `npm run typecheck`.
2. **Reprodutibilidade:** a seção 6 foi reescrita, separando os comandos do projeto, a validação pontual com Playwright (script anexado em `docs/relatorios/anexos/`) e as verificações manuais.

Arquivos adicionados ou alterados na revisão:
- `src/data/modules.ts`
- `src/components/modules/ModulePosition.tsx`
- `scripts/verify-modules.mjs` (novo; substituiu o `scripts/verify-modules.ts` da primeira revisão)
- `package.json` (script `verify:modules`)
- `docs/relatorios/anexos/2026-11-18-issue-3-validacao-navegador.cjs` (novo)
- este relatório e o `TASKS-3.md`

