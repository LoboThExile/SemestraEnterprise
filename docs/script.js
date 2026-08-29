/* ==========================================================================
   SEMESTRA ENTERPRISE - OFFICIAL PRODUCT DATABASE & LOGIC
   JA Malaysia Young Enterprise Program 2026
   Official Storefront: https://jamalaysia.org.my/JAMall/semestraenterprise/
   ========================================================================== */

/* ==========================================================================
   THEME MANAGER (3 MODES: SYSTEM, LIGHT, DARK)
   ========================================================================== */
const ThemeManager = {
  storageKey: 'semestra_theme_preference',

  getSavedPreference() {
    return localStorage.getItem(this.storageKey) || 'system';
  },

  getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },

  apply(setting) {
    const root = document.documentElement;
    const resolvedTheme = setting === 'system' ? this.getSystemTheme() : setting;
    
    root.setAttribute('data-theme', resolvedTheme);
    root.setAttribute('data-theme-setting', setting);

    // Update UI elements
    this.updateUI(setting, resolvedTheme);
  },

  set(setting) {
    if (CookieNotice.getConsent() !== 'declined') {
      localStorage.setItem(this.storageKey, setting);
    }
    this.apply(setting);
  },

  updateUI(setting, resolvedTheme) {
    const label = document.getElementById('theme-active-label');
    const iconContainer = document.getElementById('theme-active-icon');
    
    const icons = {
      system: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
      light: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
      dark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
    };

    if (iconContainer) {
      iconContainer.innerHTML = icons[setting] || icons.system;
    }

    if (label) {
      if (setting === 'system') {
        label.textContent = `Auto (${resolvedTheme === 'dark' ? 'Dark' : 'Light'})`;
      } else if (setting === 'light') {
        label.textContent = 'Light';
      } else {
        label.textContent = 'Dark';
      }
    }

    // Highlight active in dropdown
    document.querySelectorAll('.theme-menu-item').forEach(item => {
      item.classList.toggle('active', item.dataset.themeValue === setting);
    });
  },

  init() {
    const saved = this.getSavedPreference();
    this.apply(saved);

    // Watch for OS system preference changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (this.getSavedPreference() === 'system') {
          this.apply('system');
        }
      });
    }

    // Bind dropdown interaction
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const dropdown = document.getElementById('theme-menu-dropdown');

    if (toggleBtn && dropdown) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
      });

      document.addEventListener('click', (e) => {
        if (!toggleBtn.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.remove('show');
        }
      });

      dropdown.querySelectorAll('.theme-menu-item').forEach(btn => {
        btn.addEventListener('click', () => {
          const val = btn.dataset.themeValue;
          this.set(val);
          dropdown.classList.remove('show');
        });
      });
    }
  }
};

/* ==========================================================================
   COOKIE & LOCAL STORAGE NOTICE MANAGER
   ========================================================================== */
const CookieNotice = {
  storageKey: 'semestra_storage_consent',

  getConsent() {
    return localStorage.getItem(this.storageKey);
  },

  accept() {
    localStorage.setItem(this.storageKey, 'accepted');
    this.hide();
  },

  optOut() {
    localStorage.setItem(this.storageKey, 'declined');
    localStorage.removeItem('semestra_theme_preference');
    ThemeManager.set('system');
    this.hide();
  },

  show() {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.classList.add('show');
  },

  hide() {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.classList.remove('show');
  },

  init() {
    const consent = this.getConsent();
    if (!consent) {
      setTimeout(() => this.show(), 600);
    }

    const acceptBtn = document.getElementById('cookie-accept-btn');
    const declineBtn = document.getElementById('cookie-decline-btn');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => this.accept());
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', () => this.optOut());
    }

    document.querySelectorAll('.cookie-settings-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.show();
      });
    });
  }
};

/* ==========================================================================
   OFFICIAL PRODUCT DATABASE
   ========================================================================== */
