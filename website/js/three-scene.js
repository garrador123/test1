// Three.js Scene Setup
let scene, camera, renderer, planet, planetRings, stars, orbitingParticles;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let targetRotationX = 0, targetRotationY = 0;

function init() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 600;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('three-canvas'),
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    
    // Create background stars
    createStars();
    
    // Create orbiting particles
    createOrbitingParticles();
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00ff88, 1, 1000);
    pointLight.position.set(200, 200, 500);
    scene.add(pointLight);
    
    // Add event listeners
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
    
    // Start animation
    animate();
}

function createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    const starColors = [];
    
    const starCount = 2000;
    
    for (let i = 0; i < starCount; i++) {
        // Random positions in a large sphere
        const x = (Math.random() - 0.5) * 4000;
        const y = (Math.random() - 0.5) * 4000;
        const z = (Math.random() - 0.5) * 4000;
        
        starVertices.push(x, y, z);
        
        // White stars with some color variation
        const color = new THREE.Color();
        const brightness = 0.5 + Math.random() * 0.5;
        if (Math.random() > 0.8) {
            color.setHSL(0.15 + Math.random() * 0.1, 0.3, brightness); // Slight yellow tint
        } else {
            color.setRGB(brightness, brightness, brightness); // White
        }
        
        starColors.push(color.r, color.g, color.b);
    }
    
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
    
    const starMaterial = new THREE.PointsMaterial({
        size: 1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

function createSaturnPlanet() {
    // Create planet group to hold planet and rings together
    const planetGroup = new THREE.Group();
    
    // Create the main planet (Saturn-like)
    const planetGeometry = new THREE.SphereGeometry(100, 64, 64);
    
    // Create planet material with beautiful Saturn colors
    const planetMaterial = new THREE.MeshPhongMaterial({
        color: 0xfab570, // Saturn's golden color
        shininess: 30,
        transparent: true,
        opacity: 0.95
    });
    
    planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planetGroup.add(planet);
    
    // Create Saturn's rings
    planetRings = new THREE.Group();
    
    // Ring configurations for Saturn-like appearance
    const ringConfigs = [
        { innerRadius: 120, outerRadius: 150, color: 0xcccccc, opacity: 0.6 },
        { innerRadius: 155, outerRadius: 180, color: 0xaaaaaa, opacity: 0.5 },
        { innerRadius: 185, outerRadius: 200, color: 0x888888, opacity: 0.4 },
        { innerRadius: 205, outerRadius: 230, color: 0x666666, opacity: 0.3 },
        { innerRadius: 235, outerRadius: 250, color: 0x555555, opacity: 0.2 }
    ];
    
    ringConfigs.forEach((config, index) => {
        const ringGeometry = new THREE.RingGeometry(config.innerRadius, config.outerRadius, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: config.color,
            transparent: true,
            opacity: config.opacity,
            side: THREE.DoubleSide
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2; // Rotate to be horizontal
        planetRings.add(ring);
    });
    
    planetGroup.add(planetRings);
    
    // Add atmosphere glow
    const glowGeometry = new THREE.SphereGeometry(110, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xfab570,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide
    });
    
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    planetGroup.add(glow);
    
    // Add the planet group to scene
    scene.add(planetGroup);
    
    // Store reference to the group for rotation
    scene.userData.planetGroup = planetGroup;
}

function createOrbitingParticles() {
    const particleGeometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    
    const particleCount = 1000;
    
    for (let i = 0; i < particleCount; i++) {
        // Create particles in space around the planet
        const angle = Math.random() * Math.PI * 2;
        const radius = 300 + Math.random() * 200;
        const height = (Math.random() - 0.5) * 400;
        
        const x = Math.cos(angle) * radius;
        const y = height;
        const z = Math.sin(angle) * radius;
        
        vertices.push(x, y, z);
        
        // Beautiful space particles
        const color = new THREE.Color();
        const hue = Math.random() > 0.5 ? 0.15 + Math.random() * 0.1 : 0.55 + Math.random() * 0.1;
        color.setHSL(hue, 0.8, 0.5 + Math.random() * 0.5);
        colors.push(color.r, color.g, color.b);
    }
    
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    orbitingParticles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(orbitingParticles);
}

function onDocumentMouseMove(event) {
    // Much more responsive mouse interaction
    mouseX = (event.clientX - windowHalfX) * 2;
    mouseY = (event.clientY - windowHalfY) * 2;
    
    // Calculate target rotation based on mouse position
    targetRotationY = (mouseX / windowHalfX) * Math.PI * 0.5;
    targetRotationX = (mouseY / windowHalfY) * Math.PI * 0.3;
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    const time = Date.now() * 0.0005;
    
    // Animate orbiting particles
    if (orbitingParticles) {
        orbitingParticles.rotation.y = time * 0.2;
        orbitingParticles.rotation.x = Math.sin(time * 0.5) * 0.1;
    }
    
    // Slowly rotate stars for depth
    if (stars) {
        stars.rotation.x = time * 0.02;
        stars.rotation.y = time * 0.01;
    }
    
    // Move camera with mouse (only background elements move)
    camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', init);
