import * as THREE from 'three';

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Add basic lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

// Create stars independently from the planet
function createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
    const starCount = 13000;
    const positions = new Float32Array(starCount * 3);  // 3 values per vertex

    for (let i = 0; i < starCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 2000;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

createStars();

// Create the Sun (Planet) with emissive color for better visibility
const sunMaterial = new THREE.MeshStandardMaterial({
    color: 0xffcc00,  // Yellow color
    emissive: 0xffcc00,  // Initial emissive color
    emissiveIntensity: 0.6
});

const sun = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), sunMaterial);
scene.add(sun);

// Create the Moon
const moonRadius = 1;
const moonDistance = 30;
const moonMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,  // Light grey
    emissive: 0x333333,  // Slight emissive for visibility
    emissiveIntensity: 0.4
});

const moon = new THREE.Mesh(new THREE.SphereGeometry(moonRadius, 32, 32), moonMaterial);
scene.add(moon);

// Create the orbit path for the Moon
const orbitRadius = moonDistance-4.69;
const segments = 100;
const orbitPoints = [];

for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const x = orbitRadius * Math.cos(theta);
    const z = orbitRadius * Math.sin(theta);
    orbitPoints.push(new THREE.Vector3(x, 0, z));  // Circular path
}

const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x888888 });
const orbitLine = new THREE.LineLoop(orbitGeometry, orbitMaterial);
scene.add(orbitLine);

// Barycenter calculation
function calculateBarycenterShift(moonPosition, sunMass, moonMass) {
    const totalMass = sunMass + moonMass;
    const barycenterX = (moonPosition.x * moonMass) / totalMass;
    const barycenterZ = (moonPosition.z * moonMass) / totalMass;

    return { x: barycenterX, z: barycenterZ };
}

// Variables for mouse controls
let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;
let rotationX = 0;  // Camera rotation around X-axis
let rotationY = 0;  // Camera rotation around Y-axis
const rotationSpeed = 0.005;  // Speed of rotation

// Mouse down event to start dragging
document.addEventListener('mousedown', (event) => {
    isDragging = true;
    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
});

// Mouse up event to stop dragging
document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Mouse move event to calculate camera rotation
document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const deltaX = event.clientX - previousMouseX;
        const deltaY = event.clientY - previousMouseY;

        rotationX += deltaX * rotationSpeed;  // Horizontal rotation
        rotationY += deltaY * rotationSpeed;  // Vertical rotation
        rotationY = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationY));  // Limit vertical rotation

        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
    }
});

// Zoom using mouse wheel
let radius = 15;
camera.position.z = radius;

document.addEventListener('wheel', (event) => {
    event.preventDefault();
    const zoomSpeed = 0.5;
    radius -= event.deltaY * zoomSpeed * 0.01;
    radius = Math.max(10, Math.min(radius, 50));
}, { passive: false });

// Variables for camera movement animation
let animationProgress = 0;
const animationDuration = 5000; // Camera moves over 5 seconds

// Moon rotation and wobble effect
let moonOrbitSpeed = 0.01;
let moonAngle = 0;
let wobbleIntensity = 2;

// Target emissive colors for the sun
const emissiveRed = new THREE.Color(0xff0000);
const emissiveBlue = new THREE.Color(0x0000ff);
const emissiveCurrent = new THREE.Color(0xffcc00);  // Start at yellow

// Interpolation speed for color fading
const fadeSpeed = 0.05;  // Adjust this for smoother or quicker color transition

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    // Move camera from Z-axis to Y-axis over time
    animationProgress += 16;  // Approximate frame time in ms (assuming 60 fps)
    const t = Math.min(animationProgress / animationDuration, 1);  // Normalize time for animation

    // Update camera position based on rotation and distance
    const x = radius * Math.sin(rotationX) * Math.cos(rotationY);
    const y = radius * Math.sin(rotationY);
    const z = radius * Math.cos(rotationX) * Math.cos(rotationY);
    camera.position.set(x, y, z);
    camera.lookAt(new THREE.Vector3(0, 0, 0));  // Keep camera focused on the sun

    // Moon's orbit around the Sun (Planet)
    moonAngle += moonOrbitSpeed;
    moon.position.x = sun.position.x + moonDistance * Math.cos(moonAngle);
    moon.position.z = sun.position.z + moonDistance * Math.sin(moonAngle);
    
    // Barycenter wobble effect
    const barycenterShift = calculateBarycenterShift(moon.position, 100, 10); // Sun mass = 100, Moon mass = 10
    sun.position.x = -wobbleIntensity * barycenterShift.x;
    sun.position.z = -wobbleIntensity * barycenterShift.z;

    // Determine the target color based on Z position
    const targetColor = sun.position.z > 0 ? emissiveRed : emissiveBlue;

    // Interpolate the current emissive color towards the target color for smooth fade
    emissiveCurrent.lerp(targetColor, fadeSpeed);
    sunMaterial.emissive.set(emissiveCurrent);

    // Planet rotates around its axis
    sun.rotation.y += 0.001;
}

animate();