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
    } else {
        mainContainer.innerHTML = `<div class="project-page-wrapper"><div class="project-title-bar"><h2>프로젝트를 찾을 수 없습니다.</h2></div></div>`;
    }
});
