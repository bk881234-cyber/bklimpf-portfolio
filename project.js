/* Project detail page: injects the project's htmlContent (its own title bar stays hidden by CSS),
   progress bar, scroll reveals and prev/next side navigation. */
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
    var count = document.querySelector('.dp-count');
    if (count) count.textContent = pad(index + 1) + ' / ' + pad(projectsData.length);

    markReveals(wrapper);
    createProjectNavigation(index);
    initProgressBar();

    /* ------------------------------------------------------------------ */

    function pad(n) { return String(n).padStart(2, '0'); }

    function esc(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
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
