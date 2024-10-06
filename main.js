import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';


import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('canvas') });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


// Function to create stars
function createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
    const starCount = 1000;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 200;
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
            globeTexture: { value: new THREE.TextureLoader().load('./img/globe.jpg') },
        },
    })
);

scene.add(sphere);

// atmosphere
const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
    })
);

atmosphere.scale.set(1.1, 1.1, 1.1);
scene.add(atmosphere);

let radius = 15; // Distance from the planet to the camera
camera.position.z = radius; // Initial camera position

const mouse = { x: 0, y: 0 };
let isDragging = false; 
let previousMouseX = 0; 
let previousMouseY = 0;

// Function to show slidebar for planet info
function displayPlanetInfo(event) {
  const infoDiv = document.getElementById('info');
  const planetName = document.getElementById('planet-name');
  const planetInfo = document.getElementById('planet-info');

  // Toggle the display of the info div
  if (infoDiv.style.display === 'block') {
      infoDiv.style.display = 'none'; // Hide it if it's currently displayed
  } else {
      infoDiv.style.display = 'block'; // Show it if it's currently hidden

      //API goes here
      planetName.textContent = 'mars';
      planetInfo.textContent = 'extract from API';
  }
}


// Raycasting to detect sphere clicks
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerDown(event) {
    // Calculate pointer position in normalized device coordinates
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and pointer position
    raycaster.setFromCamera(pointer, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObject(sphere);

    if (intersects.length > 0) {
        displayPlanetInfo(event);
    }
}

// Zoom in out
addEventListener('wheel', (event) => {
    event.preventDefault();
    const zoomSpeed = 0.5; 
    radius -= event.deltaY * zoomSpeed * 0.01; 
    radius = Math.max(10, Math.min(radius, 50)); 
    camera.position.z = radius; 
}, { passive: false });

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    sphere.rotation.y += 0.001;

    // Calculate the target position of the camera based on mouse movement
    const targetX = mouse.y * 0.5; 
    const targetY = mouse.x * 0.5; 
    camera.position.x = radius * Math.sin(targetY);
    camera.position.y = radius * Math.sin(targetX);
    camera.position.z = radius * Math.cos(targetX);
    camera.lookAt(sphere.position); 
}

animate();

// for mouse movement
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

// planet thichda info aaucxa
addEventListener('mousedown', onPointerDown);


// FOR RING PLANET 
// function createSaturnRings() {
//   const ringMaterial = new THREE.PointsMaterial({
//     color: 0xffa500, // Set the color of the rings (e.g., orange)
//     size: 0.02,      // Size of the particles forming the rings
//   });

//   const ringLayers = [
//     { innerRadius: 5.8, outerRadius: 6.5, density: 5000 },  // Innermost ring
//     { innerRadius: 6.9, outerRadius: 7.5, density: 1500 },  // Middle ring
//     { innerRadius: 7.9, outerRadius: 8.3, density: 1000 },  // Outer ring
//     // Add more rings here if you want more layers
//   ];

//   ringLayers.forEach((layer) => {
//     const ringGeometry = new THREE.BufferGeometry();
//     const ringCount = layer.density; // Number of particles in this ring layer
//     const positions = new Float32Array(ringCount * 3);

//     for (let i = 0; i < ringCount; i++) {
//       const angle = Math.random() * Math.PI * 2; // Random angle around the planet
//       const distance = layer.innerRadius + Math.random() * (layer.outerRadius - layer.innerRadius); // Random distance between inner and outer radius
//       positions[i * 3] = Math.cos(angle) * distance; // X coordinate
//       positions[i * 3 + 1] = (Math.random() - 0.5) * 0.05; // Small Y coordinate offset (for a slight 3D effect)
//       positions[i * 3 + 2] = Math.sin(angle) * distance; // Z coordinate
//     }

//     ringGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//     const rings = new THREE.Points(ringGeometry, ringMaterial);
//     scene.add(rings);
//   });
// }

// createSaturnRings(); n