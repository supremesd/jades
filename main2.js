import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('canvas') });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Bloom Effect (Post-processing for glow)
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// Unreal Bloom Pass for glowing effect
const bloomPass = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0;
bloomPass.strength = 2;
bloomPass.radius = 0.5;
composer.addPass(bloomPass);

// Create a group for all galaxy elements
const galaxyGroup = new THREE.Group();
scene.add(galaxyGroup);

// Function to create a natural, spread-out 3D galaxy
function createNaturalGalaxy() {
    const geometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);  // Colors for fade effect

    const radiusX = 170;  // Max radius in X and Z directions
    const radiusY = 50;   // Flattening effect on the Y-axis

    for (let i = 0; i < starCount; i++) {
        const angle1 = Math.random() * Math.PI * 2;
        const angle2 = Math.acos(2 * Math.random() - 1);

        const r = Math.random() ** 4 * radiusX;

        const x = r * Math.sin(angle2) * Math.cos(angle1);
        const z = r * Math.sin(angle2) * Math.sin(angle1);
        const y = r * Math.cos(angle2) * (radiusY / radiusX);

        positions[i * 3] = x + (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = y + (Math.random() - 0.5) * 5;
        positions[i * 3 + 2] = z + (Math.random() - 0.5) * 10;

        const distanceFromCore = Math.sqrt(x * x + y * y + z * z);
        const fadeFactor = 1 - (distanceFromCore / radiusX);

        colors[i * 3] = fadeFactor;
        colors[i * 3 + 1] = 2 - fadeFactor;
        colors[i * 3 + 2] = 2 - fadeFactor * 0.8;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        opacity: 0.8,
        transparent: true
    });

    const stars = new THREE.Points(geometry, material);
    galaxyGroup.add(stars);
}

createNaturalGalaxy();

// Create a spiral galaxy disc (adding on top of the natural spread-out galaxy)
function createSpiralDisc() {
    const geometry = new THREE.BufferGeometry();
    const particleCount = 15000;
    const positions = new Float32Array(particleCount * 3);

    const spiralArmCount = 4;
    const spiralTurns = 3;
    const maxRadius = 100;

    for (let i = 0; i < particleCount; i++) {
        const arm = i % spiralArmCount;
        const angle = (i / particleCount) * Math.PI * 2 * spiralTurns + (arm * (Math.PI * 2 / spiralArmCount));

        const radius = Math.random() * maxRadius * (i / particleCount);
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 10;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        size: 0.3,
        color: 0xADD8E6,
        opacity: 0.7,
        transparent: true
    });

    const spiralDisc = new THREE.Points(geometry, material);
    galaxyGroup.add(spiralDisc);
}

createSpiralDisc();

// Galactic Core
const coreGeometry = new THREE.SphereGeometry(5, 32, 32);
const coreMaterial = new THREE.MeshStandardMaterial({
    color: 0xadd8e6,
    emissive: 0xffff00,
    emissiveIntensity: 3,
    transparent: false,
    opacity: 1
});
const core = new THREE.Mesh(coreGeometry, coreMaterial);
galaxyGroup.add(core);

// Halo around the core
const haloGeometry = new THREE.SphereGeometry(7, 32, 32);
const haloMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    transparent: true,
    opacity: 0.1
});
const halo = new THREE.Mesh(haloGeometry, haloMaterial);
galaxyGroup.add(halo);

// Outer halo layer
const outerHaloGeometry = new THREE.SphereGeometry(9, 32, 32);
const outerHaloMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.05
});
const outerHalo = new THREE.Mesh(outerHaloGeometry, outerHaloMaterial);
galaxyGroup.add(outerHalo);

// Point Light
const pointLight = new THREE.PointLight(0xffffff, 2, 100);
pointLight.position.set(0, 0, 0);
galaxyGroup.add(pointLight);

// Saturn Rings (Added around the galaxy's core)
function createSaturnRings() {
    const ringMaterial = new THREE.PointsMaterial({
        color: 0xffa500,
        size: 0.02
    });

    const ringLayers = [
        { innerRadius: 5.8, outerRadius: 6.5, density: 5000 },
        { innerRadius: 6.9, outerRadius: 7.5, density: 1500 },
        { innerRadius: 7.9, outerRadius: 8.3, density: 1000 }
    ];

    ringLayers.forEach((layer) => {
        const ringGeometry = new THREE.BufferGeometry();
        const ringCount = layer.density;
        const positions = new Float32Array(ringCount * 3);

        for (let i = 0; i < ringCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = layer.innerRadius + Math.random() * (layer.outerRadius - layer.innerRadius);
            positions[i * 3] = Math.cos(angle) * distance;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
            positions[i * 3 + 2] = Math.sin(angle) * distance;
        }

        ringGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const rings = new THREE.Points(ringGeometry, ringMaterial);
        galaxyGroup.add(rings);
    });
}

createSaturnRings();  // Call the function to create the Saturn rings

// Camera and mouse interaction
let radius = 10;  // Start with the camera very close to the galaxy
camera.position.z = radius;

const mouse = { x: 0, y: 0 };
let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;

// Zoom Out variables
let zoomOut = true;
let zoomOutEndZ = 150;  // The final Z position for the zoom-out effect
let zoomOutSpeed = 1.5; // Control the speed of the zoom-out effect

// Trigger the zoom-out effect
function startZoomOut() {
    zoomOut = true;
}

document.querySelector('canvas').addEventListener('click', startZoomOut); // Trigger zoom out on canvas click

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    galaxyGroup.rotation.y += 0.002;
    galaxyGroup.rotation.x += 0.0005;

    // If zoomOut is true, move the camera further away
    if (zoomOut && camera.position.z < zoomOutEndZ) {
        camera.position.z += zoomOutSpeed; // Gradually move the camera back
    }

    composer.render();

    const targetX = mouse.y * 0.5;
    const targetY = mouse.x * 0.5;

    camera.position.x = radius * Math.sin(targetY);
    camera.position.y = radius * Math.sin(targetX);
    camera.lookAt(0, 0, 0);
}


animate();

// Mouse controls for rotation
addEventListener('mousedown', (event) => {
    isDragging = true;
    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
});

addEventListener('mouseup', () => {
    isDragging = false;
});

addEventListener('mousemove', (event) => {
    if (isDragging) {
        const deltaX = event.clientX - previousMouseX;
        const deltaY = event.clientY - previousMouseY;
        galaxyGroup.rotation.y += deltaX * 0.005;
        galaxyGroup.rotation.x += deltaY * 0.005;
        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
    }
});
