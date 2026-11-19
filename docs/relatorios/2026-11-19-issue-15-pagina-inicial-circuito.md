# Relatório final — Issue #15: página inicial "O circuito da aula"

- **Issue:** [heloabrantessb/bagre-robo-maker#15](https://github.com/heloabrantessb/bagre-robo-maker/issues/15)
- **Branch:** `feat/15-pagina-inicial-circuito` (criada a partir da `main`, em `b72ac25`)
- **Pull Request:** aberto para a `dev` após o push desta branch (link na Issue #15).
- **Data:** 2026-11-19

## 1. Resumo do planejamento aprovado (`TASKS-15.md`, local)

A página inicial foi redesenhada no estilo protoboard, a partir do mock em PNG aprovado pela responsável. Ela tem duas partes:

- uma **apresentação curta**, com o botão "Começar pelo Módulo 1";
- a seção **"O circuito da aula"**, com os cinco módulos ligados em série do trilho + ao trilho −, cada um com seus objetivos.

Decisões aprovadas:

| ID | Decisão |
|----|---------|
| D1 | A trilha de módulos do cabeçalho fica oculta na página inicial. |
| D2 | `/modulos` redireciona para o início. "Todos os módulos" aponta para o início. |
| D3 | Ficam de fora os itens do Figma que dependem de dados não guardados: progresso, saudação e "Fale com o professor". |
| D4 | Os textos de apresentação propostos no mock foram aprovados. |

## 2. Resumo das alterações

- **Dados:**
  - cada módulo ganhou `objectives`, conforme a tabela da seção 3 do `AGENTS.md`, em redação curta;
  - o `verify:modules` exige pelo menos um objetivo não vazio por módulo.
- **`LessonCircuit`** (novo):
  - placa com trilhos + e −, pinos numerados, jumpers nas cores dos módulos e "Comece aqui" no Módulo 1;
  - o Módulo 1 aparece como o pino aceso;
  - a partir de 1024 px o circuito corre na horizontal; abaixo disso, na vertical, como a barra de passos;
  - o cartão inteiro é clicável, por meio de um pseudo-elemento esticado sobre o link do título, e o nome acessível do link é só o título do módulo.
- **`HomePage`:** reescrita com:
  - "Aula guiada de 90 minutos";
  - o título "Monte, ligue e programe um robô-bagre";
  - a frase de apresentação;
  - as etiquetas "5 módulos" e "Para alunos, professores e participantes externos";
  - o botão principal, nas cores do Módulo 1;
  - o circuito.
- **`AppLayout`:** a trilha do cabeçalho não é renderizada quando a rota é `/`.
- **Rotas e textos:**
  - `/modulos` passa a ser `<Navigate to="/" replace />`;
  - "Todos os módulos" leva ao início;
  - "Voltar à visão geral" passou a ser "Voltar ao início";
  - `ModulesPage` e `ModuleCard` foram removidos, porque ficaram sem uso.
- **`README.md`:** estrutura e tabela de rotas atualizadas.

## 3. Desvios em relação ao planejamento

1. **"Comece aqui" também no celular.** No mock, a marca existia só no computador. Na implementação, ela também aparece no celular, como etiqueta no topo do cartão do Módulo 1, para que a indicação de início não se perca na versão vertical.
2. **Clique no cartão no script de validação.** A primeira versão do script clicava na lista de objetivos por um seletor, e o Playwright recusou porque o link do título cobre o cartão. Esse é justamente o comportamento esperado, então o script passou a clicar com o mouse na posição dos objetivos.

Não houve outros desvios.

## 4. Arquivos

| Situação | Arquivo |
|----------|---------|
| Criado | `src/components/home/LessonCircuit.tsx` |
| Criado | `docs/relatorios/2026-11-19-issue-15-pagina-inicial-circuito.md` (este relatório) |
| Criado | `docs/relatorios/anexos/2026-11-19-issue-15-validacao-navegador.cjs` |
| Modificado | `src/data/modules.ts` |
| Modificado | `scripts/verify-modules.mjs` |
| Modificado | `src/pages/HomePage.tsx` |
| Modificado | `src/components/layout/AppLayout.tsx` |
| Modificado | `src/routes/AppRoutes.tsx` |
| Modificado | `src/components/modules/StepRail.tsx` |
| Modificado | `src/components/modules/StepBar.tsx` |
| Modificado | `src/components/modules/ModuleEndCard.tsx` |
| Modificado | `README.md` |
| Removido | `src/pages/ModulesPage.tsx` |
| Removido | `src/components/modules/ModuleCard.tsx` |

## 5. Commits

| Commit | Mensagem |
|--------|----------|
| `8fe7620` | feat: adicionar os objetivos de cada módulo aos dados |
| `2a55a97` | feat: redesenhar a página inicial como o circuito da aula |
| `750ca43` | feat: ocultar a trilha do cabeçalho na página inicial |
| `542628c` | feat: redirecionar /modulos para o início e remover componentes sem uso |
| `dc9598d` | docs: atualizar estrutura e rotas no README |
| (este) | docs: adicionar relatório final da Issue 15 |

## 6. Testes e validações

### 6.1 Verificações obrigatórias (locais)

| Comando | Resultado |
|---------|-----------|
| `npm run typecheck` | OK |
| `npm run lint` | OK, sem erros nem avisos |
| `npm run verify:modules` | OK |
| `npm run build` | OK |

### 6.2 Validação pontual no navegador

O script Playwright foi executado contra `npx vite preview`. Resultado: **42 de 42 verificações aprovadas**. O script está no anexo.

| Grupo | Verificações |
|-------|--------------|
| Estrutura | `h1`, título da aba, `h2`, lista ordenada com 5 módulos; título, link e objetivos de cada módulo iguais aos dados; "Comece aqui" visível |
| Navegação | o botão principal e os 5 cartões levam aos módulos certos, com clique fora do título |
| Cabeçalho | a trilha não aparece no início e aparece nas páginas de módulo |
| Rotas e textos | `/#/modulos` redireciona; "Todos os módulos" leva ao início; "Voltar ao início" no Módulo 5; nenhum "visão geral" restante |
| Larguras | sem rolagem horizontal em 360, 390, 768, 1024 e 1440 px; circuito vertical abaixo de 1024 px e horizontal a partir de 1024 px; "Comece aqui" e a dica de leitura no celular |
| Contraste | 16 textos com pelo menos 4,5:1 (mínimo de 5,13:1); "Comece aqui" vermelho sobre a placa com 4,64:1 |
| Teclado e toque | botão principal (62 px) e cartões com pelo menos 44 px; ordem de tabulação correta; contorno de foco no cartão; Enter abre o módulo |
| Console | sem erros |

### 6.3 Inspeção visual

Foram feitas capturas em 1440, 1024, 768 e 390 px e comparadas com o mock aprovado. Elas não foram versionadas.

## 7. Pendências e limitações

- **Textos de apresentação:** são uma proposta aprovada e podem ser trocados pela equipe.
- **Ilustração ou foto do robô:** pendente com a equipe (`AGENTS.md`, seção 15).
- **Página "não encontrada":** ainda no visual anterior, fora do escopo.
- **Ainda não fornecidos pela equipe:**
  - Modo Aluno/Professor (RF03);
  - conteúdo dos passos dos módulos.
