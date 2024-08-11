export class Player {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.mesh = this.createPlayerMesh();
        this.keys = {};

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
