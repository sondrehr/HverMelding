import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const gltfLoader = new GLTFLoader();

export function loadMoon(scene, mixers) {
    gltfLoader.load('/models/clearNight.gltf', function (gltf) {
        const moon = gltf.scene;
        const animation = gltf.animations;

        moon.scale.set(0.2, 0.2, 0.2);
        moon.rotation.set(0, -Math.PI * 11 / 16, 0);
        moon.position.set(3, 4, -5);

        moon.traverse(function (node) {
            node.castShadow = true;
        });

        scene.add(moon);

        const mixerMoon = new THREE.AnimationMixer(moon);
        const action = mixerMoon.clipAction(animation[0]);
        action.play();
        mixers.push(mixerMoon);
    }, undefined, function (error) {
        console.error(error);
    });
}

export function loadSun(scene, mixers) {
    gltfLoader.load('/models/clearDay.gltf', function (gltf) {
        const sun = gltf.scene;
        const animation = gltf.animations;

        sun.scale.set(0.2, 0.2, 0.2);
        sun.rotation.set(0, -Math.PI * 11 / 16, 0);
        sun.position.set(3, 4, -5);

        sun.traverse(function (node) {
            node.castShadow = true;
        });

        scene.add(sun);

        sun.children[0].material.color.b = 1;
        sun.children[0].material.color.r = 1;
        sun.children[0].material.color.g = 1;

        const mixerSun = new THREE.AnimationMixer(sun);
        const action = mixerSun.clipAction(animation[0]);
        action.play();
        mixers.push(mixerSun);
    }, undefined, function (error) {
        console.error(error);
    });
}

export function loadCloud(scene, mixers) {
    gltfLoader.load('/models/cloudy.gltf', function (gltf) {
        const cloud = gltf.scene;
        const animation = gltf.animations;

        cloud.scale.set(0.2, 0.2, 0.2);
        cloud.rotation.set(0, -Math.PI * 11 / 16, 0);
        cloud.position.set(3, 4, -5);

        cloud.traverse(function (node) {
            node.castShadow = true;
        });

        scene.add(cloud);

        cloud.children[0].material.emissiveIntensity = 0.2;

        const mixerCloud = new THREE.AnimationMixer(cloud);
        const action0 = mixerCloud.clipAction(animation[0]);
        const action1 = mixerCloud.clipAction(animation[1]);
        const action2 = mixerCloud.clipAction(animation[2]);
        action0.play();
        action1.play();
        action2.play();
        mixers.push(mixerCloud);
    }, undefined, function (error) {
        console.error(error);
    });
}

export function loadRain(scene, mixers) {
    gltfLoader.load('/models/rain.gltf', function (gltf) {
        const rain = gltf.scene;
        const animation = gltf.animations;

        rain.scale.set(0.2, 0.2, 0.2);
        rain.rotation.set(0, -Math.PI * 11 / 16, 0);
        rain.position.set(3, 4, -5);

        rain.traverse(function (node) {
            node.castShadow = true;
        });

        scene.add(rain);

        const mixerRain = new THREE.AnimationMixer(rain);
        const action = mixerRain.clipAction(animation[0]);
        const action1 = mixerRain.clipAction(animation[1]);
        const action2 = mixerRain.clipAction(animation[2]);
        action.play();
        action1.play();
        action2.play();
        mixers.push(mixerRain);
    }, undefined, function (error) {
        console.error(error);
    });
}

export function loadTornado(scene, mixers) {
    gltfLoader.load('/models/tornado.gltf', function (gltf) {
        const tornado = gltf.scene;
        const animation = gltf.animations;

        tornado.scale.set(0.2, 0.2, 0.2);
        tornado.rotation.set(0, -Math.PI * 11 / 16, 0);
        tornado.position.set(3, 4, -5);

        tornado.traverse(function (node) {
            node.castShadow = true;
        });

        scene.add(tornado);

        const mixerTornado = new THREE.AnimationMixer(tornado);
        const action0 = mixerTornado.clipAction(animation[0]);
        const action1 = mixerTornado.clipAction(animation[1]);
        const action2 = mixerTornado.clipAction(animation[2]);
        const action3 = mixerTornado.clipAction(animation[3]);
        const action4 = mixerTornado.clipAction(animation[4]);
        action0.play();
        action1.play();
        action2.play();
        action3.play();
        action4.play();
        mixers.push(mixerTornado);
    }, undefined, function (error) {
        console.error(error);
    });
}

