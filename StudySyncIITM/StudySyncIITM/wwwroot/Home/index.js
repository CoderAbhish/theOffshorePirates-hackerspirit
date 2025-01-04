document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const themeToggle = document.querySelector('.theme-toggle');
    const nav = document.querySelector('nav');
    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.querySelector('#password');
    const featureCards = document.querySelectorAll('.feature-card');
    const testimonials = document.querySelectorAll('.testimonial');
    const scrollTopBtn = document.createElement('button');
    const notificationBell = document.createElement('button');

    // Theme Toggle
    let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        isDarkMode = savedTheme === 'dark';
    } else {
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }

    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // Password Toggle
    passwordToggle?.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        passwordToggle.innerHTML = type === 'password' ? 
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>' :
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
    });

    // Fixed Testimonial Slider
    let currentTestimonial = 0;

    function switchTestimonial() {
        testimonials.forEach(t => t.classList.remove('active'));
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }

    // Initialize first testimonial
    testimonials[0].classList.add('active');
    
    // Start testimonial rotation if there are testimonials
    if (testimonials.length > 0) {
        setInterval(switchTestimonial, 4000);
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    featureCards.forEach(card => observer.observe(card));

    // Scroll to Top Button
    scrollTopBtn.classList.add('scroll-top');
    scrollTopBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }

        // Navigation Hide/Show
        const currentScroll = window.scrollY;
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }
        lastScroll = currentScroll;
    });

    let lastScroll = 0;

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Notification Bell
    notificationBell.classList.add('notification-bell');
    notificationBell.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>';
    document.body.appendChild(notificationBell);

    // Simulate notifications
    setInterval(() => {
        notificationBell.classList.add('animate');
        setTimeout(() => notificationBell.classList.remove('animate'), 500);
    }, 10000);

    // Form Validation
    const loginForm = document.getElementById('loginForm');
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        console.log('Login attempted with:', { email });
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle Reduced Motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition', 'none');
    }

    // Testimonial Slider Logic
    let testimonialIndex = 0;

    function switchTestimonialSlider() {
        testimonials.forEach((t, i) => {
            t.style.transform = `translateX(${100 * (i - testimonialIndex)}%)`;
            t.classList.toggle('active', i === testimonialIndex);
        });
    }

    // Initialize testimonials
    if (testimonials.length > 0) {
        switchTestimonialSlider(); // Ensure they are positioned correctly at start
        setInterval(() => {
            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
            switchTestimonialSlider();
        }, 4000); // Change testimonial every 4 seconds
    }
});
