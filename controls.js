export let keys = {};

export function handleInput() {
    window.addEventListener('keydown', (event) => {
        keys[event.key.toLowerCase()] = true;
        if (event.key === 'Enter') {
            placeCube();
        } else if (event.key === 'Backspace') {
            deleteCube();
        } else {
            changeColor(event.key);
        }
    });

    window.addEventListener('keyup', (event) => {
        keys[event.key.toLowerCase()] = false;
    });

    window.addEventListener('wheel', (event) => {
        const delta = Math.sign(event.deltaY);
        zoomLevel += delta * 0.5;
        zoomLevel = Math.max(5, Math.min(15, zoomLevel));
    });
}
