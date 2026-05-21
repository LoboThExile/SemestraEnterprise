/* =========================
   PRODUCT DATABASE
========================= */
const products = [
  {
    id: 1,
    name: 'Malaysian Heritage Match',
    price: 'SOLD OUT',
    description: 'Educational card game featuring Malaysian culture, history, arts, food, and traditions.',
    image: 'https://placehold.co/300x200',
    features: [
      'Educational cultural learning',
      'Fun for families and students',
      'Malaysian + Southeast Asian themes',
      'Designed for learning through play',
      'Suitable for ages 8+'
    ]
  },
  {
    id: 2,
    name: 'A product for testing i guess',
    price: 'RM Test',
    description: 'i test this',
    image: 'https://placehold.co/300x200',
    features: [
      'item',
      'idk',
      'does this work',
      '1',
      '2'
    ]
  }
];

/* =========================
   UTIL: GET QUERY PARAM
========================= */
function getQueryParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

/* =========================
   UTIL: SAFE ELEMENT SETTER
========================= */
function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

function setImage(selector, src) {
  const el = document.querySelector(selector);
  if (el) el.src = src;
}

/* =========================
   MAIN PRODUCT ROUTER
========================= */
function loadProductPage() {
  const id = parseInt(getQueryParam('id'), 10);
  if (!id) return;

  const product = products.find(p => p.id === id);
  if (!product) {
    document.body.innerHTML = "<h1 style='text-align:center'>Product not found</h1>";
    return;
  }

  // Text fields
  setText('h1', product.name);
  setText('.price', product.price);
  setText('#description', product.description);
  setText('#longDescription', product.description);

  // Images (more stable than querySelector chain fallback)
  document.querySelectorAll('.hero-image, .product-image').forEach(img => {
    img.src = product.image;
    img.alt = product.name;
  });

  // Feature list
  const featureList = document.querySelector('.product-info ul');
  if (featureList) {
    featureList.innerHTML = '';
    product.features.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      featureList.appendChild(li);
    });
  }
}

/* =========================
   OPTIONAL: AUTO PRODUCT GRID (if used on index page later)
========================= */
function renderProductGrid(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price}</p>
      <a href="product.html?id=${p.id}">View</a>
    </div>
  `).join('');
}

/* =========================
   INIT
========================= */
document.addEventListener('DOMContentLoaded', () => {
  // Toggle mobile menu
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  // Close menu when a link is clicked (optional)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
    });
  });
  }

  // Load product page if needed
  if (window.location.pathname.endsWith('product.html')) {
    loadProductPage();
  }

  console.log('Semestra Enterprise site loaded');
});
