// ===== Projects Data =====
const projects = [
  {
    title: "Matrimonial Biodata",
    description: "A structured display of personal and professional information.",
    iconClass: "fas fa-file-code",
    techStack: { html: 40, css: 30, js: 30 },
    link: "/Matrimonial_validated-main/index.html"  // absolute path from root
  },
  {
    title: "Simple Calculator",
    description: "A basic JavaScript calculator for arithmetic operations.",
    iconClass: "fas fa-calculator",
    techStack: { html: 25, css: 25, js: 50 },
    link: "/Calculator-main/Calculator-main/Web Lab Calculator-20250624T134428Z-1-001/Web Lab Calculator/index.html"
  },
  {
    title: "Daraz Clone",
    description: "A website that clones the Daraz layout using HTML, CSS, and JavaScript.",
    iconClass: "fas fa-file-code",
    techStack: { html: 35, css: 35, js: 30 },
    link: "/Daraz-Replica-/index.html"  // absolute path from root
  },
];


// ===== Tech Stack HTML Generator =====
function createTechStackHTML(techStack) {
  if (!techStack) return "";

  const colors = { html: "#e34c26", css: "#2965f1", js: "#f1e05a" };
  let barsHTML = "";
  let labelsHTML = "";

  for (const [tech, percent] of Object.entries(techStack)) {
    if (percent > 0) {
      barsHTML += `<div style="background-color:${colors[tech]}; width:${percent}%; height:8px; border-radius:5px;"></div>`;
      labelsHTML += `
        <span style="display:flex; align-items:center; gap:5px; font-size:14px; color:#333; font-weight:500;">
          <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background-color:${colors[tech]};"></span> 
          ${tech.toUpperCase()} <span>${percent}%</span>
        </span>
      `;
    }
  }

  return `
    <div style="display:flex; overflow:hidden; margin-bottom:10px; background:#e0e0e0; border-radius:5px;">
      ${barsHTML}
    </div>
    <div style="display:flex; gap:15px; flex-wrap:wrap; margin-bottom:12px;">
      ${labelsHTML}
    </div>
  `;
}

// ===== Render Portfolio =====
async function renderPortfolio() {
  const container = document.getElementById("portfolioGrid");
  if (!container) {
    console.error('No element with id "portfolioGrid" found');
    return;
  }
  container.innerHTML = "";

  let delay = 100;

  for (const proj of projects) {
    if (!proj.link) continue;

    // Skipping HEAD request for local files due to browser restrictions
    // You can enable if hosted on a server with CORS enabled

    const techStackHTML = createTechStackHTML(proj.techStack);

    const projectHTML = `
      <div class="portfolio-item" data-aos="fade-up" data-aos-delay="${delay}">
        <div class="portfolio-content">
          <div class="portfolio-icon"><i class="${proj.iconClass}"></i></div>
          <h3 class="animate-text">${proj.title}</h3>
          <p>${proj.description}</p>
          ${techStackHTML}
          <a href="${proj.link}" class="btn btn-secondary hover-effect" target="_blank" rel="noopener noreferrer">View Project</a>
        </div>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", projectHTML);
    delay += 100;
  }
}

// ===== Highlight Active Nav Link on Scroll =====
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-list a');
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
}

// ===== Header Scroll Animation =====
function headerScrollAnimation() {
  let lastScroll = 0;
  const header = document.querySelector('.main-header');

  if (!header) return;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove('scroll-up');
      return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
      header.classList.remove('scroll-up');
      header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
      header.classList.remove('scroll-down');
      header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
  });
}

// ===== Smooth Scrolling for Internal Links =====
function smoothScrollInit() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }

      // Close mobile menu if open
      const sideNav = document.getElementById('side-nav');
      const menuToggle = document.getElementById('menu-toggle');
      const menuOverlay = document.getElementById('menu-overlay');

      if (sideNav && sideNav.classList.contains('active')) {
        sideNav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  });
}

// ===== Mobile Menu Toggle and Overlay =====
function menuToggleInit() {
  const menuToggle = document.getElementById('menu-toggle');
  const sideNav = document.getElementById('side-nav');
  const menuOverlay = document.getElementById('menu-overlay');
  const navItems = document.querySelectorAll('.nav-list li');

  function toggleMenu() {
    menuToggle.classList.toggle('active');
    sideNav.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');

    navItems.forEach((item, index) => {
      if (sideNav.classList.contains('active')) {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
        item.style.transitionDelay = `${index * 0.1}s`;
      } else {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transitionDelay = '0s';
      }
    });
  }

  if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', toggleMenu);
  navItems.forEach(item => item.addEventListener('click', toggleMenu));
}

// ===== Fade In Animation for Elements on Scroll =====
function initFadeInAnimations() {
  const fadeInElements = document.querySelectorAll('.fade-in');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    fadeInObserver.observe(element);
  });
}

// ===== Dynamic Current Year in Footer =====
function setCurrentYear() {
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
}

// ===== LLM Bio Generation =====
function llmBioGenerationInit() {
  const generateBioBtn = document.getElementById('generate-bio-btn');
  const originalBioP1 = document.getElementById('original-bio-p1');
  const originalBioP2 = document.getElementById('original-bio-p2');
  const llmBioOutput = document.getElementById('llm-bio-output');
  const loadingMessage = llmBioOutput ? llmBioOutput.querySelector('.loading-message') : null;

  if (!generateBioBtn || !originalBioP1 || !originalBioP2 || !llmBioOutput) return;

  generateBioBtn.addEventListener('click', async () => {
    const fullBioText = originalBioP1.textContent + "\n\n" + originalBioP2.textContent;
    const prompt = `Rephrase the following personal biography to be more concise and professional, suitable for a personal website's 'About Me' section. Focus on achievements, skills, and career goals, and keep it under 150 words. Do not include a greeting like "Hello!" or an introductory phrase. Just provide the rephrased bio:\n\n${fullBioText}`;

    if (loadingMessage) {
      loadingMessage.style.display = 'block';
      llmBioOutput.innerHTML = '';
      llmBioOutput.appendChild(loadingMessage);
    }
    llmBioOutput.style.display = 'block';
    generateBioBtn.disabled = true;

    try {
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = ""; // Insert API key here if you have one
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API error: ${response.status} - ${errorData.error.message}`);
      }

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const generatedText = result.candidates[0].content.parts[0].text;
        llmBioOutput.innerHTML = `<p class="generated-text">${generatedText}</p><button class="btn btn-secondary btn-sm mt-2" onclick="revertBio()">Revert</button>`;
      } else {
        llmBioOutput.innerHTML = '<p class="error-message">Could not generate bio. The AI response was empty or malformed. Please try again.</p>';
      }
    } catch (error) {
      console.error('Error generating bio:', error);
      llmBioOutput.innerHTML = `<p class="error-message">Error generating bio: ${error.message}. Please check console for details.</p>`;
    } finally {
      if (loadingMessage) {
        loadingMessage.style.display = 'none';
      }
      generateBioBtn.disabled = false;
    }
  });

  window.revertBio = () => {
    llmBioOutput.innerHTML = '';
    llmBioOutput.style.display = 'none';
  };
}

// ===== Main Initialization =====
document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  renderPortfolio();
  smoothScrollInit();
  menuToggleInit();
  headerScrollAnimation();
  highlightNavLink();
  window.addEventListener('scroll', highlightNavLink);
  initFadeInAnimations();

  if (window.AOS) {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-in-out'
    });
  }

  llmBioGenerationInit();
});
