// ===========================
// NAVBAR — scroll shadow + active link
// ===========================
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const allLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  highlightActive();
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===========================
// ACTIVE NAV HIGHLIGHTING
// ===========================
function highlightActive() {
  const scrollPos = window.scrollY + 100;
  document.querySelectorAll('section[id]').forEach(sec => {
    const top    = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link && scrollPos >= top && scrollPos < bottom) {
      allLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

// ===========================
// SCROLL ANIMATIONS
// ===========================
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.anim').forEach(el => observer.observe(el));

// ===========================
// CONTACT FORM
// ===========================
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> We\'ll be in touch!';
    btn.style.background = '#10B981';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
}

// ===========================
// NEWSLETTER
// ===========================
const newsBtn   = document.getElementById('newsBtn');
const newsInput = document.querySelector('.news-form input');
if (newsBtn && newsInput) {
  newsBtn.addEventListener('click', () => {
    if (newsInput.value.includes('@')) {
      const prev = newsInput.value;
      newsInput.value = 'Subscribed ✓';
      newsInput.style.borderColor = '#10B981';
      newsInput.style.color = '#10B981';
      setTimeout(() => {
        newsInput.value = '';
        newsInput.style.borderColor = '';
        newsInput.style.color = '';
      }, 2800);
    } else {
      newsInput.style.borderColor = '#EF4444';
      newsInput.focus();
      setTimeout(() => { newsInput.style.borderColor = ''; }, 1500);
    }
  });
}
