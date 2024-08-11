let velocity = new THREE.Vector3();
let onGround = true;

export function initializePlayer(scene, playerCube) {
    const playerGeometry = new THREE.BoxGeometry(1, 1.5, 1);
    const playerMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    playerCube = new THREE.Mesh(playerGeometry, playerMaterial);
    playerCube.castShadow = true;
    playerCube.receiveShadow = true;
    scene.add(playerCube);

    const armGeometry = new THREE.BoxGeometry(0.2, 0.6, 0.2);
    const legGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.4);
    const armMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.7, 0.5, 0);
    playerCube.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.7, 0.5, 0);
    playerCube.add(rightArm);

    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.4, -1.5, 0);
    playerCube.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.4, -1.5, 0);
    playerCube.add(rightLeg);
}

export function movePlayer(playerCube, cubes, iceCubes) {
    let newPosition = playerCube.position.clone();
    let forward = new THREE.Vector3(0, 0, -0.1).applyQuaternion(camera.quaternion);
    let right = new THREE.Vector3(-0.1, 0, 0).applyQuaternion(camera.quaternion);

    if (keys.w) newPosition.add(forward);
    if (keys.a) newPosition.add(right);
    if (keys.s) newPosition.sub(forward);
    if (keys.d) newPosition.sub(right);

    if (!checkCollisions(newPosition, cubes)) {
        playerCube.position.copy(newPosition);
    } else {
        for (let i = 0; i < cubes.length; i++) {
            if (Math.abs(playerCube.position.x - cubes[i].position.x) < 0.5 &&
                Math.abs(playerCube.position.z - cubes[i].position.z) < 0.5) {
                let cubeTop = cubes[i].position.y + 0.5;
                if (playerCube.position.y < cubeTop) {
                    playerCube.position.y = cubeTop;
                }
            }
        }
    }

    if (keys.space && onGround) {
        velocity.y = 0.2;
        onGround = false;
    }

    if (!onGround) {
        velocity.y -= 0.01;
        newPosition = playerCube.position.clone();
        newPosition.y += velocity.y;

        if (!checkCollisions(newPosition, cubes)) {
            playerCube.position.y += velocity.y;
        } else {
            velocity.y = 0;
            onGround = true;
            playerCube.position.y = Math.round(playerCube.position.y);
        }
    }

    if (playerCube.position.y <= 0.5) {
        playerCube.position.y = 0.5;
        onGround = true;
        velocity.y = 0;
    }
}

export function placeCube() {
    const cubeGeometry = new THREE.BoxGeometry();
    const color = keys[8] ? new THREE.Color(0x00ffff) : new THREE.Color(0x888888);
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: color, transparent: keys[8], opacity: keys[8] ? 0.5 : 1 });
    const newCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    newCube.castShadow = true;
    newCube.receiveShadow = true;

    newCube.position.set(
        Math.round(playerCube.position.x),
        Math.round(playerCube.position.y) - 1,
        Math.round(playerCube.position.z)
    );

    scene.add(newCube);
    if (keys[8]) {
        iceCubes.push(newCube);
    } else {
        cubes.push(newCube);
    }
}

export function deleteCube() {
    for (let i = 0; i < cubes.length; i++) {
        if (playerCube.position.distanceTo(cubes[i].position) < 1.1) {
            scene.remove(cubes[i]);
            cubes.splice(i, 1);
            break;
        }
    }
    for (let i = 0; i < iceCubes.length; i++) {
        if (playerCube.position.distanceTo(iceCubes[i].position) < 1.1) {
            scene.remove(iceCubes[i]);
            iceCubes.splice(i, 1);
            break;
        }
    }
}

export function changeColor(key) {
    const colorMap = {
        '1': 0xff0000, // Red
        '2': 0xffa500, // Orange
        '3': 0xffff00, // Yellow
        '4': 0x00ff00, // Green
        '5': 0x0000ff, // Blue
        '6': 0x4b0082, // Indigo
        '7': 0xee82ee, // Violet
    };
    playerCube.material.color.set(colorMap[key]);
}

function checkCollisions(position, cubes) {
    for (let i = 0; i < cubes.length; i++) {
        if (Math.abs(position.x - cubes[i].position.x) < 0.5 &&
            Math.abs(position.z - cubes[i].position.z) < 0.5 &&
            Math.abs(position.y - cubes[i].position.y) < 1) {
            return true;
        }
    }
    return false;
}
