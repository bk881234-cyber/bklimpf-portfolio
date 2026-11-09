/* Hero: arrow-flight intro synced with the logo reveal, cursor light,
   thumbnail trail and custom cursor. Needs data.js (imageUrls, projectsData). */
(function () {
    var hero = document.getElementById('hero');
    if (!hero) return;

    var stage = hero.querySelector('.hero-stage'),
        line = hero.querySelector('.hero-line'),
        tip = hero.querySelector('.hero-tip'),
        reveal = hero.querySelector('.hero-reveal'),
        trail = hero.querySelector('.hero-trail'),
        cursor = hero.querySelector('.hero-cursor'),
        label = hero.querySelector('.hero-cursor-label');

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        coarse = window.matchMedia('(pointer: coarse)').matches;

    /* ---------- intro ---------- */
    var raf = null;
    function easeInOutCubic(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

    function showFinal() {
        cancelAnimationFrame(raf);
        line.style.opacity = 0; tip.style.opacity = 0;
        reveal.style.clipPath = 'none';
        hero.classList.add('is-lit');
    }

    function play() {
        cancelAnimationFrame(raf);
        hero.classList.remove('is-lit'); void hero.offsetWidth;
        var h = hero.getBoundingClientRect(), s = stage.getBoundingClientRect();
        // stage units: 0 = left edge of the artwork, 1 = right edge; fly from hero edge to hero edge
        var start = (h.left - s.left) / s.width - 0.05,
            end = (h.right - s.left) / s.width + 0.05,
            dur = 1500, fade = 700, t0 = null;
        line.style.opacity = 1; tip.style.opacity = 1;
        function frame(ts) {
            if (t0 === null) t0 = ts;
            var e = ts - t0, p = Math.min(e / dur, 1), x = start + easeInOutCubic(p) * (end - start);
            tip.style.left = (x * 100) + '%';
            line.style.left = (start * 100) + '%';
            line.style.width = ((x - start) * 100) + '%';
            reveal.style.clipPath = 'inset(0 ' + ((1 - Math.max(0, Math.min(1, x))) * 100) + '% 0 0)';
            if (p >= .72 && !hero.classList.contains('is-lit')) hero.classList.add('is-lit');
            if (p < 1) { raf = requestAnimationFrame(frame); return; }
            var f = Math.min((e - dur) / fade, 1);
            line.style.opacity = 1 - f; tip.style.opacity = 0;
            if (f < 1) raf = requestAnimationFrame(frame); else reveal.style.clipPath = 'none';
        }
        raf = requestAnimationFrame(frame);
    }
    window.heroReplay = function () { reduced ? showFinal() : play(); };

    if (reduced) showFinal();
    else {
        var logo = hero.querySelector('.hero-logo');
        var go = function () { setTimeout(play, 250); };
        if (logo.complete) go(); else { logo.addEventListener('load', go); logo.addEventListener('error', showFinal); }
    }

    /* ---------- header background after the hero ---------- */
    var header = document.getElementById('header');
    if (header) {
        var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > hero.offsetHeight - 90); };
        window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }

    if (coarse || typeof imageUrls === 'undefined') return;

    /* ---------- thumbnails ---------- */
    var WIX = 'static.wixstatic.com';
    var works = imageUrls.map(function (src, i) {
        var t = projectsData[i] ? projectsData[i].title : 'Project ' + (i + 1);
        if (src.indexOf(WIX) !== -1) src += '/v1/fill/w_300,h_300,al_c,q_80/thumb.jpg';
        return { src: src, title: t };
    });
    works.forEach(function (w) { var im = new Image(); im.src = w.src; });

    /* ---------- cursor light + custom cursor (lerped) ---------- */
    var tgt = { x: .5, y: .42, h: 0 }, cur = { x: .5, y: .42, h: 0 }, cp = { x: 0, y: 0 }, cpT = { x: 0, y: 0 }, loop = null;
    function tick() {
        cur.x += (tgt.x - cur.x) * .08; cur.y += (tgt.y - cur.y) * .08; cur.h += (tgt.h - cur.h) * .06;
        cp.x += (cpT.x - cp.x) * .35; cp.y += (cpT.y - cp.y) * .35;
        var dx = cur.x - .5, dy = cur.y - .42, st = hero.style;
        st.setProperty('--px', cur.x * 100 + '%'); st.setProperty('--py', cur.y * 100 + '%');
        st.setProperty('--lx', (50 + dx * 160) + '%'); st.setProperty('--ly', (40 + dy * 160) + '%');
        st.setProperty('--ox', (-dx * 12) + 'px'); st.setProperty('--oy', (-dy * 6) + 'px');
        st.setProperty('--hv', cur.h.toFixed(3));
        cursor.style.transform = 'translate(' + cp.x + 'px,' + cp.y + 'px)';
        var moving = Math.abs(tgt.x - cur.x) + Math.abs(tgt.y - cur.y) + Math.abs(tgt.h - cur.h) + Math.abs(cpT.x - cp.x) + Math.abs(cpT.y - cp.y);
        loop = moving > .002 ? requestAnimationFrame(tick) : null;
    }
    function kick() { if (!loop) loop = requestAnimationFrame(tick); }

    /* ---------- trail: close together, paced in time, max 3 visible ---------- */
    var last = null, lastT = 0, idx = 0, live = [];
    function spawn(x, y) {
        var n = idx % works.length, w = works[n]; idx++;
        var el = document.createElement('div');
        el.className = 'ti';
        el.style.setProperty('--x', x + 'px'); el.style.setProperty('--y', y + 'px');
        el.style.setProperty('--r', (Math.random() * 8 - 4).toFixed(1) + 'deg');
        var im = document.createElement('img'); im.alt = ''; im.src = w.src; el.appendChild(im);
        trail.appendChild(el); live.push(el);
        requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('in'); }); });
        setTimeout(function () { el.classList.add('out'); }, 1100);
        setTimeout(function () { el.remove(); live.splice(live.indexOf(el), 1); }, 2600);
        var vis = live.filter(function (node) { return !node.classList.contains('out'); });
        if (vis.length > 3) vis[0].classList.add('out');
        label.innerHTML = '<b>' + String(n + 1).padStart(2, '0') + ' / ' + works.length + '</b>';
        label.appendChild(document.createTextNode(w.title));
    }

    hero.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'touch') return;
        var r = hero.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        cpT.x = x; cpT.y = y; cursor.classList.toggle('flip', x > r.width * .72);
        if (!hero.classList.contains('is-hover')) { cp.x = x; cp.y = y; }
        kick();
        if (!hero.classList.contains('is-lit')) return;
        hero.classList.add('is-hover');
        tgt.x = x / r.width; tgt.y = y / r.height; tgt.h = 1;
        if (e.target.closest && e.target.closest('.hero-btn')) { last = { x: x, y: y }; return; }
        if (!last) { last = { x: x, y: y }; return; }
        var now = performance.now();
        if (Math.hypot(x - last.x, y - last.y) > r.width * .05 && now - lastT > 350) {
            spawn(x, y); last = { x: x, y: y }; lastT = now;
        }
    });
    hero.addEventListener('pointerleave', function () {
        hero.classList.remove('is-hover'); tgt.x = .5; tgt.y = .42; tgt.h = 0; last = null; kick();
    });
})();
