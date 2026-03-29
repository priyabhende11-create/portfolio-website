/* ═══════════════════════════════════════════════════════
   PRIYA BHENDE PORTFOLIO — script.js (COMPLETE)
   ═══════════════════════════════════════════════════════ */

/* ── Custom Cursor ──────────────────────────────────── */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring) {
  let rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
    rx += (e.clientX - rx) * 0.12;
    ry += (e.clientY - ry) * 0.12;
  });
  requestAnimationFrame(function tick() {
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  });
  document.querySelectorAll('a, button, .skill-pill, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width  = '50px';
      ring.style.height = '50px';
      ring.style.opacity = '1';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width  = '32px';
      ring.style.height = '32px';
      ring.style.opacity = '.6';
    });
  });
}

/* ── Navbar: scroll shadow + active link ────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  highlightNav();
});

function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('.nav-item').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

/* ── Hamburger Menu ──────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger && hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks && navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── Dark / Light Mode ───────────────────────────────── */
const modeToggle = document.getElementById('modeToggle');
const body       = document.body;
const savedMode  = localStorage.getItem('theme');

if (savedMode === 'dark') applyDark();

modeToggle && modeToggle.addEventListener('click', () => {
  body.classList.contains('dark-mode') ? applyLight() : applyDark();
});

function applyDark() {
  body.classList.add('dark-mode');
  if (modeToggle) modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  localStorage.setItem('theme', 'dark');
}
function applyLight() {
  body.classList.remove('dark-mode');
  if (modeToggle) modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  localStorage.setItem('theme', 'light');
}

/* ── Reveal on scroll ────────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObs.observe(el));

/* ── Skill Bars ──────────────────────────────────────── */
const barFills = document.querySelectorAll('.bar-fill');
const barObs   = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.getAttribute('data-w') + '%';
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
barFills.forEach(b => barObs.observe(b));

/* ── Hero Floating Particles ─────────────────────────── */
(function spawnParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const count = 18;
  for (let i = 0; i < count; i++) {
    const p    = document.createElement('span');
    const size = Math.random() * 6 + 2;
    const x    = Math.random() * 100;
    const dur  = Math.random() * 12 + 8;
    const del  = Math.random() * 10;
    Object.assign(p.style, {
      position: 'absolute', borderRadius: '50%',
      width: size + 'px', height: size + 'px',
      left: x + '%', bottom: '-20px',
      background: `rgba(255,107,129,${Math.random() * .4 + .1})`,
      animation: `particleRise ${dur}s ${del}s linear infinite`,
      pointerEvents: 'none',
    });
    canvas.appendChild(p);
  }
  if (!document.querySelector('#particle-style')) {
    const s = document.createElement('style');
    s.id = 'particle-style';
    s.textContent = `
      @keyframes particleRise {
        0%   { transform: translateY(0) scale(1); opacity: 0; }
        10%  { opacity: 1; }
        90%  { opacity: .4; }
        100% { transform: translateY(-100vh) scale(0); opacity: 0; }
      }
    `;
    document.head.appendChild(s);
  }
})();

/* ── Add reveal class to key elements ────────────────── */
document.querySelectorAll(
  '.info-card, .project-card, .testi-card, .skill-row, .skill-pill'
).forEach(el => el.classList.add('reveal'));

/* ══════════════════════════════════════════════════════
   🎥 PROJECT VIDEOS — AUTO-PLAY ON SCROLL + SOUND ON HOVER
   ══════════════════════════════════════════════════════ */

/**
 * setupVideoCard()
 * ─────────────────
 * videoId     : id of the <video> element
 * cardId      : id of the card wrapper (used for scroll observation)
 * threshold   : how much of the card must be visible before playing (0–1)
 */
function setupVideoCard(videoId, cardId, threshold = 0.35) {
  const video = document.getElementById(videoId);
  const card  = document.getElementById(cardId);
  if (!video || !card) return;

  const fallbackId = 'fallback-' + cardId.replace('card-', '');
  const fallback   = document.getElementById(fallbackId);

  // ── Show fallback if video can't load ──
  video.addEventListener('error', () => {
    video.style.display = 'none';
    if (fallback) fallback.style.display = 'flex';
  });

  // ── Hide fallback once video data is available ──
  video.addEventListener('loadeddata', () => {
    if (fallback) fallback.style.display = 'none';
    video.style.display = 'block';
  });

  // ── IntersectionObserver: play on scroll into view ──
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Attempt autoplay (muted — required by browsers)
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Browser blocked autoplay — that's fine, stays paused
          });
        }
      } else {
        video.pause();
      }
    });
  }, { threshold });

  observer.observe(card);

  // ── Hover: unmute for sound, re-mute on leave ──
  card.addEventListener('mouseenter', () => {
    video.muted = false;
    video.volume = 0.6;
  });
  card.addEventListener('mouseleave', () => {
    video.muted = true;
  });
}

// Initialise all video cards
setupVideoCard('project-video-college360', 'card-college360', 0.35);

// If you add more video cards in the future, just call:
// setupVideoCard('project-video-YOURID', 'card-YOURID');

/* ══════════════════════════════════════════════════════
   📸 PROJECT PHOTOS — Graceful fallback already in HTML
      (onerror attribute on <img> handles missing files)
   ══════════════════════════════════════════════════════ */

// Optional: log which images loaded / failed for debugging
document.querySelectorAll('.project-photo').forEach(img => {
  img.addEventListener('load', () => {
    console.log('✅ Project image loaded:', img.src);
  });
  img.addEventListener('error', () => {
    console.warn('⚠️ Project image not found:', img.src, '— fallback shown');
  });
});

/* ── EmailJS Contact Form ────────────────────────────── */
const form       = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form && form.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled  = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

  emailjs.sendForm('service_lrgd6cb', 'template_feepkpe', this)
    .then(() => {
      formStatus.textContent = '✅ Message sent! I\'ll get back to you soon.';
      formStatus.className   = 'form-status success';
      form.reset();
    })
    .catch(err => {
      formStatus.textContent = '❌ Oops! Something went wrong. Please try again.';
      formStatus.className   = 'form-status error';
      console.error(err);
    })
    .finally(() => {
      btn.disabled  = false;
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    });
});

/* ── Smooth Active link on click ─────────────────────── */
document.querySelectorAll('.nav-item').forEach(a => {
  a.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
    a.classList.add('active');
  });
});
