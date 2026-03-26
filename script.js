// Navbar toggle
const navLinks = document.querySelector('.nav-links');
const toggle = document.querySelector('.menu-toggle');
const modeToggle = document.querySelector('.mode-toggle');
const body = document.body;

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Dark / Light Mode
modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Skill bar animation on scroll
const progressBars = document.querySelectorAll('.progress');
window.addEventListener('scroll', () => {
    const skills = document.querySelector('.skills');
    const skillsTop = skills.offsetTop - window.innerHeight + 200;
    if (window.scrollY > skillsTop) {
        progressBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-width') || bar.style.width;
        });
    }
});

// EmailJS Contact Form
// Contact Form EmailJS Integration
const form = document.getElementById('contact-form');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent page reload

    // Send form via EmailJS
    emailjs.sendForm('service_lrgd6cb', 'template_feepkpe', this)
        .then(() => {
            alert('Message sent successfully!');  // success alert
            form.reset(); // clear the form
        }, (error) => {
            alert('Oops! Something went wrong: ' + JSON.stringify(error));
        });
});
