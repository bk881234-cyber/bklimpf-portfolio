const portfolioGrid = document.getElementById('portfolioGrid');

imageUrls.forEach((url, index) => {
    const item = document.createElement('div');
    item.className = 'portfolio-item';
    item.dataset.index = index;

    const title = projectsData[index] ? projectsData[index].title : `Project ${index + 1}`;

    item.innerHTML = `
        <img src="${url}" alt="${title}" loading="lazy">
        <div class="portfolio-overlay">
            <div class="portfolio-title">${title}</div>
        </div>
    `;

    item.addEventListener('click', () => {
        window.location.href = `project.html?id=${index}`;
    });

    portfolioGrid.appendChild(item);
});
