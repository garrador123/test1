// Three.js Scene Setup for PS2-Style Particle Galaxy
let scene, camera, renderer;
let galaxyParticles, orbitingParticles, backgroundStars, centralPlanet;

// Mobile detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

function init() {
    // Skip Three.js completely on mobile
    if (isMobile) {
        console.log('Three.js disabled on mobile for performance');
        return;
    }
    
    // Create scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000022, 1500, 4000);
    
    // Create camera (fixed position, no movement)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 8000);
    camera.position.set(0, 200, 1200);
    camera.lookAt(0, 0, 0);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('three-canvas'),
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000022, 1); // Deep space navy
    
    // Create PS2-style particle systems
    createBackgroundStars();
    createGalaxyParticles();
    createOrbitingParticles();
    createCentralPlanet();
    createPS2Lighting();
    
    // Add event listeners (only resize)
    window.addEventListener('resize', onWindowResize, false);
    
    // Start animation
    animate();
}

function createBackgroundStars() {
    // Simple background stars
    const starGeometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    
    const starCount = 2000;
    
    for (let i = 0; i < starCount; i++) {
        // Random positions in a large sphere
        const x = (Math.random() - 0.5) * 4000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 4000;
        
        vertices.push(x, y, z);
        
        // PS2-style colors for background stars
        const ps2Colors = [
            [0.8, 0.9, 1.0],    // Light blue
            [0.9, 0.9, 1.0],    // White
            [0.7, 0.8, 1.0],    // Soft blue
            [0.8, 0.8, 0.9]     // Light purple
        ];
        
        const colorIndex = Math.floor(Math.random() * ps2Colors.length);
        const color = ps2Colors[colorIndex];
        const brightness = 0.4 + Math.random() * 0.4;
        
        colors.push(color[0] * brightness, color[1] * brightness, color[2] * brightness);
    }
    
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const starMaterial = new THREE.PointsMaterial({
        size: 0.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    backgroundStars = new THREE.Points(starGeometry, starMaterial);
    scene.add(backgroundStars);
}

function createGalaxyParticles() {
    // Central galaxy particles
    const galaxyGeometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    const sizes = [];
    
    const particleCount = 3000;
    
    for (let i = 0; i < particleCount; i++) {
        // Create spiral pattern
        const angle = (i / particleCount) * Math.PI * 8;
        const radius = 50 + (i / particleCount) * 600;
        
        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 100;
        const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        
        vertices.push(x, y, z);
        
        // PS2 loading screen colors
        const distanceRatio = radius / 650;
        const ps2Colors = [
            [0.4, 0.6, 1.0],    // PS2 Blue
            [0.6, 0.4, 1.0],    // PS2 Purple
            [0.3, 0.8, 0.9],    // PS2 Cyan
            [0.5, 0.7, 1.0],    // Light PS2 Blue
            [0.8, 0.5, 1.0]     // Light Purple
        ];
        
        const colorIndex = Math.floor(Math.random() * ps2Colors.length);
        const color = ps2Colors[colorIndex];
        const intensity = 0.6 + Math.random() * 0.4;
        
        colors.push(color[0] * intensity, color[1] * intensity, color[2] * intensity);
        sizes.push(1 + Math.random() * 2 + (1 - distanceRatio) * 2);
    }
    
    galaxyGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    galaxyGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    galaxyGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    
    const galaxyMaterial = new THREE.PointsMaterial({
        size: 2,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    galaxyParticles = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxyParticles);
}

function createOrbitingParticles() {
    // Wide orbiting particle system
    const orbitGeometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    const sizes = [];
    
    const orbitCount = 2500;
    
    for (let i = 0; i < orbitCount; i++) {
        // Create wide orbital rings
        const ringIndex = Math.floor(Math.random() * 5);
        const baseRadius = 300 + ringIndex * 200; // Wide spacing between rings
        const radiusVariation = 50 + Math.random() * 100;
        const radius = baseRadius + radiusVariation;
        
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * (80 + ringIndex * 20);
        
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = height;
        
        vertices.push(x, y, z);
        
        // PS2-style orbiting particle colors
        const ps2OrbitColors = [
            [0.3, 0.5, 1.0],    // Deep PS2 Blue
            [0.5, 0.3, 0.9],    // Deep PS2 Purple
            [0.2, 0.7, 1.0],    // Bright Cyan
            [0.4, 0.4, 1.0],    // Medium Blue
            [0.6, 0.2, 0.8],    // Dark Purple
            [0.2, 0.6, 0.9]     // Teal Blue
        ];
        
        const colorIndex = Math.floor(Math.random() * ps2OrbitColors.length);
        const color = ps2OrbitColors[colorIndex];
        const intensity = 0.7 + Math.random() * 0.3;
        
        colors.push(color[0] * intensity, color[1] * intensity, color[2] * intensity);
        sizes.push(1.5 + Math.random() * 2);
    }
    
    orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    orbitGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    orbitGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    
    const orbitMaterial = new THREE.PointsMaterial({
        size: 2.5,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
    });
    
    orbitingParticles = new THREE.Points(orbitGeometry, orbitMaterial);
    scene.add(orbitingParticles);
}

function createCentralPlanet() {
    // Create a small glowing planet in the center (hidden but provides light)
    const planetGroup = new THREE.Group();
    
    // Main planet - very small and positioned behind content
    const planetGeometry = new THREE.SphereGeometry(8, 16, 16);
    const planetMaterial = new THREE.MeshBasicMaterial({
        color: 0x4477ff, // PS2 blue
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
    });
    
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.set(0, 0, 0);
    planetGroup.add(planet);
    
    // Atmospheric glow layers
    for (let i = 0; i < 3; i++) {
        const glowGeometry = new THREE.SphereGeometry(12 + i * 8, 12, 12);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(
                0.6 + i * 0.05, // Blue to purple gradient
                0.8,
                0.4 - i * 0.1
            ),
            transparent: true,
            opacity: 0.15 - i * 0.04,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
        });
        
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.set(0, 0, 0);
        
        // Store animation data
        glow.userData = {
            rotationSpeed: 0.01 + i * 0.005,
            pulseSpeed: 1 + i * 0.3,
            originalOpacity: glowMaterial.opacity
        };
        
        planetGroup.add(glow);
    }
    
    // Energy particles around planet
    const energyGeometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    
    for (let i = 0; i < 200; i++) {
        const radius = 15 + Math.random() * 25;
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 20;
        
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = height;
        
        vertices.push(x, y, z);
        
        // Bright PS2 energy colors
        const energyColors = [
            [0.4, 0.7, 1.0],    // Bright blue
            [0.6, 0.4, 1.0],    // Purple
            [0.3, 0.9, 1.0]     // Cyan
        ];
        
        const colorIndex = Math.floor(Math.random() * energyColors.length);
        const color = energyColors[colorIndex];
        const intensity = 0.8 + Math.random() * 0.2;
        
        colors.push(color[0] * intensity, color[1] * intensity, color[2] * intensity);
    }
    
    energyGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    energyGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const energyMaterial = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const energyParticles = new THREE.Points(energyGeometry, energyMaterial);
    planetGroup.add(energyParticles);
    
    centralPlanet = planetGroup;
    scene.add(centralPlanet);
}

function createPS2Lighting() {
    // PS2-style ambient lighting
    const ambientLight = new THREE.AmbientLight(0x223355, 0.4);
    scene.add(ambientLight);
    
    // Central planet light - this is the main glow effect
    const planetLight = new THREE.PointLight(0x4477ff, 3, 800);
    planetLight.position.set(0, 0, 0);
    scene.add(planetLight);
    
    // Secondary planet light for depth
    const planetGlow = new THREE.PointLight(0x6644ff, 2, 600);
    planetGlow.position.set(0, 0, 0);
    scene.add(planetGlow);
    
    // Accent lights for depth
    const accentLight1 = new THREE.PointLight(0x6644ff, 0.8, 1000);
    accentLight1.position.set(500, 200, 300);
    scene.add(accentLight1);
    
    const accentLight2 = new THREE.PointLight(0x3388ff, 0.8, 1000);
    accentLight2.position.set(-400, -100, 400);
    scene.add(accentLight2);
    
    // Store lights for animation
    scene.userData.planetLight = planetLight;
    scene.userData.planetGlow = planetGlow;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    // Skip animation on mobile
    if (isMobile) return;
    
    requestAnimationFrame(animate);
    render();
}

function render() {
    // Skip rendering on mobile
    if (isMobile || !renderer) return;
    
    const time = Date.now() * 0.001;
    
    // Slow rotation for background stars
    if (backgroundStars) {
        backgroundStars.rotation.y = time * 0.01;
        backgroundStars.rotation.x = time * 0.005;
    }
    
    // Rotate galaxy particles
    if (galaxyParticles) {
        galaxyParticles.rotation.y = time * 0.08;
        galaxyParticles.material.opacity = 0.8 + Math.sin(time * 2) * 0.2;
    }
    
    // Orbiting particles animation
    if (orbitingParticles) {
        orbitingParticles.rotation.y = time * 0.15;
        orbitingParticles.rotation.x = Math.sin(time * 0.5) * 0.05;
        
        // Pulsing effect for orbiting particles
        orbitingParticles.material.opacity = 0.9 + Math.sin(time * 3) * 0.1;
        
        // Gentle up and down movement
        const positions = orbitingParticles.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
            positions[i] += Math.sin(time * 2 + i * 0.01) * 0.3;
        }
        orbitingParticles.geometry.attributes.position.needsUpdate = true;
    }
    
    // Animate central planet
    if (centralPlanet) {
        // Slow planet rotation
        centralPlanet.rotation.y = time * 0.3;
        
        // Animate glow layers
        centralPlanet.children.forEach((child, index) => {
            if (child.userData && child.userData.rotationSpeed) {
                child.rotation.x += child.userData.rotationSpeed;
                child.rotation.z += child.userData.rotationSpeed * 0.7;
                
                // Pulsing glow
                const pulse = Math.sin(time * child.userData.pulseSpeed) * 0.5 + 1;
                child.material.opacity = child.userData.originalOpacity * pulse;
            }
        });
        
        // Animate energy particles around planet
        const energyParticles = centralPlanet.children[centralPlanet.children.length - 1];
        if (energyParticles && energyParticles.geometry) {
            energyParticles.rotation.y = time * 0.5;
            energyParticles.material.opacity = 0.8 + Math.sin(time * 4) * 0.2;
        }
    }
    
    // Animate planet lights
    if (scene.userData.planetLight && scene.userData.planetGlow) {
        const lightPulse = Math.sin(time * 2) * 0.5 + 1;
        scene.userData.planetLight.intensity = 3 * lightPulse;
        scene.userData.planetGlow.intensity = 2 * lightPulse;
        
        // Subtle color shifts
        const hue = 0.6 + Math.sin(time * 0.8) * 0.1;
        scene.userData.planetLight.color.setHSL(hue, 0.8, 0.6);
        scene.userData.planetGlow.color.setHSL(hue + 0.05, 0.7, 0.5);
    }
    
    // Camera stays completely static - no movement
    renderer.render(scene, camera);
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', init);
