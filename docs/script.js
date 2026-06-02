/* =========================
   PRODUCT DATABASE
========================= */
const products = [
  {
    id: 1,
    name: 'Malaysian Heritage Match',
    price: 'NOT RELEASED YET',
    description: 'Educational card game featuring Malaysian culture, history, arts, food, and traditions.',
    image: 'https://placehold.co/300x200',
    features: [
      'Educational cultural learning',
      'Fun for families and students',
      'Malaysian Southeast Asian themes',
      'Designed for Interactive Learning',
      'Suitable for ages 6+'
    ],
    active: true,
    featured: true,
    priority: 10
  },
  {
    id: 2,
    name: 'kiran ezra binti atari game system ',
    price: 'RM 399',
    description: 'orang hitam,gay untuk dijual',
    image: 'https://placehold.co/300x200',
    features: [
      'kote besar',
      'sedap',
      'jual kiran',
      '1',
      '2'
    ],
    active: true,
    featured: false,
    priority: 5
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
   RENDER PRODUCT GRID
========================= */
function renderProductGrid(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const activeProducts = products.filter(p => p.active);

  container.innerHTML = activeProducts.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price}</p>
      <a href="product.html?id=${p.id}" class="btn">View</a>
    </div>
  `).join('');
}

/* =========================
   RENDER FEATURED PRODUCT
========================= */
function renderFeaturedProduct(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const featured = products
    .filter(p => p.active && p.featured)
    .sort((a, b) => b.priority - a.priority)[0];

  if (!featured) {
    container.innerHTML = '<p>No featured product available.</p>';
    return;
  }

  container.innerHTML = `
    <div class="product-card">
      <img src="${featured.image}" alt="${featured.name}">
      <div class="card-body">
        <h3>${featured.name}</h3>
        <p>${featured.description}</p>
        <p class="price">${featured.price}</p>
        <a href="product.html?id=${featured.id}" class="btn">View</a>
      </div>
    </div>
  `;
}

/* =========================
   LOAD PRODUCT PAGE
========================= */
function loadProductPage() {
  const id = parseInt(getQueryParam('id'), 10);
  if (!id) return;

  const product = products.find(p => p.id === id);

  if (!product) {
    document.body.innerHTML =
      "<h1 style='text-align:center'>Product not found</h1>";
    return;
  }

  // Text fields
  setText('h1', product.name);
  setText('.price', product.price);
  setText('#description', product.description);
  setText('#longDescription', product.description);

  // Images
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
   INIT
========================= */
document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     MOBILE MENU
  ========================= */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    // Close menu when link clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });
  }

  /* =========================
     PAGE ROUTER
  ========================= */
  const path = window.location.pathname;

  // Home page
  if (
    path.endsWith('index.html') ||
    path === '/' ||
    path.endsWith('/')
  ) {
    renderFeaturedProduct('#featured-product');
    renderProductGrid('#home-grid');
  }

  // Products page
  if (path.endsWith('products.html')) {
    renderProductGrid('#products-grid');
  }

  // Single product page
  if (path.endsWith('product.html')) {
    loadProductPage();
  }

  console.log('Semestra Enterprise site loaded');
});