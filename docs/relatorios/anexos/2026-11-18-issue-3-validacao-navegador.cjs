// ANEXO DO RELATÓRIO — docs/relatorios/2026-11-18-issue-3-interface-principal.md
//
// Registro do script usado na validação pontual de navegador da Issue #3 (V4 a V17).
// NÃO é um teste automatizado do projeto: o Playwright não é dependência do repositório,
// este arquivo não é executado por nenhum script do package.json nem por CI.
// Ele foi executado uma vez, no ambiente de trabalho do agente, onde o Playwright e o
// Chromium já estavam instalados globalmente.
//
// Procedimento para reproduzir (requer Playwright disponível globalmente no ambiente):
//   1. npm ci
//   2. npm run build
//   3. npx vite preview --port 4173 --strictPort    (em outro terminal)
//   4. node docs/relatorios/anexos/2026-11-18-issue-3-validacao-navegador.cjs
//
// Saída esperada: uma linha "OK"/"FALHA" por verificação e o total ao final (62/62).

const { chromium } = require('playwright');
const base = 'http://localhost:4173/bagre-robo-maker/';
const results = [];
const out = (k, ok, info = '') => { results.push(ok); console.log(`${ok ? 'OK   ' : 'FALHA'} ${k} ${info}`); };
const h1 = (p) => p.locator('h1').first().textContent();
const waitH1 = (p, t) => p.waitForFunction((x) => document.querySelector('h1')?.textContent === x, t, { timeout: 5000 }).then(() => true, () => false);
const modules = [
  ['biomimetica-garrafa-pet', 'Biomimética & Garrafa PET'],
  ['eletronica-transistor-c1815', 'Eletrônica & Transistor C1815'],
  ['sensor-ultrassonico-sonar', 'Sensor Ultrassônico & Sonar'],
  ['programacao-espreita-ataque', 'Programação C++ — Espreita vs. Ataque'],
  ['desafio-quiz', 'Desafio & Quiz Interativo'],
];
function L(rgb) { const c = rgb.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }
const contrast = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const newPage = async (width = 1280) => { const p = await browser.newPage({ viewport: { width, height: 800 } }); p.on('console', (m) => m.type() === 'error' && errors.push(m.text())); p.on('pageerror', (e) => errors.push(String(e))); return p; };
  const p = await newPage();

  // V4 preview
  const r = await p.goto(base); await waitH1(p, 'Bagre Robô Maker');
  out('V4 preview', r.status() === 200, `status=${r.status()}`);

  // V5 área ativa
  const active = async () => p.locator('nav[aria-label="Navegação principal"] [aria-current="page"]').allTextContents();
  out('V5 ativo em /', JSON.stringify(await active()) === '["Visão geral"]', JSON.stringify(await active()));
  await p.goto(base + '#/modulos'); await waitH1(p, 'Módulos');
  out('V5 ativo em /modulos', JSON.stringify(await active()) === '["Módulos"]', JSON.stringify(await active()));
  await p.goto(base + '#/modulos/desafio-quiz'); await waitH1(p, 'Desafio & Quiz Interativo');
  out('V5 ativo em /modulos/:slug', JSON.stringify(await active()) === '["Módulos"]', JSON.stringify(await active()));
  await p.goto(base + '#/nao-existe'); await waitH1(p, 'Página não encontrada');
  out('V5 nenhum ativo em 404', (await active()).length === 0);

  // V6 navegação pelo cabeçalho
  await p.goto(base);
  await p.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Módulos' }).click();
  const v6a = await waitH1(p, 'Módulos');
  await p.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Visão geral' }).click();
  const v6b = await waitH1(p, 'Bagre Robô Maker');
  await p.goto(base + '#/modulos/desafio-quiz'); await waitH1(p, 'Desafio & Quiz Interativo');
  await p.getByRole('banner').getByRole('link').click();
  const v6c = await waitH1(p, 'Bagre Robô Maker');
  out('V6 cabeçalho: Visão geral ↔ Módulos e logotipo → início', v6a && v6b && v6c);

  // V7 início → cada módulo → voltar (link e botão Voltar)
  for (const [i, [slug, title]] of modules.entries()) {
    await p.goto(base); await waitH1(p, 'Bagre Robô Maker');
    await p.locator('#titulo-modulos ~ ol a').nth(i).click();
    const opened = await waitH1(p, title);
    const urlOk = p.url().endsWith(`#/modulos/${slug}`);
    await p.goBack({ waitUntil: 'commit' });
    const back = await waitH1(p, 'Bagre Robô Maker');
    await p.goForward({ waitUntil: 'commit' }); await waitH1(p, title);
    await p.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Visão geral' }).click();
    const viaLink = await waitH1(p, 'Bagre Robô Maker');
    out(`V7 módulo ${i + 1}`, opened && urlOk && back && viaLink, p.url());
  }

  // V8 página inicial
  await p.goto(base); await waitH1(p, 'Bagre Robô Maker');
  const objectives = await p.locator('#titulo-objetivos ~ ul li').count();
  const cards = await p.locator('#titulo-modulos ~ ol li').count();
  await p.getByRole('link', { name: /Começar pelo Módulo 1/ }).click();
  const cta = await waitH1(p, 'Biomimética & Garrafa PET');
  out('V8 página inicial', objectives === 8 && cards === 5 && cta, `objetivos=${objectives} cartões=${cards} botão=${cta}`);

  // V9 páginas de módulo
  for (const [i, [slug, title]] of modules.entries()) {
    await p.goto('about:blank'); await p.goto(base + '#/modulos/' + slug); await waitH1(p, title);
    const body = await p.locator('main').innerText();
    const current = await p.locator('nav[aria-label="Módulos"] [aria-current="page"]').innerText();
    const ok = body.includes(`Módulo ${i + 1} de 5`) && body.includes('Conteúdo em preparação') && current.includes(`Módulo ${i + 1}`) && (await p.title()) === `Módulo ${i + 1} — Bagre Robô Maker`;
    out(`V9 módulo ${i + 1}`, ok, `title="${await p.title()}"`);
  }

  // V10 sequencial
  await p.goto(base + '#/modulos/' + modules[0][0]); await waitH1(p, modules[0][1]);
  out('V10 módulo 1 sem anterior', (await p.getByText('Módulo anterior').count()) === 0);
  let seqOk = true;
  for (let i = 1; i < 5; i++) { await p.getByRole('navigation', { name: 'Navegação entre módulos' }).getByRole('link', { name: /Próximo módulo/ }).click(); seqOk &&= await waitH1(p, modules[i][1]); }
  out('V10 1 → 5 por "Próximo"', seqOk);
  out('V10 módulo 5 sem próximo', (await p.getByText('Próximo módulo').count()) === 0);
  for (let i = 3; i >= 0; i--) { await p.getByRole('navigation', { name: 'Navegação entre módulos' }).getByRole('link', { name: /Módulo anterior/ }).click(); seqOk &&= await waitH1(p, modules[i][1]); }
  out('V10 5 → 1 por "Anterior"', seqOk);

  // V11 link direto e recarga
  for (const [hash, title] of [['#/modulos', 'Módulos'], ['#/modulos/sensor-ultrassonico-sonar', 'Sensor Ultrassônico & Sonar']]) {
    await p.goto('about:blank');
    const d = await p.goto(base + hash); const a = await waitH1(p, title);
    const rl = await p.reload(); const b = await waitH1(p, title);
    out(`V11 ${hash}`, d.status() === 200 && rl.status() === 200 && a && b);
  }

  // V17 rota e slug inexistentes
  await p.goto(base + '#/rota-inexistente'); const n1 = await waitH1(p, 'Página não encontrada');
  await p.goto(base + '#/modulos/nao-existe'); const n2 = await waitH1(p, 'Página não encontrada');
  out('V17 rota e slug inexistentes', n1 && n2);

  // V12 responsividade
  const routes = ['#/', '#/modulos', '#/modulos/programacao-espreita-ataque', '#/nao-existe'];
  for (const width of [360, 390, 768, 1024, 1280, 1440]) {
    const q = await newPage(width);
    for (const hash of routes) {
      await q.goto(base + hash); await q.waitForSelector('h1');
      const sw = await q.evaluate(() => document.documentElement.scrollWidth);
      let extra = '';
      if (hash.includes('programacao')) {
        const dir = await q.locator('nav[aria-label="Módulos"] ol').evaluate((el) => getComputedStyle(el).flexDirection);
        extra = ` lista=${dir}`;
        if ((width >= 1024) !== (dir === 'column')) { out(`V12 layout da lista ${width}px`, false, dir); }
      }
      out(`V12 ${width}px ${hash}`, sw <= width, `scrollWidth=${sw}${extra}`);
    }
    await q.close();
  }

  // V13 contraste (cores calculadas no navegador)
  await p.goto(base + '#/modulos/eletronica-transistor-c1815'); await waitH1(p, 'Eletrônica & Transistor C1815');
  const pairs = await p.evaluate(() => {
    const rgb = (s) => (s.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
    const bgOf = (el) => { while (el) { const c = getComputedStyle(el).backgroundColor; if (c && !c.includes('rgba(0, 0, 0, 0)') && c !== 'transparent') return c; el = el.parentElement; } return 'rgb(255,255,255)'; };
    const pick = { 'título do cabeçalho': 'header a span span', 'subtítulo do cabeçalho': 'header a span span:last-child', 'aba ativa': 'nav[aria-label="Navegação principal"] [aria-current]', 'aba inativa': 'nav[aria-label="Navegação principal"] a:not([aria-current])', 'módulo atual': 'nav[aria-label="Módulos"] [aria-current] span span', 'rótulo do módulo': 'article p', 'texto secundário': 'article .text-slate-600', 'rodapé': 'footer p' };
    return Object.entries(pick).map(([k, sel]) => { const el = document.querySelector(sel); const cs = getComputedStyle(el); return [k, cs.color, bgOf(el)]; });
  });
  const canvasRgb = async (color) => p.evaluate((c) => { const cv = document.createElement('canvas'); cv.width = cv.height = 1; const x = cv.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, 1, 1); x.fillStyle = c; x.fillRect(0, 0, 1, 1); return Array.from(x.getImageData(0, 0, 1, 1).data).slice(0, 3); }, color);
  for (const [k, fg, bg] of pairs) {
    const bgRgb = await canvasRgb(bg);
    const fgRgb = await p.evaluate(([c, b]) => { const cv = document.createElement('canvas'); cv.width = cv.height = 1; const x = cv.getContext('2d'); x.fillStyle = b; x.fillRect(0, 0, 1, 1); x.fillStyle = c; x.fillRect(0, 0, 1, 1); return Array.from(x.getImageData(0, 0, 1, 1).data).slice(0, 3); }, [fg, bg]);
    const c = contrast(fgRgb, bgRgb);
    out(`V13 contraste ${k}`, c >= 4.5, `${c.toFixed(2)}:1`);
  }

  // V14 teclado
  await p.goto(base); await waitH1(p, 'Bagre Robô Maker');
  await p.keyboard.press('Tab');
  const skip = await p.evaluate(() => { const a = document.activeElement; const r = a.getBoundingClientRect(); const h = document.querySelector('header').getBoundingClientRect(); return { text: a.textContent.trim(), visible: r.height > 1, overlap: r.bottom > h.top + 1 && r.top < h.bottom - 1 }; });
  out('V14 link de pular visível sem sobrepor o cabeçalho', skip.text === 'Pular para o conteúdo' && skip.visible && !skip.overlap, JSON.stringify(skip));
  await p.keyboard.press('Enter');
  out('V14 link de pular move o foco', (await p.evaluate(() => document.activeElement.id)) === 'conteudo-principal' && /bagre-robo-maker\/(#\/)?$/.test(p.url()), p.url());
  await p.goto(base); await waitH1(p, 'Bagre Robô Maker');
  const seen = [];
  for (let i = 0; i < 25; i++) {
    await p.keyboard.press('Tab');
    const info = await p.evaluate(() => { const a = document.activeElement; const cs = getComputedStyle(a); return { tag: a.tagName, t: (a.textContent || '').trim().slice(0, 30), o: cs.outlineStyle, w: cs.outlineWidth }; });
    seen.push(info);
  }
  const links = seen.filter((s) => s.tag === 'A' && s.t !== 'Pular para o conteúdo');
  const noOutline = links.filter((s) => s.o === 'none' || s.w === '0px');
  out('V14 foco visível em todos os elementos alcançados por Tab', noOutline.length === 0, `${links.length} elementos; sem contorno: ${JSON.stringify(noOutline)}`);
  await p.goto(base + '#/modulos/biomimetica-garrafa-pet'); await waitH1(p, 'Biomimética & Garrafa PET');
  const nextLink = p.getByRole('link', { name: /Próximo módulo/ }); await nextLink.focus(); await p.keyboard.press('Enter');
  out('V14 Enter ativa o link', await waitH1(p, 'Eletrônica & Transistor C1815'));

  // V15 volta ao topo
  const t = await newPage(390); await t.setViewportSize({ width: 390, height: 500 });
  await t.goto(base + '#/modulos/biomimetica-garrafa-pet'); await waitH1(t, 'Biomimética & Garrafa PET');
  await t.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  const before = await t.evaluate(() => window.scrollY);
  await t.getByRole('link', { name: /Próximo módulo/ }).click(); await waitH1(t, 'Eletrônica & Transistor C1815');
  await t.waitForTimeout(100);
  const after = await t.evaluate(() => window.scrollY);
  out('V15 volta ao topo ao trocar de módulo', before > 0 && after === 0, `antes=${before} depois=${after}`);

  // V16 console
  out('V16 console sem erros', errors.length === 0, errors.join(' | '));
  console.log(`\n${results.filter(Boolean).length}/${results.length} verificações OK`);
  await browser.close();
  process.exit(results.every(Boolean) ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(2); });
