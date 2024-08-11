import { Player } from './player.js';
import { setupControls } from './controls.js';
import { Blocks } from './blocks.js';

// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10).normalize();
scene.add(directionalLight);

// Create player and blocks
const player = new Player(scene, camera);
const blocks = new Blocks(scene);

// Set up controls
setupControls(player, blocks);

// Set camera position
camera.position.z = 5;
camera.position.y = 5;
camera.lookAt(player.mesh.position);

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    player.update();
    renderer.render(scene, camera);
}

animate();
