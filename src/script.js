import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { LoopRepeat } from 'three/build/three.module';
import { PointLightHelper } from 'three';
import { sunToMoon, moonToSun } from './transition';


var renderer, camera, scene, gui, controls;
var sun, moon, cloud, tornado, wind, fog, mist, thunder, snow, rain, drizzle;
var mixerSun, mixerMoon, mixerCloud, mixerTornado, mixerWind, mixerFog, mixerMist, mixerSnow, mixerRain, mixerDrizzle;
var sphere, floorMesh, rightWallMesh, leftWallMesh;
var ambientColor, wallColor, lightTarget;

//loading
const textureLoader = new THREE.TextureLoader()
const gltfLoader = new GLTFLoader()
var clock = new THREE.Clock();

// Canvas
const canvas = document.querySelector('canvas.webgl')
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    adjustCameraPosition();
})


window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case "s":
            scene.add(rain);
            moonToSun(sun, moon)
        break;
        case "m":
            scene.remove(rain);
            sunToMoon(sun, moon)
        break;
            
    }  
});

function loadMoon() {
    gltfLoader.load( '/models/clearNight.gltf',
        function ( gltf ) {
            moon = gltf.scene;
            var animation = gltf.animations;

            moon.scale.set(0.2, 0.2, 0.2)
            moon.rotation.set(0, -Math.PI*11/16, 0)
            moon.position.set(3, 4, -5);

            moon.traverse( function( node ) {
                node.castShadow = true;
            } );

            scene.add(moon);
            
            mixerMoon = new THREE.AnimationMixer(moon);
            var action = mixerMoon.clipAction(animation[0]);
            action.play();
        }, 
        undefined,
        function ( error ) {
            console.error( error );
        }
    );
}

function loadSun() {
    gltfLoader.load( '/models/clearDay.gltf',
        function ( gltf ) {
            sun = gltf.scene;
            var animation = gltf.animations;

            sun.scale.set(0.2, 0.2, 0.2)
            sun.rotation.set(0, -Math.PI*11/16, 0)
            sun.position.set(3, 4, -5);

            sun.traverse( function( node ) {
                node.castShadow = true;    
            } );
            scene.add(sun);
            console.log(sun);

            sun.children[0].material.color.b = 1;
            sun.children[0].material.color.r = 1;
            sun.children[0].material.color.g = 1;

            mixerSun = new THREE.AnimationMixer(sun);
            var action = mixerSun.clipAction(animation[0]);
            action.play();
        }, 
        undefined,
        function ( error ) {
            console.error( error );
        }
    );
}

function loadCloud() {
    gltfLoader.load( '/models/cloudy.gltf',
        function ( gltf ) {
            cloud = gltf.scene;
            var animation = gltf.animations;

            cloud.scale.set(0.2, 0.2, 0.2)
            cloud.rotation.set(0, -Math.PI*11/16, 0)
            cloud.position.set(3, 4, -5);

            cloud.traverse( function( node ) {
                node.castShadow = true;    
            } );
            scene.add(cloud);

            cloud.children[0].material.emissiveIntensity = 0.2;

            mixerCloud = new THREE.AnimationMixer(cloud);
            var action0 = mixerCloud.clipAction(animation[0]);
            var action1 = mixerCloud.clipAction(animation[1]);
            var action2 = mixerCloud.clipAction(animation[2]);
            action0.play();
            action1.play();
            action2.play();
        }, 
        undefined,
        function ( error ) {
            console.error( error );
        }
    );
}

function loadTornado() {
    gltfLoader.load( '/models/tornado.gltf',
        function ( gltf ) {
            tornado = gltf.scene;
            var animation = gltf.animations;

            tornado.scale.set(0.2, 0.2, 0.2)
            tornado.rotation.set(0, -Math.PI*11/16, 0)
            tornado.position.set(3, 4, -5);

            tornado.traverse( function( node ) {
                node.castShadow = true;    
            } );
            scene.add(tornado);

            mixerTornado = new THREE.AnimationMixer(tornado);
            var action0 = mixerTornado.clipAction(animation[0]);
            var action1 = mixerTornado.clipAction(animation[1]);
            var action2 = mixerTornado.clipAction(animation[2]);
            var action3 = mixerTornado.clipAction(animation[3]);
            var action4 = mixerTornado.clipAction(animation[4]);
            action0.play();
            action1.play();
            action2.play();
            action3.play();
            action4.play();
        }, 
        undefined,
        function ( error ) {
            console.error( error );
        }
    );
}

