# CLAUDE.md — Instruções para o Claude Code

As instruções gerais do projeto (contexto, requisitos, restrições e critérios de conclusão) estão em `AGENTS.md` e são importadas abaixo. Este arquivo contém apenas orientações específicas de comportamento do Claude Code.

@AGENTS.md

---

## Forma de trabalho

1. **Analise o contexto antes de implementar:** leia os arquivos relevantes e confira o estado atual do repositório.
2. **Use o Plan Mode** para tarefas estruturais ou que envolvam alterações em vários arquivos.
3. **Apresente um plano antes de implementar mudanças significativas** e aguarde aprovação.
4. **Não assuma decisões de produto ou pedagógicas** (conteúdo, ordem, linguagem didática, comportamento dos modos) sem autorização.
5. **Quando faltar informação, faça perguntas objetivas**, de preferência com opções, em vez de presumir.
6. **Não execute ações destrutivas sem autorização** (apagar ou sobrescrever arquivos, reescrever histórico do Git, remover conteúdo existente).

## Ao concluir uma tarefa

Apresente:

- **Resumo** do que foi feito.
- **Arquivos** criados, modificados ou removidos.
- **Validação** realizada e resultado.
- **Problemas** encontrados durante a validação, mesmo que não resolvidos.
- **Pendências** e perguntas em aberto.
