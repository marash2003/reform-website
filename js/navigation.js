// ============================================================================
// PARTICLES ANIMATION
// ============================================================================

function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 20 + 10}s infinite;
        `;
        container.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
            50% { transform: translateY(-100px) translateX(50px); opacity: 0.1; }
        }
    `;
    document.head.appendChild(style);
}

createParticles();

// ============================================================================
// SCROLL TO TOP
// ============================================================================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================================================
// NAVBAR
// ============================================================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ============================================================================
// 3D STAT CIRCLES ANIMATION
// ============================================================================

const stats = document.querySelectorAll('.stat-circle');
stats.forEach(stat => {
    stat.addEventListener('mousemove', (e) => {
        const rect = stat.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotX = (y / rect.height) * 10;
        const rotY = -(x / rect.width) * 10;
        stat.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    stat.addEventListener('mouseleave', () => {
        stat.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});

// ============================================================================
// CAROUSEL FUNCTIONALITY
// ============================================================================

const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');
const items = document.querySelectorAll('.carousel-item');

let currentSlide = 0;
let autoplayInterval;
const slideDelay = 5000;

function showSlide(n) {
    if (n >= items.length) currentSlide = 0;
    if (n < 0) currentSlide = items.length - 1;

    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });

    resetAutoplay();
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, slideDelay);
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        currentSlide = i;
        showSlide(currentSlide);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// Touch support
let touchStart = 0;
let touchEnd = 0;

carouselTrack.addEventListener('touchstart', (e) => {
    touchStart = e.changedTouches[0].screenX;
});

carouselTrack.addEventListener('touchend', (e) => {
    touchEnd = e.changedTouches[0].screenX;
    if (touchStart - touchEnd > 50) nextSlide();
    if (touchEnd - touchStart > 50) prevSlide();
});

showSlide(0);

// ============================================================================
// NEWSLETTER
// ============================================================================

const newsletterForm = document.getElementById('newsletterForm');
const formMessage = document.getElementById('formMessage');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = newsletterForm.querySelector('input').value;
        const btn = newsletterForm.querySelector('button');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            formMessage.textContent = '✗ Invalid email address';
            formMessage.className = 'form-message error';
            return;
        }

        btn.disabled = true;
        btn.textContent = 'Subscribing...';

        try {
            await new Promise(r => setTimeout(r, 1000));
            formMessage.textContent = '✓ Successfully subscribed! Check your email.';
            formMessage.className = 'form-message success';
            newsletterForm.reset();

            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = 'Get Started Now';
                formMessage.textContent = '';
            }, 3000);
        } catch (error) {
            formMessage.textContent = '✗ Something went wrong';
            formMessage.className = 'form-message error';
            btn.disabled = false;
            btn.textContent = 'Get Started Now';
        }
    });
}

// ============================================================================
// SMOOTH SCROLL
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.impact-card, .program-item, .team-card, .value-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

console.log('✓ Reform Cameroon - Premium Site Ready');