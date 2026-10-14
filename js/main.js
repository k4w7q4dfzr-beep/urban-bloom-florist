/* =========================================
   Urban Bloom Florist - main.js
   ========================================= */

// ===== 1. Mobile navigation toggle =====
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close the menu with the Escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && mainNav.classList.contains('is-open')) {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
      navToggle.focus();
    }
  });
}


// ===== 2. Product filter by occasion (Flowers page) =====
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card[data-occasion]');
const filterStatus = document.querySelector('.filter-status');

function filterProducts(occasion) {
  let visibleCount = 0;

  // Show or hide each product card
  productCards.forEach(function (card) {
    const occasions = card.dataset.occasion.split(' ');
    const matches = occasion === 'all' || occasions.includes(occasion);
    card.classList.toggle('is-hidden', !matches);
    if (matches) {
      visibleCount++;
    }
  });

  // Highlight the active button
  filterButtons.forEach(function (button) {
    const isActive = button.dataset.filter === occasion;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', isActive);
  });

  // Tell the user how many products are shown
  if (filterStatus) {
    const activeButton = document.querySelector('.filter-btn[data-filter="' + occasion + '"]');
    const label = activeButton ? activeButton.textContent : 'All';
    if (occasion === 'all') {
      filterStatus.textContent = 'Showing all ' + visibleCount + ' arrangements';
    } else {
      filterStatus.textContent = 'Showing ' + visibleCount + ' arrangement' +
        (visibleCount === 1 ? '' : 's') + ' for ' + label;
    }
  }
}

if (filterButtons.length > 0) {
  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      filterProducts(button.dataset.filter);
    });
  });

  // Apply a filter from the homepage link, e.g. flowers.html?occasion=birthday
  const params = new URLSearchParams(window.location.search);
  const occasionFromUrl = params.get('occasion');
  const validFilters = Array.from(filterButtons).map(function (button) {
    return button.dataset.filter;
  });

  filterProducts(validFilters.includes(occasionFromUrl) ? occasionFromUrl : 'all');
}