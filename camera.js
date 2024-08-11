let zoomLevel = 10;

export function initializeCamera(camera, playerCube) {
    camera.position.set(0, zoomLevel, 5);
    camera.lookAt(playerCube.position);
}

export function updateCamera(camera, playerCube) {
    const offset = new THREE.Vector3(0, zoomLevel, 5);
    offset.applyQuaternion(camera.quaternion);
    camera.position.copy(playerCube.position.clone().add(offset));
    camera.lookAt(playerCube.position);
}

export function rotatePlayerCube(playerCube, camera) {
    const rotationSpeed = 0.05;
    const quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotationSpeed);
    camera.quaternion.multiply(quaternion);
}

export function zoomCamera(camera) {
    const scrollSpeed = 0.5;
    zoomLevel = Math.max(5, Math.min(15, zoomLevel - scrollSpeed * (keys.q - keys.e)));
    camera.position.y = zoomLevel;
}
