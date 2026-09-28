(() => {
  'use strict';

  const d = document;
  const root = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => Array.from(c.querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };

  const LANGS = ['en', 'tr', 'ru'];
  const LOCALES = { en: 'en-US', tr: 'tr-TR', ru: 'ru-RU' };
  let lang = LANGS.includes(root.getAttribute('lang')) ? root.getAttribute('lang') : 'en';
  const t = (k) => {
    const dict = window.I18N[lang] || {};
    return k in dict ? dict[k] : (window.I18N.en[k] ?? '');
  };
  const L = (o) => (o == null ? '' : typeof o === 'string' ? o : (o[lang] ?? o.en));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const stripTags = (s) => String(s).replace(/<[^>]*>/g, '').replace(/&amp;/g, '&');
  const icon = (name, cls = '') => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const fmt = (n) => new Intl.NumberFormat(LOCALES[lang]).format(n);
  const pick = (o) => o[lang] ?? o.en;
  const metricValue = (m) => m['v' + lang] || m.v;

  /* ---------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------- */
  const revealIO = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            revealIO.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    : null;

  function observeReveals(scope = d, instant = false) {
    $$('[data-reveal]:not(.is-in)', scope).forEach((el) => {
      if (instant || reduced || !revealIO) el.classList.add('is-in');
      else revealIO.observe(el);
    });
  }

  /* Split a title into word spans; *word* gets the gradient accent. */
  function splitInto(el, html) {
    let inGrad = false;
    let i = 0;
    el.innerHTML = html.split(' ').map((raw) => {
      let word = raw;
      let grad = inGrad;
      if (word.startsWith('*')) { grad = true; inGrad = true; word = word.slice(1); }
      if (word.endsWith('*')) { word = word.slice(0, -1); inGrad = false; }
      return `<span class="w${grad ? ' grad' : ''}" style="--i:${i++}"><span>${word}</span></span>`;
    }).join(' ');
    el.setAttribute('aria-label', stripTags(html.replace(/\*/g, '')));
  }

  /* ---------------------------------------------------------
     Rendering: timeline, projects, other work
     --------------------------------------------------------- */
  function renderTimeline(instant) {
    const build = (items) => items.map((it, i) => `
      <article class="tl-item${it.current ? ' is-current' : ''}" data-reveal style="--d:${i}">
        <span class="tl-dot" aria-hidden="true"></span>
        <div class="tl-card">
          <div class="tl-meta"><span class="tl-date">${esc(L(it.date))}</span><span>${esc(L(it.place))}</span></div>
          <h4>${esc(L(it.org))}${it.link ? `<a href="${it.link}" target="_blank" rel="noopener" aria-label="${esc(L(it.org))}">${icon('arrow-up-right')}</a>` : ''}</h4>
          <p class="tl-role">${esc(L(it.title))}</p>
          <ul>${L(it.bullets).map((b) => `<li>${b}</li>`).join('')}</ul>
          ${it.stack ? `<div class="chips">${it.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</div>` : ''}
        </div>
      </article>`).join('');

    [['#timeline-work', window.TIMELINE.work], ['#timeline-edu', window.TIMELINE.edu]].forEach(([sel, items]) => {
      const wrap = $(sel);
      $$('.tl-item', wrap).forEach((n) => n.remove());
      wrap.insertAdjacentHTML('beforeend', build(items));
      observeReveals(wrap, instant);
    });
  }

  function pipelineViz() {
    const nodes = [
      { x: 20, y: 40, t: pick({ en: 'DOCX / Text', tr: 'DOCX / Metin', ru: 'DOCX / Текст' }), s: pick({ en: 'upload', tr: 'yükleme', ru: 'загрузка' }) },
      { x: 245, y: 40, t: pick({ en: 'Parser', tr: 'Ayrıştırıcı', ru: 'Парсер' }), s: pick({ en: 'headings · tables · links', tr: 'başlık · tablo · link', ru: 'заголовки · таблицы · ссылки' }) },
      { x: 470, y: 40, t: pick({ en: 'Template checks', tr: 'Şablon kontrolü', ru: 'Проверки шаблона' }), s: pick({ en: '21 sections + 8 rules', tr: '21 bölüm + 8 kural', ru: '21 раздел + 8 правил' }), c: 'hot' },
      { x: 470, y: 200, t: pick({ en: 'LLM analysis', tr: 'LLM analizi', ru: 'Анализ LLM' }), s: pick({ en: '23 categories', tr: '23 kategori', ru: '23 категории' }), c: 'llm' },
      { x: 245, y: 200, t: 'Report.md', s: pick({ en: 'questions for analyst', tr: 'analist için sorular', ru: 'вопросы аналитику' }) },
      { x: 20, y: 200, t: pick({ en: 'Analyst', tr: 'Analist', ru: 'Аналитик' }), s: pick({ en: 'human decides', tr: 'karar insanda', ru: 'решает человек' }) }
    ];
    const track = 'M95 68 H545 V228 H95';
    return `
      <div class="viz"><div class="viz-grid"></div>
        <svg class="pipeline" viewBox="0 0 640 300" role="img" aria-label="${esc(t('proj.diagram'))}">
          <defs>
            <linearGradient id="flow-g" x1="0" x2="1"><stop offset="0" stop-color="var(--a1)"/><stop offset="1" stop-color="var(--a2)"/></linearGradient>
          </defs>
          <path class="wire" d="${track}"/>
          <path class="flow" d="${track}"/>
          <path class="wire" d="M510 96 C510 150 370 148 370 200" stroke-dasharray="4 5"/>
          <text x="440" y="142" text-anchor="middle" style="fill:var(--text-3);font-family:var(--font-mono);font-size:10px">offline</text>
          <circle class="pulse" r="4">${reduced ? '' : `<animateMotion dur="5s" repeatCount="indefinite" path="${track}"/>`}</circle>
          ${nodes.map((n, i) => `
            <g class="node ${n.c || ''}" style="--n:${i}">
              <rect x="${n.x}" y="${n.y}" width="150" height="56" rx="12"/>
              <text x="${n.x + 75}" y="${n.y + 25}" text-anchor="middle">${esc(n.t)}</text>
              <text class="sub" x="${n.x + 75}" y="${n.y + 42}" text-anchor="middle">${esc(n.s)}</text>
            </g>`).join('')}
        </svg>
      </div>`;
  }

  function phoneViz() {
    const bars = [42, 68, 35, 80, 55, 92, 60];
    return `
      <div class="viz"><div class="viz-grid"></div>
        <div class="phone" role="img" aria-label="${esc(t('proj.illustration'))}">
          <span class="phone-notch"></span>
          <div class="phone-title">Budget Manager</div>
          <div class="phone-sum">24 580 ₽</div>
          <div class="donut"></div>
          <div class="bars">${bars.map((h, i) => `<span style="--h:${h}%;--i:${i}"></span>`).join('')}</div>
          <div class="phone-row"><span><i></i>${pick({ en: 'Groceries', tr: 'Market', ru: 'Продукты' })}</span><span>8 400 ₽</span></div>
          <div class="phone-row"><span><i style="background:var(--a1)"></i>${pick({ en: 'Transport', tr: 'Ulaşım', ru: 'Транспорт' })}</span><span>5 200 ₽</span></div>
        </div>
      </div>`;
  }

  const vizFor = (p) => (p.visual === 'pipeline' ? pipelineViz() : p.visual === 'phone' ? phoneViz() : '');

  function projectMedia(p) {
    if (p.visual) return vizFor(p);
    return `
      <div class="browser">
        <div class="browser-bar"><span class="dots"><i></i><i></i><i></i></span><span class="browser-url">${esc(p.frame || '')}</span></div>
        <div class="browser-shot">
          <img src="${p.images[0]}" alt="${esc(L(p.title))} — ${esc(L(p.captions)[0])}" loading="lazy" decoding="async" />
          <span class="shot-count">${esc(t('proj.shots').replace('{n}', p.images.length))}</span>
        </div>
      </div>`;
  }

  const metricsHTML = (p) => (p.metrics ? `<div class="pcard-metrics">${p.metrics.map((m) => `
      <div class="metric"><b>${esc(metricValue(m))}</b><span>${esc(L(m.l))}</span></div>`).join('')}</div>` : '');

  function renderProjects(instant) {
    const grid = $('#projects-grid');
    const active = ($('.filter.is-active') || {}).dataset?.filter || 'all';
    grid.innerHTML = window.PROJECTS.map((p, i) => {
      const hidden = active !== 'all' && !p.cats.includes(active);
      const linkLabel = p.link ? (p.link.type === 'code' ? t('proj.code') : t('proj.visit')) : '';
      return `
      <article class="pcard spotlight${p.featured ? ' featured' : ''}${p.wide ? ' wide' : ''}${hidden ? ' is-hidden' : ''}" data-id="${p.id}" data-cats="${p.cats.join(' ')}" data-reveal style="--d:${i % 2}">
        <div class="pcard-media">${projectMedia(p)}</div>
        <div class="pcard-body">
          <div class="pcard-top"><span class="badge">${esc(L(p.badge))}</span><span class="pcard-period">${esc(L(p.period))}</span></div>
          <h3 class="pcard-title">${esc(L(p.title))}</h3>
          <p class="pcard-tagline">${esc(L(p.tagline))}</p>
          <p class="pcard-summary">${esc(L(p.summary))}</p>
          ${metricsHTML(p)}
          <div class="chips">${p.stack.slice(0, p.featured ? 7 : 5).map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</div>
          <div class="pcard-foot">
            <button type="button" class="pcard-cta" aria-label="${esc(t('proj.open'))}: ${esc(L(p.title))}"><span>${esc(t('proj.view'))}</span>${icon('arrow-right')}</button>
            ${p.link ? `<a class="pcard-link" href="${p.link.url}" target="_blank" rel="noopener" aria-label="${esc(linkLabel)}" title="${esc(linkLabel)}">${icon(p.link.type === 'code' ? 'github' : 'arrow-up-right')}</a>` : ''}
          </div>
        </div>
      </article>`;
    }).join('');
    observeReveals(grid, instant);
    bindTilt($$('.pcard', grid));
  }

  function renderOthers(instant) {
    const grid = $('#others-grid');
    grid.innerHTML = window.OTHERS.map((o, i) => {
      const tag = o.link ? 'a' : 'div';
      const attrs = o.link ? ` href="${o.link}" target="_blank" rel="noopener"` : '';
      return `
      <${tag} class="ocard spotlight"${attrs} data-reveal style="--d:${i}">
        <span class="ocard-kind">${esc(L(o.kind))}</span>
        <h4>${esc(o.title)}${o.link ? icon('arrow-up-right') : ''}</h4>
        <p>${esc(L(o.desc))}</p>
        <div class="chips">${o.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</div>
      </${tag}>`;
    }).join('');
    observeReveals(grid, instant);
  }

  /* ---------------------------------------------------------
     Project filter
     --------------------------------------------------------- */
  function initFilters() {
    $$('.filter').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('is-active')) return;
        $$('.filter').forEach((b) => {
          const on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        const f = btn.dataset.filter;
        const cards = $$('#projects-grid .pcard');
        cards.forEach((c) => c.classList.add('is-filtering'));
        setTimeout(() => {
          cards.forEach((c) => {
            const show = f === 'all' || c.dataset.cats.split(' ').includes(f);
            c.classList.toggle('is-hidden', !show);
            c.classList.add('is-in');
          });
          requestAnimationFrame(() => requestAnimationFrame(() => cards.forEach((c) => c.classList.remove('is-filtering'))));
        }, reduced ? 0 : 280);
      });
    });
  }

  /* ---------------------------------------------------------
     Modal with gallery
     --------------------------------------------------------- */
  const modal = $('#project-modal');
  const panel = $('.modal-panel', modal);
  const content = $('#modal-content');
  let current = null;

  function renderModal() {
    const p = current.p;
    const imgs = p.images || [];
    const caps = L(p.captions) || [];
    const linkLabel = p.link ? (p.link.type === 'code' ? t('proj.code') : t('proj.visit')) : '';
    const meta = [
      ['proj.role', p.role], ['proj.team', p.team], ['proj.period', p.period], ['proj.context', p.context]
    ].filter(([, v]) => v);

    const gallery = imgs.length
      ? `<div class="gallery-stage">
          ${imgs.map((src, i) => `<img src="${src}" alt="${esc(L(p.title))} — ${esc(caps[i] || '')}" class="${i === current.idx ? 'is-active' : ''}" decoding="async" />`).join('')}
          ${imgs.length > 1 ? `
            <button type="button" class="icon-btn gallery-nav prev" aria-label="${esc(t('a11y.prev'))}">${icon('left')}</button>
            <button type="button" class="icon-btn gallery-nav next" aria-label="${esc(t('a11y.next'))}">${icon('right')}</button>` : ''}
          <span class="gallery-caption">${esc(caps[current.idx] || '')}</span>
        </div>
        ${imgs.length > 1 ? `<div class="gallery-thumbs">${imgs.map((src, i) => `
          <button type="button" class="${i === current.idx ? 'is-active' : ''}" data-idx="${i}" aria-label="${esc(caps[i] || String(i + 1))}"><img src="${src}" alt="" loading="lazy" /></button>`).join('')}</div>` : ''}`
      : `<div class="gallery-stage">${vizFor(p)}<span class="gallery-caption">${esc(p.visual === 'pipeline' ? t('proj.diagram') : t('proj.illustration'))}</span></div>`;

    content.innerHTML = `
      <div class="gallery">${gallery}</div>
      <div class="modal-body">
        <div class="modal-head">
          <div>
            <span class="badge">${esc(L(p.badge))}</span>
            <h2 id="modal-title">${esc(L(p.title))}</h2>
            <p>${esc(L(p.tagline))}</p>
          </div>
          ${p.link ? `<a class="btn btn-primary" href="${p.link.url}" target="_blank" rel="noopener">${esc(linkLabel)}${icon('arrow-up-right')}</a>` : ''}
        </div>
        <div class="modal-grid">
          <div>
            <section class="modal-section">
              <h3>${esc(t('proj.overview'))}</h3>
              <p>${esc(L(p.summary))}</p>
              ${p.note ? `<p class="modal-note">${esc(L(p.note))}</p>` : ''}
            </section>
            <section class="modal-section">
              <h3>${esc(t('proj.highlights'))}</h3>
              <ul class="modal-list">${L(p.highlights).map((h) => `<li>${h}</li>`).join('')}</ul>
            </section>
          </div>
          <div>
            <dl class="meta-list">${meta.map(([k, v]) => `<div class="meta-row"><dt>${esc(t(k))}</dt><dd>${esc(L(v))}</dd></div>`).join('')}</dl>
            ${p.metrics ? `<section class="modal-section"><div class="modal-metrics">${p.metrics.map((m) => `<div class="metric"><b>${esc(metricValue(m))}</b><span>${esc(L(m.l))}</span></div>`).join('')}</div></section>` : ''}
            <section class="modal-section">
              <h3>${esc(t('proj.stack'))}</h3>
              <div class="chips">${p.stack.map((s) => `<span class="chip chip-hot">${esc(s)}</span>`).join('')}</div>
            </section>
          </div>
        </div>
      </div>`;
  }

  function showSlide(i) {
    const imgs = current.p.images || [];
    if (imgs.length < 2) return;
    current.idx = (i + imgs.length) % imgs.length;
    $$('.gallery-stage img', content).forEach((im, k) => im.classList.toggle('is-active', k === current.idx));
    $$('.gallery-thumbs button', content).forEach((b, k) => b.classList.toggle('is-active', k === current.idx));
    const cap = $('.gallery-caption', content);
    if (cap) cap.textContent = (L(current.p.captions) || [])[current.idx] || '';
    const thumb = $('.gallery-thumbs .is-active', content);
    if (thumb) thumb.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduced ? 'auto' : 'smooth' });
  }

  function openProject(id, trigger) {
    const p = window.PROJECTS.find((x) => x.id === id);
    if (!p) return;
    current = { p, idx: 0, trigger };
    renderModal();
    panel.scrollTop = 0;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    d.body.classList.add('no-scroll');
    setTimeout(() => panel.focus(), 60);
  }

  function closeModal() {
    if (!modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    d.body.classList.remove('no-scroll');
    const trig = current && current.trigger;
    current = null;
    if (trig && trig.focus) trig.focus({ preventScroll: true });
  }

  function initModal() {
    $('#projects-grid').addEventListener('click', (e) => {
      if (e.target.closest('.pcard-link')) return;
      const card = e.target.closest('.pcard');
      if (card) openProject(card.dataset.id, $('.pcard-cta', card));
    });

    modal.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) return closeModal();
      if (e.target.closest('.gallery-nav.prev')) return showSlide(current.idx - 1);
      if (e.target.closest('.gallery-nav.next')) return showSlide(current.idx + 1);
      const th = e.target.closest('.gallery-thumbs button');
      if (th) showSlide(Number(th.dataset.idx));
    });

    // swipe
    let sx = null;
    modal.addEventListener('pointerdown', (e) => { if (e.target.closest('.gallery-stage')) sx = e.clientX; });
    modal.addEventListener('pointerup', (e) => {
      if (sx == null || !current) return;
      const dx = e.clientX - sx;
      sx = null;
      if (Math.abs(dx) > 45) showSlide(current.idx + (dx < 0 ? 1 : -1));
    });

    d.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowRight') showSlide(current.idx + 1);
      else if (e.key === 'ArrowLeft') showSlide(current.idx - 1);
      else if (e.key === 'Tab') {
        const f = $$('button, a[href], [tabindex]:not([tabindex="-1"])', panel).filter((el) => el.offsetParent !== null);
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && (d.activeElement === first || d.activeElement === panel)) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------------------------------------------------------
     Typing roles
     --------------------------------------------------------- */
  const typer = (() => {
    const el = $('.typed');
    let timer = null;
    let words = [];
    let wi = 0;
    let ci = 0;
    let deleting = false;
    function tick() {
      const word = words[wi];
      if (!deleting) {
        ci++;
        el.textContent = word.slice(0, ci);
        if (ci >= word.length) { deleting = true; timer = setTimeout(tick, 1900); return; }
        timer = setTimeout(tick, 55 + Math.random() * 55);
      } else {
        ci--;
        el.textContent = word.slice(0, ci);
        if (ci <= 0) { deleting = false; wi = (wi + 1) % words.length; timer = setTimeout(tick, 380); return; }
        timer = setTimeout(tick, 26);
      }
    }
    return {
      start(list, delay = 400) {
        clearTimeout(timer);
        words = list; wi = 0; ci = 0; deleting = false;
        if (reduced) { el.textContent = list.join(' · '); return; }
        el.textContent = '';
        timer = setTimeout(tick, delay);
      }
    };
  })();

  /* ---------------------------------------------------------
     Counters
     --------------------------------------------------------- */
  function setCounter(el, v) { el.textContent = fmt(Math.round(v)) + (el.dataset.suffix || ''); }

  function initCounters() {
    const els = $$('[data-count]');
    const run = (el) => {
      const target = Number(el.dataset.count);
      el.dataset.done = '1';
      if (reduced) return setCounter(el, target);
      const dur = 1800;
      const t0 = performance.now();
      const ease = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
      const frame = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        setCounter(el, target * ease(p));
        if (p < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };
    if (!('IntersectionObserver' in window)) return els.forEach(run);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------------
     Language
     --------------------------------------------------------- */
  function applyLang(instant) {
    root.setAttribute('lang', lang);
    d.title = stripTags(t('meta.title'));
    const md = $('meta[name="description"]');
    if (md) md.setAttribute('content', stripTags(t('meta.desc')));

    $$('[data-i18n]').forEach((el) => {
      const v = t(el.dataset.i18n);
      if (typeof v !== 'string') return;
      if (el.hasAttribute('data-split')) splitInto(el, v);
      else el.innerHTML = v;
    });
    $$('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', stripTags(t(el.dataset.i18nAria))));
    $$('.lang-switch button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false'));
    $$('[data-count]').forEach((el) => { if (el.dataset.done) setCounter(el, Number(el.dataset.count)); });

    renderTimeline(instant);
    renderProjects(instant);
    renderOthers(instant);
    if (current) renderModal();
    moveIndicator();
  }

  function setLang(next) {
    if (next === lang) return;
    store.set('fk-lang', next);
    const swap = () => {
      lang = next;
      applyLang(true);
      typer.start(t('hero.roles'), 150);
    };
    if (reduced) return swap();
    d.body.classList.add('is-switching');
    setTimeout(() => {
      swap();
      requestAnimationFrame(() => d.body.classList.remove('is-switching'));
    }, 260);
  }

  /* ---------------------------------------------------------
     Theme
     --------------------------------------------------------- */
  function initTheme() {
    const meta = $('meta[name="theme-color"]');
    const sync = () => meta && meta.setAttribute('content', root.dataset.theme === 'light' ? '#f6f6fa' : '#07080c');
    sync();
    $('.theme-toggle').addEventListener('click', () => {
      const next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      store.set('fk-theme', next);
      sync();
      d.dispatchEvent(new CustomEvent('themechange'));
    });
  }

  /* ---------------------------------------------------------
     Navigation, scroll progress, timeline fill
     --------------------------------------------------------- */
  const nav = $('#nav');
  const navLinks = $$('.nav-links a');
  const indicator = $('.nav-indicator');
  let activeId = '';

  function moveIndicator() {
    const a = navLinks.find((l) => l.getAttribute('href') === '#' + activeId);
    navLinks.forEach((l) => l.classList.toggle('is-active', l === a));
    if (!a || !a.offsetWidth) { indicator.style.opacity = '0'; return; }
    indicator.style.opacity = '1';
    indicator.style.width = a.offsetWidth + 'px';
    indicator.style.transform = `translateX(${a.offsetLeft}px)`;
  }

  function initNav() {
    const sections = ['about', 'experience', 'projects', 'skills', 'contact'].map((id) => d.getElementById(id));
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { activeId = e.target.id; moveIndicator(); } });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach((s) => s && io.observe(s));
      const hero = $('.hero');
      new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { activeId = ''; moveIndicator(); }
      }, { rootMargin: '-45% 0px -50% 0px' }).observe(hero);
    }
    window.addEventListener('resize', moveIndicator);

    // mobile menu
    const toggle = $('.menu-toggle');
    const menu = $('#mobile-menu');
    const setMenu = (open) => {
      d.body.classList.toggle('menu-open', open);
      d.body.classList.toggle('no-scroll', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      nav.classList.remove('is-hidden');
    };
    toggle.addEventListener('click', () => setMenu(!d.body.classList.contains('menu-open')));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && d.body.classList.contains('menu-open')) setMenu(false); });
    window.addEventListener('resize', () => { if (window.innerWidth > 1080 && d.body.classList.contains('menu-open')) setMenu(false); });

    $$('.lang-switch button').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));
  }

  function initScroll() {
    const bar = $('.scroll-progress span');
    const timelines = $$('.timeline');
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = d.documentElement.scrollHeight - vh;
      bar.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);

      nav.classList.toggle('is-scrolled', y > 20);
      const menuOpen = d.body.classList.contains('menu-open');
      if (!menuOpen) nav.classList.toggle('is-hidden', y > lastY && y > 300);
      lastY = y;

      timelines.forEach((tl) => {
        const r = tl.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * 0.65 - r.top) / r.height));
        tl.style.setProperty('--fill', p.toFixed(3));
      });
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------------------------------------------------------
     Pointer effects: spotlight, tilt, magnetic, hero glow
     --------------------------------------------------------- */
  function bindTilt(cards) {
    if (!finePointer || reduced) return;
    cards.forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(1100px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  function initPointer() {
    if (!finePointer) return;

    d.addEventListener('pointermove', (e) => {
      const el = e.target.closest && e.target.closest('.spotlight');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });

    if (reduced) return;

    const hero = $('.hero');
    const card = $('.code-card');
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--hx', `${((e.clientX - r.left) / r.width) * 100}%`);
      hero.style.setProperty('--hy', `${((e.clientY - r.top) / r.height) * 100}%`);
      if (card) {
        const cr = card.getBoundingClientRect();
        const x = (e.clientX - (cr.left + cr.width / 2)) / r.width;
        const y = (e.clientY - (cr.top + cr.height / 2)) / r.height;
        card.style.transform = `rotateY(${(x * 10).toFixed(2)}deg) rotateX(${(-y * 8).toFixed(2)}deg)`;
      }
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { if (card) card.style.transform = ''; });

    $$('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${(x * 0.2).toFixed(1)}px, ${(y * 0.3).toFixed(1)}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------------------------------------------------------
     Hero canvas: drifting node network
     --------------------------------------------------------- */
  function initCanvas() {
    const canvas = $('.hero-canvas');
    const ctx = canvas && canvas.getContext('2d');
    if (!ctx) return;
    let w = 0, h = 0, nodes = [], running = false, visible = true, raf = 0;
    let c1 = '139,123,255', c2 = '45,212,191';
    const mouse = { x: -9999, y: -9999 };
    const LINK = 140;

    const readColors = () => {
      const cs = getComputedStyle(root);
      c1 = cs.getPropertyValue('--a1-rgb').trim() || c1;
      c2 = cs.getPropertyValue('--a2-rgb').trim() || c2;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(24, Math.min(85, Math.floor((w * h) / 17000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.5 + 0.7, hue: Math.random() < 0.5
      }));
      if (!running) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = dx * dx + dy * dy;
          if (dist < LINK * LINK) {
            const o = 1 - Math.sqrt(dist) / LINK;
            ctx.strokeStyle = `rgba(${c1},${(o * 0.28).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const mdx = a.x - mouse.x, mdy = a.y - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 190) {
          ctx.strokeStyle = `rgba(${c2},${((1 - md / 190) * 0.5).toFixed(3)})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${n.hue ? c1 : c2},0.85)`;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }
    };

    const step = () => {
      if (!running) return;
      for (const n of nodes) {
        const mdx = n.x - mouse.x, mdy = n.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < 120 * 120 && md2 > 1) {
          const f = 0.015 * (1 - Math.sqrt(md2) / 120);
          n.vx += mdx * f * 0.05; n.vy += mdy * f * 0.05;
        }
        n.vx *= 0.995; n.vy *= 0.995;
        const sp = Math.hypot(n.vx, n.vy);
        if (sp < 0.12) { n.vx += (Math.random() - 0.5) * 0.04; n.vy += (Math.random() - 0.5) * 0.04; }
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x)); n.y = Math.max(0, Math.min(h, n.y));
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const setRunning = () => {
      const should = visible && !d.hidden && !reduced;
      if (should && !running) { running = true; raf = requestAnimationFrame(step); }
      else if (!should && running) { running = false; cancelAnimationFrame(raf); }
    };

    readColors();
    resize();
    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
    d.addEventListener('visibilitychange', setRunning);
    d.addEventListener('themechange', () => { readColors(); if (!running) draw(); });
    const hero = $('.hero');
    hero.addEventListener('pointermove', (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; }, { passive: true });
    hero.addEventListener('pointerleave', () => { mouse.x = -9999; mouse.y = -9999; });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; setRunning(); }).observe(hero);
    }
    setRunning();
  }

  /* ---------------------------------------------------------
     Copy email + toast
     --------------------------------------------------------- */
  let toastTimer;
  function toast(msg) {
    const el = $('.toast');
    el.textContent = msg;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2200);
  }

  function initCopy() {
    $$('[data-copy]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const text = btn.dataset.copy;
        let ok = false;
        try { await navigator.clipboard.writeText(text); ok = true; } catch (e) {
          const ta = d.createElement('textarea');
          ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
          d.body.appendChild(ta); ta.select();
          try { ok = d.execCommand('copy'); } catch (err) { ok = false; }
          ta.remove();
        }
        if (!ok) return;
        btn.classList.add('is-copied');
        toast(stripTags(t('contact.copied')));
        setTimeout(() => btn.classList.remove('is-copied'), 1800);
      });
    });
  }

  /* ---------------------------------------------------------
     Preloader & boot
     --------------------------------------------------------- */
  function finishLoading() {
    const pre = $('.preloader');
    let seen = false;
    try { seen = sessionStorage.getItem('fk-seen') === '1'; sessionStorage.setItem('fk-seen', '1'); } catch (e) { /* ignore */ }
    const minTime = reduced || seen ? 0 : 1150;
    const start = performance.now();
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, minTime - (performance.now() - start));
      setTimeout(() => {
        pre.classList.add('is-done');
        root.classList.add('is-loaded');
        typer.start(t('hero.roles'), 900);
      }, wait);
    };
    if (d.readyState === 'complete') go();
    else window.addEventListener('load', go);
    setTimeout(go, 2600); // never block on slow fonts/images
  }

  function boot() {
    const year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());
    applyLang(false);
    observeReveals();
    initFilters();
    initModal();
    initTheme();
    initNav();
    initScroll();
    initPointer();
    initCounters();
    initCanvas();
    initCopy();
    finishLoading();
  }

  boot();
})();
