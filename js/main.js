// Main JavaScript for portfolio interactions
document.addEventListener('DOMContentLoaded', function() {
    // Detect mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // Disable Three.js on mobile and ensure static background
    if (isMobile) {
        const canvas = document.getElementById('three-canvas');
        if (canvas) {
            canvas.style.display = 'none';
        }
        
        // Ensure scene container has static background
        const sceneContainer = document.querySelector('.scene-container');
        if (sceneContainer) {
            sceneContainer.style.background = 'radial-gradient(ellipse at center, #000033 0%, #000022 50%, #000011 100%)';
        }
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.nav-bar');
        if (window.scrollY > 100) {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all project cards and items
    const projectCards = document.querySelectorAll('.project-card, .project-item');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });

    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add typing effect to main title
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        mainTitle.textContent = '';
        let index = 0;
        
        function typeWriter() {
            if (index < originalText.length) {
                mainTitle.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Add loading animation with mobile detection
    const loader = document.createElement('div');
    loader.className = 'loader';
    
    if (isMobile) {
        // Simple mobile loader
        loader.innerHTML = `
            <div class="loader-content">
                <div style="color: #00ff88; font-size: 1.2rem;">Loading...</div>
            </div>
        `;
    } else {
        // Desktop loader with logo
        loader.innerHTML = `
            <div class="loader-content">
                <img src="planet.png" alt="Loading..." class="loader-logo">
            </div>
        `;
    }
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(ellipse at center, #000033 0%, #000022 50%, #000011 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const loaderCSS = `
        .loader-content {
            text-align: center;
        }
        .loader-logo {
            width: 120px;
            height: 120px;
            object-fit: contain;
            animation: pulseLogo 3s ease-in-out infinite;
            display: block;
        }
        @keyframes pulseLogo {
            0% { 
                transform: scale(1);
            }
            50% { 
                transform: scale(1.2);
            }
            100% { 
                transform: scale(1);
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = loaderCSS;
    document.head.appendChild(styleSheet);
    document.body.appendChild(loader);
    
    // Remove loader after everything is loaded
    window.addEventListener('load', function() {
        const delay = isMobile ? 500 : 2000; // Faster on mobile
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(loader)) {
                    document.body.removeChild(loader);
                }
            }, 500);
        }, delay);
    });
});

// Section navigation functions
function showSection(sectionName) {
    // Hide the main scene
    const sceneContainer = document.getElementById('scene-container');
    sceneContainer.style.display = 'none';
    
    // Show the back button
    const backBtn = document.querySelector('.back-btn');
    backBtn.style.display = 'block';
    
    // Hide all content sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.add('hidden'));
    
    // Show the requested section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.remove('hidden');
        window.scrollTo(0, 0);
    }
    
    // Update navigation
    updateNavigation(sectionName);
}

function showHome() {
    // Show the main scene
    const sceneContainer = document.getElementById('scene-container');
    sceneContainer.style.display = 'block';
    
    // Hide the back button
    const backBtn = document.querySelector('.back-btn');
    backBtn.style.display = 'none';
    
    // Hide all content sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.add('hidden'));
    
    // Update navigation
    updateNavigation('home');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function updateNavigation(activeSection) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.textContent.toLowerCase() === activeSection || 
            (activeSection === 'home' && link.getAttribute('href') === '#home')) {
            link.classList.add('active');
        }
    });
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add floating animation to project cards
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.animation = `float 6s ease-in-out infinite ${index * 0.5}s`;
    });
    
    // Add floating keyframes
    const floatCSS = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    
    const existingStyle = document.querySelector('style');
    if (existingStyle) {
        existingStyle.textContent += floatCSS;
    } else {
        const newStyle = document.createElement('style');
        newStyle.textContent = floatCSS;
        document.head.appendChild(newStyle);
    }
});
