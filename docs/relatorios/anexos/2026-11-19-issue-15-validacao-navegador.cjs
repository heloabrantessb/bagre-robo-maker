// ANEXO DO RELATÓRIO — docs/relatorios/2026-11-19-issue-15-pagina-inicial-circuito.md
//
// Registro do script usado na validação pontual de navegador da Issue #15.
// NÃO é um teste automatizado do projeto: o Playwright não é dependência do repositório,
// e este arquivo não é executado por nenhum script do package.json nem pelo workflow.
// Foi executado no ambiente de trabalho do agente, onde o Playwright e o Chromium já estavam instalados.
//
// Procedimento para reproduzir (requer Playwright disponível globalmente):
//   1. npm ci
//   2. npm run build
//   3. npx vite preview --port 4173 --strictPort    (em outro terminal)
//   4. node docs/relatorios/anexos/2026-11-19-issue-15-validacao-navegador.cjs
//
// Saída esperada: uma linha "OK"/"FALHA" por verificação e o total ao final.

const { chromium } = require('playwright')

const base = 'http://localhost:4173/bagre-robo-maker/'
const results = []
const out = (name, ok, info = '') => {
  results.push(ok)
  console.log(`${ok ? 'OK   ' : 'FALHA'} ${name} ${info}`)
}
const modules = [
  ['biomimetica-garrafa-pet', 'Biomimética & Garrafa PET', ['Conceitos de biomimética', 'Construção do corpo com garrafa PET']],
  ['eletronica-transistor-c1815', 'Eletrônica & Transistor C1815', ['Circuitos eletrônicos do robô', 'Funcionamento do transistor C1815']],
  ['sensor-ultrassonico-sonar', 'Sensor Ultrassônico & Sonar', ['Princípios do sensor ultrassônico HC-SR04']],
  ['programacao-espreita-ataque', 'Programação C++ — Espreita vs. Ataque', ['Programação C++ do robô', 'Máquina de estados Espreita e Ataque']],
  ['desafio-quiz', 'Desafio & Quiz Interativo', ['Desafios e quiz para avaliar o aprendizado']],
]
const HOME_TITLE = 'Monte, ligue e programe um robô-bagre'
const TRAIL = 'nav[aria-label="Módulos da aula, em ordem"]'
const CIRCUIT = 'section[aria-labelledby="titulo-circuito"]'

// Espera o título e o carregamento das fontes (a troca de fonte altera a altura dos títulos).
const waitH1 = (page, text) =>
  page
    .waitForFunction((t) => document.querySelector('h1')?.textContent === t && document.fonts.status === 'loaded', text, { timeout: 8000 })
    .then(() => true, () => false)

