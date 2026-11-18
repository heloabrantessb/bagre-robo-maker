# AGENTS.md — Bagre Robô Maker

Documento principal de referência para agentes de programação (e pessoas) que trabalharem neste repositório. Leia-o por completo antes de qualquer alteração.

Neste documento, **responsável** significa a pessoa responsável pelo projeto, que aprova planejamentos, revisa e realiza os merges.

---

## 1. Contexto do projeto

O **Bagre Robô Maker** é uma plataforma educacional web criada para apoiar uma **aula guiada de 90 minutos** sobre a construção, a eletrônica e a programação de um robô inspirado em um peixe (bagre).

- **Público-alvo:** alunos, professores e participantes externos.
- **Natureza:** plataforma **temporária**, destinada a uma aula específica. Não há, neste momento, intenção de transformá-la em um produto de manutenção contínua.
- **Uso:** cada participante acessa a plataforma individualmente pelo próprio dispositivo (celular, tablet ou computador).

Consequência prática: prefira soluções simples, estáveis e fáceis de publicar. Evite arquitetura, abstrações ou ferramentas pensadas para escala ou longo prazo.

---

## 2. Objetivos educacionais

1. Apresentar conceitos de **biomimética**.
2. Demonstrar a **construção física** utilizando garrafa PET.
3. Explicar os **circuitos eletrônicos** do robô.
4. Apresentar o funcionamento do **transistor C1815**.
5. Ensinar os princípios do **sensor ultrassônico HC-SR04**.
6. Explicar a **programação C++** do robô.
7. Demonstrar a **máquina de estados Espreita e Ataque**.
8. **Avaliar o aprendizado** por meio de desafios e quiz.

---

## 3. Organização educacional

A plataforma possui **cinco módulos**, apresentados nesta ordem (sequência didática fixa):

| # | Módulo | Objetivos relacionados |
|---|--------|------------------------|
| 1 | Biomimética & Garrafa PET | 1, 2 |
| 2 | Eletrônica & Transistor C1815 | 3, 4 |
| 3 | Sensor Ultrassônico & Sonar | 5 |
| 4 | Programação C++ — Espreita vs. Ataque | 6, 7 |
| 5 | Desafio & Quiz Interativo | 8 |

A distribuição de tempo entre os módulos dentro dos 90 minutos **ainda não foi definida** (ver seção 15).

---

## 4. Requisitos funcionais

| ID | Requisito |
|----|-----------|
| RF01 | Exibir uma **visão geral do projeto** (o robô, os objetivos e a estrutura da aula). |
| RF02 | Permitir a **navegação entre os cinco módulos**, em ordem e também de forma direta. |
| RF03 | Oferecer **Modo Aluno** e **Modo Professor**, alternáveis na interface (sem autenticação). |
| RF04 | Disponibilizar a área **Circuito & Hardware** com os componentes e as ligações do robô. |
| RF05 | Incorporar o **Tinkercad Circuits** via `iframe` quando tecnicamente permitido, sempre com um link alternativo para **abrir em nova aba**. |
| RF06 | Apresentar o **código C++** do robô com **realce de sintaxe** e **botão de copiar**. |
| RF07 | Disponibilizar o **Diário de Bancada**, listando problemas, causas e soluções. |
| RF08 | Oferecer um **simulador matemático do HC-SR04** (relação entre tempo de eco e distância). |
| RF09 | Exibir uma **representação visual da máquina de estados** Espreita ↔ Ataque. |
| RF10 | Oferecer um **quiz com feedback dinâmico** (resposta certa/errada e explicação). |
| RF11 | Exibir **indicadores visuais de situação dos módulos**, de forma **estática**, representando a sequência didática (não refletem progresso individual). |

---

## 5. Requisitos não funcionais

| ID | Requisito |
|----|-----------|
| RNF01 | **Responsividade:** funcionar bem em celulares, tablets e computadores. |
| RNF02 | **Acessibilidade:** HTML semântico, navegação por teclado, foco visível, contraste adequado, textos alternativos em imagens e rótulos em controles (referência: WCAG 2.1 nível AA). |
| RNF03 | **Usabilidade:** interface clara e direta, adequada a uma aula guiada com tempo limitado. |
| RNF04 | **Desempenho:** carregamento rápido em redes móveis ou Wi-Fi compartilhado; evitar arquivos e bibliotecas pesados. |
| RNF05 | **Idioma:** todo o conteúdo em **português brasileiro** (ver seção 7). |
| RNF06 | **Compatibilidade:** funcionar nas versões recentes dos principais navegadores (Chrome, Firefox, Safari, Edge), incluindo os móveis. |
| RNF07 | **Degradação controlada:** se um recurso externo (ex.: Tinkercad) não carregar, o restante da página continua utilizável e há alternativa. |

