/* ============================================================
   PORTFOLIO INTERACTIVITY
   Features:
   1. Hamburger menu (mobile navigation toggle)
   2. Dark / light mode toggle
   3. Smooth scroll + close mobile menu on link click
   4. Reveal-on-scroll animation
   All functions are commented.
   ============================================================ */

// ---------- 1. HAMBURGER MENU ----------
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

/**
 * Toggles the mobile navigation menu open/closed.
 * Updates aria-expanded and animates the hamburger icon.
 */
function toggleMenu() {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
}

// Attach click event to the hamburger button
if (navToggle) {
  navToggle.addEventListener('click', toggleMenu);
}

// ---------- 2. DARK / LIGHT MODE TOGGLE ----------
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement; // <html>

/**
 * Switches between dark and light themes.
 * Saves the choice to localStorage so it persists on reload.
 */
function toggleTheme() {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  htmlElement.setAttribute('data-theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';

  // Persist preference
  localStorage.setItem('theme', newTheme);
}

// Apply saved theme on page load
(function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  if (themeToggle) {
    themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
  }
})();

// Attach click event to the theme toggle button
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// ---------- 3. SMOOTH SCROLL + CLOSE MOBILE MENU ----------
/**
 * When a nav link is clicked:
 * - Smoothly scrolls to the target section (CSS handles smooth behaviour,
 *   but we also close the mobile menu).
 */
const navLinks = document.querySelectorAll('.nav-link, .brand, .btn[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault(); // prevent default jump
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Close mobile menu if it's open
        if (navMenu.classList.contains('open')) {
          toggleMenu();
        }
      }
    }
  });
});

// ---------- 4. REVEAL ON SCROLL ----------
/**
 * Uses IntersectionObserver to add a 'visible' class
 * when a .reveal element enters the viewport.
 */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing once revealed (optional)
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15, // trigger when 15% of element is visible
  }
);

revealElements.forEach(el => revealObserver.observe(el));