# Decisões pendentes — Bagre Robô Maker

Situação em 18/11/2026. Estas decisões precisam ser tomadas pelo responsável **antes** da primeira Issue de implementação.

## Status das decisões (atualizado em 18/11/2026)

| # | Questão | Decisão do responsável | Status |
|---|---------|------------------------|--------|
| 1 | Visibilidade / plano | O repositório **continua privado**. Haverá auditoria antes de qualquer mudança de visibilidade. O plano do GitHub ainda será verificado. | Parcialmente decidida: aguarda verificação do plano |
| 2 | Criação de `main` e `dev` | **Autorizada**, somente após a documentação atualizada estar commitada e enviada. A `main` sai do commit atualizado da branch atual, e não de `02ee9ed`; a `dev` sai da `main`. | Autorizada: aguarda nova orientação para execução |
| 3 | Branch padrão igual a `main` | A cargo do responsável. | Pendente: depende da questão 2 |
| 4 | Pages com origem GitHub Actions | A cargo do responsável. | Pendente: depende das questões 1 e 3 |
| A | Onde versionar a documentação atual | Commit na branch atual antes de criar a `main` (opção 1). | Decidida |
| B | Local dos relatórios | `docs/relatorios/`. Relatórios relevantes e permanentes são versionados; rascunhos e temporários, não. | Decidida e incorporada ao `AGENTS.md`, seção 12.1 |

As seções abaixo registram a análise original de cada questão.

## Situação atual do repositório

| Item | Estado |
|------|--------|
| Visibilidade | Privado |
| Branches existentes | Somente `claude/laughing-einstein-6xy9bf` (local e remota) |
| Branch padrão no GitHub | `claude/laughing-einstein-6xy9bf` |
| `main` / `dev` | Não existem |
| Último commit | `02ee9ed` — `docs: formalizar fluxo de desenvolvimento, regras de Git e convenção de idioma` |
| GitHub Pages | Não configurado |
| GitHub Actions | Nenhum workflow |

## Resumo

| # | Questão | Quem executa | Bloqueia |
|---|---------|--------------|----------|
| 1 | Visibilidade do repositório ou plano do GitHub | Responsável | Publicação no GitHub Pages |
| 2 | Criação de `main` e `dev` | Claude Code, após autorização | Todo o fluxo de desenvolvimento |
| 3 | Branch padrão do repositório igual a `main` | Responsável | PRs, proteção de branches e publicação |
| 4 | GitHub Pages com origem "GitHub Actions" | Responsável | Publicação automática |

---

## 1. O repositório será público ou continuará privado com um plano compatível com o GitHub Pages?

**Contexto:** no plano gratuito do GitHub, o Pages só funciona em repositórios **públicos**. Para usar o Pages em repositório privado é preciso um plano pago (Pro, Team ou Enterprise).

**Opções e consequências:**

| Opção | Consequências |
|-------|---------------|
| **A. Tornar o repositório público** | Pages disponível sem custo. Código, Issues, PRs e histórico ficam visíveis para qualquer pessoa. É preciso conferir se o repositório não contém dados pessoais, credenciais ou materiais que não possam ser divulgados. |
| **B. Manter privado com plano pago** | O código continua restrito. O site publicado continua **público** na internet (em planos individuais, o Pages não restringe o acesso ao site). Há custo de assinatura. |

**O que precisa ser feito:**

- **Opção A:** o responsável altera a visibilidade em *Settings → General → Danger Zone → Change repository visibility*.
- **Opção B:** o responsável confirma que a conta tem um plano compatível.

**Observação:** em qualquer opção o site publicado fica acessível publicamente, o que é necessário para os participantes entrarem pelos próprios dispositivos.

---

## 2. Está autorizado criar a `main` a partir do commit `02ee9ed` e a `dev` a partir da `main`?

**Contexto:** o fluxo do `AGENTS.md` (seções 9 e 10) depende das duas branches. Hoje todo o histórico está apenas na branch `claude/laughing-einstein-6xy9bf`.

**Consequências:**

- A `main` passa a conter `AGENTS.md`, `CLAUDE.md` e o histórico atual (2 commits), sem reescrever nada.
- A `dev` nasce idêntica à `main` e passa a receber os PRs.
- O `DECISOES-PENDENTES.md` **não é versionado** neste momento. Ele está apenas na árvore de trabalho local. Também é preciso decidir se ele e as alterações atuais do `AGENTS.md` e do `CLAUDE.md` entram na `main` (ver questão complementar A).
- **Restrição do ambiente:** esta sessão do Claude Code está configurada para enviar alterações apenas para a branch `claude/laughing-einstein-6xy9bf`. Enviar `main`, `dev` e as branches de trabalho exige a sua autorização explícita. Se a sessão não permitir esse envio, o responsável pode criar as branches pelo GitHub.

