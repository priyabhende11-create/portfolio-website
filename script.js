/* ═══════════════════════════════════════════════════════════════
   PRIYA BHENDE PORTFOLIO — script.js (COMPLETE & FORMATTED)
   ═══════════════════════════════════════════════════════════════ */

// ─── Custom Cursor ────────────────────────────────────────────
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring) {
    let rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        dot.style.left = e.clientX + 'px';
        dot.style.top  = e.clientY + 'px';

        rx += (e.clientX - rx) * 0.12;
        ry += (e.clientY - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
    });

    document.querySelectorAll('a, button, .skill-pill, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.width   = '50px';
            ring.style.height  = '50px';
            ring.style.opacity = '1';
        });
        el.addEventListener('mouseleave', () => {
            ring.style.width   = '32px';
            ring.style.height  = '32px';
            ring.style.opacity = '0.6';
        });
    });
}

// ─── Navbar Scroll Effect ────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    highlightNav();
});

function highlightNav() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 140) {
            current = s.id;
        }
    });

    document.querySelectorAll('.nav-item').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
}

// ─── Mobile Menu ─────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ─── Dark Mode ───────────────────────────────────────────────
const modeToggle = document.getElementById('modeToggle');
const body       = document.body;

// Apply saved theme on load
if (localStorage.getItem('theme') === 'dark') {
    applyDark();
}

modeToggle?.addEventListener('click', () => {
    body.classList.contains('dark-mode') ? applyLight() : applyDark();
});

function applyDark() {
    body.classList.add('dark-mode');
    modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'dark');
}

function applyLight() {
    body.classList.remove('dark-mode');
    modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'light');
}

// ─── Scroll Reveal Animations ────────────────────────────────
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 80);
        }
    });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));

// ─── Skill Bar Animations ────────────────────────────────────
const barFills = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targetWidth = entry.target.getAttribute('data-w');
            entry.target.style.width = targetWidth + '%';
            barObserver.unobserve(entry.target); // animate only once
        }
    });
}, { threshold: 0.3 });

barFills.forEach(bar => barObserver.observe(bar));

// ─── Skill Pill Reveal (opacity) ─────────────────────────────
const pillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.style.getPropertyValue('--delay') || '0s';
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, parseFloat(delay) * 1000);
            pillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-pill').forEach(pill => {
    pill.style.opacity = '0';
    pill.style.transform = 'translateY(30px)';
    pill.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    pillObserver.observe(pill);
});

// ─── Hero Particles ───────────────────────────────────────────
(function spawnParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;

    for (let i = 0; i < 22; i++) {
        const p    = document.createElement('span');
        const size = Math.random() * 6 + 2;

        Object.assign(p.style, {
            position:     'absolute',
            borderRadius: '50%',
            width:        size + 'px',
            height:       size + 'px',
            left:         Math.random() * 100 + '%',
            bottom:       '-20px',
            background:   `rgba(255,107,129,${Math.random() * 0.3 + 0.08})`,
            animation:    `particleRise ${Math.random() * 12 + 8}s ${Math.random() * 10}s linear infinite`,
            pointerEvents:'none',
        });

        canvas.appendChild(p);
    }

    if (!document.querySelector('#particle-style')) {
        const style = document.createElement('style');
        style.id = 'particle-style';
        style.textContent = `
            @keyframes particleRise {
                0%   { transform: translateY(0) scale(1); opacity: 0; }
                10%  { opacity: 1; }
                90%  { opacity: 0.4; }
                100% { transform: translateY(-100vh) scale(0); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
})();

// ─── Video Play / Pause ───────────────────────────────────────
const projectVideo = document.getElementById('projectVideo');
const playBtn      = document.getElementById('playBtn');

function playVideo() {
    if (!projectVideo) return;

    if (projectVideo.paused) {
        projectVideo.play();
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        projectVideo.pause();
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

// Auto-play video when projects section comes into view
const projectsSection = document.getElementById('projects');

if (projectVideo && projectsSection) {
    const videoObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectVideo.play();
                if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                projectVideo.pause();
                if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }, { threshold: 0.4 });

    videoObserver.observe(projectsSection);
}

// Unmute video on hover
projectVideo?.addEventListener('mouseenter', () => {
    projectVideo.muted = false;
});
projectVideo?.addEventListener('mouseleave', () => {
    projectVideo.muted = true;
});

// ─── Contact Form (EmailJS) ───────────────────────────────────
const form       = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form?.addEventListener('submit', async e => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled    = true;
    btn.innerHTML   = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    try {
        await emailjs.sendForm('service_lrgd6cb', 'template_feepkpe', form);

        formStatus.textContent  = '✅ Message sent! I\'ll get back to you soon.';
        formStatus.className    = 'form-status success';
        form.reset();

    } catch (error) {
        formStatus.textContent  = '❌ Something went wrong. Please try again.';
        formStatus.className    = 'form-status error';
        console.error('EmailJS error:', error);

    } finally {
        btn.disabled  = false;
        btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    }
});

// ─── Add reveal class to dynamic elements ─────────────────────
document.querySelectorAll(
    '.info-card, .project-card, .testi-card, .skill-row'
).forEach(el => {
    if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        revealObserver.observe(el);
    }
});
