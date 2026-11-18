# TASKS-3 — Interface principal e navegação entre módulos

> **Status:** planejamento **aprovado** pelo responsável em 18/11/2026, incluindo as decisões D1 a D5 (seção 9.2) e o envio da branch com PR para a `dev`. Implementação **concluída e validada** na branch `feat/3-interface-principal-e-navegacao`. Branch enviada e [PR #5](https://github.com/heloabrantessb/bagre-robo-maker/pull/5) aberto para a `dev`, aguardando revisão do responsável.
>
> **Bloqueios resolvidos:** B1, com a `main` atualizada pelo responsável (merge da `dev` no PR #4, commit `713884b`); B2, com o arquivo renomeado para `TASKS-3.md`.

## 1. Identificação e objetivo

| Campo | Valor |
|-------|-------|
| Issue | [#3 — Implementar interface principal e navegação entre módulos](https://github.com/heloabrantessb/bagre-robo-maker/issues/3) |
| Estado da Issue | Aberta, sem comentários |
| Branch prevista | `feat/3-interface-principal-e-navegacao`, a partir da `main` (depende de B1) |
| Destino do PR | `dev` |
| Relatório final previsto | `docs/relatorios/AAAA-MM-DD-issue-3-interface-principal.md` |

**Objetivo:** substituir o visual provisório da Issue #1 pela interface principal da plataforma: identidade visual, cabeçalho, navegação, página inicial de apresentação, acesso individual aos cinco módulos e páginas provisórias de módulo, de forma responsiva, sem nenhum conteúdo didático.

## 2. Situação atual do projeto

### 2.1 Git e GitHub (após `git fetch` em 18/11/2026)

| Item | Situação |
|------|----------|
| `main` | `186861a`: **somente documentação**. Não contém o código da Issue #1. |
| `dev` | `950e2b6`: merge do [PR #2](https://github.com/heloabrantessb/bagre-robo-maker/pull/2), com toda a estrutura da Issue #1 |
| Issue #1 | Fechada como concluída |
| Issue #3 | Aberta |
| Branch padrão | `main` |

### 2.2 O que já existe e pode ser reutilizado

| Arquivo | Situação atual | Reaproveitamento |
|---------|----------------|------------------|
| `src/main.tsx` | `HashRouter` + `StrictMode` | Sem alteração |
| `src/App.tsx` | `AppLayout` + `AppRoutes` | Sem alteração |
| `src/routes/AppRoutes.tsx` | Rotas `/`, `/modulos/:moduleSlug` e `*` | Ampliar (rota `/modulos`, decisão D1) |
| `src/data/modules.ts` | Tipo `EducationalModule` (`id`, `slug`, `title`), lista dos 5 módulos, `findModuleBySlug`, `getModulePath` | Ampliar com funções de sequência (anterior/próximo, total) |
| `src/components/layout/AppLayout.tsx` | Cabeçalho branco simples, `<main>`, rodapé, link "Pular para o conteúdo" (adaptado ao `HashRouter`) | Reescrever o visual, mantendo a lógica do link de pular |
| `src/components/BackToHomeLink.tsx` | Link de volta ao início | Reutilizar, com as cores do tema |
| `src/pages/HomePage.tsx` | Título, frase e lista simples de módulos | Reescrever como página de apresentação |
| `src/pages/ModulePage.tsx` | Título do módulo + "Conteúdo em preparação" | Reescrever com o layout de módulo |
| `src/pages/NotFoundPage.tsx` | Mensagem + link de volta | Ajustar ao visual |
| `src/styles/index.css` | Apenas `@import "tailwindcss";` | Adicionar os tokens de cor (`@theme`) |
| Lucide React | `Fish`, `ChevronRight`, `ArrowLeft` em uso | Reutilizar; novos ícones importados individualmente |

### 2.3 Pontos já conhecidos da Issue #1

- O link "Pular para o conteúdo", quando visível, **sobrepõe o ícone do cabeçalho**. Será corrigido nesta Issue.
- O `HashRouter` **não leva a página ao topo** ao trocar de rota. Com a navegação entre módulos, isso passa a importar.
- Um link `href="#id"` comum altera a rota no `HashRouter`. Âncoras internas não podem ser usadas para navegar dentro da página.

### 2.4 Referência visual

A identidade visual segue a imagem de referência enviada pelo responsável, conforme a proposta discutida antes:
- cabeçalho verde;
- barra de navegação azul-marinho;
- fundo cinza-claro;
- cartões brancos arredondados;
- módulo atual destacado em azul-marinho;
- barra de posição verde.

Elementos da imagem **excluídos**, por contrariarem o escopo do `AGENTS.md`:
- notificações e avatar, que implicam login;
- progresso individual por aluno;
- código e diagrama ilustrativos, tecnicamente incorretos.

## 3. Escopo da implementação

### Dentro do escopo

- [x] Tokens de cor da identidade visual no Tailwind CSS v4 (`@theme`).
- [x] Layout principal: cabeçalho verde, barra de navegação azul-marinho, área de conteúdo e rodapé.
- [x] Navegação principal com indicação da área ativa (`NavLink` + `aria-current`).
- [x] Página inicial de apresentação, com textos **apenas** dos já documentados no `AGENTS.md`, seções 1 a 3 (decisão D3).
- [x] Cartões de acesso aos cinco módulos.
- [x] Página provisória de módulo com:
  - lista lateral dos módulos;
  - indicador estático de posição ("Módulo n de 5");
  - aviso "Conteúdo em preparação";
  - navegação para o módulo anterior e o próximo.
- [x] Volta ao topo da página ao trocar de rota.
- [x] Correção da sobreposição do link "Pular para o conteúdo".
- [x] Responsividade para celular, tablet e desktop.
- [x] Atualização da seção de rotas do `README.md`.

### Fora do escopo (conforme a Issue #3)

- Conteúdo educacional dos módulos.
- Circuitos, Tinkercad, simulador do HC-SR04, máquina de estados, código C++, Diário de Bancada e quiz.
- Modo Aluno/Professor (RF03): não citado na Issue; fica para uma Issue própria.
- Autenticação, backend, persistência, publicação e configurações do GitHub.
- Logotipo oficial e imagens: continua o ícone `Fish` do Lucide React.
- Fontes externas: será usada a fonte sem serifa padrão do sistema, sem custo de carregamento (RNF04).

## 4. Arquivos que deverão ser criados ou modificados

### 4.1 Criar

| Arquivo | Finalidade |
|---------|------------|
| `src/components/layout/MainNavigation.tsx` | Barra de navegação principal (azul-marinho) com `NavLink` e área ativa |
| `src/components/layout/ScrollToTop.tsx` | Leva a página ao topo quando a rota muda (`useLocation` + `useEffect`) |
| `src/components/modules/ModuleCard.tsx` | Cartão de acesso a um módulo (número, título, ícone de seta), usado na página inicial e na lista de módulos |
| `src/components/modules/ModuleSidebar.tsx` | Lista lateral dos 5 módulos na página de módulo, com o atual em destaque (`aria-current="page"`) |
| `src/components/modules/ModulePosition.tsx` | Indicador estático "Módulo n de 5" com barra proporcional |
| `src/components/modules/ModulePager.tsx` | Links "Módulo anterior" / "Próximo módulo" |
| `src/pages/ModulesPage.tsx` | Página `/modulos` com a lista dos cinco módulos (decisão D1) |

### 4.2 Modificar

| Arquivo | Alteração |
|---------|-----------|
| `src/styles/index.css` | Tokens de cor (`@theme`) e cor de fundo base |
| `src/components/layout/AppLayout.tsx` | Novo cabeçalho, inclusão de `MainNavigation` e `ScrollToTop`, novo rodapé, correção do link de pular |
| `src/routes/AppRoutes.tsx` | Rota `/modulos` |
| `src/data/modules.ts` | Funções `getModulePosition` e `getAdjacentModules`, e a constante com o total de módulos |
| `src/pages/HomePage.tsx` | Página de apresentação |
| `src/pages/ModulePage.tsx` | Layout de módulo (lista lateral + cartão principal + navegação entre módulos) |
| `src/pages/NotFoundPage.tsx` | Visual do tema |
| `src/components/BackToHomeLink.tsx` | Cores do tema |
| `README.md` | Seção de rotas |
| `TASKS-3.md` | Registro de execução |

### 4.3 Criar no encerramento

- `docs/relatorios/AAAA-MM-DD-issue-3-interface-principal.md`

### 4.4 Sem alteração

`src/main.tsx`, `src/App.tsx`, `index.html`, `vite.config.ts`, os arquivos de configuração do TypeScript e do ESLint, `package.json`, `package-lock.json`, `AGENTS.md`, `CLAUDE.md` e `DECISOES-PENDENTES.md`.

**Nenhuma dependência nova.** Tudo é feito com React, React Router (`NavLink`, `useLocation`), Tailwind CSS e Lucide React, já instalados.

## 5. Desenho técnico

### 5.1 Tokens de cor (amostrados da imagem de referência)

Definidos em `src/styles/index.css` com `@theme`, gerando classes como `bg-brand`, `text-ink` e `bg-surface-muted`:

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-brand` | `#18684b` | Cabeçalho, barra de posição, botões, destaques |
| `--color-brand-strong` | `#12553d` | Estado *hover* do verde |
| `--color-brand-soft` | `#e3f1ea` | Fundo dos números dos módulos |
| `--color-brand-light` | `#6ee7b7` | Sublinhado da aba ativa e foco sobre fundo escuro |
| `--color-ink` | `#1f2c3a` | Barra de navegação, módulo atual, títulos |
| `--color-ink-soft` | `#2c3b4b` | *Hover* sobre o azul-marinho |
| `--color-surface-muted` | `#eff1f3` | Fundo da página |
| `--color-line` | `#dfe1e5` | Bordas e trilho da barra de posição |

Contrastes verificados (WCAG 2.1 AA exige 4,5:1 para texto normal e 3:1 para elementos gráficos):

| Combinação | Contraste |
|------------|-----------|
| Branco sobre `brand` | 6,73:1 ✅ |
| Branco sobre `brand-strong` | 8,78:1 ✅ |
| Branco sobre `ink` | 14,19:1 ✅ |
| `slate-300` (aba inativa) sobre `ink` | 9,56:1 ✅ |
| `brand-light` sobre `ink` | 9,31:1 ✅ |
| `brand` sobre `brand-soft` | 5,78:1 ✅ |
| `ink` sobre `surface-muted` | 12,53:1 ✅ |
| `slate-600` sobre `surface-muted` | 6,69:1 ✅ |
| Barra `brand` sobre trilho `line` | 5,14:1 ✅ |

### 5.2 Rotas

| Rota | Página | Área ativa na navegação |
|------|--------|-------------------------|
| `/` | `HomePage` | Visão geral |
| `/modulos` | `ModulesPage` (decisão D1) | Módulos |
| `/modulos/:moduleSlug` | `ModulePage` (provisória) | Módulos |
| `*` | `NotFoundPage` | Nenhuma |

### 5.3 Estrutura visual por página

**Layout (todas as páginas)**

```
┌───────────────────────────────────────────────┐
│ [peixe] Bagre Robô Maker · Plataforma Educacional │  ← cabeçalho verde (brand)
├───────────────────────────────────────────────┤
│  Visão geral   Módulos                         │  ← navegação azul-marinho (ink)
├───────────────────────────────────────────────┤
│              conteúdo (fundo surface-muted)    │
├───────────────────────────────────────────────┤
│ rodapé                                         │
└───────────────────────────────────────────────┘
```

**Página inicial (`/`)**
- Cartão de apresentação: o que é a plataforma e a aula guiada de 90 minutos (`AGENTS.md`, seção 1).
- Objetivos da aula, a partir da lista do `AGENTS.md`, seção 2 (decisão D3).
- Os cinco módulos em cartões (`ModuleCard`), em grade: 1 coluna no celular, 2 no tablet, 3 no desktop.
- Botão principal "Começar pelo Módulo 1".

**Página de módulos (`/modulos`)**
- Título "Módulos" e os cinco `ModuleCard` em sequência.

**Página de módulo (`/modulos/:moduleSlug`)**

```
Desktop (≥ 1024 px)                     Celular / tablet (< 1024 px)
┌──────────┬────────────────────────┐   ┌──────────────────────────┐
│ Módulo 1 │ MÓDULO 2               │   │ [1][2][3][4][5] (rolagem │
│▓Módulo 2▓│ Eletrônica & ...       │   │  horizontal interna)     │
│ Módulo 3 │ Módulo 2 de 5 ▓▓▓░░░   │   ├──────────────────────────┤
│ Módulo 4 │ Conteúdo em preparação │   │ MÓDULO 2 ...             │
│ Módulo 5 │ [‹ Anterior] [Próximo ›]│   │ [‹ Anterior] [Próximo ›] │
└──────────┴────────────────────────┘   └──────────────────────────┘
```

- `ModuleSidebar`: em telas ≥ `lg` (1024 px) fica como coluna lateral. Abaixo disso vira uma faixa compacta de números com rolagem horizontal **interna** (`overflow-x-auto`), sem rolagem horizontal da página.
- `ModulePosition`: o texto "Módulo 2 de 5" fica visível e a barra é decorativa (`aria-hidden`). Não se usa `<progress>`, para não sugerir progresso do aluno (RF11).
- `ModulePager`: o Módulo 1 não tem "anterior" e o Módulo 5 não tem "próximo".

### 5.4 Responsividade (pontos de quebra padrão do Tailwind)

| Faixa | Largura | Comportamento |
|-------|---------|---------------|
| Celular | < 640 px | Uma coluna; navegação com 2 itens em linha; cartões em 1 coluna; faixa compacta de módulos |
| Tablet | 640–1023 px (`sm`, `md`) | Cartões em 2 colunas; faixa compacta de módulos |
| Desktop | ≥ 1024 px (`lg`) | Cartões em 3 colunas; coluna lateral de módulos |

Largura máxima do conteúdo: `max-w-6xl`, centralizado.

### 5.5 Acessibilidade

- HTML semântico:
  - `<header>`, `<nav aria-label="Navegação principal">`, `<main>` e `<footer>`;
  - `<nav aria-label="Módulos">` na lista lateral;
  - `<nav aria-label="Navegação entre módulos">` nos links de anterior e próximo.
- `aria-current="page"` na aba ativa e no módulo atual.
- Foco visível (`focus-visible:outline`) em todos os links, com contraste adequado tanto em fundo claro quanto escuro.
- Ícones decorativos com `aria-hidden="true"`.
- Link "Pular para o conteúdo" posicionado sem cobrir o cabeçalho.
- Título da aba por página, com o `<title>` do React 19, como já é feito hoje.

## 6. Etapas de implementação e checklist

As etapas só começam **após a aprovação deste documento e a resolução de B1 e B2**.

### Etapa 0 — Preparação da branch

- [x] `git fetch origin` e confirmação de que a `main` contém o código da Issue #1 (B1).
- [x] Árvore de trabalho limpa, exceto pelo `TASKS`.
- [x] Criar `feat/3-interface-principal-e-navegacao` a partir de `origin/main`, sem *upstream* para a `main`.
- [x] `npm ci` para instalar exatamente o `package-lock.json`.
- [x] Rodar `npm run typecheck`, `npm run lint` e `npm run build` para confirmar o ponto de partida.
- [x] Commit: `docs: adicionar planejamento TASKS-3 da interface principal`

### Etapa 1 — Tokens de identidade visual

- [x] Adicionar `@theme` com os 8 tokens da seção 5.1 em `src/styles/index.css`.
- [x] Definir a cor de fundo e a cor de texto base no `body`.
- [x] Verificar no build que as classes `bg-brand`, `bg-ink` e `bg-surface-muted` são geradas.
- [x] Commit: `feat: adicionar tokens de cor da identidade visual`

### Etapa 2 — Funções de sequência dos módulos

- [x] Em `src/data/modules.ts`, adicionar a constante `TOTAL_MODULES` e as funções `getModulePosition(module)` e `getAdjacentModules(module)`, que retornam `{ previousModule, nextModule }`.
- [x] Não acrescentar textos descritivos aos módulos (só os títulos existentes).
- [x] `npm run typecheck`.
- [x] Commit: `feat: adicionar funções de sequência dos módulos`

### Etapa 3 — Layout principal e navegação

- [x] Criar `MainNavigation` com os `NavLink` "Visão geral" (`/`, `end`) e "Módulos" (`/modulos`), com estilos de ativo, inativo, *hover* e foco.
- [x] Criar `ScrollToTop`, que chama `window.scrollTo(0, 0)` quando o `pathname` muda.
- [x] Reescrever `AppLayout`:
  - cabeçalho verde com o ícone `Fish`, "Bagre Robô Maker" e "Plataforma Educacional";
  - `MainNavigation`;
  - `<main>` com `max-w-6xl`;
  - rodapé.
- [x] Corrigir o link "Pular para o conteúdo" para não sobrepor o cabeçalho, mantendo o foco por script.
- [x] Verificar a área ativa em `/`, `/modulos` e `/modulos/:slug`.
- [x] Commit: `feat: implementar cabeçalho e navegação principal`

### Etapa 4 — Cartão de módulo e página de módulos

- [x] Criar `ModuleCard`: número em destaque, título, seta e link para o módulo, com foco visível.
- [x] Criar `ModulesPage` com os 5 cartões.
- [x] Registrar a rota `/modulos` em `AppRoutes`.
- [x] Commit: `feat: criar página de módulos com cartões de acesso`

### Etapa 5 — Página inicial de apresentação

- [x] Reescrever `HomePage` com:
  - apresentação;
  - objetivos (decisão D3);
  - grade de `ModuleCard`;
  - botão "Começar pelo Módulo 1".
- [x] Usar apenas textos do `AGENTS.md`, seções 1 a 3.
- [x] Grade responsiva: 1, 2 e 3 colunas.
- [x] Commit: `feat: implementar página inicial de apresentação`

### Etapa 6 — Página provisória de módulo

- [x] Criar `ModuleSidebar`: coluna lateral a partir de `lg`, faixa compacta abaixo disso, módulo atual em `ink` com `aria-current`.
- [x] Criar `ModulePosition`: "Módulo n de 5" + barra decorativa proporcional.
- [x] Criar `ModulePager`: anterior e próximo conforme a posição.
- [x] Reescrever `ModulePage` com o layout da seção 5.3 e o aviso "Conteúdo em preparação".
- [x] Manter o comportamento de slug inexistente mostrando a `NotFoundPage`.
- [x] Commit: `feat: implementar página provisória de módulo com navegação sequencial`

### Etapa 7 — Página não encontrada e ajustes visuais

- [x] Ajustar `NotFoundPage` e `BackToHomeLink` às cores do tema.
- [x] Revisar os espaçamentos e a consistência entre as páginas.
- [x] Commit: `feat: ajustar página não encontrada ao tema`

### Etapa 8 — Documentação

- [x] Atualizar a seção de rotas do `README.md`.
- [x] Commit: `docs: atualizar rotas no README`

### Etapa 9 — Validação (seção 8)

- [x] Executar todas as validações e registrar os resultados no `TASKS`.
- [x] Gerar capturas de tela para o responsável, fora do repositório.

### Etapa 10 — Encerramento

- [x] Atualizar o `TASKS` com o andamento real e os desvios.
- [x] Criar o relatório final em `docs/relatorios/`.
- [x] Commit: `docs: atualizar TASKS-3 e adicionar relatório da Issue 3`
- [x] Enviar a branch e abrir o PR para a `dev`, referenciando a Issue #3.
- [x] **Não realizar o merge.**

## 7. Critérios de aceite (Issue #3) e onde são atendidos

| Critério da Issue | Etapas | Validações |
|-------------------|--------|------------|
| A página inicial apresenta o projeto de forma clara | 5 | V8 |
| Os cinco módulos são exibidos e têm acesso individual | 4, 5 | V6, V7 |
| Cabeçalho e navegação funcionam corretamente | 3 | V5, V6 |
| É possível ir da página inicial a cada módulo e voltar | 3, 5, 6 | V7 |
| Cada módulo tem uma página provisória identificável, sem conteúdo didático | 6 | V9 |
| Adaptação a desktop, tablet e celular, sem rolagem horizontal | 3–7 | V12 |
| Consistência visual com a identidade da plataforma | 1, 3–7 | V13, V16 |
| Navegação funcionando com `HashRouter` e a configuração atual do Vite | 3–6 | V4, V10, V11 |
| `typecheck`, `lint` e `build` sem erros | todas | V1–V3 |
| Versão compilada validada com `npm run preview` | 9 | V4 |

## 8. Estratégia de validação e testes

### 8.1 Verificações obrigatórias (`AGENTS.md`, seção 6.3) e da Issue

| # | Validação | Comando ou método | Resultado esperado |
|---|-----------|-------------------|--------------------|
| V1 | Tipos | `npm run typecheck` | Sem erros |
| V2 | Análise estática | `npm run lint` | Sem erros nem avisos |
| V3 | Build | `npm run build` | Sem erros; aumento de tamanho registrado em relação à Issue #1 |
| V4 | Preview | `npm run preview` → `http://localhost:4173/bagre-robo-maker/` | Aplicação funcionando a partir do build |

### 8.2 Navegação (no preview, automatizada com o Playwright do ambiente do agente, sem adicioná-lo ao projeto)

| # | Validação | Resultado esperado |
|---|-----------|--------------------|
| V5 | Área ativa da navegação em `/`, `/modulos` e `/modulos/:slug` | `aria-current="page"` no item certo |
| V6 | Navegação pelo cabeçalho: Visão geral ↔ Módulos | A página certa aparece |
| V7 | A partir da página inicial, abrir **cada um** dos 5 módulos e voltar (link e botão Voltar do navegador) | Os 5 caminhos funcionam |
| V8 | Página inicial | Apresentação, objetivos, 5 cartões e o botão "Começar pelo Módulo 1" |
| V9 | Página de cada módulo | Título, "Módulo n de 5", "Conteúdo em preparação", módulo atual destacado na lista |
| V10 | Navegação sequencial: do Módulo 1 ao 5 pelo "Próximo" e de volta pelo "Anterior" | Sequência correta; sem "anterior" no 1 nem "próximo" no 5 |
| V11 | Link direto e recarga em `#/modulos` e `#/modulos/<slug>` | Sem erro 404 |
| V12 | Larguras de 360, 390, 768, 1024, 1280 e 1440 px, em todas as rotas | Sem rolagem horizontal da página; lista lateral ≥ 1024 px, faixa compacta abaixo |
| V13 | Contraste das cores aplicadas (cor calculada no navegador) | Valores da seção 5.1 |
| V14 | Teclado | Link de pular não sobrepõe o cabeçalho e move o foco; foco visível em fundo claro e escuro; todos os links acessíveis com Tab e ativáveis com Enter |
| V15 | Volta ao topo | Ao trocar de módulo com a página rolada, a nova página começa no topo |
| V16 | Console e inspeção visual | Nenhum erro no console; capturas de celular, tablet e desktop enviadas ao responsável |
| V17 | Rota inexistente e slug inexistente | `NotFoundPage` |

O `dist/index.html` não será aberto diretamente pelo sistema de arquivos.

## 9. Riscos, pontos de atenção e decisões

### 9.1 Decisões bloqueantes

| # | Decisão | Opções | Recomendação |
|---|---------|--------|--------------|
| **B1** | ✅ **Resolvida** (`main` em `713884b`). **A `main` não continha o código da Issue #1** (só a `dev` contém). Uma branch criada a partir da `main` começaria sem o projeto React, e o PR para a `dev` reintroduziria conflitos. | **A.** O responsável integra a `dev` na `main` antes do início. **B.** Exceção autorizada: criar a branch a partir da `dev` (contraria a regra 5 do `AGENTS.md`, seção 10). | **A.** Mantém as regras sem exceção. |
| **B2** | Nome do arquivo | — | **Resolvida:** renomeado para `TASKS-3.md`, seguindo a convenção `TASKS-[numero-da-issue].md`. |

### 9.2 Decisões de produto e interface

| # | Decisão | Proposta |
|---|---------|----------|
| **D1** | Itens da navegação principal | **"Visão geral" e "Módulos"**, com a página `/modulos`. As abas "Circuito & Hardware", "Código C++" e "Quiz" da imagem de referência ficam para as Issues de cada funcionalidade, sem páginas vazias agora. |
| **D2** | Indicador de situação dos módulos (RF11) | **Posição na sequência** ("Módulo 2 de 5" + barra), sem "Concluído" ou "Em andamento", que sugeririam progresso individual. |
| **D3** | Textos da página inicial | Usar **somente** o que está no `AGENTS.md`: descrição (seção 1), público-alvo (seção 1), objetivos educacionais (seção 2) e os cinco módulos (seção 3). O responsável valida a redação na revisão do PR. |
| **D4** | Subtítulo do cabeçalho | "Plataforma Educacional", como na imagem de referência. |
| **D5** | Fonte | Fonte sem serifa padrão do sistema, sem fontes externas (RNF04). |

### 9.3 Riscos e pontos de atenção

| Risco | Mitigação |
|-------|-----------|
| Rolagem horizontal causada pela faixa compacta de módulos no celular | Rolagem só dentro da faixa (`overflow-x-auto` + `min-w-0`); verificada em V12 |
| Classes do Tailwind v4 com tokens personalizados não geradas | Conferir no build (etapa 1) |
| `NavLink` "Visão geral" ficar ativo em todas as rotas | Usar a propriedade `end` no link `/` |
| Foco perdido ou página fora do topo ao trocar de rota | `ScrollToTop`; o foco segue o padrão do navegador; verificado em V14 e V15 |
| Texto da página inicial ultrapassar o documentado (conteúdo inventado) | Restringir ao `AGENTS.md`, seções 1 a 3 (D3) |
| Envio da branch pela sessão | A aprovação deste plano autoriza o envio de `feat/3-interface-principal-e-navegacao` e o PR para a `dev`, como na Issue #1 |
| `DECISOES-PENDENTES.md` continua desatualizado | Fora desta Issue (decisão D6 da Issue #1) |

## 10. Dependências entre as tarefas

```
B1, B2 (decisões) ─► Etapa 0 (branch)
                       │
                       ├─► Etapa 1 (tokens) ─────────────┐
                       └─► Etapa 2 (funções de sequência) ┤
                                                          ▼
                                     Etapa 3 (layout e navegação)
                                                          │
                                     Etapa 4 (ModuleCard + /modulos)
                                          │                │
                       Etapa 5 (página inicial)   Etapa 6 (página de módulo)
                                          └───────┬────────┘
                                     Etapa 7 (404 e ajustes)
                                                  │
                                     Etapa 8 (README) ─► Etapa 9 (validação) ─► Etapa 10 (encerramento)
```

- As etapas 1 e 2 são independentes entre si.
- As etapas 5 e 6 dependem do `ModuleCard` (etapa 4) e do layout (etapa 3). A etapa 6 também depende das funções da etapa 2.
- A etapa 9 só começa com todas as anteriores concluídas.

## 11. Registro de execução

### 11.1 Desvios e ajustes em relação ao plano

| # | Planejado | Executado | Motivo |
|---|-----------|-----------|--------|
| 1 | Faixa compacta de módulos com `overflow-x-auto` | Igual, com `relative` nos links da faixa e dos cartões | Os textos exclusivos de leitores de tela (`sr-only`) usam posição absoluta. Sem um ancestral posicionado, eles escapavam da faixa e alargavam a página para 699 px no celular. O problema foi encontrado na verificação visual da etapa 6 e corrigido antes do commit. |
| 2 | Link "Pular para o conteúdo" sem sobrepor o cabeçalho | Quando focado, o link passa a ocupar uma faixa própria no topo da página (`focus:block`), em vez de ficar flutuando sobre o cabeçalho | Solução mais simples, sem sobreposição em nenhuma largura |
| 3 | `BackToHomeLink` apenas com as cores do tema | Passou a ser um botão verde | Consistência com o botão principal da página inicial |
| 4 | Não previsto | Botão "Ver todos os módulos" na página inicial e o logotipo do cabeçalho como link para o início | Facilitam a navegação sem acrescentar conteúdo |

Nenhuma dependência foi adicionada; `package.json` e `package-lock.json` não foram alterados.

### 11.2 Resultado das validações

| # | Resultado |
|---|-----------|
| V1 | OK: `npm run typecheck` sem erros |
| V2 | OK: `npm run lint` sem erros nem avisos |
| V3 | OK: `npm run build` sem erros. JS 274,97 kB (87,01 kB com gzip, +2,22 kB em relação à Issue #1); CSS 19,30 kB (4,48 kB com gzip, +1,06 kB) |
| V4 | OK: preview em `http://localhost:4173/bagre-robo-maker/` com status 200 |
| V5 | OK: `aria-current` em "Visão geral" (`/`) e "Módulos" (`/modulos` e `/modulos/:slug`); nenhum item ativo na página não encontrada |
| V6 | OK: Visão geral ↔ Módulos pelo cabeçalho; logotipo leva ao início |
| V7 | OK: os 5 módulos abertos a partir da página inicial, com retorno pelo botão Voltar e pelo link "Visão geral" |
| V8 | OK: 8 objetivos, 5 cartões e o botão "Começar pelo Módulo 1" levando ao Módulo 1 |
| V9 | OK: nos 5 módulos, título, "Módulo n de 5", "Conteúdo em preparação", módulo atual destacado e título da aba |
| V10 | OK: 1 → 5 por "Próximo" e 5 → 1 por "Anterior"; sem "anterior" no Módulo 1 e sem "próximo" no Módulo 5 |
| V11 | OK: link direto e recarga em `#/modulos` e `#/modulos/sensor-ultrassonico-sonar`, sem 404 |
| V12 | OK: sem rolagem horizontal em 360, 390, 768, 1024, 1280 e 1440 px, nas 4 rotas; lista lateral em coluna a partir de 1024 px e faixa abaixo disso |
| V13 | OK: contrastes medidos no navegador entre 5,81:1 (subtítulo do cabeçalho) e 14,19:1 (aba ativa e módulo atual) |
| V14 | OK: link de pular visível sem sobrepor o cabeçalho e movendo o foco; contorno de foco em todos os 20 links alcançados por Tab; Enter ativa os links |
| V15 | OK: ao trocar de módulo com a página rolada (247 px), a nova página começa no topo |
| V16 | OK: nenhum erro no console; 9 capturas (celular, tablet e desktop) enviadas ao responsável, fora do repositório |
| V17 | OK: rota e slug inexistentes mostram a página não encontrada |

Total: 62 verificações automatizadas com o Playwright do ambiente do agente (sem adicioná-lo ao projeto), todas aprovadas. `npm audit`: 0 vulnerabilidades.
