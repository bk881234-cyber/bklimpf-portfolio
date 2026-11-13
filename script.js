/* Portfolio grid: square tiles with a focus hover. Clicking a tile opens a white
   panel from the tile's own rectangle (the detail page's background), the thumbnail
   dissolving inside it, then navigates. The detail page continues on the same white. */
(function () {
    var grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var categoryByIndex = {
        0: 'ai-web',   // OGT (Oh! Get Tool!)
        1: 'ai-web',   // Web & Brand by AI
        2: 'ui-brand', // Value Life Project
        3: 'ai-web',   // GameAIfy
        4: 'ui-brand', // 엔픽셀 기업문화 IR
        5: 'game',     // 그랑사가 게임 콘텐츠
        6: 'game',     // 그랑사가 SNS
        7: 'game',     // 크로노오디세이
        8: 'ui-brand', // BMW
        9: 'ui-brand', // Canon
        10: 'ui-brand',// 바쉐론 콘스탄틴
        11: 'ui-brand',// 헤렌
        12: 'ui-brand',// 프레쉬
        13: 'ui-brand',// 델리
        14: 'ui-brand',// Hamll
        15: 'game',    // 콘트라
        16: 'game',    // NCsoft
        17: 'ui-brand',// 청량
        18: 'game',    // 테라
        19: 'game',    // 포트리스
        20: 'game'     // 검은사막
    };

    imageUrls.forEach(function (url, index) {
        var title = projectsData[index] ? projectsData[index].title : 'Project ' + (index + 1);
        var n = String(index + 1).padStart(2, '0');

        var item = document.createElement('a');
        item.className = 'portfolio-item';
        item.href = 'project.html?id=' + index;
        item.dataset.index = index;
        item.dataset.category = categoryByIndex[index] || 'ui-brand';
        item.setAttribute('data-reveal', '');
        item.style.setProperty('--i', index % 10);

        var img = document.createElement('img');
        img.src = url; img.alt = title; img.loading = 'lazy';
        var cap = document.createElement('div');
        cap.className = 'portfolio-cap';
        cap.innerHTML = '<span class="cap-n"></span><span class="cap-t"></span>';
        cap.firstChild.textContent = n;
        cap.lastChild.textContent = title;
        item.appendChild(img); item.appendChild(cap);

        item.addEventListener('click', function (e) {
            // let the browser handle new-tab / modified clicks normally
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            if (reduced || document.querySelector('.grid-trans')) return;
            e.preventDefault();
            openPanel(item, img);
        });

        grid.appendChild(item);
    });

    function openPanel(item, img) {
        var r = item.getBoundingClientRect(), W = window.innerWidth, H = window.innerHeight;
        var currentTransform = getComputedStyle(img).transform;
        var panel = document.createElement('div');
        panel.className = 'grid-trans';
        panel.style.clipPath = 'inset(' + r.top + 'px ' + (W - r.right) + 'px ' + (H - r.bottom) + 'px ' + r.left + 'px)';
        var pic = document.createElement('img');
        pic.src = img.currentSrc || img.src; pic.alt = '';
        pic.style.left = r.left + 'px'; pic.style.top = r.top + 'px';
        pic.style.width = r.width + 'px'; pic.style.height = r.height + 'px';
        if (currentTransform && currentTransform !== 'none') {
            pic.style.transform = currentTransform;
        }
        panel.appendChild(pic);
        document.body.appendChild(panel);
        document.body.classList.add('is-leaving');
        void panel.offsetWidth;                       // commit the start state before animating
        pic.style.transform = '';
        panel.classList.add('is-open');
        setTimeout(function () { window.location.href = item.href; }, 760);
    }

    // back/forward cache: never come back to a page still covered by the panel
    window.addEventListener('pageshow', function () {
        var p = document.querySelector('.grid-trans');
        if (p) p.remove();
        document.body.classList.remove('is-leaving');
    });

    // Category filter tabs
    var filterButtons = document.querySelectorAll('.portfolio-filter-bar .filter-btn');
    if (filterButtons.length) {
        filterButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var target = btn.getAttribute('data-filter');
                filterButtons.forEach(function (b) {
                    var active = b === btn;
                    b.classList.toggle('active', active);
                    b.setAttribute('aria-selected', active ? 'true' : 'false');
                });
                grid.querySelectorAll('.portfolio-item').forEach(function (item) {
                    var show = target === 'all' || item.dataset.category === target;
                    item.classList.toggle('is-filtered-out', !show);
                    if (show) item.classList.add('in');
                });
            });
        });
    }
})();
