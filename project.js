/* Project detail page: header with info row, progress bar, scroll reveals,
   prev/next side navigation and the grid -> detail transition replay. */
(function () {
    var mainContainer = document.getElementById('projectMainContainer');
    var raw = new URLSearchParams(window.location.search).get('id');
    var index = /^\d+$/.test(raw || '') ? parseInt(raw, 10) : -1;
    var data = index >= 0 && index < projectsData.length ? projectsData[index] : null;

    if (!data) {
        mainContainer.innerHTML =
            '<div class="project-page-wrapper"><div class="dp-missing"><h2>프로젝트를 찾을 수 없습니다.</h2>' +
            '<a href="index.html#portfolio" class="back-btn">← 목록으로 돌아가기</a></div></div>';
        return;
    }

    document.title = data.title + ' | BKLimpf';
    mainContainer.innerHTML = data.htmlContent || '<div class="project-page-wrapper"></div>';

    var wrapper = mainContainer.querySelector('.project-page-wrapper') || mainContainer;
    var header = renderHeader(index, data);
    var oldBar = wrapper.querySelector('.project-title-bar');
    if (oldBar) {
        // keep any subtitle the old title bar carried (e.g. 크로노오디세이), shown under the new title
        var sub = oldBar.querySelector('.project-subtitle');
        if (sub) {
            var line = document.createElement('p');
            line.className = 'dp-sub';
            line.innerHTML = '<span class="up" style="--d:2"></span>';
            line.firstChild.textContent = sub.textContent.trim();
            header.insertBefore(line, header.querySelector('.dp-info'));
        }
        oldBar.remove();
    }
    wrapper.insertBefore(header, wrapper.firstChild);

    var count = document.querySelector('.dp-count');
    if (count) count.textContent = pad(index + 1) + ' / ' + pad(projectsData.length);

    markReveals(wrapper);
    createProjectNavigation(index);
    initProgressBar();
    alignHeader(header, wrapper);
    requestAnimationFrame(function () { document.body.classList.add('dp-go'); });

    /* ------------------------------------------------------------------ */

    function pad(n) { return String(n).padStart(2, '0'); }

    function esc(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    // Header block: project number, title, and an info row with only the fields that have values.
    function renderHeader(i, d) {
        var el = document.createElement('section');
        el.className = 'dp-hero';
        var cells = [['CLIENT', d.client], ['CATEGORY', d.category], ['ROLE', d.role]]
            .filter(function (c) { return c[1]; })
            .map(function (c, k) {
                return '<div><small>' + c[0] + '</small><span class="up" style="--d:' + (k + 2) + '">' + esc(c[1]) + '</span></div>';
            }).join('');
        el.innerHTML =
            '<div class="dp-no"><span class="up">PROJECT ' + pad(i + 1) + '</span></div>' +
            '<h1><span class="up" style="--d:1">' + esc(d.title) + '</span></h1>' +
            (cells ? '<div class="dp-info">' + cells + '</div>' : '');
        return el;
    }

    // Images reveal by unmasking from the bottom; text blocks rise. No blur.
    function markReveals(root) {
        root.querySelectorAll('.project-images img').forEach(function (img) { img.setAttribute('data-reveal', 'img'); });
        root.querySelectorAll('.project-live-section, .project-section, .ai-highlight-section, .project-description-section, .multi-platform-section, .youtube-section, .visit-site-wrap')
            .forEach(function (b) { b.setAttribute('data-reveal', ''); });
    }

    function initProgressBar() {
        var bar = document.querySelector('.dp-bar');
        if (!bar) return;
        var update = function () {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = (max > 0 ? Math.min(window.scrollY / max, 1) * 100 : 0) + '%';
        };
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        update();
    }

    // Lines the header text up with the project's own content edge: the first image's left/right
    // when it is inset (e.g. Value Life), or the site header's logo edge when images run full-bleed.
    function alignHeader(el, root) {
        var logo = document.querySelector('#header .header-logo');
        function apply() {
            var first = root.querySelector('img:not(.preview-img)');
            var box = el.getBoundingClientRect();          // padding is relative to the header's own box
            var W = document.documentElement.clientWidth;
            var left = logo ? logo.getBoundingClientRect().left : 40, right = W - left;
            if (first && first.offsetWidth) {
                var r = first.getBoundingClientRect();
                if (r.left - box.left > 24 || r.left > 24) { left = r.left; right = r.right; }
            }
            // keep a minimum gutter only where the text would otherwise touch the screen edge
            var pl = Math.max(Math.round(left - box.left), 0), pr = Math.max(Math.round(box.right - right), 0);
            if (box.left + pl < 20) pl = 20 - box.left;
            if (W - (box.right - pr) < 20) pr = 20 - (W - box.right);
            el.style.setProperty('--dp-l', pl + 'px');
            el.style.setProperty('--dp-r', pr + 'px');
        }
        apply();
        var first = root.querySelector('img:not(.preview-img)');
        if (first && !first.complete) first.addEventListener('load', apply, { once: true });
        window.addEventListener('resize', apply);
    }

    function createProjectNavigation(currentIndex) {
        var total = projectsData.length;
        if (total <= 1) return;
        var prevIndex = (currentIndex - 1 + total) % total;
        var nextIndex = (currentIndex + 1) % total;
        var nav = document.createElement('div');
        nav.className = 'project-side-nav';
        nav.innerHTML =
            '<a href="project.html?id=' + prevIndex + '" class="side-nav-btn prev-btn" aria-label="이전 프로젝트">' +
                '<div class="nav-arrow-box"><i class="fas fa-chevron-left"></i></div>' +
                card('PREVIOUS PROJECT', prevIndex) +
            '</a>' +
            '<a href="project.html?id=' + nextIndex + '" class="side-nav-btn next-btn" aria-label="다음 프로젝트">' +
                card('NEXT PROJECT', nextIndex) +
                '<div class="nav-arrow-box"><i class="fas fa-chevron-right"></i></div>' +
            '</a>';
        document.body.appendChild(nav);
    }

    function card(direction, i) {
        var p = projectsData[i];
        return '<div class="nav-preview-card">' +
            '<img src="' + esc(imageUrls[i] || '') + '" alt="' + esc(p.title) + '" class="preview-img">' +
            '<div class="preview-text"><span class="preview-direction">' + direction + '</span>' +
            '<span class="preview-title">' + esc(p.title) + '</span></div></div>';
    }
})();