---

## 6. Decisões e restrições técnicas

### 6.1 Arquitetura

- **Tipo de aplicação:** estática (SPA gerada em build).
- **Sem** backend próprio.
- **Sem** banco de dados.
- **Sem** autenticação.
- **Sem** armazenamento individual de progresso.
- **Hospedagem:** GitHub Pages, com publicação automatizada por GitHub Actions.
- **Acesso:** individual, pelos dispositivos dos participantes.
- **Interface:** responsiva.

### 6.2 Stack aprovada

| Finalidade | Tecnologia |
|------------|------------|
| Interface | React |
| Linguagem | TypeScript |
| Build e servidor de desenvolvimento | Vite |
| Roteamento | React Router com **`HashRouter`** |
| Estilos | Tailwind CSS |
| Ícones | Lucide React |
| Realce de código C++ | Prism.js |
| Gerenciador de pacotes | npm (com `package-lock.json` versionado) |
| Análise estática | ESLint |
| Testes automatizados | Vitest — **somente** quando houver necessidade justificada, com aprovação |

Qualquer dependência fora desta tabela exige aprovação do responsável (seção 11).

### 6.3 Verificações obrigatórias

Verificações obrigatórias iniciais — antes de considerar qualquer alteração de código pronta, executar com sucesso:

1. Verificação de tipos com TypeScript (`tsc`).
2. Build de produção do Vite (`npm run build`).

Complementos:

- O **ESLint** é a ferramenta de análise estática do projeto. Quando estiver configurado, deve ser executado e seus apontamentos devem ser tratados ou justificados. Torná-lo verificação obrigatória depende de decisão do responsável.
- O **Vitest** poderá ser introduzido quando houver necessidade justificada (por exemplo, lógica do simulador do HC-SR04 ou do quiz), mediante aprovação. A partir daí, os testes passam a fazer parte das verificações.

### 6.4 Implicações

- **`HashRouter`** é obrigatório: as rotas usam o formato `.../#/caminho`, evitando erros 404 ao recarregar ou abrir links diretos no GitHub Pages.
- O `base` do Vite deve ser compatível com o subdiretório do GitHub Pages (`/bagre-robo-maker/`).
- A validação local da aplicação compilada é feita com `npm run preview`; o `dist/index.html` não funciona aberto diretamente pelo sistema de arquivos.
- Importar os ícones do Lucide React individualmente, para que apenas os usados entrem no pacote final.
- Carregar no Prism.js apenas as linguagens necessárias (C++).
- O Modo Aluno/Professor é apenas uma alternância de visualização no navegador — **não é** controle de acesso.
- O Tinkercad pode bloquear a incorporação em alguns casos; o link para nova aba é obrigatório em todas as situações.

---

## 7. Convenção de idioma

**Regra geral:** a comunicação humana do projeto é em **português brasileiro**; o código segue as **convenções técnicas de nomenclatura em inglês**.

### 7.1 Em português brasileiro (obrigatório)

- Issues: títulos, descrições, requisitos e critérios de aceitação.
- Etapas e checklists das Issues.
- Milestones do GitHub, caso venham a ser utilizados.
- Arquivos `TASKS-[numero-da-issue].md`.
- Mensagens de commit.
- Pull Requests: títulos, descrições e comentários.
- Documentação técnica e funcional.
- Comentários explicativos no código.
- Relatórios de desenvolvimento.
- Mensagens e instruções de planejamento e execução das tarefas.
- Todo o conteúdo exibido na plataforma.

### 7.2 Em inglês (convenções técnicas)

- Identificadores: variáveis, funções, métodos, classes, interfaces, componentes, constantes, propriedades e demais identificadores técnicos.
- Nomes de bibliotecas, frameworks, APIs, comandos, métodos nativos, palavras-chave e termos técnicos próprios das tecnologias usadas.
- Prefixos convencionais de commit e de branch (`feat`, `fix`, `docs`, `refactor`, `test` etc.).

Não traduza nomes de tecnologias, bibliotecas ou identificadores já estabelecidos em inglês.

### 7.3 Exemplos

