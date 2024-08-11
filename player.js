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
            this.mesh.position.z -= speed;
        }
        if (this.keys['s']) {
            this.mesh.position.z += speed;
        }
        if (this.keys['a']) {
            this.mesh.position.x -= speed;
        }
        if (this.keys['d']) {
            this.mesh.position.x += speed;
        }

        // Ensure the camera follows the player
        this.camera.position.x = this.mesh.position.x;
        this.camera.position.z = this.mesh.position.z + 5;
        this.camera.position.y = this.mesh.position.y + 5;
        this.camera.lookAt(this.mesh.position);
    }
}
