export function sunToMoon(sun, moon) {
    while (moon.children[0].material.opacity < 1) {
        moon.children[0].material.opacity += 0.0001;
    }
    while (sun.children[0].material.opacity > 0) {
        sun.children[0].material.opacity -= 0.0001;
    }
    moon.traverse(function (node) {
        node.castShadow = true;
    });
    sun.traverse(function (node) {
        node.castShadow = false;
    });
}

export function moonToSun(sun, moon) {
    while (moon.children[0].material.opacity > 0) {
        moon.children[0].material.opacity -= 0.0001;
    }
    while (sun.children[0].material.opacity < 1) {
        sun.children[0].material.opacity += 0.0001;
    }
    sun.traverse(function (node) {
        node.castShadow = true;
    });
    moon.traverse(function (node) {
        node.castShadow = false;
    });
}

export function addRain(scene, rain) {
    scene.add(rain);
}

export function removeRain(scene, rain) {
    scene.remove(rain);
}

export function handleKeydown(event, scene, objects) {
    switch (event.key) {
        case "s":
            addRain(scene, objects.rain);
            moonToSun(objects.sun, objects.moon);
            break;
        case "m":
            removeRain(scene, objects.rain);
            sunToMoon(objects.sun, objects.moon);
            break;
    }
}