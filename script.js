/* Portfolio grid: square tiles with a focus hover. Clicking a tile stores the
   tile's rect + image so project.html can replay the grid -> detail transition. */
(function () {
    var grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    var count = document.getElementById('portfolioCount');
    if (count) count.textContent = imageUrls.length + ' PROJECTS';

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

        item.addEventListener('click', function () {
            var r = img.getBoundingClientRect();
            try {
                sessionStorage.setItem('bk-transition', JSON.stringify({
                    index: index, src: img.currentSrc || img.src,
                    rect: { x: r.left, y: r.top, w: r.width, h: r.height }
                }));
            } catch (e) { /* storage unavailable: navigate without the transition */ }
        });

        grid.appendChild(item);
    });
})();