export function loadWind(scene, mixers) {
    gltfLoader.load('/models/wind.gltf', function (gltf) {
        const wind = gltf.scene;
        const animation = gltf.animations;

        wind.scale.set(0.2, 0.2, 0.2);
        wind.rotation.set(0, -Math.PI * 11 / 16, 0);
        wind.position.set(3, 4, -5);

        wind.traverse(function (node) {
            node.castShadow = true;
        });

        scene.add(wind);

        const mixerWind = new THREE.AnimationMixer(wind);
        const action = mixerWind.clipAction(animation[0]);
        action.play();
        mixers.push(mixerWind);
    }, undefined, function (error) {
        console.error(error);
    });
}

export function loadFog(scene, mixers) {
    gltfLoader.load('/models/fog.gltf', function (gltf) {
        const fog = gltf.scene;
        const animation = gltf.animations;

        fog.scale.set(0.2, 0.2, 0.2);
        fog.rotation.set(0, -Math.PI * 11 / 16, 0);
        fog.position.set(3, 4, -5);

        fog.traverse(function (node) {
            node.castShadow = true;
        });

        scene.add(fog);

        const mixerFog = new THREE.AnimationMixer(fog);
        const action = mixerFog.clipAction(animation[0]);
        action.play();
        mixers.push(mixerFog);
    }, undefined, function (error) {
        console.error(error);
    });
}

export function loadMist(scene, mixers) {
    gltfLoader.load('/models/mist.gltf', function (gltf) {
        const mist = gltf.scene;
        const animation = gltf.animations;

        mist.scale.set(0.2, 0.2, 0.2);
        mist.rotation.set(0, -Math.PI * 11 / 16, 0);
        mist.position.set(3, 4, -5);

        mist.traverse(function (node) {
            node.castShadow = true;
        });

        scene.add(mist);

        const mixerMist = new THREE.AnimationMixer(mist);
        const action = mixerMist.clipAction(animation[0]);
        action.play();
        mixers.push(mixerMist);
    }, undefined, function (error) {
        console.error(error);
    });
}

export function loadThunder(scene, mixers) {
    gltfLoader.load('/models/lighting.gltf', function (gltf) {
        const thunder = gltf.scene;

        thunder.scale.set(0.2, 0.2, 0.2);
        thunder.rotation.set(0, -Math.PI * 11 / 16, 0);
        thunder.position.set(3, 4, -5);

        thunder.traverse(function (node) {
            node.castShadow = true;
        });

        scene.add(thunder);

        thunder.children[0].material.emissiveIntensity = 0.7;
        thunder.children[1].material.emissiveIntensity = 0.7;
        thunder.children[2].material.emissiveIntensity = 0.7;
    }, undefined, function (error) {
        console.error(error);
    });
}

export function loadSnow(scene, mixers) {
    gltfLoader.load('/models/snow.gltf', function (gltf) {
        const snow = gltf.scene;
        const animation = gltf.animations;

        snow.scale.set(0.2, 0.2, 0.2);
        snow.rotation.set(0, -Math.PI * 11 / 16, 0);
        snow.position.set(3, 4, -5);

        snow.traverse(function (node) {
            node.castShadow = true;
        });

        scene.add(snow);

        const mixerSnow = new THREE.AnimationMixer(snow);
        const action = mixerSnow.clipAction(animation[0]);
        const action1 = mixerSnow.clipAction(animation[1]);
        const action2 = mixerSnow.clipAction(animation[2]);
        action.play();
        action1.play();
        action2.play();
        mixers.push(mixerSnow);
    }, undefined, function (error) {
        console.error(error);
    });
}

export function loadDrizzle(scene, mixers) {
    gltfLoader.load('/models/drizzle.gltf', function (gltf) {
        const drizzle = gltf.scene;
        const animation = gltf.animations;

        drizzle.scale.set(0.2, 0.2, 0.2);
        drizzle.rotation.set(0, -Math.PI * 11 / 16, 0);
        drizzle.position.set(3, 4, -5);

        drizzle.traverse(function (node) {
            node.castShadow = true;
        });

        scene.add(drizzle);

        const mixerDrizzle = new THREE.AnimationMixer(drizzle);
        const action = mixerDrizzle.clipAction(animation[0]);
        const action1 = mixerDrizzle.clipAction(animation[1]);
        const action2 = mixerDrizzle.clipAction(animation[2]);
        action.play();
        action1.play();
        action2.play();
        mixers.push(mixerDrizzle);
    }, undefined, function (error) {
        console.error(error);
    });
}

export function load3Dfigures(scene, mixers) {
    loadMoon(scene, mixers);
    // loadSun(scene, mixers);
    loadCloud(scene, mixers);
    loadRain(scene, mixers);
    // loadTornado(scene, mixers);
    // loadWind(scene, mixers);
    // loadFog(scene, mixers);
    // loadMist(scene, mixers);
    // loadThunder(scene, mixers);
    // loadSnow(scene, mixers);
    // loadDrizzle(scene, mixers);
}
