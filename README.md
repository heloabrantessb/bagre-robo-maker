# Bagre Robô Maker

Plataforma educacional web de apoio a uma aula guiada de 90 minutos sobre a construção, a eletrônica e a programação de um robô inspirado em um bagre.

As instruções completas do projeto (escopo, stack, fluxo de trabalho e convenções) estão em [`AGENTS.md`](AGENTS.md).

## Requisitos

- Node.js `^20.19.0` ou `>=22.12.0`
- npm

## Comandos

| Comando | Finalidade |
|---------|------------|
| `npm install` | Instala as dependências (usa o `package-lock.json`). |
| `npm run dev` | Servidor de desenvolvimento em `http://localhost:5173/bagre-robo-maker/`. |
| `npm run typecheck` | Verificação de tipos com TypeScript (`tsc`). |
| `npm run lint` | Análise estática com ESLint. |
| `npm run verify:modules` | Verifica as funções de sequência dos módulos (`scripts/verify-modules.mjs`). Funciona em toda a faixa de Node.js suportada. |
| `npm run build` | Verificação de tipos e build de produção em `dist/`. |
| `npm run preview` | Serve o build em `http://localhost:4173/bagre-robo-maker/`. |

Para validar o build, use `npm run preview`. Abrir `dist/index.html` diretamente pelo sistema de arquivos não funciona.

## Publicação

O site é publicado no GitHub Pages em **https://heloabrantessb.github.io/bagre-robo-maker/** pelo workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

| Evento | O que acontece |
|--------|----------------|
| Pull Request para `dev` ou `main` | `typecheck`, `lint`, `verify:modules` e `build` no Node.js 20.19 e 22, **sem publicar** |
| Push na `main` (merge da `dev`) | As mesmas verificações, build e **publicação** |
| Disparo manual (*Actions → Publicação no GitHub Pages → Run workflow*, na `main`) | Verificações, build e publicação |

Pré-requisito: em *Settings → Pages → Build and deployment → Source*, a origem deve ser **GitHub Actions**. Com "Deploy from a branch", o GitHub publica os arquivos sem build e a página fica em branco.

## Estrutura

```
src/
├── main.tsx           # ponto de entrada (React + HashRouter)
├── App.tsx            # componente raiz (layout + rotas)
├── routes/            # definição das rotas
├── pages/             # uma página por rota
├── components/        # componentes compartilhados (layout/, home/ e modules/)
├── hooks/             # hooks React (ex.: passo em leitura na página de módulo)
├── data/              # dados estáticos tipados (módulos, cores, objetivos e passos)
├── styles/            # CSS global com Tailwind CSS
└── assets/            # imagens e recursos importados pelo código
public/                # arquivos estáticos copiados sem processamento
docs/relatorios/       # relatórios técnicos do projeto
```

## Rotas

A aplicação usa `HashRouter`, portanto as rotas ficam após `#` na URL (ex.: `/bagre-robo-maker/#/modulos/desafio-quiz`). Isso garante que links diretos e recargas funcionem no GitHub Pages.

| Rota | Página |
|------|--------|
| `#/` | Início: apresentação da aula e "O circuito da aula", com os cinco módulos em ordem e seus objetivos |
| `#/modulos` | Redireciona para o início (endereço antigo da lista de módulos) |
| `#/modulos/<slug>` | Página do módulo: barra lateral de passos e um título (h2) por passo; conteúdo didático ainda em preparação |
| qualquer outra | Página não encontrada |

Slugs dos módulos: `biomimetica-garrafa-pet`, `eletronica-transistor-c1815`, `sensor-ultrassonico-sonar`, `programacao-espreita-ataque` e `desafio-quiz` (definidos em `src/data/modules.ts`).
