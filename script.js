/* ═══════════════════════════════════════
   PRIYA BHENDE PORTFOLIO — script.js
═══════════════════════════════════════ */

/* ── Custom Cursor ──────────────────── */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring) {
  let rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
    rx += (e.clientX - rx) * 0.12;
    ry += (e.clientY - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
  });
  requestAnimationFrame(function tick() {
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  });
  document.querySelectorAll('a, button, .skill-pill, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.width='50px'; ring.style.height='50px'; ring.style.opacity='1'; });
    el.addEventListener('mouseleave', () => { ring.style.width='32px'; ring.style.height='32px'; ring.style.opacity='.6'; });
  });
}

/* ── Navbar: scroll shadow + active ─── */
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

/* ── Hamburger Menu ─────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger && hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks && navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── Dark / Light Mode ──────────────── */
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
  localStorage.setItem('theme','dark');
}
function applyLight() {
  body.classList.remove('dark-mode');
  if (modeToggle) modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  localStorage.setItem('theme','light');
}

/* ── Reveal on scroll ───────────────── */
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

/* ── Skill Bars ─────────────────────── */
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

/* ── Hero Floating Particles ────────── */
(function spawnParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    const size = Math.random() * 6 + 2;
    const x    = Math.random() * 100;
    const dur  = Math.random() * 12 + 8;
    const del  = Math.random() * 10;
    Object.assign(p.style, {
      position:'absolute', borderRadius:'50%',
      width: size+'px', height: size+'px',
      left: x+'%', bottom: '-20px',
      background: `rgba(255,107,129,${Math.random()*.4+.1})`,
      animation: `particleRise ${dur}s ${del}s linear infinite`,
      pointerEvents:'none',
    });
    canvas.appendChild(p);
  }
  if (!document.querySelector('#particle-style')) {
    const s = document.createElement('style');
    s.id = 'particle-style';
    s.textContent = `
      @keyframes particleRise {
        0%   { transform:translateY(0) scale(1); opacity:0; }
        10%  { opacity:1; }
        90%  { opacity:.4; }
        100% { transform:translateY(-100vh) scale(0); opacity:0; }
      }
    `;
    document.head.appendChild(s);
  }
})();

/* ── Add reveal class to key elements ─ */
document.querySelectorAll('.info-card, .project-card, .testi-card, .skill-row, .skill-pill').forEach(el => {
  el.classList.add('reveal');
});

/* ── EmailJS Contact Form ────────────── */
const form       = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form && form.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled   = true;
  btn.innerHTML  = '<i class="fas fa-spinner fa-spin"></i> Sending…';

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

/* ── Smooth Active link on click ────── */
document.querySelectorAll('.nav-item').forEach(a => {
  a.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
    a.classList.add('active');
  });
});
// 🔥 AUTO-PLAY VIDEO ON SCROLL - ADD TO END OF script.js
const autoPlayVideo = document.getElementById('autoPlayVideo');
const projectsSection = document.querySelector('.projects-section') || document.querySelector('#projects');

if (autoPlayVideo && projectsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 🎬 AUTO-PLAY WHEN SCROLL TO PROJECTS
        autoPlayVideo.play();
        console.log('🎥 Video auto-playing!');
      } else {
        // ⏸️ PAUSE WHEN SCROLL AWAY
        autoPlayVideo.pause();
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(projectsSection);
}

// 🔊 HOVER SOUND
autoPlayVideo?.addEventListener('mouseenter', () => {
  autoPlayVideo.muted = false;
});
autoPlayVideo?.addEventListener('mouseleave', () => {
  autoPlayVideo.muted = true;
});
