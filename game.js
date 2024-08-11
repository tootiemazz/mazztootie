import { initializeScene, updateLighting } from './scene.js';
import { initializePlayer, movePlayer, placeCube, deleteCube, changeColor } from './player.js';
import { initializeCamera, updateCamera, rotatePlayerCube, zoomCamera } from './camera.js';
import { handleInput } from './controls.js';

const { scene, camera, renderer, playerCube, cubes, iceCubes, ambientLight, directionalLight } = initializeScene();

initializeCamera(camera, playerCube);
initializePlayer(scene, playerCube);

function animate() {
    requestAnimationFrame(animate);

    updateLighting(ambientLight, directionalLight);
    zoomCamera(camera);
    movePlayer(playerCube, cubes, iceCubes);
    rotatePlayerCube(playerCube, camera);
    updateCamera(camera, playerCube);

    renderer.render(scene, camera);
}

animate();
handleInput();
