import './style.scss';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { handleKeydown } from './transition';
import { load3Dfigures } from './loadModels';

var renderer, camera, scene, controls;
var objects = {};
var mixers = {};
var sphere, floorMesh, rightWallMesh, leftWallMesh;
var ambientColor, wallColor, lightTarget;

const textureLoader = new THREE.TextureLoader();
const clock = new THREE.Clock();

const canvas = document.querySelector('canvas.webgl');
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    adjustCameraPosition();
});

window.addEventListener('keydown', (event) => handleKeydown(event, scene, objects));

function loadMeshes() {
    const floor = new THREE.PlaneGeometry(40, 40);
    const rightWall = new THREE.PlaneGeometry(40, 40);
    const leftWall = new THREE.PlaneGeometry(40, 40);
    const geometry = new THREE.SphereBufferGeometry(.5, 64, 64);

    const background = new THREE.MeshStandardMaterial({ color: 0x00e7ff, side: THREE.DoubleSide });
    const normalTexture = textureLoader.load("/textures/map.jpg");

    const material = new THREE.MeshStandardMaterial();
    material.roughness = 0.2;
    material.metalness = 0.7;
    material.normalMap = normalTexture;
    material.color = new THREE.Color(0xff00f0);

    sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(1, 1, -1);
    //scene.add(sphere);

    floorMesh = new THREE.Mesh(floor, background);
    floorMesh.position.set(-10, 0, -10);
    floorMesh.rotation.x = Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    rightWallMesh = new THREE.Mesh(rightWall, background);
    rightWallMesh.position.set(10, 10, 10);
    rightWallMesh.rotation.y = Math.PI / 2;
    scene.add(rightWallMesh);

    leftWallMesh = new THREE.Mesh(leftWall, background);
    leftWallMesh.position.set(-10, 10, -10);
    leftWallMesh.rotation.z = Math.PI / 2;
    scene.add(leftWallMesh);
}

function createScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(-3, 5, 1);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

function createControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.keys = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        BOTTOM: 40
    };
    controls.target.set(-2, 4, -5);
    controls.enableDamping = true;
    controls.listenToKeyEvents(window);
    controls.minPolarAngle = Math.PI * 6 / 16;
    controls.maxPolarAngle = Math.PI * 9 / 16;
    controls.minAzimuthAngle = -Math.PI / 10;
    controls.maxAzimuthAngle = -Math.PI / 50;
    controls.minDistance = 5;
    controls.maxDistance = 8;
    controls.update();
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

    const ambientLight = new THREE.PointLight(0xffffff, 0.4);
    ambientLight.position.set(-8, 15, -5);
    scene.add(ambientLight);

    const shadowLight = new THREE.PointLight(0x5dc2c9, 0.2);
    shadowLight.position.set(1, 7, -3);
    shadowLight.castShadow = true;
    shadowLight.shadow.mapSize.width = 512;
    shadowLight.shadow.mapSize.height = 512;
    shadowLight.shadow.radius = 10;
    scene.add(shadowLight);

    const shaderLight = new THREE.RectAreaLight(0xff00ff, 0.8, 2, 2);
    shaderLight.position.set(2, 5, -3);
    shaderLight.lookAt(3, 4, -5);
    scene.add(shaderLight);
}

function createObjects() {
    load3Dfigures(scene, mixers, objects);
    loadMeshes();
}

function adjustCameraPosition() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    if (aspectRatio < 1.4) {
        let x = 3 + (aspectRatio - 1.4) * 6;
        let y = 5 - (aspectRatio - 1.4) * 0.5;
        let z = 1 + (aspectRatio - 1.4) * 1.5;
        controls.target.lerp(new THREE.Vector3(-x + 1, y - 1, z - 6), 0.03);
        camera.position.lerp(new THREE.Vector3(-x, y, z), 0.03);
    } else {
        controls.target.lerp(new THREE.Vector3(-2, 4, -5), 0.03);
        camera.position.lerp(new THREE.Vector3(-3, 5, 1), 0.03);
    }
}

function adjustObjects() {
    for (const key in objects) {
        const object = objects[key];
        object.model.position.lerp(new THREE.Vector3(3, object.desiredPositionY, -5), 0.08)

        object.model.position.y > 10 ? scene.remove(object.model) : scene.add(object.model);
    }
}

function loop() {
    const dt = clock.getDelta();
    for (const key in mixers) {
        if (mixers[key].active) {
            mixers[key].mixer.update(dt);
        }
    }

    adjustObjects();
    adjustCameraPosition();
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}

async function fetchWeatherData() {
    const cacheKey = 'weatherData';
    const cachedData = localStorage.getItem(cacheKey);

    let ifModifiedSince = null;

    if (cachedData) {
        const { data, expires } = JSON.parse(cachedData);

        if (new Date() < new Date(expires)) {
            console.log('Using cached weather data');
            return data;
        }

        ifModifiedSince = expires;
    }

    const lat = 59.2;
    const lon = 9.6;
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;

    console.log("Fetching new weather data");
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'HverMelding/1.0 (https://github.com/sondrehr/HverMelding)',
            ...(ifModifiedSince && { 'If-Modified-Since': ifModifiedSince }),
        },
    });

    console.log(response.status);
    console.log(response.ok);
    console.log(response.headers.get('Expires'));

    if (response.status === 304) {
        console.log('Data not modified, using cached data');
        return JSON.parse(cachedData).data;
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.status}`);
    }

    const data = await response.json();

    const expires = response.headers.get('Expires') || new Date(Date.now() + 3600 * 1000).toUTCString();
    localStorage.setItem(cacheKey, JSON.stringify({ data, expires }));

    return data;
}

function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weather-container');

    const timeseries = data.properties.timeseries[0];
    const temperature = timeseries.data.instant.details.air_temperature;
    const windSpeed = timeseries.data.instant.details.wind_speed;
    const humidity = timeseries.data.instant.details.relative_humidity;

    weatherContainer.innerHTML = `
        <h3>Weather Forecast</h3>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}

async function main() {
    createScene();
    createControls();
    createLights();
    createObjects();

    const weatherData = await fetchWeatherData();
    displayWeatherData(weatherData);

    loop();

    // Ensure the loading screen appears for at least 4 seconds
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('hidden');
    }, 4000);
}

main();

document.addEventListener('DOMContentLoaded', () => {
    const hamMenu = document.getElementById('hamMenu');
    const navList = document.querySelector('.navList');

    hamMenu.addEventListener('click', () => {
        hamMenu.classList.toggle('active');
        navList.classList.toggle('active');
    });
});