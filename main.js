// Main JavaScript for Analytics Dashboard

// Sidebar Toggle
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const toggleBtn = document.querySelector('.sidebar-toggle');

// Initialize sidebar state based on screen size
if (window.innerWidth <= 768) {
  sidebar.classList.add('collapsed');
  mainContent.classList.add('expanded');
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
  });
}

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

function setTheme(theme) {
  body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function getTheme() {
  return localStorage.getItem('theme') || 'light';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });
}

// Initialize theme on load
setTheme(getTheme());

// Animated Counters
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('.kpi-value[data-target]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    animateCounter(counter, target);
  });
}

// Initialize counters on page load
document.addEventListener('DOMContentLoaded', initCounters);

// Utility function for smooth scrolling
function smoothScrollTo(element) {
  element.scrollIntoView({ behavior: 'smooth' });
}

// Export functions for use in other scripts
window.DashboardUtils = {
  animateCounter,
  smoothScrollTo
};