| Item | Correto | Incorreto |
|------|---------|-----------|
| Identificador | `calculateDistance()`, `UltrasonicSensor`, `MAX_DISTANCE` | `calcularDistancia()`, `SensorUltrassonico` |
| Comentário | `// Calcula a distância com base no tempo de retorno do eco.` | `// Calculates the distance based on the echo return time.` |
| Commit | `feat: adicionar navegação entre módulos` | `feat: add module navigation` |

Outros exemplos de commit:

- `fix: corrigir validação das respostas do quiz`
- `docs: atualizar documentação do projeto`
- `refactor: simplificar estrutura dos componentes`
- `test: adicionar testes de validação do quiz`

---

## 8. Diretrizes de desenvolvimento

- **Analisar o repositório** antes de qualquer alteração.
- **Preservar implementações existentes**; não reescrever o que funciona sem motivo.
- **Evitar dependências desnecessárias.**
- **Não inventar informações técnicas sobre o robô** (componentes, pinos, valores, código, medidas). Quando o dado não estiver disponível no repositório ou não tiver sido fornecido, use um marcador explícito (ex.: `<!-- PENDENTE: ... -->`) e informe a pendência.
- **Não implementar funcionalidades fora do escopo** deste documento sem autorização.
- **Não presumir decisões** de produto, pedagógicas, de arquitetura ou de implementação ainda não aprovadas.
- **Desenvolver incrementalmente**, em entregas pequenas e verificáveis.
- **Priorizar acessibilidade, responsividade e usabilidade.**
- **Validar as implementações** antes de considerá-las concluídas (ver seções 6.3 e 14).
- **Seguir a convenção de idioma** (seção 7).
- **Entregar análises, planejamentos e relatórios em arquivos Markdown** (seção 12).
- **Commits, push, branches, Issues e Pull Requests** somente nas etapas previstas no fluxo da seção 9, ou quando solicitados pelo responsável.

---

## 9. Fluxo obrigatório de desenvolvimento

Toda nova funcionalidade, melhoria ou correção segue esta sequência. Não pule etapas.

### Etapa 1 — Discussão e definição

- Discutir a funcionalidade com o responsável.
- Entender o problema, o objetivo e o resultado esperado.
- Identificar requisitos, restrições e critérios de aceitação.
- Não presumir decisões de arquitetura ou implementação ainda não aprovadas.

### Etapa 2 — Planejamento

- Analisar os passos necessários para alcançar o objetivo.
- Identificar dependências, riscos e possíveis impactos.
- Dividir o trabalho em etapas pequenas e verificáveis.
- Definir os critérios de conclusão.

### Etapa 3 — Issue no GitHub

- Criar uma Issue para a funcionalidade, melhoria ou correção, inteiramente em português brasileiro.
- A descrição deve conter: **contexto**, **objetivo**, **escopo**, **critérios de aceitação** e **etapas de execução**.
- As etapas devem ser organizadas como **checklist** no corpo da Issue.
- **Não criar objetos Milestone do GitHub.** Neste projeto, o termo "milestones" refere-se às etapas necessárias para alcançar o objetivo, registradas no checklist.
- Apresentar a Issue e seu planejamento ao responsável.

### Etapa 4 — Planejamento em `TASKS-[numero-da-issue].md`

- Elaborar o documento `TASKS-[numero-da-issue].md`.
- Apresentá-lo inicialmente como **rascunho** (arquivo `.md` local, não versionado), sem criar ou modificar arquivos na `main`.
- Escrevê-lo inteiramente em português brasileiro, preservando nomes técnicos e identificadores em inglês.
- Conteúdo obrigatório:
  1. Referência e objetivo da Issue.
  2. Contexto da funcionalidade.
  3. Escopo e itens fora do escopo.
  4. Análise técnica.
  5. Arquivos e componentes potencialmente envolvidos.
  6. Etapas detalhadas de implementação.
  7. Critérios de aceitação.
  8. Estratégia de testes e validação.
  9. Dependências, riscos e pendências.
- Apresentar o planejamento ao responsável e **aguardar aprovação**. Não iniciar a implementação antes disso.

### Etapa 5 — Criação da branch

Após a aprovação do planejamento:

- Verificar se a `main` local está atualizada em relação ao remoto.
- Verificar se a árvore de trabalho está limpa.
- Identificar alterações locais ou remotas que possam ser afetadas.
- Criar a branch **diretamente a partir da `main`**, no padrão:

  ```
  [prefixo]/[numero-da-issue]-nome-da-issue
  ```

  | Prefixo | Uso |
  |---------|-----|
  | `feat/` | Novas funcionalidades e melhorias. |
  | `fix/` | Correções. |
  | `refactor/` | Refatorações, sem mudança de comportamento. |

  O nome descritivo fica em português, sem acentos, com palavras separadas por hífen, preservando o prefixo em inglês. Exemplos: `feat/12-navegacao-entre-modulos`, `fix/15-validacao-do-quiz`.
