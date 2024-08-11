export function setupCameraRotation(camera, canvas, player) {
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    canvas.addEventListener('mousedown', (event) => {
        isDragging = true;
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const deltaX = event.clientX - previousMousePosition.x;
            const deltaY = event.clientY - previousMousePosition.y;

            const rotationSpeed = 0.005;

            camera.rotation.y -= deltaX * rotationSpeed;
            camera.rotation.x -= deltaY * rotationSpeed;

            previousMousePosition = { x: event.clientX, y: event.clientY };

            // Update player's cube to face camera on X and Z axes
            player.mesh.rotation.y = -camera.rotation.y;
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Initialize previous mouse position
    previousMousePosition = { x: canvas.clientWidth / 2, y: canvas.clientHeight / 2 };
}
