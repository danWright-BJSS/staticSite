import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import * as pubSub from '../pubSub';

let printer;
let downArrow;
let sceneInst;
let table;
let tableGroupTop;
let teamGroupLoc1;
let tableGroupLoc

let displayArrows = false;
let displayTeamlocator = false;

export function assets (scene) {
    sceneInst = scene;
    printer = loadPrinter();
    downArrow = loadArrow();
    table = loadTable();
    tableGroupTop = loadTableUp();
    teamGroupLoc1 = loadTeamGroupLocator();
    // const printer = loadPrinter(scene).then((dataAsset) => {
    //     positionPrinters(dataAsset);
    // });
    
    return Promise.all(
        [ printer, downArrow, table, tableGroupTop, teamGroupLoc1 ]
    ).then(() => scene)
};

function loadPrinter() {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader()
        loader.load('../../../resources/building/assets/printer.glb', function(gltf) {
            const printer = gltf.scene;
            printer.children[0].material.map = textureLoader.load( '../../../resources/building/assets/printer.png', function() {
                const printer1 = printer.clone()
                printer1.position.set( 18, 0, 13.5 );
                const printer2 = printer.clone()
                printer2.position.set( -18, 0, 13.5 );
                const printer3 = printer.clone()
                printer3.position.set( -18, 5, -23.4 );
                sceneInst.add( printer1, printer2, printer3 );
            });
        });
    });
}

function loadArrow() {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader()
        loader.load('../../../resources/building/assets/downArrow.glb', function(gltf) {
            downArrow = gltf.scene;
            downArrow.children[0].material.map = textureLoader.load( '../../../resources/building/assets/downArrow.png');
        });
    });
}

function loadTable() {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader()
        loader.load('../../../resources/building/assets/table.glb', function(gltf) {
            table = gltf.scene;
            table.children[0].material.map = textureLoader.load( '../../../resources/building/assets/table.png');
            placeTables();
        });
    });
}

function loadTableUp() {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader()
        loader.load('../../../resources/building/assets/tableGroupUp.glb', function(gltf) {
            const tableGroup = gltf.scene;
            tableGroup.children[0].material.map = textureLoader.load( '../../../resources/building/assets/table.png');
            tableGroup.position.set( 0, 0, 5 )
            sceneInst.add( tableGroup );
        });
    });
}

function loadTeamGroupLocator() {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader()
        loader.load('../../../resources/building/assets/teamGroup1.glb', function(gltf) {
            tableGroupLoc = gltf.scene;
            tableGroupLoc.children[0].material.map = textureLoader.load( '../../../resources/building/assets/teamGroup1.png');
            tableGroupLoc.position.set( 0, 0, 5 )
        });
    });
}

let tableRowX3;
let tableGroup;

function placeTables() {
    rowTablex3();
    const row1 = tableRowX3.clone();
    const row2 = tableRowX3.clone();
    row2.position.set( 0, 0, 1.6 )

    tableGroup = new THREE.Group();
    tableGroup.add( row1, row2 );

    const group2 = tableGroup.clone();
    group2.position.set( 0, 0, 5 );
    const group3 = tableGroup.clone();
    group3.position.set( 0, 0, 10 );

    const tableCol = new THREE.Group();
    tableCol.add(
        tableGroup, group2, group3
    );

    const tableCol2 = tableCol.clone();
    tableCol2.position.set( 12, 0, 0 )

    sceneInst.add(
        tableCol, tableCol2
    )
}

function rowTablex3() {
    const table1 = table.clone();
    table1.position.set( 0, 0, 0 );
    const table2 = table.clone();
    table2.position.set( -2.2, 0, 0 );
    const table3 = table.clone();
    table3.position.set( 2.2, 0, 0 );

    tableRowX3 = new THREE.Group();
    tableRowX3.add(
        table1, table2, table3
    )
}

let downArrow1Id;
let downArrow2Id;
let downArrow3Id;

function showArrows() {
    const downArrow1 = downArrow.clone()
    downArrow1Id = downArrow1.uuid;
    downArrow1.position.set( 0, 2, 13.5 );
    const downArrow2 = downArrow.clone()
    downArrow2Id = downArrow2.uuid;
    downArrow2.position.set( -37, 2, 13.5 );
    const downArrow3 = downArrow.clone()
    downArrow3Id = downArrow3.uuid;
    downArrow3.position.set( -37, 7, -23.5 );
    sceneInst.add( downArrow1, downArrow2, downArrow3 );
}

function removeArrows() {
    sceneInst.remove( 
        sceneInst.getObjectByProperty( 'uuid', downArrow1Id ),
        sceneInst.getObjectByProperty( 'uuid', downArrow2Id ),
        sceneInst.getObjectByProperty( 'uuid', downArrow3Id )
    );
}

let tableGroupLocId;

function showTeamLocator() {
    tableGroupLocId = tableGroupLoc.uuid;
    sceneInst.add( tableGroupLoc )
}

function removeTeamLocator() {
    sceneInst.remove(
        sceneInst.getObjectByProperty( 'uuid', tableGroupLocId )
    )
}

pubSub.subscribe('printerEvent', data => {
    console.log(
        `"printerEvent", was published with this data: "${data.toggle}"`
    );
    displayArrows = !displayArrows;
    console.log('displayArrows: ',displayArrows)

    if(displayArrows){
        showArrows();
    }else{
        removeArrows();
    }
})

pubSub.subscribe('findTeam', data => {
    console.log(
        `"printerEvent", assets, was published with this data: "${data.toggle}"`
    );

    displayTeamlocator = !displayTeamlocator;
    console.log('displayTeamlocator: ',displayTeamlocator)

    if(displayTeamlocator){
        showTeamLocator();
    }else{
        removeTeamLocator();
    }
})
