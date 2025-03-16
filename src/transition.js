export function sunToMoon(sun, moon, scene) {

}

export function moonToSun(sun, moon, scene) {
    
}

export function handleKeydown(event, scene, objects) {
    switch (event.key) {
        case "s":
            objects.sunDraco.desiredPositionY = 4
            objects.moonDraco.desiredPositionY = 14
            break;
        case "m":
            objects.sunDraco.desiredPositionY = 14
            objects.moonDraco.desiredPositionY = 4
            break;
    }
}