function loadWind() {
    gltfLoader.load( '/models/wind.gltf',
        function ( gltf ) {
            wind = gltf.scene;
            var animation = gltf.animations;

            wind.scale.set(0.2, 0.2, 0.2)
            wind.rotation.set(0, -Math.PI*11/16, 0)
            wind.position.set(3, 4, -5);

            wind.traverse( function( node ) {
                node.castShadow = true;    
            } );
            scene.add(wind);

            mixerWind = new THREE.AnimationMixer(wind);
            var action = mixerWind.clipAction(animation[0]);
            action.play();
        }, 
        undefined,
        function ( error ) {
            console.error( error );
        }
    );
}

function loadFog() {
    gltfLoader.load( '/models/fog.gltf',
        function ( gltf ) {
            fog = gltf.scene;
            var animation = gltf.animations;

            fog.scale.set(0.2, 0.2, 0.2)
            fog.rotation.set(0, -Math.PI*11/16, 0)
            fog.position.set(3, 4, -5);

            fog.traverse( function( node ) {
                node.castShadow = true;    
            } );
            scene.add(fog);

            mixerFog = new THREE.AnimationMixer(fog);
            var action = mixerFog.clipAction(animation[0]);
            action.play();
        }, 
        undefined,
        function ( error ) {
            console.error( error );
        }
    );
}

function loadMist() {
    gltfLoader.load( '/models/mist.gltf',
        function ( gltf ) {
            mist = gltf.scene;
            var animation = gltf.animations;

            mist.scale.set(0.2, 0.2, 0.2)
            mist.rotation.set(0, -Math.PI*11/16, 0)
            mist.position.set(3, 4, -5);

            mist.traverse( function( node ) {
                node.castShadow = true;    
            } );
            scene.add(mist);

            mixerMist = new THREE.AnimationMixer(mist);
            var action = mixerMist.clipAction(animation[0]);
            action.play();
        }, 
        undefined,
        function ( error ) {
            console.error( error );
        }
    );
}

function loadThunder() {
    gltfLoader.load( '/models/lighting.gltf',
        function ( gltf ) {
            thunder = gltf.scene;

            thunder.scale.set(0.2, 0.2, 0.2)
            thunder.rotation.set(0, -Math.PI*11/16, 0)
            thunder.position.set(3, 4, -5);

            thunder.traverse( function( node ) {
                node.castShadow = true;    
            } );
            scene.add(thunder);

            thunder.children[0].material.emissiveIntensity = 0.7;
            thunder.children[1].material.emissiveIntensity = 0.7;
            thunder.children[2].material.emissiveIntensity = 0.7;
        }, 
        undefined,
        function ( error ) {
            console.error( error );
        }
    );
}

function loadSnow() {
    gltfLoader.load( '/models/snow.gltf',
        function ( gltf ) {
            snow = gltf.scene;
            var animation = gltf.animations;

            snow.scale.set(0.2, 0.2, 0.2)
            snow.rotation.set(0, -Math.PI*11/16, 0)
            snow.position.set(3, 4, -5);

            snow.traverse( function( node ) {
                node.castShadow = true;    
            } );
            scene.add(snow);

            mixerSnow = new THREE.AnimationMixer(snow);
            var action = mixerSnow.clipAction(animation[0]);
            var action1 = mixerSnow.clipAction(animation[1]);
            var action2 = mixerSnow.clipAction(animation[2]);

            action.play();
            action1.play();
            action2.play();
        }, 
        undefined,
        function ( error ) {
            console.error( error );
        }
    );
}

