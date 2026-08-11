document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNavHighlight();
  initFooterDate();
  initVisitorCounter();
  initGithubLink();
  initProjectStatuses();
});

/**
 * Mobile nav toggle.
 */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the menu after a link is tapped (mobile).
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Highlights the nav link matching the section currently in view.
 */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('[data-nav]');
  if (!sections.length || !navLinks.length) return;

  const linkFor = (id) =>
    document.querySelector(`[data-nav][href="#${id}"]`);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          const activeLink = linkFor(entry.target.id);
          if (activeLink) activeLink.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * Sets the "last updated" date in the footer.
 */
function initFooterDate() {
  const el = document.getElementById('lastUpdated');
  if (!el) return;
  const today = new Date();
  el.textContent = today.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function initVisitorCounter() {
  const countEl = document.getElementById('visitorCount');
  if (!countEl) return;

  const placeholderCount = '—';
  countEl.textContent = placeholderCount;
}

function initGithubLink() {
  const GITHUB_URL = 'https://github.com/DanielCalv'; 
  const LINKEDIN_URL = 'https://www.linkedin.com/in/daniel-calvert-78318425b/'; 

  ['githubLink', 'githubLinkIcon', 'githubLinkBottom'].forEach((id) => {
    const link = document.getElementById(id);
    if (!link) return;
    link.href = GITHUB_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  const linkedin = document.getElementById('linkedinLink');
  if (linkedin) {
    linkedin.href = LINKEDIN_URL;
    linkedin.target = '_blank';
    linkedin.rel = 'noopener noreferrer';
  }
}

async function initProjectStatuses() {
  console.log("Project status function started");

  try {
    const response = await fetch(
      'https://daniel-calvert-functions-dzbpayd9fucydtep.francecentral-01.azurewebsites.net/api/GetProjectStatuses'
    );

    const statuses = await response.json();

    console.log(statuses);

    Object.keys(statuses).forEach(project => {

      const element = document.getElementById(
        `status-${project}`
      );

      if (element) {
        element.textContent = statuses[project];

        if (statuses[project] === "Live") {
          element.classList.add("pill-live");
        }
        else if (statuses[project] === "InProgress") {
          element.classList.add("pill-progress");
        }
        else if (statuses[project] === "Planned") {
          element.classList.add("pill-planned");
        }
      }

    });

  } catch(error) {
    console.error("Could not load project statuses:", error);
  }
}
