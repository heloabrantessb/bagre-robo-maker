# Relatório final — Issue #12: barra lateral "protoboard" e passos dos módulos

- **Issue:** [heloabrantessb/bagre-robo-maker#12](https://github.com/heloabrantessb/bagre-robo-maker/issues/12)
- **Branch:** `feat/12-barra-lateral-protoboard` (criada a partir da `main`, em `42165c9`)
- **Pull Request:** aberto para a `dev` após o push desta branch. O link está na descrição da Issue #12 e no chat da tarefa.
- **Data:** 2026-11-19

## 1. Resumo do planejamento aprovado (`TASKS-12.md`, local)

A primeira parte do redesenho adota a identidade visual "protoboard", escolhida pelo responsável entre as duas opções do canvas de design. Ela cria a barra lateral de passos da página de módulo, tomando como referência o esqueleto do open-design.ai: um índice "nesta página" à esquerda e uma coluna de leitura.

Decisões aprovadas:

| ID | Decisão |
|----|---------|
| D1 | Fontes **Bricolage Grotesque** (títulos) e **Atkinson Hyperlegible Next** (texto), via Google Fonts no `index.html`. Registro no `AGENTS.md`. |
| D2 | As abas "Visão geral" e "Módulos" saem do cabeçalho. O logotipo leva ao início, e a trilha numerada dos módulos ocupa o lugar das abas. |
| D3 | Os módulos 2 a 5 recebem um único passo provisório, `[PASSOS DO MÓDULO N]`. |
| D4 | Os títulos oficiais dos módulos são mantidos. |
| D5 | A alternância Aluno/Professor fica fora do escopo. |
| D6 | A Issue é criada pelo agente. |

## 2. Resumo das alterações

- **Identidade protoboard:**
  - novos tokens de cor (`plate`, `board`, `hole`, `rail-plus`, `rail-minus`);
  - fundo de furos (`.protoboard`);
  - as duas fontes do D1.
- **Dados dos módulos (`src/data/modules.ts`):**
  - cada módulo ganhou `colors` (`fill`, `onFill`, `accent`, `wire`) e `steps`;
  - o Módulo 1 tem três passos: "O que é biomimética?", "Por que usar uma garrafa PET?" e "Montagem do corpo do robô";
  - os módulos 2 a 5 têm o passo provisório;
  - nova função `getStepElementId`.
- **Cabeçalho:**
  - logotipo com link para o início;
  - trilha de pinos numerados ligados por jumpers coloridos (`ModuleTrail`), com o módulo atual destacado e `aria-current="page"`.
- **Página de módulo, no computador:**
  - barra lateral fixa (`StepRail`) com trilhos + e −, jumper vertical e um LED por passo;
  - o LED aceso indica o passo em leitura;
  - clicar em um passo rola até ele e move o foco para o `h2`.
- **Página de módulo, no celular e no tablet:**
  - a mesma trilha de passos aparece abaixo do título;
  - uma barra inferior fixa (`StepBar`) mostra "Passo N de M" e o botão "Próximo passo";
  - no último passo, o botão vira o link para o próximo módulo.
- **Fim do módulo:**
  - cartão `ModuleEndCard` com o próximo módulo, nas cores dele, e o link para o módulo anterior.
- **Passos:**
  - cada passo é uma seção com um `h2` numerado e a caixa "Conteúdo em preparação." (nenhum conteúdo técnico foi inventado).
- **Verificação de dados:**
  - `npm run verify:modules` agora também valida as cores em hexadecimal, a presença de passos, os ids de passos únicos e em kebab-case, e os ids de elemento únicos.

## 3. Desvios em relação ao planejamento

1. **Campo `wire` nas cores.** Com `accent` escuro, o jumper amarelo do Módulo 2 ficava oliva. Por isso, a cor dos jumpers e contornos decorativos foi separada da cor de texto. `accent` continua garantindo contraste de 4,5:1 para textos.
2. **Detecção do passo atual.** O plano previa `IntersectionObserver`. A validação mostrou dois problemas: o LED não acompanhava a rolagem em páginas curtas, e os últimos passos nunca acendiam, porque a última seção não alcança o topo da tela. O hook `useCurrentStep` passou a usar:
   - uma "linha de leitura" (35% da altura da tela);
   - uma regra de fim de página;
   - cálculo limitado a um por quadro, com `requestAnimationFrame` (commit `0dc03e0`).
3. **Componentes removidos.** `ModuleSidebar`, `ModulePosition`, `ModulePager` e `MainNavigation` foram substituídos pelos novos componentes e apagados, em vez de ficarem sem uso.
4. **Carregamento tardio da fonte.** Quando a Bricolage Grotesque termina de carregar, a altura do `h1` muda (de cerca de 152 px para 76 px), o que encurta a página. Isso não afeta o uso, mas tornava instável a verificação de "movimento reduzido". O script de validação passou a aguardar `document.fonts.status === 'loaded'`.

## 4. Arquivos

| Situação | Arquivo |
|----------|---------|
| Criado | `src/components/modules/ModuleTrail.tsx` |
| Criado | `src/components/modules/StepRail.tsx` |
| Criado | `src/components/modules/StepBar.tsx` |
| Criado | `src/components/modules/ModuleEndCard.tsx` |
| Criado | `src/hooks/useCurrentStep.ts` |
| Criado | `docs/relatorios/2026-11-19-issue-12-barra-lateral-protoboard.md` (este relatório) |
| Criado | `docs/relatorios/anexos/2026-11-19-issue-12-validacao-navegador.cjs` (registro do script de validação) |
| Modificado | `index.html` |
| Modificado | `src/styles/index.css` |
| Modificado | `src/data/modules.ts` |
| Modificado | `scripts/verify-modules.mjs` |
| Modificado | `src/components/layout/AppLayout.tsx` |
| Modificado | `src/pages/ModulePage.tsx` |
| Modificado | `AGENTS.md` |
| Modificado | `README.md` |
| Removido | `src/components/layout/MainNavigation.tsx` |
| Removido | `src/components/modules/ModuleSidebar.tsx` |
| Removido | `src/components/modules/ModulePosition.tsx` |
| Removido | `src/components/modules/ModulePager.tsx` |

## 5. Commits

| Commit | Mensagem |
|--------|----------|
| `d0c926e` | feat: adicionar tokens e fontes da identidade protoboard |
| `9d93dd9` | feat: adicionar cores e passos aos dados dos módulos |
| `cf2572c` | feat: substituir as abas pela trilha dos módulos no cabeçalho |
| `8860895` | feat: separar a cor dos jumpers da cor de texto de cada módulo |
| `60e8930` | feat: implementar a barra lateral protoboard e os passos do módulo |
| `963928e` | docs: registrar fontes e identidade protoboard no AGENTS e no README |
| `0dc03e0` | fix: acender o LED dos últimos passos ao chegar ao fim da página |
| (este) | docs: adicionar relatório final da Issue 12 |

## 6. Testes e validações

### 6.1 Verificações obrigatórias (locais)

| Comando | Resultado |
|---------|-----------|
| `npm run typecheck` | OK |
| `npm run lint` | OK, sem erros nem avisos |
| `npm run verify:modules` | OK |
| `npm run build` | OK. JS: 279,47 kB (88,51 kB gzip). CSS: 21,58 kB (5,26 kB gzip). |

O workflow do PR repete essas verificações no Node.js 20.19 e 22.

### 6.2 Validação pontual no navegador

Um script Playwright foi executado contra `npx vite preview` (build de produção, `HashRouter`, `base` `/bagre-robo-maker/`). O resultado foi **51 de 51 verificações aprovadas**. O script está registrado em `docs/relatorios/anexos/` e não é um teste automatizado do projeto.

Itens verificados:

- fontes carregadas;
- trilha dos módulos com `aria-current` e rótulos;
- barra lateral visível apenas no computador;
- clique em passo, com rolagem e foco no `h2`;
- LED acompanhando a rolagem, inclusive nos últimos passos;
- cartão de fim de módulo, com o próximo módulo e o anterior, incluindo o caso do Módulo 5;
- passo provisório nos módulos 2 a 5;
- barra inferior no celular: "Próximo passo" e o link no último passo;
- link direto e recarregamento da página;
- ausência de rolagem horizontal entre 360 px e 1440 px;
- contraste de 40 pares de cores, com mínimo de 5,13:1;
- navegação por teclado com foco visível;
- alvos de toque de pelo menos 44 px;
- `prefers-reduced-motion`;
- console sem erros.

### 6.3 Inspeção visual

Capturas feitas para a revisão do responsável:

- Módulo 1 no computador: início e passo 3;
- Módulo 3 no computador;
- Módulo 1 no celular: início e passo 2;
- Módulo 2 no tablet;
- página inicial.

Elas não foram versionadas.

## 7. Pendências e limitações

- **Página inicial:** ainda usa o visual anterior; o redesenho no estilo protoboard é a próxima parte.
- **Conteúdo dos passos:** os títulos dos passos dos módulos 2 a 5 e todo o conteúdo dos passos dependem da equipe (`AGENTS.md`, seção 15). Os títulos do Módulo 1 também devem ser confirmados.
- **Modo Aluno/Professor (RF03):** fora do escopo desta Issue (D5).
- **Dependência externa:** as fontes vêm do Google Fonts. Sem acesso a esse serviço, a página continua utilizável com as fontes de reserva (RNF07).
- **Limite do `verify:modules`:** o arquivo `modules.ts` não pode importar outros arquivos locais, porque é transpilado isoladamente.