function loadRain() {
    gltfLoader.load( '/models/rain.gltf',
        function ( gltf ) {
            rain = gltf.scene;
            var animation = gltf.animations;

            rain.scale.set(0.2, 0.2, 0.2)
            rain.rotation.set(0, -Math.PI*11/16, 0)
            rain.position.set(3, 4, -5);

            rain.traverse( function( node ) {
                node.castShadow = true;    
            } );
            scene.add(rain);

            mixerRain = new THREE.AnimationMixer(rain);
            var action = mixerRain.clipAction(animation[0]);
            var action1 = mixerRain.clipAction(animation[1]);
            var action2 = mixerRain.clipAction(animation[2]);

            action.play();
            action1.play();
            action2.play();
        }, 
        undefined,
        function ( error ) {
            console.error( error );
        }
    );
}

function loadDrizzle() {
    gltfLoader.load( '/models/drizzle.gltf',
        function ( gltf ) {
            drizzle = gltf.scene;
            var animation = gltf.animations;

            drizzle.scale.set(0.2, 0.2, 0.2)
            drizzle.rotation.set(0, -Math.PI*11/16, 0)
            drizzle.position.set(3, 4, -5);

            drizzle.traverse( function( node ) {
                node.castShadow = true;    
            } );
            scene.add(drizzle);

            mixerDrizzle = new THREE.AnimationMixer(drizzle);
            var action = mixerDrizzle.clipAction(animation[0]);
            var action1 = mixerDrizzle.clipAction(animation[1]);
            var action2 = mixerDrizzle.clipAction(animation[2]);

            action.play();
            action1.play();
            action2.play();
        }, 
        undefined,
        function ( error ) {
            console.error( error );
        }
    );
}

function load3Dfigures() {
    loadMoon();
    loadSun();
    loadCloud();
    //loadTornado();
    //loadWind();
    //loadFog();
    //loadMist();
    //loadThunder();
    //loadSnow();
    loadRain();
    //loadDrizzle();
}

function loadMeshes() {
    const floor = new THREE.PlaneGeometry(40, 40);
    const rightWall = new THREE.PlaneGeometry(40, 40);
    const leftWall = new THREE.PlaneGeometry(40, 40);
    const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

    const background = new THREE.MeshStandardMaterial(
        {color:0x00e7ff, 
        side: THREE.DoubleSide}
    );
    
    const normalTexture = textureLoader.load("/textures/map.jpg")

    const material = new THREE.MeshStandardMaterial()
    material.roughness = 0.2
    material.metalness = 0.7
    material.normalMap = normalTexture
    material.color = new THREE.Color(0xff00f0)


    sphere = new THREE.Mesh(geometry,material)
    sphere.position.set(1, 1, -1)
    //scene.add(sphere)

    floorMesh = new THREE.Mesh(floor, background)
    floorMesh.position.set(-10, 0, -10)
    floorMesh.rotation.x = Math.PI/2
    floorMesh.receiveShadow = true
    scene.add(floorMesh)

    rightWallMesh = new THREE.Mesh(rightWall, background)  
    rightWallMesh.position.set(10, 10, 10)
    rightWallMesh.rotation.y = Math.PI/2
    scene.add(rightWallMesh)

    leftWallMesh = new THREE.Mesh(leftWall, background)
    leftWallMesh.position.set(-10, 10, -10)
    leftWallMesh.rotation.z = Math.PI/2
    scene.add(leftWallMesh)
}

/////////////////////////////////////////////////////

