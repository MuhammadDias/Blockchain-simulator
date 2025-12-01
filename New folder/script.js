// ===== PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initializeAnimations();
  initializeSkillBars();
  initializeInteractions();
});

// ===== SCROLL-TRIGGERED ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      
      // For skill items with bars, trigger progress animation
      if (entry.target.classList.contains('skill-item')) {
        const percentage = entry.target.dataset.percentage;
        const progress = entry.target.querySelector('.skill-progress');
        const circle = entry.target.querySelector('.skill-circle');
        
        if (progress) {
          progress.style.setProperty('--progress-width', percentage + '%');
          progress.style.width = percentage + '%';
        }
        
        if (circle) {
          circle.style.left = percentage + '%';
        }
      }
      
      // Stop observing once animated
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// ===== INITIALIZE ANIMATIONS =====
function initializeAnimations() {
  // Observe skill items
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    observer.observe(item);
  });

  // Observe experience items
  const experienceItems = document.querySelectorAll('.experience-item');
  experienceItems.forEach(item => {
    observer.observe(item);
  });

  // Observe other animated elements
  const animatedElements = document.querySelectorAll(
    '.profile-container, .name-title, .biodata-section, ' +
    '.skills-section, .experience-section, .footer-section'
  );
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// ===== SKILL BARS ANIMATION =====
function initializeSkillBars() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach((item, index) => {
    const percentage = item.dataset.percentage;
    const progress = item.querySelector('.skill-progress');
    const circle = item.querySelector('.skill-circle');
    
    // Set initial state
    progress.style.width = '0%';
    progress.style.setProperty('--progress-width', percentage + '%');
    circle.style.left = '0%';
    
    // Create observer for this skill item
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Trigger animation
          setTimeout(() => {
            progress.style.width = percentage + '%';
            circle.style.left = percentage + '%';
          }, index * 80);
          skillObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    skillObserver.observe(item);
  });
}

// ===== INTERACTIVE ELEMENTS =====
function initializeInteractions() {
  // Social icons hover effect
  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.15) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1) rotate(0deg)';
    });
  });

  // Navigation links hover effect
  const navLinks = document.querySelectorAll('.footer-nav a, .footer-contact a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.color = 'var(--color-orange-primary)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.color = 'var(--color-light-text)';
    });
  });

  // Experience items hover effect
  const experienceItems = document.querySelectorAll('.experience-item');
  experienceItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-5px)';
      item.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateY(0)';
    });
  });

  // Smooth scroll for navigation links
  const footerLinks = document.querySelectorAll('.footer-nav a');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ===== PAGE VISIBILITY - TRIGGER ANIMATIONS ON PAGE LOAD =====
window.addEventListener('load', () => {
  // Start animations after short delay for better visual effect
  setTimeout(() => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.opacity = '1';
    }
  }, 100);
});

// ===== INTERSECTION OBSERVER FOR FADE-IN EFFECTS =====
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// ===== HANDLE RESPONSIVE BEHAVIOR =====
function handleResponsive() {
  const isMobile = window.innerWidth < 768;
  const heroContent = document.querySelector('.hero-content');
  
  if (isMobile && heroContent) {
    heroContent.style.gridTemplateColumns = '1fr';
  }
}

window.addEventListener('resize', handleResponsive);
handleResponsive();

// ===== PARALLAX EFFECT ON SCROLL (Optional Enhancement) =====
let scrollProgress = 0;

window.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrolled = window.scrollY;
  
  scrollProgress = (scrolled / (documentHeight - windowHeight)) * 100;
  
  // Apply subtle parallax to background
  const bgImage = document.querySelector('.background-image');
  if (bgImage) {
    bgImage.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ===== PREVENT LAYOUT SHIFT - ENSURE SMOOTH TRANSITIONS =====
document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    // Ensure all animations are properly initialized
    const allAnimatedElements = document.querySelectorAll('[class*="animate"]');
    allAnimatedElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
});

// ===== UTILITY: SMOOTH COLOR TRANSITIONS =====
const createColorTransition = (element, fromColor, toColor, duration = 300) => {
  element.style.transition = `color ${duration}ms ease`;
  element.style.color = fromColor;
  setTimeout(() => {
    element.style.color = toColor;
  }, 10);
};

// ===== UTILITY: ANIMATE VALUE COUNTER =====
function animateCounter(element, start, end, duration = 2000) {
  let current = start;
  const increment = (end - start) / (duration / 16);
  
  const counter = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(counter);
    }
    element.textContent = Math.floor(current) + '%';
  }, 16);
}

// ===== PRELOAD IMAGES =====
const imageElements = document.querySelectorAll('img');
imageElements.forEach(img => {
  img.addEventListener('load', () => {
    img.style.opacity = '1';
  });
});

// ===== ACCESSIBILITY: FOCUS MANAGEMENT =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    // Add focus visible styles
    const target = e.target;
    if (target.classList) {
      target.classList.add('keyboard-focus');
    }
  }
});

// ===== EXPORT FUNCTIONS FOR EXTERNAL USE =====
window.PortfolioAnimations = {
  animateCounter,
  createColorTransition,
  initializeAnimations,
  initializeSkillBars,
  initializeInteractions
};
