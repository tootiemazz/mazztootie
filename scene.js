export function initializeScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const backgroundTexture = loader.load('path/to/your/background-image.jpg'); // Replace with your image path
    scene.background = backgroundTexture;

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5).normalize();
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const cubes = [];
    const iceCubes = [];

    return { scene, camera, renderer, cubes, iceCubes, ambientLight, directionalLight };
}

export function updateLighting(ambientLight, directionalLight) {
    const time = Date.now() * 0.0001;
    if (dayTime) {
        directionalLight.color.setHSL((Math.sin(time) + 1) / 2, 1, 0.5);
        ambientLight.intensity = 0.5;
        if (Math.sin(time) < 0) {
            dayTime = false;
        }
    } else {
        directionalLight.color.setHSL((Math.sin(time) + 1) / 2, 1, 0.1);
        ambientLight.intensity = 0.2;
        if (Math.sin(time) > 0) {
            dayTime = true;
        }
    }
}
export function initializeScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const backgroundTexture = loader.load('path/to/your/background-image.jpg'); // Replace with your image path
    scene.background = backgroundTexture;

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5).normalize();
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const cubes = [];
    const iceCubes = [];

    return { scene, camera, renderer, cubes, iceCubes, ambientLight, directionalLight };
}

export function updateLighting(ambientLight, directionalLight) {
    const time = Date.now() * 0.0001;
    if (dayTime) {
        directionalLight.color.setHSL((Math.sin(time) + 1) / 2, 1, 0.5);
        ambientLight.intensity = 0.5;
        if (Math.sin(time) < 0) {
            dayTime = false;
        }
    } else {
        directionalLight.color.setHSL((Math.sin(time) + 1) / 2, 1, 0.1);
        ambientLight.intensity = 0.2;
        if (Math.sin(time) > 0) {
            dayTime = true;
        }
    }
}