const products = [
  {
    id: 1,
    name: 'Malaysian Heritage Match',
    subtitle: 'Cultural Tabletop Card Game • JA Malaysia YE 2026',
    category: 'games',
    categoryName: 'Flagship Game',
    price: 'RM 55',
    oldPrice: null,
    priceNumber: 55,
    image: 'assets/image/malaysian-heritage-match.png',
    shortDescription: 'Educational card game celebrating Malaysian state traditions, royal costumes, local delicacies, and landmarks.',
    longDescription: 'Malaysian Heritage Match is Semestra Enterprise’s flagship educational card game created under the JA Malaysia Young Enterprise Program 2026. Designed to teach players about Malaysian culture, history, arts, food, landmarks, and traditions through fun and interactive gameplay. The game encourages learning while promoting appreciation of Malaysia’s rich cultural heritage. Suitable for families, students, and learners aged 6 and above.',
    specs: {
      category: 'Educational Card Game',
      weight: '120 g',
      dimensions: '16 × 8 cm',
      players: '2 – 6 Players',
      playTime: '15 – 30 Mins',
      age: 'Ages 6 & Up',
      language: 'Bilingual (ENG / BM)'
    },
    features: [
      'Comprehensive Malaysian State Heritage Cards (Johor, Kedah, Penang, Perak, Kelantan & more)',
      'Learn Traditional Attire (Teluk Belanga, Cekak Musang, Kebaya)',
      'Discover Regional Delicacies & Historical Landmarks',
      'Fast-paced matching, memory, and reflex gameplay mechanics',
      'Officially certified by JA Malaysia Young Enterprise Program 2026'
    ],
    inTheBox: [
      'Complete Malaysian Heritage Match Card Deck',
      'Illustrated Rulebook & Cultural Factsheet',
      'Protective Game Box Packaging'
    ],
    active: true,
    featured: true,
    priority: 10
  },
  {
    id: 2,
    name: 'PipeCleaner Flowers',
    subtitle: 'Handcrafted Everlasting Floral Pot Decor',
    category: ['crafts'],
    categoryName: 'Floral Crafts',
    price: 'RM 15',
    oldPrice: null,
    priceNumber: 15,
    image: 'assets/image/pipecleaner-flowers.png',
    shortDescription: 'Everlasting handmade sunflower arrangement in a miniature ceramic pot. Vibrant blooming chenille petals crafted with care.',
    longDescription: 'Brighten your study table or bookshelf with this adorable handmade flower pot. Lovingly hand-crafted by the Semestra Enterprise team using soft chenille floral stems and lush green leaves potted in a miniature ceramic vase. 100% maintenance-free and everlasting.',
    specs: {
      category: 'Handmade Floral Decor',
      material: 'Soft Chenille Stems & Mini Ceramic Pot',
      height: 'Approx. 12 – 15 cm',
      care: 'Everlasting (No maintenance required)'
    },
    features: [
      '100% Handcrafted by student entrepreneurs',
      'Vibrant blooming sunflower petals with leafy accents',
      'Sturdy white ceramic potted base',
      'Everlasting decorative gift for friends, teachers, and family'
    ],
    inTheBox: [
      '1 Handcrafted PipeCleaner Flower Pot'
    ],
    active: true,
    featured: false,
    priority: 9
  },
  {
    id: 3,
    name: 'Handmade Hairclips',
    subtitle: 'Floral Chenille Hair Accessory',
    category: ['accessories', 'crafts'],
    categoryName: 'Hair Accessories & Crafts',
    price: 'RM 4',
    oldPrice: 'RM 8',
    priceNumber: 4,
    image: 'assets/image/handmade-hairclips.png',
    shortDescription: 'Delightful handcrafted yellow and white floral hairclip with sturdy grip. Adds a cute aesthetic pop to any hairstyle.',
    longDescription: 'Add a cute handmade flair to your everyday look! Each hairclip is carefully crafted by the Semestra Enterprise team with bright yellow and white chenille flower blooms securely mounted on a durable grip clip.',
    specs: {
      category: 'Hair Accessory',
      style: 'Triple Floral Bloom',
      attachment: 'Durable Grip Clip',
      suitability: 'All hair types'
    },
    features: [
      'Cheerful yellow and white floral bloom design',
      'Comfortable non-slip grip suitable for all hair types',
      'Soft-touch handmade finish',
      'Special 50% discount on official JAMall release'
    ],
    inTheBox: [
      '1 Handcrafted Floral Hairclip'
    ],
    active: true,
    featured: false,
    priority: 8
  },
  {
    id: 4,
    name: 'Pixel-Art Heritage Keychains',
    subtitle: 'Handcrafted Fuse-Bead Keychains',
    category: ['accessories', 'crafts'],
    categoryName: 'Keychains & Crafts',
    price: 'RM 4',
    oldPrice: 'RM 8',
    priceNumber: 4,
    image: 'assets/image/pixel-art-keychains.png',
    shortDescription: 'Handmade fuse-bead pixel-art keychains featuring cute characters (Zootopia Judy & Nick, Tulip, Apple). Durable and lightweight.',
    longDescription: 'Express your style with our pixel-art fuse-bead keychains! Individually assembled and heat-fused by the student team, featuring popular character silhouettes (Judy Hopps, Nick Wilde, Red Tulip, and Apple) on sturdy metal keyrings.',
    specs: {
      category: 'Handmade Keychain',
      material: 'Heat-Fused Perler / Melty Beads',
      attachment: 'Sturdy Metal Keyring & Chain',
      motifs: 'Judy Hopps, Nick Wilde, Tulip, Apple'
    },
    features: [
      'Vibrant retro pixel-art aesthetic',
      'Lightweight, durable, and shatter-resistant',
      'Perfect for school bags, pencil cases, and keys',
      'Special 50% discount on official JAMall release'
    ],
    inTheBox: [
      '1 Handmade Pixel-Art Keychain'
    ],
    active: true,
    featured: false,
    priority: 7
  }
];

