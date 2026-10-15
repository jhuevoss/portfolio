const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');
function toggleMenu() {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
}
if (navToggle) {
  navToggle.addEventListener('click', toggleMenu);
}
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
function toggleTheme() {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlElement.setAttribute('data-theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('theme', newTheme);
}
(function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  if (themeToggle) {
    themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
  }
})();
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}
const navLinks = document.querySelectorAll('.nav-link, .brand, .btn[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navMenu.classList.contains('open')) {
          toggleMenu();
        }
      }
    }
  });
});
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);
revealElements.forEach(el => revealObserver.observe(el));