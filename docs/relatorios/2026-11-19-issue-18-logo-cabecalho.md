# Relatório final — Issue #18: logo mais à esquerda no cabeçalho

- **Issue:** [heloabrantessb/bagre-robo-maker#18](https://github.com/heloabrantessb/bagre-robo-maker/issues/18)
- **Branch:** `feat/18-logo-cabecalho` (criada a partir da `main`, em `f328dbe`)
- **Pull Request:** aberto para a `dev` após o push desta branch (link na Issue #18).
- **Data:** 2026-11-19

## 1. Resumo do planejamento aprovado (`TASKS-18.md`, local)

A responsável comparou três versões do cabeçalho em capturas de 1440 px e escolheu a **opção B**: o contêiner do cabeçalho fica mais largo que o do conteúdo, e a logo se aproxima da margem esquerda sem encostar nela.

## 2. Alteração

Em `src/components/layout/AppLayout.tsx`, o contêiner do cabeçalho passou de `max-w-6xl` (72rem) para `max-w-7xl` (80rem). O conteúdo principal e o rodapé continuam com `max-w-6xl`.

## 3. Desvio em relação ao planejamento

O `TASKS` e a Issue diziam que "abaixo de 1280 px nada muda". A medição mostrou que a mudança começa antes:

- Com mais de 1152 px de largura, a coluna de conteúdo deixa de ocupar a tela toda e ganha margens laterais. Até agora, o cabeçalho acompanhava essas margens.
- Entre cerca de 1152 px e 1280 px, o cabeçalho novo ainda ocupa a largura total. Por isso, nessa faixa a logo já fica na margem padrão de 16 px, enquanto o conteúdo começa um pouco mais para dentro. Em 1280 px, por exemplo, a logo fica a 16 px e o conteúdo a 80 px.
- Abaixo de 1152 px, nada muda de fato.

O comportamento é coerente com a opção escolhida: a logo sempre fica igual ou mais à esquerda que o conteúdo.

## 4. Arquivos

| Situação | Arquivo |
|----------|---------|
| Modificado | `src/components/layout/AppLayout.tsx` |
| Criado | `docs/relatorios/2026-11-19-issue-18-logo-cabecalho.md` (este relatório) |

## 5. Commits

| Commit | Mensagem |
|--------|----------|
| `12f1679` | feat: aproximar a logo da margem esquerda no cabeçalho |
| (este) | docs: adicionar relatório final da Issue 18 |

## 6. Testes e validações

### 6.1 Verificações obrigatórias (locais)

`npm run typecheck`, `npm run lint`, `npm run verify:modules` e `npm run build`: todos OK.

### 6.2 Medição no navegador

Feita com Playwright contra `vite preview`. Resultado: **13 de 13 verificações aprovadas**. Distâncias medidas a partir da borda esquerda:

| Largura | Página | Logo | Início do conteúdo | Rolagem horizontal |
|---------|--------|------|--------------------|--------------------|
| 1440 px | módulo | 96 px | 160 px | não |
| 1440 px | início | 96 px | 160 px | não |
| 1280 px | início | 16 px | 80 px | não |
| 1024 px | módulo | 16 px | 16 px | não |
| 768 px | início | 16 px | 16 px | não |
| 360 px | módulo | 16 px | 16 px | não |

Console sem erros. Pela simplicidade da mudança, o script de medição não foi anexado.

## 7. Pendências

Nenhuma.