- Adicionar o `TASKS-[numero-da-issue].md` à nova branch — **nunca** diretamente à `main`.
- Se a branch `dev` não existir, **perguntar ao responsável** antes de criá-la.

### Etapa 6 — Desenvolvimento incremental

- Desenvolver em pequenas partes, seguindo o planejamento aprovado no `TASKS`.
- Fazer commits pequenos, atômicos e logicamente organizados, com mensagens em português brasileiro e prefixos convencionais quando apropriado.
- Executar os testes e verificações pertinentes a cada etapa.
- Atualizar o `TASKS` conforme o andamento real do trabalho.
- Não desenvolver diretamente em `main` ou `dev`.

### Etapa 7 — Push e Pull Request

- Enviar a branch de trabalho para o repositório remoto.
- Criar o Pull Request com destino **obrigatório à `dev`**.
- Título e descrição em português brasileiro, informando o que foi implementado, os testes realizados e a Issue relacionada.
- Apresentar o PR ao responsável para revisão.

> **Regra fundamental:** agentes **nunca** realizam o merge de Pull Requests. O responsável analisa a `dev` e conduz a revisão e o merge para a `main`.

### Etapa 8 — Relatório final

Ao concluir o trabalho, apresentar um relatório em Markdown (seção 12), em português brasileiro, salvo em `docs/relatorios/` e versionado na própria branch de trabalho, contendo:

- Número e link da Issue.
- Nome e localização do arquivo `TASKS`.
- Nome da branch utilizada.
- Resumo das alterações.
- Arquivos criados, modificados ou removidos.
- Commits realizados.
- Testes executados e respectivos resultados.
- Link do Pull Request direcionado à `dev`.
- Pendências ou limitações identificadas.

---

## 10. Regras obrigatórias de Git e GitHub

Organização das branches:

| Branch | Papel |
|--------|-------|
| `main` | Branch principal; origem de todas as branches de trabalho e fonte da publicação no GitHub Pages. |
| `dev` | Branch de integração; destino de todos os Pull Requests. |
| `feat/`, `fix/`, `refactor/` | Branches de trabalho (ver seção 9, etapa 5). |

Regras:

1. Toda branch de trabalho (`feat/`, `fix/`, `refactor/`) nasce diretamente da `main`.
2. Todo PR de branch de trabalho tem como destino a `dev`.
3. Nunca realizar merge de PR. O merge é responsabilidade exclusiva do responsável.
4. Nunca desenvolver diretamente em `main` ou `dev`.
5. Nunca criar uma branch de trabalho a partir de `dev` ou de outra branch de trabalho.
6. Nunca fazer force push.
7. Nunca criar commits vazios.
8. Nunca alterar o histórico remoto sem autorização.
9. Nunca sobrescrever alterações do responsável.
10. Nunca executar operações destrutivas sem autorização.
11. Sempre verificar o estado do repositório antes de operações Git relevantes.
12. Diante de divergências, conflitos ou situações não previstas, interromper e consultar o responsável.
13. Toda comunicação descritiva relacionada ao GitHub é feita em português brasileiro.

---

## 11. Aprovações obrigatórias

Solicitar aprovação do responsável antes de:

- Iniciar o desenvolvimento de uma funcionalidade após o planejamento.
- Alterar significativamente a arquitetura ou a estrutura do projeto.
- Adicionar dependências relevantes.
- Modificar o escopo ou os critérios de aceitação.
- Tomar decisões de Gitflow não previstas neste documento.
- Executar operações destrutivas ou que possam afetar o histórico do repositório.

Não é necessário pedir aprovação para cada pequena alteração técnica já contemplada no planejamento aprovado.

---

## 12. Formato das entregas

Toda entrega estruturada ou resultado de tarefa é organizado em um **arquivo Markdown (`.md`)**, escrito em português brasileiro (seção 7). Isso inclui:

- Diagnósticos do repositório.
- Análises técnicas.
- Propostas de arquitetura.
- Planejamentos de funcionalidades.
- Rascunhos de Issues.
- Documentos `TASKS-[numero-da-issue].md`.
- Relatórios de execução.
- Relatórios de testes.
- Análises de Pull Requests.
- Documentação técnica.

Regras:

