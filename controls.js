export function setupControls(player, blocks) {
    const keys = {};

    window.addEventListener('keydown', (event) => {
        keys[event.key] = true;

        if (event.key === 'm') {
            blocks.placeBlock(player.mesh.position);
        }

        if (event.key === 'n') {
            blocks.deleteBlock(player.mesh.position);
        }
    });

    window.addEventListener('keyup', (event) => {
        keys[event.key] = false;
    });

    player.keys = keys;
}
