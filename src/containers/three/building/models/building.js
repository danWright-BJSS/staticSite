import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import * as pubSub from '../pubSub';

export function building(scene) {
    const floor1x = floor1(scene);
    const floor2x = floor2(scene);
    return Promise.all([ floor1x, floor2x ]).then(() => scene)
}

function floor1(scene){
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader()
        loader.load('../../../resources/building/assets/floor1.glb', function(gltf) {
            const floor1 = gltf.scene;
            floor1.children[0].material.map = textureLoader.load( '../../../resources/building/assets/floor1.jpg', function() {
                floor1.position.set( 0, 0, 5 );
                scene.add(floor1);
            });
        });
    });
}

function floor2(scene){
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader()
        loader.load('../../../resources/building/assets/floor2.glb', function(gltf) {
            const floor2 = gltf.scene;
            floor2.children[0].material.map = textureLoader.load( '../../../resources/building/assets/floor2.png', function() {
                floor2.position.set( 0, 0, 5 );
                scene.add(floor2);
            });
        });
    });
}

pubSub.subscribe('printerEvent', data => {
    console.log(
        `"printerEvent", was published with this data: "${data.tiggle}"`
    );
});

pubSub.subscribe('findTeam', data => {
    console.log(
        `"findTeam", was published with this data: "${data.tiggle}"`
    );
});