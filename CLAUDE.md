# CLAUDE.md — Instruções para o Claude Code

As instruções gerais do projeto (contexto, requisitos, restrições, convenção de idioma, fluxo de desenvolvimento, regras de Git e critérios de conclusão) estão em `AGENTS.md` e são importadas abaixo. Este arquivo contém apenas orientações específicas de comportamento do Claude Code.

@AGENTS.md

---

## Regras inegociáveis

- **Siga o fluxo obrigatório de desenvolvimento** (`AGENTS.md`, seção 9) para toda funcionalidade, melhoria ou correção. Não pule etapas e não implemente nada antes da aprovação do `TASKS`.
- **Nunca realize merge de Pull Requests**, em nenhuma circunstância. O merge é sempre feito pelo responsável.
- **Siga as regras de Git e GitHub** (`AGENTS.md`, seção 10): branches de trabalho (`feat/`, `fix/`, `refactor/`) nascem da `main`, PRs vão para a `dev`, sem force push, sem commits vazios e sem alterar histórico remoto.
- **Use somente a stack aprovada** (`AGENTS.md`, seção 6) e execute as verificações obrigatórias (`tsc` e build do Vite) antes de dar uma alteração de código como pronta.
- **Nunca altere configurações do GitHub** (visibilidade, branch padrão, proteção de branches, Pages) nem apague branches sem autorização explícita.
- **Não execute ações destrutivas sem autorização** (apagar ou sobrescrever arquivos, reescrever histórico do Git, remover conteúdo existente).

## Forma de trabalho

1. **Analise o repositório antes de qualquer alteração:** leia os arquivos relevantes e confira o estado do Git (branch atual, árvore de trabalho, sincronização com o remoto).
2. **Use o Plan Mode** para tarefas estruturais ou que envolvam alterações em vários arquivos.
3. **Não assuma decisões** de produto, pedagógicas, de arquitetura ou de Gitflow sem autorização.
4. **Encaminhe ao responsável** dúvidas, decisões não previstas, divergências e conflitos. Faça perguntas objetivas, de preferência com opções, e interrompa a operação até obter resposta.
5. **Respeite os limites da tarefa:** quando o responsável restringir uma execução (por exemplo, "somente documentação" ou "não fazer commits"), essa restrição prevalece sobre as etapas do fluxo.

## Idioma

- Comunique-se sempre em **português brasileiro**: respostas, planos, perguntas, Issues, `TASKS`, commits, PRs, comentários no código e relatórios.
- Mantenha em **inglês** os identificadores de código (`calculateDistance()`, `UltrasonicSensor`, `MAX_DISTANCE`), os nomes de tecnologias e os prefixos convencionais (`feat:`, `fix:`, `docs:`).
- Detalhes e exemplos: `AGENTS.md`, seção 7.

## Entregas e conclusão de tarefas

- **Entregue em arquivo Markdown** toda análise, planejamento, rascunho de Issue, `TASKS` ou relatório (`AGENTS.md`, seção 12). No chat, dê apenas uma síntese objetiva com o nome e a localização do arquivo e os principais resultados.
- Relatórios permanentes vão para `docs/relatorios/` e são versionados; rascunhos e arquivos temporários não são versionados (`AGENTS.md`, seção 12.1).
- Em tarefas do fluxo completo, o arquivo é o **relatório final** descrito em `AGENTS.md`, seção 9, etapa 8.
- Em tarefas menores ou fora do fluxo, o arquivo traz: resumo, arquivos alterados, validação realizada e resultado, problemas encontrados (mesmo os não resolvidos) e pendências.
- Perguntas e esclarecimentos curtos podem ser feitos diretamente no chat, sem arquivo.
