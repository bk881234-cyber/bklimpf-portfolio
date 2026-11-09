/* Portfolio grid: square tiles with a focus hover. Clicking a tile opens a white
   panel from the tile's own rectangle (the detail page's background), the thumbnail
   dissolving inside it, then navigates. The detail page continues on the same white. */
(function () {
    var grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    imageUrls.forEach(function (url, index) {
        var title = projectsData[index] ? projectsData[index].title : 'Project ' + (index + 1);
        var n = String(index + 1).padStart(2, '0');

        var item = document.createElement('a');
        item.className = 'portfolio-item';
        item.href = 'project.html?id=' + index;
        item.dataset.index = index;
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
        var panel = document.createElement('div');
        panel.className = 'grid-trans';
        panel.style.clipPath = 'inset(' + r.top + 'px ' + (W - r.right) + 'px ' + (H - r.bottom) + 'px ' + r.left + 'px)';
        var pic = document.createElement('img');
        pic.src = img.currentSrc || img.src; pic.alt = '';
        pic.style.left = r.left + 'px'; pic.style.top = r.top + 'px';
        pic.style.width = r.width + 'px'; pic.style.height = r.height + 'px';
        panel.appendChild(pic);
        document.body.appendChild(panel);
        document.body.classList.add('is-leaving');
        void panel.offsetWidth;                       // commit the start state before animating
        panel.classList.add('is-open');
        setTimeout(function () { window.location.href = item.href; }, 760);
    }

    // back/forward cache: never come back to a page still covered by the panel
    window.addEventListener('pageshow', function () {
        var p = document.querySelector('.grid-trans');
        if (p) p.remove();
        document.body.classList.remove('is-leaving');
    });
})();
