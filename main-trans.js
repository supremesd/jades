import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';
import glowVertexShader from './shaders/glowVertex.glsl';  // New glow shader
import glowFragmentShader from './shaders/glowFragment.glsl'; // New glow shader

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('canvas') });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Function to create stars
function createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
    const starCount = 13000;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 2000;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

createStars();

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            globeTexture: { value: new THREE.TextureLoader().load('./img/globe%202.jpg') },
        },
        transparent: true,
    })
);

scene.add(sphere);

const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        uniforms: {
            glowColor: { value: new THREE.Color(0x00ffff) }, // Your desired glow color
        },
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
    })
);

// Adjust the scale of the atmosphere for wider spread
atmosphere.scale.set(1.5, 1.5, 1.5);
scene.add(atmosphere);

// Glow Layer
const glowMaterial = new THREE.ShaderMaterial({
    vertexShader: glowVertexShader,
    fragmentShader: glowFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
});

const glowSphere = new THREE.Mesh(
    new THREE.SphereGeometry(6, 50, 50), // Slightly larger than the main sphere
    glowMaterial
);

scene.add(glowSphere);

// Moon (Smaller sphere)
const moonRadius = 1; // Smaller size for the moon
const moonDistance = 10; // Distance from the main sphere

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(moonRadius, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xaaaaaa }) // Simple grey moon
);

scene.add(moon);

// Orbit Trail (Orbit circle)
const orbitGeometry = new THREE.BufferGeometry();
const orbitRadius = moonDistance;
const orbitPoints = [];
const segments = 100;

for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const x = orbitRadius * Math.cos(theta);
    const y = orbitRadius * Math.sin(theta);
    orbitPoints.push(x, y, 0);  // y is 0 for a flat circle
}

const orbitVertices = new Float32Array(orbitPoints);
orbitGeometry.setAttribute('position', new THREE.BufferAttribute(orbitVertices, 3));

const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x888888 });
const orbitLine = new THREE.LineLoop(orbitGeometry, orbitMaterial);

// Rotate orbit to lie on XZ plane
orbitLine.rotation.x = Math.PI / 2;
scene.add(orbitLine);

let radius = 15; 
camera.position.z = radius; 

const mouse = { x: 0, y: 0 };
let isDragging = false; 
let previousMouseX = 0; 
let previousMouseY = 0;

function displayPlanetInfo(event) {
    const infoDiv = document.getElementById('info');
    const planetName = document.getElementById('planet-name');
    const planetInfo = document.getElementById('planet-info');

    if (infoDiv.style.display === 'block') {
        infoDiv.style.display = 'none'; 
    } else {
        infoDiv.style.display = 'block'; 
        planetName.textContent = 'Mars';
        planetInfo.textContent = 'Extract from API';
    }
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerDown(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(sphere);

    if (intersects.length > 0) {
        displayPlanetInfo(event);
    }
}

addEventListener('wheel', (event) => {
    event.preventDefault();
    const zoomSpeed = 0.5; 
    
    radius -= event.deltaY * zoomSpeed * 0.01; 
    radius = Math.max(10, Math.min(radius, 50)); 
    camera.position.z = radius; 
}, { passive: false });

let moonOrbitSpeed = 0.01; // Speed of the moon's orbit
let moonAngle = 0; // Current angle of the moon

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    sphere.rotation.y += 0.001;

    // Moon Revolution
    moonAngle += moonOrbitSpeed;
    moon.position.x = sphere.position.x + moonDistance * Math.cos(moonAngle);
    moon.position.z = sphere.position.z + moonDistance * Math.sin(moonAngle);
    moon.position.y = sphere.position.y; // Keep the moon at the same height

    const targetX = mouse.y * 0.5; 
    const targetY = mouse.x * 0.5; 
    camera.position.x = radius * Math.sin(targetY);
    camera.position.y = radius * Math.sin(targetX);
    camera.position.z = radius * Math.cos(targetX);
    camera.lookAt(sphere.position); 
}

animate();

addEventListener('mousedown', (event) => {
    isDragging = true; 
    previousMouseX = event.clientX; 
    previousMouseY = event.clientY;
});

addEventListener('mouseup', () => {
    isDragging = false; 
});

addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1; 
    mouse.y = -(event.clientY / innerHeight) * 2 + 1; 

    if (isDragging) {
        const deltaX = event.clientX - previousMouseX; 
        const deltaY = event.clientY - previousMouseY;

        sphere.rotation.y += deltaX * 0.01; 
        sphere.rotation.x += deltaY * 0.01; 

        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
    }
});

addEventListener('mousedown', onPointerDown);
