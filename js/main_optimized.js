// Optimized Main JavaScript - Performance Focused
document.addEventListener('DOMContentLoaded', function() {
    // Simple navigation without heavy animations
    function showSection(sectionName) {
        const sceneContainer = document.getElementById('scene-container');
        const backBtn = document.querySelector('.back-btn');
        const sections = document.querySelectorAll('.content-section');
        
        sceneContainer.style.display = 'none';
        backBtn.style.display = 'block';
        
        sections.forEach(section => {
            section.classList.toggle('hidden', section.id !== `${sectionName}-section`);
        });
        
        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
    }
    
    function showHome() {
        const sceneContainer = document.getElementById('scene-container');
        const backBtn = document.querySelector('.back-btn');
        const sections = document.querySelectorAll('.content-section');
        
        sceneContainer.style.display = 'block';
        backBtn.style.display = 'none';
        
        sections.forEach(section => {
            section.classList.add('hidden');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
    }
    
    // Make functions globally available
    window.showSection = showSection;
    window.showHome = showHome;
    
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
    
    // Simple loading screen - no logo animation on mobile
    const loader = document.createElement('div');
    loader.className = 'loader';
    
    if (isMobile) {
        // Simple mobile loader
        loader.innerHTML = `<div style="text-align: center; color: #00ff88;">Loading...</div>`;
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
    } else {
        // Desktop loader with logo
        loader.innerHTML = `
            <div style="text-align: center;">
                <img src="planet.png" alt="Loading..." style="width: 120px; height: 120px; object-fit: contain; animation: pulseLogo 3s ease-in-out infinite; display: block;">
            </div>
        `;
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
            @keyframes pulseLogo {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = loaderCSS;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(loader);
    
    // Remove loader
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(loader)) {
                    document.body.removeChild(loader);
                }
            }, 500);
        }, isMobile ? 500 : 2000); // Faster on mobile
    });
    
    // Optimized scroll handling (throttled)
    let ticking = false;
    function updateNavbar() {
        const navbar = document.querySelector('.nav-bar');
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
        
        // Mobile-specific: Highlight Contact button when scrolled to footer
        if (isMobile) {
            const footer = document.querySelector('.footer');
            const contactLink = document.querySelector('.nav-link[href="#contact"]');
            
            if (footer && contactLink) {
                const footerRect = footer.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                
                // If footer is visible in viewport (at least 20% of it)
                if (footerRect.top < viewportHeight * 0.8) {
                    contactLink.classList.add('active');
                } else {
                    contactLink.classList.remove('active');
                }
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Simple intersection observer for animations (only on desktop)
    if (!isMobile) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe project cards
        setTimeout(() => {
            document.querySelectorAll('.project-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        }, 100);
    }
});
