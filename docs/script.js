/* ==========================================================================
   Semestra Enterprise: Core Script
   Product catalog management, accessible navigation, and page hydration
   ========================================================================== */

/* ==========================================================================
   Product Database
   ========================================================================== */
const products = [
  {
    id: 1,
    name: 'Malaysian Heritage Match',
    price: 'RM 10',
    description: 'An educational card game introducing players to the traditions, history, arts, and cuisines of Malaysia and Southeast Asia.',
    image: 'assets/image/logo.png',
    features: [
      'Interactive cultural education for classrooms and family game nights',
      'Curated content highlighting Southeast Asian traditions, landmarks, and folklore',
      'Compact card format suitable for travel, schools, and casual play',
      'Suitable for ages 6 and up, accommodating 2 to 6 players'
    ],
    active: true,
    featured: true,
    priority: 10
  }
];

/* ==========================================================================
   Utilities
   ========================================================================== */
function getQueryParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

function setImage(selector, src, alt) {
  const el = document.querySelector(selector);
  if (el) {
    el.src = src;
    if (alt) el.alt = alt;
  }
}

/* ==========================================================================
   Render: Featured Product
   ========================================================================== */
function renderFeaturedProduct(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const featured = products
    .filter(p => p.active && p.featured)
    .sort((a, b) => b.priority - a.priority)[0];

  if (!featured) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No Featured Product</h3>
        <p>Check our catalog for currently available titles.</p>
        <a href="products.html" class="btn btn-secondary">Browse All Products</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <article class="featured-card">
      <img src="${featured.image}" alt="${featured.name}">
      <div class="card-body">
        <span class="badge-featured">Featured Release</span>
        <h3>${featured.name}</h3>
        <p>${featured.description}</p>
        <div class="price">${featured.price}</div>
        <div>
          <a href="product.html?id=${featured.id}" class="btn">View Product Details</a>
        </div>
      </div>
    </article>
  `;
}

/* ==========================================================================
   Render: Product Grid
   ========================================================================== */
function renderProductGrid(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const activeProducts = products.filter(p => p.active);

  if (activeProducts.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Catalog Updating</h3>
        <p>Our upcoming releases are currently in development.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = activeProducts.map(p => `
    <article class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="price">${p.price}</div>
        <a href="product.html?id=${p.id}" class="btn btn-secondary">View Details</a>
      </div>
    </article>
  `).join('');
}

/* ==========================================================================
   Load Single Product Page
   ========================================================================== */
function loadProductPage() {
  const container = document.getElementById('product-view');
  if (!container) return;

  const idParam = getQueryParam('id');
  const id = idParam ? parseInt(idParam, 10) : 1; // Default to flagship if not specified
  const product = products.find(p => p.id === id);

  if (!product) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>Product Not Found</h2>
        <p>The requested educational game could not be found or has moved.</p>
        <a href="products.html" class="btn">Return to Catalog</a>
      </div>
    `;
    return;
  }

  document.title = `${product.name} | Semestra Enterprise`;

  container.innerHTML = `
    <div class="product-detail">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h1>${product.name}</h1>
        <div class="price">${product.price}</div>
        <p class="description">${product.description}</p>
        
        <h3>Educational Highlights</h3>
        <ul>
          ${product.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        
        <div class="actions">
          <a href="contact.html" class="btn">Inquire or Order</a>
          <a href="products.html" class="btn btn-secondary" style="margin-left: 0.5rem;">Back to Catalog</a>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   Navigation & Accessibility
   ========================================================================== */
function setupNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = navLinks.classList.toggle('show');
      menuToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
    });
  }

  // Active Link Indication
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    if (
      (currentPath.endsWith(href) && href !== 'index.html') ||
      (href === 'index.html' && (currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === ''))
    ) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ==========================================================================
   Lifecycle Initialization
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();

  const path = window.location.pathname;

  if (path.endsWith('index.html') || path === '/' || path.endsWith('/') || path === '') {
    renderFeaturedProduct('#featured-product');
    renderProductGrid('#home-grid');
  }

  if (path.endsWith('products.html')) {
    renderProductGrid('#products-grid');
  }

  if (path.endsWith('product.html')) {
    loadProductPage();
  }
});