- Ao gerar o arquivo, informar seu **nome e localização**.
- No chat, apresentar apenas uma **síntese objetiva**: o arquivo gerado e os principais resultados.
- Mensagens curtas de esclarecimento ou perguntas pontuais não exigem arquivo.
- Criar ou versionar esses arquivos não autoriza commits ou push fora das etapas do fluxo (seção 9).

### 12.1 Onde ficam os arquivos

| Tipo | Local | Versionado? |
|------|-------|-------------|
| Relatórios técnicos **relevantes e permanentes** (diagnósticos, relatórios finais, relatórios de testes, análises de arquitetura, registros de decisões) | `docs/relatorios/` | Sim |
| `TASKS-[numero-da-issue].md` aprovado | Raiz do repositório, na branch de trabalho (seção 9, etapa 5) | Sim, nunca diretamente na `main` |
| Rascunhos (Issues, `TASKS` antes da aprovação, propostas em discussão) e arquivos temporários | Fora do repositório ou não adicionados ao Git | Não |

- Nome sugerido para relatórios: `docs/relatorios/AAAA-MM-DD-assunto.md`, em português, sem acentos e com palavras separadas por hífen (ex.: `docs/relatorios/2026-11-18-revisao-da-documentacao.md`).
- **Não criar relatórios artificiais** apenas para preencher a pasta. Só entra em `docs/relatorios/` o que tiver valor de registro para o projeto.
- Na dúvida sobre a permanência de um relatório, perguntar ao responsável.

---

## 13. Escopo

**Dentro do escopo:** tudo o que está descrito nas seções 3 a 6.

**Fora do escopo (sem autorização):**

- Backend, APIs próprias, banco de dados ou login.
- Salvamento de progresso, pontuação ou respostas por participante.
- Ranking, placar compartilhado ou comunicação em tempo real entre dispositivos.
- Painéis administrativos e coleta de dados (analytics).
- Conteúdo técnico ou pedagógico não fornecido pela equipe do projeto.

---

## 14. Critérios de conclusão

Uma tarefa só é considerada concluída quando:

1. Atende ao requisito e aos critérios de aceitação da Issue, sem extrapolar o escopo.
2. Passa nas verificações obrigatórias (seção 6.3: `tsc` e build do Vite) e funciona em `npm run preview`, de forma compatível com o GitHub Pages (`HashRouter` e `base` corretos, sem dependência de servidor).
3. Foi verificada em larguras de tela de celular e de computador, sem rolagem horizontal indevida.
4. Pode ser usada por teclado, com foco visível e rótulos adequados.
5. Não gera erros no console do navegador.
6. Respeita a convenção de idioma (seção 7).
7. Não contém informações técnicas inventadas; pendências estão marcadas e foram comunicadas.
8. Não quebra funcionalidades já existentes.
9. O `TASKS` está atualizado, o PR para a `dev` foi aberto e o relatório final foi apresentado em Markdown (seções 9 e 12).

A **plataforma** é considerada concluída quando os cinco módulos e todos os requisitos RF01–RF11 estiverem implementados e validados segundo os critérios acima, e o site estiver publicado no GitHub Pages.

---

## 15. Informações pendentes

Itens que ainda precisam ser fornecidos ou definidos pela equipe. Não presuma valores para eles.

- Código C++ oficial do robô.
- Lista de componentes, esquema elétrico e ligações (pinos do Arduino/placa, resistores etc.).
- Link do projeto no Tinkercad Circuits.
- Conteúdo do Diário de Bancada (problemas, causas e soluções reais).
- Perguntas, alternativas e explicações do quiz; enunciado dos desafios.
- Regras da máquina de estados (ex.: distância limite para entrar em Ataque, comportamento em cada estado).
- Diferenças de conteúdo entre Modo Aluno e Modo Professor.
- Distribuição de tempo entre os módulos na aula de 90 minutos.
- Imagens, fotos e identidade visual (cores, logotipo).

Pendências de infraestrutura (decisões do responsável):

- O repositório continua **privado**. Qualquer mudança de visibilidade só ocorre após auditoria do conteúdo, conduzida pelo responsável.
- O responsável verificará se o plano do GitHub permite o GitHub Pages em repositório privado.
- Criação das branches `main` (a partir do commit atualizado da documentação) e `dev` (a partir da `main`): autorizada, a ser executada mediante nova orientação.
- Alteração da branch padrão para `main`, proteção de branches e configuração do Pages com origem "GitHub Actions": a cargo do responsável, nas configurações do GitHub.