/* ==========================================================================
   UTILITIES
   ========================================================================== */
function getQueryParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

/* ==========================================================================
   HOMEPAGE: RENDER FEATURED FLAGSHIP
   ========================================================================== */
function initFeaturedProduct() {
  const container = document.getElementById('featured-product-container');
  if (!container) return;

  const featured = products.find(p => p.featured && p.active) || products[0];
  if (!featured) return;

  container.innerHTML = `
    <div class="flagship-showcase-card">
      <div class="flagship-img-side">
        <img src="${featured.image}" alt="${featured.name}" />
      </div>
      <div class="flagship-content-side">
        <h3>${featured.name}</h3>
        <p class="flagship-subtitle-clean">${featured.subtitle}</p>
        <p class="flagship-desc">
          ${featured.shortDescription}
        </p>

        <p class="flagship-specs-clean">
          2 – 6 Players &nbsp;•&nbsp; 15 – 30 Mins &nbsp;•&nbsp; Ages 6+ &nbsp;•&nbsp; Bilingual (ENG / BM)
        </p>

        <div class="flagship-price-bar">
          <span class="amount">${featured.price}</span>
        </div>

        <div class="flagship-actions">
          <a href="product.html?id=${featured.id}" class="btn btn-secondary">
            <span>View Details</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <button type="button" class="btn btn-primary" onclick="openOrderModal(${featured.id})">
            <span>Order Now (${featured.price})</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   PRODUCTS CATALOG & FILTER
   ========================================================================== */
let currentCategory = 'all';
let currentSearchTerm = '';

function renderCatalogGrid() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  const filtered = products.filter(p => {
    if (!p.active) return false;
    const matchesCategory = currentCategory === 'all' || 
      (Array.isArray(p.category) ? p.category.includes(currentCategory) : p.category === currentCategory);
    const matchesSearch = currentSearchTerm === '' || 
      p.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(currentSearchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);">
        <p style="font-size: 1.15rem; color: var(--text-muted); margin-bottom: 1rem;">No creations found matching your filter.</p>
        <button class="btn btn-outline btn-sm" onclick="resetFilters()">Reset Search & Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <article class="product-card">
      <div class="product-card-header">
        <img src="${p.image}" alt="${p.name}" />
      </div>
      <div class="product-card-body">
        <h3>${p.name}</h3>
        <p>${p.shortDescription}</p>
        <div class="product-card-meta">
          <div class="price-wrap">
            <span class="price">${p.price}</span>
            ${p.oldPrice ? `<span class="old-price">${p.oldPrice}</span>` : ''}
          </div>
          <div class="product-card-actions">
            <a href="product.html?id=${p.id}" class="btn btn-outline btn-sm">Details</a>
            <button type="button" class="btn btn-primary btn-sm" onclick="openOrderModal(${p.id})">Order</button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

function resetFilters() {
  currentCategory = 'all';
  currentSearchTerm = '';
  const searchInput = document.getElementById('product-search');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === 'all');
  });
  renderCatalogGrid();
}

function setupCatalogControls() {
  const searchInput = document.getElementById('product-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value.trim();
      renderCatalogGrid();
    });
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category || 'all';
      renderCatalogGrid();
    });
  });
}

/* ==========================================================================
   SINGLE PRODUCT PAGE LOADER
   ========================================================================== */
function loadSingleProduct() {
  const id = parseInt(getQueryParam('id'), 10) || 1;
  const product = products.find(p => p.id === id) || products[0];

  if (!product) return;

  // Title and Meta Info
  document.title = `${product.name} - Semestra Enterprise`;
  setText('#product-title', product.name);
  setText('#product-tagline', product.subtitle);
  setText('#product-price', product.price);
  setText('#product-long-desc', product.longDescription);
  setText('#breadcrumb-title', product.name);

  const imgEl = document.getElementById('product-photo-large');
  if (imgEl) {
    imgEl.src = product.image;
    imgEl.alt = product.name;
  }

  // Specs Grid
  const specsContainer = document.getElementById('detail-specs-container');
  if (specsContainer && product.specs) {
    specsContainer.innerHTML = Object.entries(product.specs).map(([key, val]) => `
      <div class="spec-item">
        <div class="spec-title">${key}</div>
        <div class="spec-value">${val}</div>
      </div>
    `).join('');
  }

  // Features List
  const featuresListEl = document.getElementById('product-features-list');
  if (featuresListEl && product.features) {
    featuresListEl.innerHTML = product.features.map(f => `
      <li>
        <span class="icon">✓</span>
        <span>${f}</span>
      </li>
    `).join('');
  }

  // What's in the Box
  const boxListEl = document.getElementById('product-box-list');
  if (boxListEl && product.inTheBox) {
    boxListEl.innerHTML = product.inTheBox.map(item => `
      <li>
        <span class="icon">•</span>
        <span>${item}</span>
      </li>
    `).join('');
  }

  // Setup Order Modal Button
  const orderBtn = document.getElementById('btn-open-order-modal');
  if (orderBtn) {
    orderBtn.textContent = `Order Now (${product.price})`;
    orderBtn.onclick = () => openOrderModal(product.id);
  }

  // Toggle Card Deck Showcase
  const deckSection = document.getElementById('deck-showcase-area');
  if (deckSection) {
    deckSection.style.display = (product.id === 1) ? 'block' : 'none';
  }
}

/* ==========================================================================
   INTERACTIVE ORDER / INQUIRY MODAL
   ========================================================================== */
let selectedProductId = 1;

function openOrderModal(productId) {
  selectedProductId = productId || 1;
  const product = products.find(p => p.id === selectedProductId) || products[0];
  
  const modal = document.getElementById('order-modal');
  if (!modal) return;

  setText('#modal-product-name', product.name);
  setText('#modal-product-price', product.price);

  const qtyInput = document.getElementById('order-qty');
  if (qtyInput) qtyInput.value = 1;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  const modal = document.getElementById('order-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function sendWhatsAppOrder() {
  const product = products.find(p => p.id === selectedProductId) || products[0];
  const qtyInput = document.getElementById('order-qty');
  const qty = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
  const nameInput = document.getElementById('order-customer-name');
  const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Customer';

  const totalPrice = product.priceNumber ? product.priceNumber * qty : qty * 10;
  const message = `Hello Semestra Enterprise Team!\n\nI would like to order:\n- Item: ${product.name}\n- Price: ${product.price} each\n- Quantity: ${qty}\n- Estimated Total: RM ${totalPrice}\n- Name/School: ${name}\n\nPlease share payment and postage details. Thank you!`;
  
  const encodedMsg = encodeURIComponent(message);
  // Official Semestra Enterprise contact number from JAMall
  window.open(`https://wa.me/601128282939?text=${encodedMsg}`, '_blank');
}

