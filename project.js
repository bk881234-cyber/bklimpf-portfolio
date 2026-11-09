document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    const mainContainer = document.getElementById('projectMainContainer');

    if (projectId !== null && !isNaN(projectId) && projectId >= 0 && projectId < projectsData.length) {
        const index = parseInt(projectId, 10);
        const data = projectsData[index];

        if (data && data.htmlContent) {
            mainContainer.innerHTML = data.htmlContent;
            document.title = `${data.title} | BKLimpf`;
        } else {
            mainContainer.innerHTML = `<div class="project-page-wrapper"><div class="project-title-bar"><h2>${data.title}</h2></div></div>`;
        }

        // Add side navigation buttons for projects
        createProjectNavigation(index);
    } else {
        mainContainer.innerHTML = `<div class="project-page-wrapper"><div class="project-title-bar"><h2>프로젝트를 찾을 수 없습니다.</h2></div></div>`;
    }
});

function createProjectNavigation(currentIndex) {
    const totalProjects = projectsData.length;
    if (totalProjects <= 1) return;

    const prevIndex = (currentIndex - 1 + totalProjects) % totalProjects;
    const nextIndex = (currentIndex + 1) % totalProjects;

    const prevProject = projectsData[prevIndex];
    const nextProject = projectsData[nextIndex];

    const prevImg = imageUrls[prevIndex] || '';
    const nextImg = imageUrls[nextIndex] || '';

    const navContainer = document.createElement('div');
    navContainer.className = 'project-side-nav';
    navContainer.innerHTML = `
        <a href="project.html?id=${prevIndex}" class="side-nav-btn prev-btn">
            <div class="nav-arrow-box">
                <i class="fas fa-chevron-left"></i>
            </div>
            <div class="nav-preview-card">
                <img src="${prevImg}" alt="${prevProject.title}" class="preview-img">
                <div class="preview-text">
                    <span class="preview-direction">PREVIOUS PROJECT</span>
                    <span class="preview-title">${prevProject.title}</span>
                </div>
            </div>
        </a>
        <a href="project.html?id=${nextIndex}" class="side-nav-btn next-btn">
            <div class="nav-preview-card">
                <img src="${nextImg}" alt="${nextProject.title}" class="preview-img">
                <div class="preview-text">
                    <span class="preview-direction">NEXT PROJECT</span>
                    <span class="preview-title">${nextProject.title}</span>
                </div>
            </div>
            <div class="nav-arrow-box">
                <i class="fas fa-chevron-right"></i>
            </div>
        </a>
    `;
    document.body.appendChild(navContainer);
}
