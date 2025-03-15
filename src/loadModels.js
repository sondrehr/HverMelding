import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Since not using pure dracoLoader need to instanciate a gltfLoader with a dracoLoader "inside"
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader)

function loadModel(scene, mixers, objects, modelPath) {
    gltfLoader.load(modelPath, function (gltf) {
        const model = gltf.scene;
        const animation = gltf.animations;

        model.scale.set(0.2, 0.2, 0.2);
        model.rotation.set(0, -Math.PI * 11 / 16, 0);
        model.position.set(3, 4, -5);

        model.traverse(function (node) {
            node.castShadow = true;
        });

        scene.add(model);

        const mixer = new THREE.AnimationMixer(model);
        animation.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
        });

        let name = modelPath.split("/").at(-1).split(".").at(0)
        
        objects[name] = model
        mixers.push(mixer);
    }, undefined, function (error) {
        console.error(error);
    });
}


export function loadMoon(scene, mixers, objects) {
    loadModel(scene, mixers, objects, '/models/draco/clearNightDraco.gltf');
}

export function loadSun(scene, mixers, objects) {
    loadModel(scene, mixers, objects, '/models/draco/clearDayDraco.gltf');
}

export function loadCloud(scene, mixers, objects) {
    loadModel(scene, mixers, objects, '/models/draco/cloudyDraco.gltf');
}

export function loadRain(scene, mixers, objects) {
    loadModel(scene, mixers, objects, '/models/draco/rainDraco.gltf');
}

export function loadTornado(scene, mixers, objects) {
    loadModel(scene, mixers, objects, '/models/draco/tornadoDraco.gltf');
}

export function loadWind(scene, mixers, objects) {
    loadModel(scene, mixers, objects, '/models/draco/windDraco.gltf');
}

export function loadFog(scene, mixers, objects) {
    loadModel(scene, mixers, objects, '/models/draco/fogDraco.gltf');
}

export function loadMist(scene, mixers, objects) {
    loadModel(scene, mixers, objects, '/models/draco/mistDraco.gltf');
}

export function loadThunder(scene, mixers, objects) {
    loadModel(scene, mixers, objects, '/models/draco/lightingDraco.gltf');
}

export function loadSnow(scene, mixers, objects) {
    loadModel(scene, mixers, objects, '/models/draco/snowDraco.gltf');
}

export function loadDrizzle(scene, mixers, objects) {
    loadModel(scene, mixers, objects, '/models/draco/drizzleDraco.gltf');
}

export function load3Dfigures(scene, mixers, objects) {
    loadMoon(scene, mixers, objects);
    // loadSun(scene, mixers, objects);
    loadCloud(scene, mixers, objects);
    loadRain(scene, mixers, objects);
    // loadTornado(scene, mixers, objects);
    // loadWind(scene, mixers, objects);
    // loadFog(scene, mixers, objects);
    // loadMist(scene, mixers, objects);
    // loadThunder(scene, mixers, objects);
    // loadSnow(scene, mixers, objects);
    // loadDrizzle(scene, mixers, objects);
}