function sendEmailOrder() {
  const product = products.find(p => p.id === selectedProductId) || products[0];
  const qtyInput = document.getElementById('order-qty');
  const qty = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
  const nameInput = document.getElementById('order-customer-name');
  const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Customer';

  const totalPrice = product.priceNumber ? product.priceNumber * qty : qty * 10;
  const subject = encodeURIComponent(`Order Inquiry: ${product.name} (Qty: ${qty} - RM ${totalPrice})`);
  const body = encodeURIComponent(`Hello Semestra Enterprise Team,\n\nI would like to inquire about ordering:\n- Item: ${product.name} (${product.price})\n- Quantity: ${qty}\n- Estimated Total: RM ${totalPrice}\n- Name / School / Organization: ${name}\n\nPlease advise on payment methods and delivery arrangements.\n\nThank you!`);

  window.location.href = `mailto:semestraenterprise@gmail.com?subject=${subject}&body=${body}`;
}

/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */
function setupFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   CONTACT FORM SUBMISSION
   ========================================================================== */
function setupContactForm() {
  const contactForm = document.getElementById('contact-inquiry-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name')?.value || '';
    const email = document.getElementById('contact-email')?.value || '';
    const subject = document.getElementById('contact-subject')?.value || 'Website Inquiry';
    const message = document.getElementById('contact-message')?.value || '';

    const mailtoBody = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);
    const mailtoSubject = encodeURIComponent(`[Semestra Enterprise Inquiry] ${subject}`);

    window.location.href = `mailto:semestraenterprise@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    const feedback = document.getElementById('form-feedback');
    if (feedback) {
      feedback.style.display = 'block';
      feedback.innerHTML = `
        <div style="background: var(--color-teal-soft); border: 1px solid var(--color-teal-border); color: var(--color-teal); padding: 1rem; border-radius: var(--radius-md); text-align: center; margin-top: 1rem; font-weight: 600;">
          Opening your email client to send your message to <strong>semestraenterprise@gmail.com</strong>.
        </div>
      `;
    }
  });
}

/* ==========================================================================
   INIT ON DOM LOAD
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme Manager
  ThemeManager.init();

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('show');
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });
  }

  // Active Link Highlighting
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (path.endsWith(href) || (href === 'index.html' && (path.endsWith('/') || path === '')))) {
      link.classList.add('active');
    }
  });

  // Modal backdrop close
  const modal = document.getElementById('order-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeOrderModal();
    });
  }

  // Page Specific Inits
  if (document.getElementById('featured-product-container')) {
    initFeaturedProduct();
  }

  if (document.getElementById('products-grid')) {
    renderCatalogGrid();
    setupCatalogControls();
  }

  if (document.getElementById('product-details-page')) {
    loadSingleProduct();
  }

  setupFAQ();
  setupContactForm();
  CookieNotice.init();
});