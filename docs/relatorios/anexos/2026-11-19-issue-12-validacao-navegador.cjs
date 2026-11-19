// ANEXO DO RELATÓRIO — docs/relatorios/2026-11-19-issue-12-barra-lateral-protoboard.md
//
// Registro do script usado na validação pontual de navegador da Issue #12.
// NÃO é um teste automatizado do projeto: o Playwright não é dependência do repositório,
// e este arquivo não é executado por nenhum script do package.json nem pelo workflow.
// Foi executado no ambiente de trabalho do agente, onde o Playwright e o Chromium já estavam instalados.
//
// Procedimento para reproduzir (requer Playwright disponível globalmente):
//   1. npm ci
//   2. npm run build
//   3. npx vite preview --port 4173 --strictPort    (em outro terminal)
//   4. node docs/relatorios/anexos/2026-11-19-issue-12-validacao-navegador.cjs
//
// Saída esperada: uma linha "OK"/"FALHA" por verificação e o total ao final (51/51).

// Validação pontual de navegador da Issue #12 (barra lateral protoboard).
// Requer o build servido por: npx vite preview --port 4173 --strictPort
const { chromium } = require('playwright');
const base = 'http://localhost:4173/bagre-robo-maker/';
const results = [];
const out = (k, ok, info = '') => { results.push(ok); console.log(`${ok ? 'OK   ' : 'FALHA'} ${k} ${info}`); };
const modules = [
  ['biomimetica-garrafa-pet', 'Biomimética & Garrafa PET', 3],
  ['eletronica-transistor-c1815', 'Eletrônica & Transistor C1815', 1],
  ['sensor-ultrassonico-sonar', 'Sensor Ultrassônico & Sonar', 1],
  ['programacao-espreita-ataque', 'Programação C++ — Espreita vs. Ataque', 1],
  ['desafio-quiz', 'Desafio & Quiz Interativo', 1],
];
// Espera o título e o carregamento das fontes (a troca de fonte altera a altura do h1).
const waitH1 = (p, t) => p.waitForFunction((x) => document.querySelector('h1')?.textContent === x && document.fonts.status === 'loaded', t, { timeout: 8000 }).then(() => true, () => false);
const currentStep = (p, scope) => p.evaluate((s) => { const el = document.querySelector(`${s} [aria-current="step"]`); return el ? el.innerText.replace(/\s+/g, ' ').trim() : null; }, scope);
const sidebar = 'nav[aria-label^="Passos do Módulo"]:not(.hidden *)';
function L(rgb) { const c = rgb.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }
const contrast = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const newPage = async (width, height = 900, extra = {}) => {
    const p = await browser.newPage({ viewport: { width, height }, ...extra });
    p.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    p.on('pageerror', (e) => errors.push(String(e)));
    return p;
  };

  // V1 — fontes carregadas
  const p = await newPage(1440);
  await p.goto(base + '#/modulos/biomimetica-garrafa-pet'); await waitH1(p, modules[0][1]);
  await p.evaluate(() => document.fonts.ready);
  const fonts = await p.evaluate(() => [document.fonts.check('800 48px "Bricolage Grotesque"'), document.fonts.check('400 16px "Atkinson Hyperlegible Next"')]);
  out('V1 fontes Bricolage Grotesque e Atkinson Hyperlegible Next carregadas', fonts.every(Boolean), JSON.stringify(fonts));

  // V2 — trilha dos módulos
  const trail = await p.$$eval('nav[aria-label="Módulos da aula, em ordem"] a', (as) => as.map((a) => ({ label: a.getAttribute('aria-label'), current: a.getAttribute('aria-current') })));
  out('V2 trilha com 5 módulos em ordem', trail.length === 5 && trail.every((t, i) => t.label.startsWith(`Módulo ${i + 1}:`)), trail.map((t) => t.label).join(' | '));
  out('V2 aria-current="page" no módulo aberto', trail[0].current === 'page' && trail.slice(1).every((t) => t.current === null));
  for (const [i, [slug, title]] of modules.entries()) {
    await p.locator('nav[aria-label="Módulos da aula, em ordem"] a').nth(i).click();
    const ok = await waitH1(p, title);
    const cur = await p.$$eval('nav[aria-label="Módulos da aula, em ordem"] a', (as) => as.findIndex((a) => a.getAttribute('aria-current') === 'page'));
    out(`V2 trilha leva ao Módulo ${i + 1}`, ok && cur === i && p.url().endsWith(`#/modulos/${slug}`), p.url());
  }
  await p.goto(base); await p.waitForSelector('h1');
  const homeCurrent = await p.$$eval('nav[aria-label="Módulos da aula, em ordem"] [aria-current]', (as) => as.length);
  out('V2 nenhum módulo marcado na visão geral', homeCurrent === 0);
  out('V2 abas Visão geral e Módulos removidas', (await p.locator('nav[aria-label="Navegação principal"]').count()) === 0);

  // V3 — barra lateral de passos (desktop)
  await p.goto(base + '#/modulos/biomimetica-garrafa-pet'); await waitH1(p, modules[0][1]);
  const rail = p.locator('nav[aria-label="Passos do Módulo 1"]').first();
  out('V3 barra lateral visível no desktop', await rail.isVisible());
  const stepButtons = rail.locator('ol button');
  out('V3 três passos em ordem', (await stepButtons.count()) === 3, (await stepButtons.allInnerTexts()).map((t) => t.replace(/\s+/g, ' ')).join(' | '));
  out('V3 passo 1 aceso ao abrir', (await rail.locator('[aria-current="step"]').innerText()).includes('O que é biomimética?'));
  out('V3 link Todos os módulos', (await rail.getByRole('link', { name: 'Todos os módulos' }).count()) === 1);

  // V4 — clique num passo
  const urlBefore = p.url();
  await stepButtons.nth(2).click(); await p.waitForTimeout(1200);
  const afterClick = await p.evaluate(() => ({ y: window.scrollY, focus: document.activeElement?.id, top: document.getElementById('modulo-1-passo-montagem-do-corpo')?.getBoundingClientRect().top }));
  out('V4 clique no passo 3: rola até o h2, foco no título e rota inalterada', afterClick.y > 0 && afterClick.focus === 'modulo-1-passo-montagem-do-corpo-titulo' && p.url() === urlBefore, JSON.stringify(afterClick));
  out('V4 LED do passo 3 aceso', (await rail.locator('[aria-current="step"]').innerText()).includes('Montagem do corpo'));

  // V5 — LED acompanha a rolagem (janela mais baixa, para haver rolagem entre os passos)
  const v = await newPage(1280, 600);
  await v.goto(base + '#/modulos/biomimetica-garrafa-pet'); await waitH1(v, modules[0][1]);
  const vrail = v.locator('nav[aria-label="Passos do Módulo 1"]').first();
  const ledText = () => vrail.locator('[aria-current="step"]').innerText();
  await v.evaluate(() => { const el = document.getElementById('modulo-1-passo-por-que-garrafa-pet'); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 120); });
  await v.waitForTimeout(400);
  out('V5 ao rolar até o passo 2, o LED do passo 2 acende', (await ledText()).includes('garrafa PET'), await ledText());
  await v.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await v.waitForTimeout(400);
  out('V5 no fim da página, o LED do último passo acende', (await ledText()).includes('Montagem do corpo'), await ledText());
  await v.evaluate(() => window.scrollTo(0, 0)); await v.waitForTimeout(400);
  out('V5 ao voltar ao topo, o LED do passo 1 acende', (await ledText()).includes('O que é biomimética?'));
  await v.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await v.waitForTimeout(400);
  const sticky = await vrail.evaluate((el) => el.getBoundingClientRect().top);
  out('V5 barra lateral fixa no topo durante a leitura', sticky >= 0 && sticky < 60, `top=${Math.round(sticky)}`);
  await v.close();

  // V6 — fim de módulo
  out('V6 cartão Fim do Módulo 1 com Começar o Módulo 2', (await p.getByRole('heading', { name: 'Fim do Módulo 1' }).count()) === 1 && (await p.getByRole('link', { name: /Começar o Módulo 2/ }).count()) === 1);
  await p.goto(base + '#/modulos/desafio-quiz'); await waitH1(p, modules[4][1]);
  out('V6 último módulo: Fim da aula e Voltar à visão geral', (await p.getByRole('heading', { name: 'Fim da aula' }).count()) === 1 && (await p.getByRole('link', { name: 'Voltar à visão geral' }).count()) >= 1);
  await p.getByRole('link', { name: /Voltar ao Módulo 4/ }).click();
  out('V6 Voltar ao Módulo anterior', await waitH1(p, modules[3][1]));

  // V7 — passos provisórios dos módulos 2 a 5
  for (const [i, [slug, title, n]] of modules.entries()) {
    if (i === 0) continue;
    await p.goto(base + '#/modulos/' + slug); await waitH1(p, title);
    const steps = await p.locator(`nav[aria-label="Passos do Módulo ${i + 1}"]`).first().locator('ol button').allInnerTexts();
    out(`V7 Módulo ${i + 1}: passo provisório`, steps.length === n && steps[0].includes(`[PASSOS DO MÓDULO ${i + 1}]`));
  }

  // V8 — celular
  const m = await newPage(390, 844, { hasTouch: true, isMobile: true });
  await m.goto(base + '#/modulos/biomimetica-garrafa-pet'); await waitH1(m, modules[0][1]);
  const visibleRails = await m.$$eval('nav[aria-label="Passos do Módulo 1"]', (ns) => ns.filter((n) => n.getBoundingClientRect().width > 0).length);
  out('V8 só a tira de passos (inline) visível no celular', visibleRails === 1);
  const inlineTop = await m.$$eval('nav[aria-label="Passos do Módulo 1"]', (ns) => Math.round(ns.find((n) => n.getBoundingClientRect().width > 0).getBoundingClientRect().top));
  out('V8 tira de passos abaixo do título, na primeira tela', inlineTop < 844, `top=${inlineTop}`);
  const bar = () => m.locator('p[aria-live="polite"]').innerText();
  out('V8 barra inferior: Passo 1 de 3', (await bar()).replace(/\s+/g, ' ') === 'Passo 1 de 3');
  const barBox = await m.locator('p[aria-live="polite"]').boundingBox();
  out('V8 barra inferior fixa na base da tela', barBox && barBox.y > 760, `y=${barBox && Math.round(barBox.y)}`);
  await m.getByRole('button', { name: 'Próximo passo' }).tap(); await m.waitForTimeout(1200);
  out('V8 Próximo passo → Passo 2 de 3', (await bar()).replace(/\s+/g, ' ') === 'Passo 2 de 3');
  await m.getByRole('button', { name: 'Próximo passo' }).tap(); await m.waitForTimeout(1200);
  out('V8 Próximo passo → Passo 3 de 3', (await bar()).replace(/\s+/g, ' ') === 'Passo 3 de 3');
  const goNext = m.locator('p[aria-live="polite"] + a');
  out('V8 no último passo, o botão vira Ir para o Módulo 2', (await goNext.innerText()) === 'Ir para o Módulo 2');
  await goNext.tap();
  out('V8 Ir para o Módulo 2 abre o módulo no topo', (await waitH1(m, modules[1][1])) && (await m.evaluate(() => window.scrollY)) === 0);
  await m.goto(base + '#/modulos/biomimetica-garrafa-pet'); await waitH1(m, modules[0][1]);
  const inline = m.locator('nav[aria-label="Passos do Módulo 1"]').nth(1);
  await inline.locator('ol button').nth(1).tap(); await m.waitForTimeout(1200);
  out('V8 tocar num passo da tira atualiza a barra inferior', (await bar()).replace(/\s+/g, ' ') === 'Passo 2 de 3');

  // V9 — link direto, recarga e rota inexistente
  const d = await newPage(1440);
  const r1 = await d.goto(base + '#/modulos/sensor-ultrassonico-sonar'); const ok1 = await waitH1(d, modules[2][1]);
  const r2 = await d.reload(); const ok2 = await waitH1(d, modules[2][1]);
  out('V9 link direto e recarga sem 404', r1.status() === 200 && r2.status() === 200 && ok1 && ok2);
  await d.goto(base + '#/modulos/nao-existe');
  out('V9 slug inexistente mostra Página não encontrada', await waitH1(d, 'Página não encontrada'));

  // V10 — responsividade
  const routes = ['#/', '#/modulos', ...modules.map(([s]) => '#/modulos/' + s), '#/nao-existe'];
  for (const width of [360, 390, 768, 1024, 1280, 1440]) {
    const q = await newPage(width);
    let worst = 0, worstRoute = '';
    for (const hash of routes) {
      await q.goto(base + hash); await q.waitForSelector('h1');
      const sw = await q.evaluate(() => document.documentElement.scrollWidth);
      if (sw - width > worst) { worst = sw - width; worstRoute = hash; }
    }
    const sidebarVisible = await (async () => { await q.goto(base + '#/modulos/biomimetica-garrafa-pet'); await q.waitForSelector('h1'); return q.$$eval('nav[aria-label="Passos do Módulo 1"]', (ns) => ns.findIndex((n) => n.getBoundingClientRect().width > 0)); })();
    out(`V10 ${width}px: sem rolagem horizontal em ${routes.length} rotas`, worst <= 0, worst > 0 ? `excesso ${worst}px em ${worstRoute}` : `variante ${sidebarVisible === 0 ? 'lateral' : 'tira'}`);
    await q.close();
  }

  // V11 — contraste medido no navegador
  const c = await newPage(1440);
  const pairs = [];
  for (const [i, [slug, title]] of modules.entries()) {
    await c.goto(base + '#/modulos/' + slug); await waitH1(c, title);
    pairs.push(...await c.evaluate((n) => {
      const bgOf = (el) => { while (el) { const b = getComputedStyle(el).backgroundColor; if (b && !b.startsWith('rgba(0, 0, 0, 0)') && b !== 'transparent') return b; el = el.parentElement; } return 'rgb(255, 255, 255)'; };
      const read = (k, el) => el ? [k, getComputedStyle(el).color, bgOf(el)] : [k, null, null];
      const main = document.querySelector('main');
      return [
        read(`Módulo ${n}: "Módulo N de 5"`, main.querySelector('p')),
        read(`Módulo ${n}: número no pino da trilha (atual)`, document.querySelector('nav[aria-label="Módulos da aula, em ordem"] [aria-current]')),
        read(`Módulo ${n}: número no LED aceso`, document.querySelector('nav[aria-label^="Passos"] [aria-current] span[aria-hidden]')),
        read(`Módulo ${n}: número no título do passo`, main.querySelector('section h2 span[aria-hidden]')),
        read(`Módulo ${n}: passo inativo/ativo na barra`, document.querySelector('nav[aria-label^="Passos"] ol button span:last-child')),
        read(`Módulo ${n}: dica "Siga os passos"`, document.querySelector('nav[aria-label^="Passos"] p')),
        read(`Módulo ${n}: texto do cartão de fim`, document.querySelector('#fim-do-modulo + p')),
        read(`Módulo ${n}: botão do próximo módulo`, [...document.querySelectorAll('section a')].find((a) => /Começar|Voltar à visão/.test(a.innerText))),
      ];
    }, i + 1));
  }
  const toRgb = async (color, bg) => c.evaluate(([fg, b]) => { const cv = document.createElement('canvas'); cv.width = cv.height = 1; const x = cv.getContext('2d'); x.fillStyle = b; x.fillRect(0, 0, 1, 1); x.fillStyle = fg; x.fillRect(0, 0, 1, 1); return Array.from(x.getImageData(0, 0, 1, 1).data).slice(0, 3); }, [color, bg]);
  let minC = 99, minK = '';
  for (const [k, fg, bg] of pairs) {
    if (!fg) { out(`V11 ${k}`, false, 'elemento não encontrado'); continue; }
    const ratio = contrast(await toRgb(fg, bg), await toRgb(bg, 'rgb(255,255,255)'));
    if (ratio < minC) { minC = ratio; minK = k; }
    if (ratio < 4.5) out(`V11 ${k}`, false, `${ratio.toFixed(2)}:1`);
  }
  out(`V11 contraste de texto ≥ 4,5:1 em ${pairs.length} combinações`, minC >= 4.5, `mínimo ${minC.toFixed(2)}:1 (${minK})`);

  // V12 — teclado
  const k = await newPage(1440);
  await k.goto(base + '#/modulos/biomimetica-garrafa-pet'); await waitH1(k, modules[0][1]);
  const seen = [];
  for (let i = 0; i < 14; i++) {
    await k.keyboard.press('Tab');
    seen.push(await k.evaluate(() => { const a = document.activeElement; const cs = getComputedStyle(a); return { tag: a.tagName, t: (a.getAttribute('aria-label') || a.innerText || '').replace(/\s+/g, ' ').slice(0, 30), outline: cs.outlineStyle !== 'none' && cs.outlineWidth !== '0px' }; }));
  }
  const focusables = seen.filter((s) => s.tag === 'A' || s.tag === 'BUTTON');
  out('V12 foco visível em todos os elementos alcançados por Tab', focusables.every((s) => s.outline), focusables.map((s) => s.t + (s.outline ? '' : ' (SEM CONTORNO)')).join(' | '));
  const stepBtn = k.locator('nav[aria-label="Passos do Módulo 1"]').first().locator('ol button').nth(1);
  await stepBtn.focus(); await k.keyboard.press('Enter'); await k.waitForTimeout(1200);
  out('V12 Enter num passo leva ao passo e move o foco ao título', (await k.evaluate(() => document.activeElement?.id)) === 'modulo-1-passo-por-que-garrafa-pet-titulo');
  const targets = await k.$$eval('nav[aria-label="Módulos da aula, em ordem"] a, nav[aria-label^="Passos"] button, nav[aria-label^="Passos"] a', (els) => els.filter((e) => e.getBoundingClientRect().width > 0).map((e) => Math.round(Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height))));
  out('V12 alvos de toque ≥ 44 px (trilha e barra lateral)', targets.every((t) => t >= 44), `menor ${Math.min(...targets)}px`);

  // V13 — movimento reduzido: a rolagem chega ao destino de imediato (sem animação)
  const rm = await newPage(1280, 600, { reducedMotion: 'reduce' });
  await rm.goto(base + '#/modulos/biomimetica-garrafa-pet'); await waitH1(rm, modules[0][1]);
  await rm.locator('nav[aria-label="Passos do Módulo 1"]').first().locator('ol button').nth(1).click();
  await rm.waitForTimeout(60);
  const early = await rm.evaluate(() => window.scrollY);
  await rm.waitForTimeout(900);
  const late = await rm.evaluate(() => window.scrollY);
  out('V13 com movimento reduzido, a rolagem é imediata', early > 0 && early === late, `60ms=${early} 960ms=${late}`);
  const sm = await newPage(1280, 600);
  await sm.goto(base + '#/modulos/biomimetica-garrafa-pet'); await waitH1(sm, modules[0][1]);
  await sm.locator('nav[aria-label="Passos do Módulo 1"]').first().locator('ol button').nth(1).click();
  await sm.waitForTimeout(60);
  const smEarly = await sm.evaluate(() => window.scrollY);
  await sm.waitForTimeout(900);
  const smLate = await sm.evaluate(() => window.scrollY);
  out('V13 sem a preferência, a rolagem é suave', smEarly < smLate, `60ms=${smEarly} 960ms=${smLate}`);

  out('V14 console sem erros', errors.length === 0, errors.join(' | '));
  console.log(`\n${results.filter(Boolean).length}/${results.length} verificações OK`);
  await browser.close();
  process.exit(results.every(Boolean) ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(2); });
