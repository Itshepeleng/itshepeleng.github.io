const projectsData = [
  {
    title: "Parent-Teacher Communication App",
    category: "Flutter & ASP.NET Core",
    description: "A cross-platform application enabling real-time communication between parents and school administration, featuring push notifications and role-based access control.",
    imageUrl: "", 
    githubUrl: "https://github.com/Itshepeleng/SKOOL-COMM",
    liveUrl: ""
  },
  {
    title: "Study Room Web App",
    category: "HTML / CSS / JavaScript",
    description: "A dark-themed, minimal virtual workspace interface tailored for focused academic study and collaborative learning sessions.",
    imageUrl: "",
    githubUrl: "https://github.com/Itshepeleng/study_stream",
    liveUrl: ""
  }
];

function renderProjects() {
  const container = document.getElementById("projectsList");
  if (!container) return;

  container.innerHTML = projectsData.map((project, index) => {
    const hasImage = project.imageUrl && project.imageUrl.trim() !== "";

    return `
      <article class="project-card-row">
        <div class="project-image-box">
          ${
            hasImage
              ? `<img src="${project.imageUrl}" alt="${project.title}" />`
              : `<svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5">
                   <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                   <circle cx="8.5" cy="8.5" r="1.5"></circle>
                   <polyline points="21 15 16 10 5 21"></polyline>
                 </svg>`
          }
        </div>
        
        <div class="project-content">
          <div>
            <div class="project-header">
              <h2 class="project-title">${project.title}</h2>
              <span class="project-category">${project.category}</span>
            </div>
            <p class="project-description">${project.description}</p>
          </div>

          <button type="button" class="take-a-look-btn" data-project-index="${index}">
            Take a look ➔
          </button>
        </div>
      </article>
    `;
  }).join("");

  const dialog = document.getElementById("projectChoiceDialog");
  const dialogMessage = document.getElementById("projectDialogMessage");
  const githubLink = document.getElementById("projectGithubLink");
  const liveLink = document.getElementById("projectLiveLink");
  const liveUnavailable = document.getElementById("projectLiveUnavailable");

  container.addEventListener("click", event => {
    const trigger = event.target.closest("[data-project-index]");
    if (!trigger || !dialog) return;

    const project = projectsData[Number(trigger.dataset.projectIndex)];
    if (!project) return;

    dialogMessage.textContent = `Choose where to go for ${project.title}.`;
    githubLink.href = project.githubUrl;
    liveLink.hidden = !project.liveUrl;
    liveUnavailable.hidden = Boolean(project.liveUrl);
    if (project.liveUrl) liveLink.href = project.liveUrl;
    dialog.showModal();
  });

  document.getElementById("closeProjectDialog").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
}

document.addEventListener("DOMContentLoaded", renderProjects);