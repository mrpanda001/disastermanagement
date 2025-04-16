document.addEventListener('DOMContentLoaded', function() {
    // Add click-to-call functionality for emergency numbers
    document.querySelectorAll('.emergency-contact').forEach(contact => {
        contact.addEventListener('click', function() {
            const phoneNumber = this.querySelector('p:last-child').textContent;
            if (phoneNumber) {
                window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
            }
        });
    });
    
    // Add smooth scrolling for section links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation to resource cards
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
    
    document.querySelectorAll('.resource-card').forEach(card => {
        observer.observe(card);
    });
    
    // Add search functionality for resources
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search resources...';
    searchInput.className = 'w-full md:w-64 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500';
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'mb-8 flex justify-center';
    searchContainer.appendChild(searchInput);
    
    const resourcesSection = document.querySelector('.container');
    if (resourcesSection) {
        resourcesSection.insertBefore(searchContainer, resourcesSection.firstChild);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const resourceCards = document.querySelectorAll('.resource-card');
            
            resourceCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}); 