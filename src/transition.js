


export function sunToMoon(sun, moon){
    while (moon.children[0].material.opacity < 1){
        moon.children[0].material.opacity += 0.0001;
    }
    while (sun.children[0].material.opacity > 0){
        sun.children[0].material.opacity -= 0.0001;
    }
    moon.traverse( function( node ) {
        node.castShadow = true;
    } );
    sun.traverse( function( node ) {
        node.castShadow = false;
    } );
}

export function moonToSun(sun, moon){
    while (moon.children[0].material.opacity > 0){
        moon.children[0].material.opacity -= 0.0001;
    }
    while (sun.children[0].material.opacity < 1){
        sun.children[0].material.opacity += 0.0001;
    }
    sun.traverse( function( node ) {
        node.castShadow = true;
    } );
    moon.traverse( function( node ) {
        node.castShadow = false;
    } );
}