**O que precisa ser feito:**

1. O responsável autoriza.
2. O Claude Code verifica o estado do repositório, cria a `main` a partir de `02ee9ed` e a `dev` a partir da `main`, e envia as duas, **sem force push**.
3. Depois que a questão 3 estiver concluída, a branch `claude/laughing-einstein-6xy9bf` pode ser apagada pelo responsável. Isso é opcional e só deve ser feito com autorização.

---

## 3. A branch padrão será alterada para `main` pelo responsável?

**Contexto:** hoje a branch padrão é `claude/laughing-einstein-6xy9bf`, porque foi a primeira enviada ao GitHub.

**Consequências de manter como está:**

- Novos PRs sugerem a branch errada como destino.
- Clones novos do repositório começam na branch errada.
- O ambiente `github-pages` só aceita, por padrão, publicação a partir da branch padrão, então a publicação a partir da `main` falharia.
- A branch `claude/...` não pode ser apagada enquanto for a padrão.

**O que precisa ser feito:**

1. Depende da questão 2: a `main` precisa existir antes.
2. O responsável acessa *Settings → General → Default branch*, seleciona `main` e confirma.
3. **Recomendado:** proteger a `main` e a `dev` em *Settings → Branches* (ou *Rules*), exigindo PR e bloqueando push direto e force push.

---

## 4. O GitHub Pages será configurado pelo responsável em *Settings → Pages*, com origem "GitHub Actions"?

**Contexto:** a publicação será feita por um workflow do GitHub Actions, que faz o build com o Vite e publica a pasta `dist/`. Para isso o Pages precisa usar a origem **GitHub Actions** em vez de "Deploy from a branch".

**Consequências:**

- Sem essa configuração, o workflow de publicação falha na etapa de deploy.
- Com ela, cada push na `main` (após o merge feito pelo responsável) atualiza o site automaticamente.
- O endereço do site será `https://heloabrantessb.github.io/bagre-robo-maker/`, que é o motivo de o `base` do Vite ser `/bagre-robo-maker/`.

**O que precisa ser feito:**

1. Depende das questões 1 e 3.
2. O responsável acessa *Settings → Pages → Build and deployment → Source* e seleciona **GitHub Actions**.
3. O arquivo de workflow (`.github/workflows/deploy.yml`) será criado depois, numa Issue própria, seguindo o fluxo.

---

## Questões complementares

### A. Onde versionar este arquivo e as alterações atuais da documentação?

As alterações em `AGENTS.md` e `CLAUDE.md` e o novo `DECISOES-PENDENTES.md` estão apenas locais, sem commit. Opções:

1. Fazer commit na branch `claude/laughing-einstein-6xy9bf` antes de criar a `main`, para que a `main` já nasça com a documentação atualizada. Nesse caso, a `main` sairia do novo commit, e não de `02ee9ed`.
2. Criar a `main` a partir de `02ee9ed`, como proposto, e levar as alterações por uma branch `docs/...` com PR para a `dev`. Esse caminho exige definir o prefixo `docs/`, que não está previsto.

**Recomendação:** opção 1. É a mais simples e evita começar o fluxo com documentação desatualizada na `main`.

### B. Onde guardar os arquivos Markdown de entrega?

A nova regra de entregas (`AGENTS.md`, seção 12) vai gerar diagnósticos, relatórios e análises com frequência. Falta definir:

- Se ficam na raiz ou em uma pasta própria (sugestão: `docs/relatorios/`).
- Se são versionados no Git ou mantidos apenas como entrega local.

Os arquivos `TASKS-[numero-da-issue].md` já têm regra: são versionados na branch de trabalho.

---

## Próximos passos após as decisões

1. Versionar a documentação atualizada (conforme a questão A).
2. Criar `main` e `dev` (questão 2).
3. O responsável ajusta a branch padrão, a proteção de branches e o Pages (questões 1, 3 e 4).
4. Iniciar o fluxo da primeira Issue: estrutura inicial com Vite, React, TypeScript, Tailwind CSS e React Router (`HashRouter`).
