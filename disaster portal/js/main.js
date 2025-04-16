// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'md:hidden text-white p-2';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('nav .container');
    const navLinks = document.querySelector('nav .hidden');
    
    if (nav && navLinks) {
        nav.appendChild(mobileMenuButton);
        
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('hidden');
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to features on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
}); 