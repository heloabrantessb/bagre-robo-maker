# Revisão da documentação de instruções — 18/11/2026

Relatório da preparação documental do repositório antes da criação das branches `main` e `dev`.

## 1. Arquivos atualizados

| Arquivo | Situação | Alteração |
|---------|----------|-----------|
| `AGENTS.md` | Modificado | Stack, verificações, arquitetura, prefixos de branch, formato e local das entregas, pendências de infraestrutura |
| `CLAUDE.md` | Modificado | Reforço da stack e das verificações, proibição de alterar configurações do GitHub, local dos relatórios |
| `DECISOES-PENDENTES.md` | Criado | Questões de infraestrutura, com a tabela de status das decisões já tomadas |
| `docs/relatorios/2026-11-18-revisao-da-documentacao.md` | Criado | Este relatório |

Nenhum outro arquivo foi criado ou alterado.

## 2. Decisões incorporadas

| # | Decisão | Onde está documentada |
|---|---------|-----------------------|
| 1 | Stack: React, TypeScript, Vite, React Router com `HashRouter`, Tailwind CSS, Lucide React, Prism.js, npm e ESLint | `AGENTS.md` 6.2 |
| 2 | Verificações obrigatórias iniciais: `tsc` e build do Vite | `AGENTS.md` 6.3 e 14; `CLAUDE.md` |
| 3 | Vitest apenas com necessidade justificada e aprovação | `AGENTS.md` 6.2 e 6.3 |
| 4 | Arquitetura estática, sem backend, banco de dados, autenticação ou persistência de progresso | `AGENTS.md` 6.1 e 13 |
| 5 | Comunicação e documentação em português brasileiro; identificadores técnicos em inglês | `AGENTS.md` 7; `CLAUDE.md` |
| 6 | Fluxo: discussão → planejamento → Issue → `TASKS` → aprovação → branch → commits → PR → relatório | `AGENTS.md` 9 |
| 7 | Prefixos de branch `feat/`, `fix/` e `refactor/`, sempre criados a partir da `main` | `AGENTS.md` 9 (etapa 5) e 10 |
| 8 | PRs direcionados à `dev` | `AGENTS.md` 9 (etapa 7) e 10 |
| 9 | Proibição absoluta de merge de PR | `AGENTS.md` 9 e 10; `CLAUDE.md` (regras inegociáveis) |
| 10 | Entregas estruturadas em Markdown, com síntese no chat | `AGENTS.md` 12; `CLAUDE.md` |
| 11 | Relatórios permanentes em `docs/relatorios/`, versionados; rascunhos e temporários não versionados | `AGENTS.md` 12.1 e 9 (etapa 8); `CLAUDE.md` |
| 12 | Repositório continua privado; auditoria antes de mudar a visibilidade; plano do GitHub a verificar | `AGENTS.md` 15; `DECISOES-PENDENTES.md` |
| 13 | `main` criada a partir do commit atualizado; `dev` criada a partir da `main` | `AGENTS.md` 15; `DECISOES-PENDENTES.md` |

## 3. Conflitos encontrados e como foram resolvidos

1. **ESLint como verificação obrigatória.** A versão anterior do `AGENTS.md` (seção 6.3) e do `CLAUDE.md` listava o ESLint entre as verificações obrigatórias, mas a decisão aprovada define como obrigatórias iniciais apenas o `tsc` e o build.
   - **Correção:** o ESLint continua na stack como ferramenta de análise estática. Quando configurado, deve ser executado e seus apontamentos tratados ou justificados. Torná-lo obrigatório fica a critério do responsável.
2. **Origem da `main`.** O `DECISOES-PENDENTES.md` propunha criar a `main` a partir de `02ee9ed`. A decisão final é criá-la a partir do commit atualizado da documentação. O arquivo foi atualizado com uma tabela de status, preservando a análise original.

Não foram encontrados outros conflitos entre as instruções.

## 4. Convenções definidas nesta revisão (confirmar)

Estas convenções são detalhes operacionais que derivam das decisões aprovadas. Podem ser ajustadas pelo responsável:

- **Nome dos relatórios:** `docs/relatorios/AAAA-MM-DD-assunto.md`, em português, sem acentos.
- **Local do `TASKS` aprovado:** raiz do repositório, na branch de trabalho.
- **Relatório final de cada Issue:** salvo em `docs/relatorios/` e versionado na própria branch de trabalho.

## 5. Pontos que ainda dependem do responsável

1. Verificar se o plano do GitHub permite o GitHub Pages em repositório privado.
2. Dar a nova orientação para criar `main` e `dev`.
3. Após a criação, alterar a branch padrão para `main`, configurar a proteção de branches e ativar o Pages com origem "GitHub Actions".
4. Decidir se o ESLint será uma verificação obrigatória.
5. Decidir se o `DECISOES-PENDENTES.md` permanece na raiz ou se passa para `docs/relatorios/` como registro de decisões, já que pela nova regra de relatórios ele se encaixa nessa pasta.
6. Fornecer as informações de conteúdo listadas no `AGENTS.md`, seção 15: código C++, componentes, link do Tinkercad, quiz, Diário de Bancada etc.

## 6. Validação realizada

- As referências cruzadas entre as seções do `AGENTS.md` e do `CLAUDE.md` foram conferidas e apontam para as seções corretas.
- A importação `@AGENTS.md` continua presente em linha própria no `CLAUDE.md`, fora de bloco de código.
- Os blocos de código nos arquivos Markdown estão abertos e fechados corretamente.
- O conteúdo foi verificado contra as decisões das conversas anteriores, sem contradições remanescentes.

## 7. Confirmação

- **Nenhuma implementação da aplicação foi iniciada.**
- Nenhuma dependência foi instalada.
- Nenhuma Issue, branch ou Pull Request foi criada.
- Nenhuma configuração do GitHub foi alterada.
- O único envio ao remoto é o commit de documentação na branch `claude/laughing-einstein-6xy9bf`.
