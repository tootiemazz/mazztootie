export class Blocks {
    constructor(scene) {
        this.scene = scene;
        this.blocks = [];
    }

    placeBlock(position) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x888888 });
        const block = new THREE.Mesh(geometry, material);

        block.position.set(
            Math.round(position.x),
            Math.round(position.y),
            Math.round(position.z)
        );

        this.blocks.push(block);
        this.scene.add(block);
    }

    deleteBlock(position) {
        const blockPosition = this.blocks.find(block => 
            block.position.x === Math.round(position.x) &&
            block.position.y === Math.round(position.y) &&
            block.position.z === Math.round(position.z)
        );

        if (blockPosition) {
            this.scene.remove(blockPosition);
            this.blocks = this.blocks.filter(block => block !== blockPosition);
        }
    }
}
