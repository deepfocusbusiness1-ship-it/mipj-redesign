/* ==========================================================================
   MUTUAL INTEGRANTES DEL PODER JUDICIAL (MIPJ) - INTERACTIVE JS CONTROLLER 2026
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTravelSlider();
  initPortalTabs();
  initCredentialGenerator();
  initSedesSearch();
  initModalHandlers();
  initMobileNav();
});

/* --------------------------------------------------------------------------
   1. INTERACTIVE TRAVEL SLIDER (MENDOZA, VIÑA DEL MAR, BARILOCHE, IGUAZÚ)
   -------------------------------------------------------------------------- */
function initTravelSlider() {
  const slides = document.querySelectorAll('.slide-item');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('sliderPrevBtn');
  const nextBtn = document.getElementById('sliderNextBtn');
  const container = document.getElementById('travelSliderContainer');

  if (!slides.length) return;

  let currentSlide = 0;
  let autoPlayInterval = null;

  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      startAutoPlay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const targetIndex = parseInt(e.target.dataset.slide, 10);
      showSlide(targetIndex);
      startAutoPlay();
    });
  });

  if (container) {
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
  }

  // Start initial auto play
  startAutoPlay();
}

/* --------------------------------------------------------------------------
   2. MEMBER PORTAL TAB NAVIGATION
   -------------------------------------------------------------------------- */
function initPortalTabs() {
  const tabs = document.querySelectorAll('.portal-tab');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPaneId = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(targetPaneId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. DYNAMIC DIGITAL CREDENTIAL GENERATOR
   -------------------------------------------------------------------------- */
function initCredentialGenerator() {
  const inputName = document.getElementById('inputMemberName');
  const inputDni = document.getElementById('inputMemberDni');
  const inputBranch = document.getElementById('inputMemberBranch');

  const cardName = document.getElementById('cardMemberName');
  const cardDni = document.getElementById('cardMemberDni');
  const cardBranch = document.getElementById('cardMemberBranch');

  if (inputName && cardName) {
    inputName.addEventListener('input', (e) => {
      cardName.textContent = e.target.value.trim() !== '' ? e.target.value.toUpperCase() : 'DRA. MARÍA GONZÁLEZ';
    });
  }

  if (inputDni && cardDni) {
    inputDni.addEventListener('input', (e) => {
      cardDni.textContent = e.target.value.trim() !== '' ? e.target.value : '28.450.912';
    });
  }

  if (inputBranch && cardBranch) {
    inputBranch.addEventListener('change', (e) => {
      cardBranch.textContent = e.target.value;
    });
  }
}

/* --------------------------------------------------------------------------
   4. SEDES & DELEGACIONES SEARCH
   -------------------------------------------------------------------------- */
function initSedesSearch() {
  const searchInput = document.getElementById('searchSedesInput');
  const sedeCards = document.querySelectorAll('.sede-card');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      sedeCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   5. MODAL HANDLERS (AFFILIATION FORM & DETAILS)
   -------------------------------------------------------------------------- */
function initModalHandlers() {
  const modalOverlay = document.getElementById('affiliationModal');
  const openBtns = document.querySelectorAll('.js-open-modal');
  const closeBtn = document.getElementById('closeModalBtn');
  const form = document.getElementById('affiliationForm');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modalOverlay) modalOverlay.classList.add('active');
    });
  });

  if (closeBtn && modalOverlay) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Gracias por enviar tu solicitud de afiliación! Un representante de la Mutual se comunicará a la brevedad.');
      if (modalOverlay) modalOverlay.classList.remove('active');
      form.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   6. MOBILE NAVIGATION TOGGLE & AUTO-CLOSE
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById('mobileToggleBtn');
  const menu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('mobile-active');
    });

    // Close menu automatically when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('mobile-active');
      });
    });
  }
}
