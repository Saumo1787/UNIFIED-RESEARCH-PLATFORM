document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav');
    
    mobileMenuButton.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target + (stat.getAttribute('data-count').endsWith('+') ? '+' : '');
                    clearInterval(timer);
                }
            }, 16);
        });
    }
    
    // Intersection Observer for stats animation
    const statsSection = document.querySelector('.stats-section');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);

    // Startup Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const startupGrid = document.getElementById('startupGrid');
    
    // Sample startup data
    const startups = [
        { name: "TechGenius", industry: "tech", desc: "AI-powered business solutions", logo: "https://via.placeholder.com/150?text=TechGenius" },
        { name: "HealthPlus", industry: "health", desc: "Telemedicine platform", logo: "https://via.placeholder.com/150?text=HealthPlus" },
        { name: "PaySmart", industry: "fintech", desc: "Mobile payment solutions", logo: "https://via.placeholder.com/150?text=PaySmart" },
        { name: "EduFuture", industry: "education", desc: "Online learning platform", logo: "https://via.placeholder.com/150?text=EduFuture" },
        { name: "GreenLife", industry: "sustainability", desc: "Sustainable living products", logo: "https://via.placeholder.com/150?text=GreenLife" },
        { name: "DataMinds", industry: "tech", desc: "Big data analytics", logo: "https://via.placeholder.com/150?text=DataMinds" }
    ];
    
    // Render startups
    function renderStartups(filter = 'all') {
        startupGrid.innerHTML = '';
        
        const filteredStartups = filter === 'all' ? 
            startups : startups.filter(startup => startup.industry === filter);
        
        filteredStartups.forEach(startup => {
            const startupCard = document.createElement('div');
            startupCard.className = 'startup-card';
            startupCard.innerHTML = `
                <div class="startup-logo">
                    <img src="${startup.logo}" alt="${startup.name}" loading="lazy">
                </div>
                <div class="startup-info">
                    <h3>${startup.name}</h3>
                    <p class="industry">${startup.industry.charAt(0).toUpperCase() + startup.industry.slice(1)}</p>
                    <p class="description">${startup.desc}</p>
                    <button class="view-btn">View Details</button>
                </div>
            `;
            startupGrid.appendChild(startupCard);
        });
    }
    
    // Initialize with all startups
    renderStartups();
    
    // Filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderStartups(this.getAttribute('data-filter'));
        });
    });

    // Registration Form Submission
    const registrationForm = document.getElementById('startupForm');
    
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const inputs = this.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'var(--danger-color)';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // In a real app, you would send this data to a server
            alert('Thank you for registering your startup! We will contact you soon.');
            this.reset();
            
            // Scroll to thank you message or show modal in a real implementation
        } else {
            alert('Please fill in all required fields.');
        }
    });

    // Input validation styling
    registrationForm.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '';
            }
        });
    });

    // Register Button scroll to form
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            document.querySelector('#registration').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Testimonial slider functionality
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    // Add more testimonials in a real implementation
    const testimonials = [
        {
            quote: "The Start-up Ecosystem provided us with invaluable connections and resources that helped us scale from 0 to 1 million users in just 18 months.",
            author: "Sarah Johnson",
            role: "CEO, TechGenius",
            image: "https://randomuser.me/api/portraits/women/45.jpg"
        },
        {
            quote: "Thanks to the mentorship program, we were able to avoid common pitfalls and secure our Series A funding within the first year.",
            author: "Michael Chen",
            role: "Founder, HealthPlus",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            quote: "The networking events organized by Start-up Ecosystem connected us with our lead investor. Couldn't be more grateful!",
            author: "Priya Patel",
            role: "CTO, PaySmart",
            image: "https://randomuser.me/api/portraits/women/68.jpg"
        }
    ];
    
    // Render testimonials
    testimonials.slice(1).forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.innerHTML = `
            <div class="testimonial-content">
                <p>"${testimonial.quote}"</p>
            </div>
            <div class="testimonial-author">
                <img src="${testimonial.image}" alt="${testimonial.author}">
                <div>
                    <h4>${testimonial.author}</h4>
                    <p>${testimonial.role}</p>
                </div>
            </div>
        `;
        testimonialSlider.appendChild(testimonialCard);
    });

    // In a real implementation, you might add auto-scrolling for the testimonial slider
});