function luminance(rgb) {
  const c = rgb.map((v) => {
    const x = v / 255
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
const contrast = (a, b) => {
  const x = luminance(a)
  const y = luminance(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}
const hex = (h) => [1, 3, 5].map((i) => Number.parseInt(h.slice(i, i + 2), 16))
const rgbOf = (s) => s.match(/\d+/g).slice(0, 3).map(Number)

;(async () => {
  const browser = await chromium.launch()
  const errors = []
  const newPage = async (width, height = 900, extra = {}) => {
    const page = await browser.newPage({ viewport: { width, height }, ...extra })
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(String(e)))
    return page
  }

  // V1 — estrutura da página inicial
  const p = await newPage(1440)
  await p.goto(base + '#/')
  out('V1 h1 da página inicial', await waitH1(p, HOME_TITLE))
  out('V1 título da aba', (await p.title()) === 'Bagre Robô Maker', await p.title())
  out('V1 h2 "O circuito da aula"', (await p.locator(`${CIRCUIT} h2`).innerText()) === 'O circuito da aula')
  const items = await p.$$eval(`${CIRCUIT} ol > li`, (lis) =>
    lis.map((li) => ({
      title: li.querySelector('h3')?.textContent,
      href: li.querySelector('h3 a')?.getAttribute('href'),
      objectives: [...li.querySelectorAll('ul[aria-label="Objetivos"] li')].map((o) => o.textContent),
    })),
  )
  out('V1 lista ordenada com 5 módulos', items.length === 5)
  modules.forEach(([slug, title, objectives], i) => {
    const item = items[i] ?? {}
    out(`V1 Módulo ${i + 1}: título, link e objetivos`, item.title === title && item.href === `#/modulos/${slug}` && JSON.stringify(item.objectives) === JSON.stringify(objectives))
  })
  out('V1 "Comece aqui" visível no computador', await p.locator(`${CIRCUIT} li >> nth=0 >> text=Comece aqui`).first().isVisible())

  // V2 — navegação
  await p.getByRole('link', { name: 'Começar pelo Módulo 1' }).click()
  out('V2 botão principal leva ao Módulo 1', (await waitH1(p, modules[0][1])) && p.url().endsWith('#/modulos/biomimetica-garrafa-pet'))
  for (const [i, [slug, title]] of modules.entries()) {
    await p.goto('about:blank')
    await p.goto(base + '#/')
    await waitH1(p, HOME_TITLE)
    // Clique com o mouse sobre os objetivos, fora do título: o link cobre o cartão inteiro.
    const box = await p.locator(`${CIRCUIT} ol > li`).nth(i).locator('ul[aria-label="Objetivos"]').boundingBox()
    await p.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
    out(`V2 cartão leva ao Módulo ${i + 1}`, (await waitH1(p, title)) && p.url().endsWith(`#/modulos/${slug}`))
  }

  // V3 — trilha do cabeçalho
  await p.goto(base + '#/')
  await waitH1(p, HOME_TITLE)
  out('V3 trilha ausente na página inicial', (await p.locator(TRAIL).count()) === 0)
  await p.goto(base + '#/modulos/desafio-quiz')
  await waitH1(p, modules[4][1])
  out('V3 trilha presente na página de módulo', (await p.locator(TRAIL).count()) === 1)

  // V4 — redirecionamento e links atualizados
  await p.goto('about:blank')
  await p.goto(base + '#/modulos')
  out('V4 /#/modulos redireciona para o início', (await waitH1(p, HOME_TITLE)) && p.url().endsWith('#/'), p.url())
  await p.goto(base + '#/modulos/sensor-ultrassonico-sonar')
  await waitH1(p, modules[2][1])
  await p.getByRole('link', { name: 'Todos os módulos' }).click()
  out('V4 "Todos os módulos" leva ao início', (await waitH1(p, HOME_TITLE)) && p.url().endsWith('#/'))
  await p.goto(base + '#/modulos/desafio-quiz')
  await waitH1(p, modules[4][1])
  out('V4 fim do Módulo 5 com "Voltar ao início"', (await p.getByRole('link', { name: 'Voltar ao início' }).count()) >= 1)
  out('V4 texto "visão geral" removido', !(await p.locator('body').innerText()).toLowerCase().includes('visão geral'))

  // V5 — larguras e disposição do circuito
  for (const width of [360, 390, 768, 1024, 1440]) {
    const page = await newPage(width, 800)
    await page.goto(base + '#/')
    await waitH1(page, HOME_TITLE)
    const info = await page.evaluate((sel) => {
      const tops = [...document.querySelectorAll(`${sel} ol > li`)].map((li) => Math.round(li.getBoundingClientRect().top))
      return { scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth, tops }
    }, CIRCUIT)
    const horizontal = info.tops.every((t) => t === info.tops[0])
    const vertical = info.tops.every((t, i) => i === 0 || t > info.tops[i - 1])
    out(`V5 ${width}px sem rolagem horizontal`, info.scroll <= info.client, `${info.scroll}/${info.client}`)
    out(`V5 ${width}px circuito ${width >= 1024 ? 'horizontal' : 'vertical'}`, width >= 1024 ? horizontal : vertical, info.tops.join(','))
    if (width === 390) {
      out('V5 390px "Comece aqui" visível no cartão', await page.locator(`${CIRCUIT} p:text-is("Comece aqui")`).isVisible())
      out('V5 390px dica "de cima para baixo"', await page.getByText('Siga os módulos de cima para baixo.').isVisible())
    }
    await page.close()
  }

  // V6 — contraste dos textos coloridos
  await p.goto(base + '#/')
  await waitH1(p, HOME_TITLE)
  const pairs = await p.evaluate((sel) => {
    const list = []
    const bgOf = (el) => {
      for (let e = el; e; e = e.parentElement) {
        const c = getComputedStyle(e).backgroundColor
        if (c && c !== 'rgba(0, 0, 0, 0)') return c
      }
      return 'rgb(255, 255, 255)'
    }
    document.querySelectorAll(`${sel} li p, ${sel} li span[aria-hidden="true"].mt-auto, ${sel} h2 + p span, main section:first-of-type p, main section:first-of-type a, main section:first-of-type li`).forEach((el) => {
      if (el.offsetParent === null || !el.textContent.trim()) return
      list.push({ text: el.textContent.trim().slice(0, 30), fg: getComputedStyle(el).color, bg: bgOf(el) })
    })
    return list
  }, CIRCUIT)
  const ratios = pairs.map((x) => ({ ...x, ratio: contrast(rgbOf(x.fg), rgbOf(x.bg)) }))
  const worst = ratios.reduce((a, b) => (a.ratio < b.ratio ? a : b))
  out(`V6 contraste ≥ 4,5:1 em ${ratios.length} textos`, ratios.every((r) => r.ratio >= 4.5), `mínimo ${worst.ratio.toFixed(2)} ("${worst.text}")`)
  out('V6 "Comece aqui" (vermelho sobre a placa) ≥ 4,5:1', contrast(hex('#c2362f'), hex('#e9eeec')) >= 4.5, contrast(hex('#c2362f'), hex('#e9eeec')).toFixed(2))

  // V7 — alvos de toque e teclado
  const sizes = await p.evaluate((sel) => {
    const start = document.querySelector('main section:first-of-type a').getBoundingClientRect()
    const cards = [...document.querySelectorAll(`${sel} ol > li > div:last-child`)].map((d) => d.getBoundingClientRect().height)
    return { start: start.height, cards }
  }, CIRCUIT)
  out('V7 botão principal com altura ≥ 44px', sizes.start >= 44, String(sizes.start))
  out('V7 cartões com altura ≥ 44px', sizes.cards.every((h) => h >= 44), sizes.cards.map(Math.round).join(','))
  await p.goto('about:blank')
  await p.goto(base + '#/')
  await waitH1(p, HOME_TITLE)
  const order = []
  for (let i = 0; i < 8; i += 1) {
    await p.keyboard.press('Tab')
    order.push(await p.evaluate(() => document.activeElement?.textContent?.trim().replace(/\s+/g, ' ')))
  }
  const expected = ['Pular para o conteúdo', 'Bagre Robô Maker', '1Começar pelo Módulo 1', ...modules.map((m) => m[1])]
  out('V7 ordem de tabulação', JSON.stringify(order) === JSON.stringify(expected), order.join(' | '))
  const focusRing = await p.evaluate(() => {
    const card = document.activeElement.closest('li').querySelector(':scope > div:last-child')
    return getComputedStyle(card).outlineStyle
  })
  out('V7 foco visível no cartão', focusRing !== 'none', focusRing)
  await p.keyboard.press('Enter')
  out('V7 Enter abre o módulo focado', await waitH1(p, modules[4][1]))

  // V8 — console
  out('V8 console sem erros', errors.length === 0, errors.join(' | '))

  await browser.close()
  const passed = results.filter(Boolean).length
  console.log(`\n${passed}/${results.length} verificações aprovadas`)
  process.exit(passed === results.length ? 0 : 1)
})()
