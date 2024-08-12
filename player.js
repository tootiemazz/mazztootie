export class Player {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.mesh = this.createPlayerMesh();
        this.keys = {};
        
        // Jumping properties
        this.isJumping = false;
        this.verticalVelocity = 0;
        this.gravity = -0.02; // Simulate gravity
        this.jumpStrength = 0.5; // Initial jump velocity

        scene.add(this.mesh);
    }

    createPlayerMesh() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const mesh = new THREE.Mesh(geometry, material);
        return mesh;
    }

    update() {
        const speed = 0.1;

        // Handle horizontal movement
        if (this.keys['w']) {
            this.mesh.position.z -= speed * Math.cos(this.camera.rotation.y);
            this.mesh.position.x -= speed * Math.sin(this.camera.rotation.y);
        }
        if (this.keys['s']) {
            this.mesh.position.z += speed * Math.cos(this.camera.rotation.y);
            this.mesh.position.x += speed * Math.sin(this.camera.rotation.y);
        }
        if (this.keys['a']) {
            this.mesh.position.x -= speed * Math.cos(this.camera.rotation.y);
            this.mesh.position.z += speed * Math.sin(this.camera.rotation.y);
        }
        if (this.keys['d']) {
            this.mesh.position.x += speed * Math.cos(this.camera.rotation.y);
            this.mesh.position.z -= speed * Math.sin(this.camera.rotation.y);
        }

        // Handle jumping
        if (this.keys[' '] && !this.isJumping) {
            this.isJumping = true;
            this.verticalVelocity = this.jumpStrength;
        }

        // Apply gravity
        if (this.isJumping) {
            this.mesh.position.y += this.verticalVelocity;
            this.verticalVelocity += this.gravity;

            // Check if the player has landed (y position should be at ground level, assumed to be 0)
            if (this.mesh.position.y <= 0) {
                this.mesh.position.y = 0;
                this.isJumping = false;
                this.verticalVelocity = 0;
            }
        }

        // Update player's cube to face camera on X and Z axes
        this.mesh.rotation.y = -this.camera.rotation.y;
        this.mesh.rotation.x = -this.camera.rotation.x;
        
        // Ensure the camera follows the player
        this.camera.position.x = this.mesh.position.x;
        this.camera.position.z = this.mesh.position.z + 5;
        this.camera.position.y = this.mesh.position.y + 5;
        this.camera.lookAt(this.mesh.position);
    }
}
