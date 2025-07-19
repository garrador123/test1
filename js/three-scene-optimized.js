// Optimized Three.js Scene - Performance First
let scene, camera, renderer;
let galaxyParticles, orbitingParticles, backgroundStars;
let animationId;

// Mobile detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

function initThreeScene() {
    // Skip Three.js completely on mobile
    if (isMobile) {
        console.log('Three.js disabled on mobile for performance');
        return;
    }
    
    init();
}

function init() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 4000);
    camera.position.set(0, 200, 1200);
    camera.lookAt(0, 0, 0);
    
    // Create renderer with optimizations
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('three-canvas'),
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000022, 1);
    
    // Full desktop version
    createBackgroundStars();
    createGalaxyParticles();
    createOrbitingParticles();
    createPS2Lighting();
    
    // Event listeners
    window.addEventListener('resize', onWindowResize, false);
    
    // Start animation
    animate();
}

function createBackgroundStars() {
    const starGeometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    
    const starCount = 1500; // Reduced from 2000
    
    for (let i = 0; i < starCount; i++) {
        vertices.push(
            (Math.random() - 0.5) * 4000,
            (Math.random() - 0.5) * 2000,
            (Math.random() - 0.5) * 4000
        );
        
        const brightness = Math.random() * 0.5 + 0.5;
        colors.push(0, brightness, brightness * 0.53);
    }
    
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const starMaterial = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    backgroundStars = new THREE.Points(starGeometry, starMaterial);
    scene.add(backgroundStars);
}

function createGalaxyParticles() {
    const particleGeometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    
    const particleCount = 1000; // Reduced from 1500
    
    for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 800 + 200;
        const angle = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 100;
        
        vertices.push(
            Math.cos(angle) * radius,
            y,
            Math.sin(angle) * radius
        );
        
        colors.push(0, 1, 0.53);
    }
    
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.7
    });
    
    galaxyParticles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(galaxyParticles);
}

function createOrbitingParticles() {
    const orbitGeometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    
    const orbitCount = 1500; // Reduced from 2500
    const rings = 3; // Reduced from 5
    
    for (let ring = 0; ring < rings; ring++) {
        const ringRadius = 400 + ring * 200;
        const particlesInRing = orbitCount / rings;
        
        for (let i = 0; i < particlesInRing; i++) {
            const angle = (i / particlesInRing) * Math.PI * 2;
            const x = Math.cos(angle) * ringRadius;
            const z = Math.sin(angle) * ringRadius;
            const y = (Math.random() - 0.5) * 50;
            
            vertices.push(x, y, z);
            
            if (ring % 2 === 0) {
                colors.push(0, 1, 0.53); // Green
            } else {
                colors.push(0.42, 0.27, 0.76); // Purple
            }
        }
    }
    
    orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    orbitGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const orbitMaterial = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.6
    });
    
    orbitingParticles = new THREE.Points(orbitGeometry, orbitMaterial);
    scene.add(orbitingParticles);
}

function createPS2Lighting() {
    // Simplified lighting
    const ambientLight = new THREE.AmbientLight(0x001122, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x00ff88, 0.6);
    directionalLight.position.set(0, 200, 200);
    scene.add(directionalLight);
}

function animate() {
    animationId = requestAnimationFrame(animate);
    
    const time = Date.now() * 0.0001;
    
    if (!isMobile) {
        // Rotate particles (desktop only)
        if (galaxyParticles) {
            galaxyParticles.rotation.y = time * 0.5;
        }
        
        if (orbitingParticles) {
            orbitingParticles.rotation.y = time * 0.3;
        }
        
        if (backgroundStars) {
            backgroundStars.rotation.y = time * 0.1;
        }
    }
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Cleanup function
function dispose() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    if (renderer) {
        renderer.dispose();
    }
    
    // Clear scene
    while(scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Cleanup on page unload
window.addEventListener('beforeunload', dispose);
