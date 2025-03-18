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
        model.position.set(3, 14, -5);

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

        objects[name] = { model: model, show: true , desiredPositionY: 14 };
        mixers[name] = { mixer: mixer, active: true };
    }, undefined, function (error) {
        console.error(error);
    });
}

export function load3Dfigures(scene, mixers, objects) {
    loadModel(scene, mixers, objects, '/models/draco/moonDraco.gltf');
    loadModel(scene, mixers, objects, '/models/draco/sunDraco.gltf');
    //loadModel(scene, mixers, objects, '/models/draco/cloudyDraco.gltf');
    //loadModel(scene, mixers, objects, '/models/draco/rainDraco.gltf');
    // loadModel(scene, mixers, objects, '/models/draco/tornadoDraco.gltf');
    // loadModel(scene, mixers, objects, '/models/draco/windDraco.gltf');
    // loadModel(scene, mixers, objects, '/models/draco/fogDraco.gltf');
    // loadModel(scene, mixers, objects, '/models/draco/mistDraco.gltf');
    // loadModel(scene, mixers, objects, '/models/draco/lightningDraco.gltf');
    // loadModel(scene, mixers, objects, '/models/draco/snowDraco.gltf');
    // loadModel(scene, mixers, objects, '/models/draco/drizzleDraco.gltf');
}
