// Loader animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    setTimeout(function() {
        loader.classList.add('loader-hidden');
    }, 1500);
});

// Animate elements when they come into view
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.member-card, .value-box');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if(elementPosition < screenPosition) {
            element.style.animation = element.style.animation; // Trigger reflow
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});