function createScene(){
    //Scene + Camera + Renderer = All we need to render a scene

    //Scene
    scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    // Debug
    gui = new dat.GUI()

    //Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(-3, 5, 1)
    scene.add(camera)

    //Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

function createControls() {
    controls = new OrbitControls(camera, renderer.domElement)
    controls.keys = {
        LEFT: 37, //left arrow
        UP: 38, // up arrow
        RIGHT: 39, // right arrow
        BOTTOM: 40 // down arrow
    }
    controls.target.set(-2, 4, -5);
    controls.enableDamping = true
    controls.listenToKeyEvents( window );
    controls.minPolarAngle = Math.PI*6/16;
    controls.maxPolarAngle = Math.PI*9/16;
    controls.minAzimuthAngle = -Math.PI/10;
    controls.maxAzimuthAngle = -Math.PI/50;
    controls.minDistance = 5;
    controls.maxDistance = 8;
    controls.update()
}

function createLights() {
    const thunderLight0 = new THREE.RectAreaLight(0xffffff, 0.5, 0.6, 0.6)
    thunderLight0.position.set(1.98, 4, -3.9)
    thunderLight0.lookAt(2.8, 4, -5);
    //scene.add(thunderLight0)

    const thunderLight1 = new THREE.RectAreaLight(0xffffff, 0.5, 0.5, 0.5)
    thunderLight1.position.set(2.42, 4, -3.62)
    thunderLight1.lookAt(2.8, 4, -5);
    //scene.add(thunderLight1)

    const thunderLight2 = new THREE.RectAreaLight(0xffffff, 0.5, 0.3, 0.3)
    thunderLight2.position.set(1.63, 4, -4.17)
    thunderLight2.lookAt(2.8, 4, -5);
    //scene.add(thunderLight2)

    //Ambient Light
    const ambientLight = new THREE.PointLight(0xffffff, 0.4)
    ambientLight.position.set(-8, 15, -5)
    scene.add(ambientLight)

    //Light that makes shadows
    const shadowLight = new THREE.PointLight(0x5dc2c9, 0.2)
    shadowLight.position.set(1, 7, -3)
    shadowLight.castShadow = true;
    shadowLight.shadow.mapSize.width = 512;
    shadowLight.shadow.mapSize.height = 512;
    shadowLight.shadow.radius = 10;
    scene.add(shadowLight)

    //Light that shades the objects
    const shaderLight = new THREE.RectAreaLight( 0xff00ff, 0.8, 2, 2);
    shaderLight.position.set(2, 5, -3)
    shaderLight.lookAt(3, 4, -5);
    scene.add(shaderLight)
}

function createObjects(){
    load3Dfigures();
    loadMeshes();
}

function adjustCameraPosition() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    if (aspectRatio < 1.4) {
        let x = 3 + (aspectRatio - 1.4) * 6;
        let y = 5 - (aspectRatio - 1.4) * 0.5;
        let z = 1 + (aspectRatio - 1.4) * 1.5;
        controls.target.lerp(new THREE.Vector3(-x + 1, y - 1, z - 6), 0.03);
        camera.position.lerp(new THREE.Vector3(-x    , y    , z)    , 0.03);
    } else {
        controls.target.lerp(new THREE.Vector3(-2, 4, -5), 0.03); 
        camera.position.lerp(new THREE.Vector3(-3, 5, 1), 0.03);
    }
}

//The loop where stuff happens
function loop(){

    var dt = clock.getDelta();
    if (mixerMoon) mixerMoon.update(dt);
    if (mixerSun) mixerSun.update(dt);
    if (mixerCloud) mixerCloud.update(dt);
    if (mixerTornado) mixerTornado.update(dt);
    if (mixerWind) mixerWind.update(dt);
    if (mixerFog) mixerFog.update(dt);
    if (mixerMist) mixerMist.update(dt);
    if (mixerSnow) mixerSnow.update(dt);
    if (mixerRain) mixerRain.update(dt);
    if (mixerDrizzle) mixerDrizzle.update(dt);

    adjustCameraPosition();

    controls.update();

    renderer.render(scene, camera)
    requestAnimationFrame( loop );
}

async function fetchWeatherData() {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Skien&appid=5462453686705895f62c201357f2aac7&units=metric');
    const data = await response.json();
    return data;
}

function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = `
        <h3>Weather in ${data.name}</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Condition: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

//Initialize everything
async function main(){
    createScene();
    createControls();
    createLights();
    createObjects();

    const weatherData = await fetchWeatherData();
    displayWeatherData(weatherData);

    loop();
}

main()


