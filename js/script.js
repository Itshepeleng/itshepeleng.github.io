const projectsData = [
  {
    title: "Parent-Teacher Communication App",
    category: "Flutter & ASP.NET Core",
    description: "A cross-platform application enabling real-time communication between parents and school administration, featuring push notifications and role-based access control.",
    imageUrl: "", 
    githubUrl: "https://github.com/Itshepeleng/SKOOL-COMM"
  },
  {
    title: "Study Room Web App",
    category: "HTML / CSS / JavaScript",
    description: "A dark-themed, minimal virtual workspace interface tailored for focused academic study and collaborative learning sessions.",
    imageUrl: "",
    githubUrl: "https://github.com/Itshepeleng/study_stream"
  }
];

function renderProjects() {
  const container = document.getElementById("projectsList");
  if (!container) return;

  container.innerHTML = projectsData.map(project => {
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

          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="take-a-look-btn">
            Take a look ➔
          </a>
        </div>
      </article>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", renderProjects);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const typeSelect = document.getElementById('projectType');
  const messageInput = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;
    const statusMessage = document.getElementById('formStatus');
    const submitButton = form.querySelector('button[type="submit"]');
    statusMessage.textContent = '';
    statusMessage.dataset.state = '';

    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    // Validate Name
    if (!nameInput.value.trim()) {
      document.getElementById('nameError').textContent = 'Please enter your name';
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailInput.value.trim()) {
      document.getElementById('emailError').textContent = 'Please enter your email';
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      document.getElementById('emailError').textContent = 'Please enter a valid email';
      isValid = false;
    }

    // Validate Dropdown
    if (!typeSelect.value) {
      document.getElementById('typeError').textContent = 'Please select a project type';
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      document.getElementById('messageError').textContent = 'Please enter a message';
      isValid = false;
    }

    if (!isValid) return;

    submitButton.disabled = true;
    statusMessage.textContent = 'Sending your message...';

    try {
      const response = await fetch('https://formsubmit.co/ajax/itshepeleng03@gmail.com', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      const result = await response.json();

      if (!response.ok || result.success !== 'true') {
        throw new Error('The form service did not accept the message.');
      }

      form.reset();
      statusMessage.textContent = 'Your message was sent successfully.';
      statusMessage.dataset.state = 'success';
    } catch (error) {
      statusMessage.textContent = 'We could not send your message. Please email itshepeleng03@gmail.com instead.';
      statusMessage.dataset.state = 'error';
    } finally {
      submitButton.disabled = false;
    }
  });
});

//timeline section on home page

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll-Driven Reveal Animations (Intersection Observer)
  const timelineItems = document.querySelectorAll('.timeline-item');

  const observerOptions = {
    threshold: 0,
    rootMargin: "0px 0px -50px 0px"
  };

  const itemObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Once animated, stop observing
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  timelineItems.forEach(item => {
    itemObserver.observe(item);
  });

  // 2. Interactive Card Highlighting & Focus
  timelineItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all items
      timelineItems.forEach(el => el.classList.remove('active-card'));
      // Add active highlight class to the clicked item
      item.classList.add('active-card');
    });
  });

  // 3. Tag Counter / Filter Interaction (Optional Fun Extra)
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'scale(1.08)';
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = 'scale(1)';
    });
  });
});