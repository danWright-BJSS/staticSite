import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let sceneInst;

let avatar;

export function avatars (scene) {
    sceneInst = scene;
    
    return Promise.all(
        [ loadAvatar() ]
    )
};

function loadAvatar() {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader()
        loader.load('../../../resources/building/assets/avatar1.glb', function(gltf) {
            avatar = gltf.scene;
            avatar.children[0].material.map = textureLoader.load( '../../../resources/building/assets/avatar1.png');
            positionAvatars();
        });
    });
};
// ( y, z, x)
function positionAvatars() {
    const avatar1 = avatar.clone();
    avatar1.position.set( 0, 0, 1 );
    const avatar2 = avatar.clone();
    avatar2.position.set( 0, 0, 5 );
    const avatar3 = avatar.clone();
    avatar3.position.set( -2, 0, 1 );
    const avatar4 = avatar.clone();
    avatar4.position.set( 0, 0, 6 );
    const avatar5 = avatar.clone();
    avatar5.position.set( 0, 0, 11 );
    const avatar6 = avatar.clone();
    avatar6.position.set( -2, 0, 15 );

    const avatar7 = avatar.clone();
    avatar7.position.set( 10, 0, 1 );
    const avatar8 = avatar.clone();
    avatar8.position.set( 12, 0, 1 );
    const avatar9 = avatar.clone();
    avatar9.position.set( 10, 0, 5 );
    const avatar10 = avatar.clone();
    avatar10.position.set( 12, 0, 5 );
    const avatar11 = avatar.clone();
    avatar11.position.set( 12, 0, 6 );
    const avatar12 = avatar.clone();
    avatar12.position.set( 12, 0, 11 );
    const avatar13 = avatar.clone();
    avatar13.position.set( 12, 0, 15 );

    const avatar14 = avatar.clone();
    avatar14.position.set( 0, 4.5, -5 );
    const avatar15 = avatar.clone();
    avatar15.position.set( 2.2, 4.5, -5 );
    const avatar16 = avatar.clone();
    avatar16.position.set( 4.4, 4.5, -5 );
    const avatar17 = avatar.clone();
    avatar17.position.set( 6.6, 4.5, -5 );
    const avatar18 = avatar.clone();
    avatar18.position.set( 8.8, 4.5, -5 );

    const rowGroup = new THREE.Group();
    rowGroup.add(
        avatar14, avatar15, avatar16, avatar17, avatar18
    )

    const rowGroup2 = rowGroup.clone();
    rowGroup2.position.set( 0, 0, -4);
    const rowGroup3 = rowGroup.clone();
    rowGroup3.position.set( 0, 0, -5.5);
    const rowGroup4 = rowGroup.clone();
    rowGroup4.position.set( 2.2, 0, -9.6);
    const rowGroup5 = rowGroup.clone();
    rowGroup5.position.set( 2.2, 0, -11.6);
    const rowGroup6 = rowGroup.clone();
    rowGroup6.position.set( 2.2, 0, -16.2);

    sceneInst.add(
        avatar1, avatar2, avatar3, avatar4, avatar5, avatar6,
        avatar7, avatar8, avatar9, avatar10, avatar11, avatar12,
        avatar13, rowGroup, rowGroup2, rowGroup3, rowGroup4, rowGroup5, rowGroup6
    )
}