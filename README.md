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

## Estrutura

```
src/
├── main.tsx           # ponto de entrada (React + HashRouter)
├── App.tsx            # componente raiz (layout + rotas)
├── routes/            # definição das rotas
├── pages/             # uma página por rota
├── components/        # componentes compartilhados (layout/ e modules/)
├── data/              # dados estáticos tipados (ex.: lista de módulos)
├── styles/            # CSS global com Tailwind CSS
└── assets/            # imagens e recursos importados pelo código
public/                # arquivos estáticos copiados sem processamento
docs/relatorios/       # relatórios técnicos do projeto
```

## Rotas

A aplicação usa `HashRouter`, portanto as rotas ficam após `#` na URL (ex.: `/bagre-robo-maker/#/modulos/desafio-quiz`). Isso garante que links diretos e recargas funcionem no GitHub Pages.

| Rota | Página |
|------|--------|
| `#/` | Visão geral: apresentação, objetivos da aula e acesso aos módulos |
| `#/modulos` | Lista dos cinco módulos |
| `#/modulos/<slug>` | Página do módulo (provisória, sem conteúdo didático) |
| qualquer outra | Página não encontrada |

Slugs dos módulos: `biomimetica-garrafa-pet`, `eletronica-transistor-c1815`, `sensor-ultrassonico-sonar`, `programacao-espreita-ataque` e `desafio-quiz` (definidos em `src/data/modules.ts`).
