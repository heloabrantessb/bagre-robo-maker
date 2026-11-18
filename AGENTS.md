# AGENTS.md — Bagre Robô Maker

Documento principal de referência para agentes de programação (e pessoas) que trabalharem neste repositório. Leia-o por completo antes de qualquer alteração.

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

A distribuição de tempo entre os módulos dentro dos 90 minutos **ainda não foi definida** (ver seção 10).

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
| RNF05 | **Idioma:** todo o conteúdo em **português brasileiro**. |
| RNF06 | **Compatibilidade:** funcionar nas versões recentes dos principais navegadores (Chrome, Firefox, Safari, Edge), incluindo os móveis. |
| RNF07 | **Degradação controlada:** se um recurso externo (ex.: Tinkercad) não carregar, o restante da página continua utilizável e há alternativa. |

---

## 6. Decisões e restrições técnicas

- **Hospedagem:** GitHub Pages.
- **Tipo de aplicação:** estática.
- **Tecnologias:** HTML, CSS e JavaScript.
- **Sem** backend próprio.
- **Sem** banco de dados.
- **Sem** autenticação.
- **Sem** armazenamento individual de progresso.
- **Acesso:** individual, pelos dispositivos dos participantes.
- **Interface:** responsiva.

Implicações:

- O site deve funcionar servido como arquivos estáticos, com **caminhos relativos** (compatíveis com o subdiretório do GitHub Pages).
- Não introduzir etapa de build, framework ou gerenciador de pacotes sem autorização explícita.
- Bibliotecas externas (ex.: realce de sintaxe) só quando realmente necessárias e com aprovação; prefira soluções nativas.
- O Modo Aluno/Professor é apenas uma alternância de visualização no navegador — **não é** controle de acesso.
- O Tinkercad pode bloquear a incorporação em alguns casos; o link para nova aba é obrigatório em todas as situações.

---

## 7. Diretrizes de desenvolvimento

- **Analisar o repositório** antes de qualquer alteração.
- **Preservar implementações existentes**; não reescrever o que funciona sem motivo.
- **Evitar dependências desnecessárias.**
- **Não inventar informações técnicas sobre o robô** (componentes, pinos, valores, código, medidas). Quando o dado não estiver disponível no repositório ou não tiver sido fornecido, use um marcador explícito (ex.: `<!-- PENDENTE: ... -->`) e informe a pendência.
- **Não implementar funcionalidades fora do escopo** deste documento sem autorização.
- **Desenvolver incrementalmente**, em entregas pequenas e verificáveis.
- **Priorizar acessibilidade, responsividade e usabilidade.**
- **Validar as implementações** antes de considerá-las concluídas (ver seção 9).
- **Utilizar português brasileiro** nos conteúdos e na documentação.
- **Não realizar commits ou push sem solicitação.**

---

## 8. Escopo

**Dentro do escopo:** tudo o que está descrito nas seções 3 a 6.

**Fora do escopo (sem autorização):**

- Backend, APIs próprias, banco de dados ou login.
- Salvamento de progresso, pontuação ou respostas por participante.
- Ranking, placar compartilhado ou comunicação em tempo real entre dispositivos.
- Painéis administrativos e coleta de dados (analytics).
- Conteúdo técnico ou pedagógico não fornecido pela equipe do projeto.

---

## 9. Critérios de conclusão

Uma tarefa só é considerada concluída quando:

1. Atende ao requisito solicitado, sem extrapolar o escopo.
2. Funciona como site estático aberto localmente e é compatível com o GitHub Pages (caminhos relativos, sem dependência de servidor).
3. Foi verificada em larguras de tela de celular e de computador, sem rolagem horizontal indevida.
4. Pode ser usada por teclado, com foco visível e rótulos adequados.
5. Não gera erros no console do navegador.
6. Mantém todo o conteúdo em português brasileiro.
7. Não contém informações técnicas inventadas; pendências estão marcadas e foram comunicadas.
8. Não quebra funcionalidades já existentes.

A **plataforma** é considerada concluída quando os cinco módulos e todos os requisitos RF01–RF11 estiverem implementados e validados segundo os critérios acima, e o site estiver publicado no GitHub Pages.

---

## 10. Informações pendentes

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
