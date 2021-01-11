import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene;
let renderer;
let camera;
let controls;

let trackGroup = new THREE.Group();
let treeGroup = new THREE.Group();

export function init(){
	// Create the scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xffffff );

	// Display Axis 
	scene.add( new THREE.AxesHelper( 15 ) );

	createCamera();
	createRenderer();
	createLights();
	createControls();

	addLand();
	addSky();

	const maxTrees = 250;
	for(var i = 0; i < maxTrees; i++){
		const xPosition = Math.floor(Math.random() * 501) - 250;
		const zPosition = Math.floor(Math.random() * 501) - 250;
		addTree( xPosition, zPosition );
	};
	scene.add( treeGroup );  

	createTrain();
	createTrack();
	createTrack();
	trackGroup.children[0].position.z = -100;
	scene.add( trackGroup );

	// Camera placement
	camera.position.set(0, 0, 10);

	// Render the scene in the dom
	const container = document.querySelector('#trainContainer');
	container.appendChild(renderer.domElement);

	renderer.setAnimationLoop( () => {
		render();
	});

}

let wheelSmallMesh1;
let track;

// Draw the scene
function render() {
	renderer.render( scene, camera );

	trackGroup.children.forEach(function(track){
		track.position.z += -0.1;
	});

	if(trackGroup.children[0].position.z < -149.9 && trackGroup.children[0].position.z > -150.0){
		createTrack();
		trackGroup.children[2].position.z = 50
		trackGroup.remove(trackGroup.children[0]);
	}

	treeGroup.position.z += -0.1;
}

// function onWindowResize() {
// 	camera.aspect = container.clientWidth / container.clientHeight;

// 	// Update the cmaera frustum
// 	camera.updateProjectionMatrix();

// 	renderer.setSize( container.clientWidth, container.clientHeight );
// }

// window.addEventListener( 'resize', onWindowResize );

function createCamera() {
	// Camera setup
	const fov = 50;
	const aspect = window.innerWidth / window.innerHeight;
	const near = 1;
	const far = 1000;
	camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
}

function createLights() {
	const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 2 );
	const mainLight = new THREE.DirectionalLight( 0xffffff, 2 );
	mainLight.position.set( 10, 10, 10 );

	scene.add( ambientLight, mainLight );
}

function createControls() {
	controls = new OrbitControls( camera, renderer.domElement );
}

function createRenderer() {
	// Use webGL renderer
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function addLand() {
	const land = new THREE.PlaneBufferGeometry(500, 500);
	const landMaterial = new THREE.MeshStandardMaterial({
		color: 0x00cc00,
		side: THREE.DoubleSide
	});
	landMaterial.color.convertSRGBToLinear();
	const landMesh = new THREE.Mesh( land, landMaterial );
	landMesh.rotation.set( Math.PI/2, 0, 0 );
	landMesh.position.set( 0, -2.5, 0 );
	scene.add( landMesh );
}

function addSky() {
	const skyPannel = new THREE.PlaneBufferGeometry(500, 400);
	const skyPannelMaterial = new THREE.MeshStandardMaterial({
		color: 0xccccff,
		side: THREE.DoubleSide
	});
	skyPannelMaterial.color.convertSRGBToLinear();
	const skyPannelMesh = new THREE.Mesh( skyPannel, skyPannelMaterial );

	const skyPannelMeshLeft = skyPannelMesh.clone();
	skyPannelMeshLeft.rotation.set( 0, Math.PI/2, 0 );
	skyPannelMeshLeft.position.set( -250, 197.5, 0 );

	const skyPannelMeshBack = skyPannelMesh.clone();
	skyPannelMeshBack.position.set( 0, 197.5, -250 );

	scene.add( skyPannelMeshLeft, skyPannelMeshBack )
}

function addTree( xPosition, zPosition ) {
	const treeTrunk = new THREE.CylinderBufferGeometry( 0.25, 0.25, 5, 32 );
	const treeMaterial = new THREE.MeshStandardMaterial({
		color: 0xcc6600
	});
	treeMaterial.color.convertSRGBToLinear();
	const treeMesh = new THREE.Mesh( treeTrunk, treeMaterial );
	const treeLeaves = new THREE.CylinderBufferGeometry( 0, 0.75, 6, 32 );
	const treeLeavesMaterial = new THREE.MeshStandardMaterial({
		color: 0x004d00
	});
	treeLeavesMaterial.color.convertSRGBToLinear();
	const treeLeavesMesh = new THREE.Mesh( treeLeaves, treeLeavesMaterial )

	treeMesh.position.set( xPosition, 0, zPosition );
	treeLeavesMesh.position.set( xPosition, 1.5, zPosition );

	treeGroup.add( treeMesh, treeLeavesMesh )
}

function createTrain() {

	// Building the train
	const train = new THREE.Group();

	const trainBaseColor = new THREE.MeshStandardMaterial({
		color: 0x3333cc,
		flatShading: true
	});
	trainBaseColor.color.convertSRGBToLinear();

	// Drivers Area
	const driversAreaGeometry = new THREE.BoxBufferGeometry( 2, 3, 3 );
	const driversMesh = new THREE.Mesh( driversAreaGeometry, trainBaseColor )
	train.add( driversMesh );

	// Engine
	const engineGeometry = new THREE.CylinderBufferGeometry( 1, 1, 4, 32 );
	const engineMesh = new THREE.Mesh( engineGeometry, trainBaseColor );
	engineMesh.rotation.set( Math.PI/2, 0, 0 );
	engineMesh.position.set( 0, -0.5, 3 );
	train.add( engineMesh );

	// Wheels
	const wheelSmallGeometry = new THREE.CylinderBufferGeometry( 0.75, 0.75, 0.25, 32 );
	const wheelLargeGeometry = new THREE.CylinderBufferGeometry( 1, 1, 0.25, 32 );
	const wheelMaterial = new THREE.MeshStandardMaterial({
		color: 0x000000,
		flatShading: true
	});
	wheelMaterial.color.convertSRGBToLinear();

	wheelSmallMesh1 = new THREE.Mesh( wheelSmallGeometry, wheelMaterial );
	wheelSmallMesh1.rotation.set( 0, 0, Math.PI/2 );
	wheelSmallMesh1.position.set( 1, -1.5, 4 );
	const wheelSmallMesh2 = wheelSmallMesh1.clone();
	wheelSmallMesh2.position.set( -1, -1.5, 4 );
	const wheelSmallMesh3 = wheelSmallMesh1.clone();
	wheelSmallMesh3.position.set( -1, -1.5, 2.5 );
	const wheelSmallMesh4 = wheelSmallMesh1.clone();
	wheelSmallMesh4.position.set( 1, -1.5, 2.5 );

	const wheelLargeMesh1 = new THREE.Mesh( wheelLargeGeometry, wheelMaterial );
	wheelLargeMesh1.rotation.set( 0, 0, Math.PI/2 );
	wheelLargeMesh1.position.set( 1, -1.25, 0 );
	const wheelLargeMesh2 = wheelLargeMesh1.clone();
	wheelLargeMesh2.position.set( -1, -1.25, 0 );
	train.add( 
		wheelSmallMesh1,
		wheelSmallMesh2,
		wheelSmallMesh3, 
		wheelSmallMesh4,
		wheelLargeMesh1,
		wheelLargeMesh2
	);

	// Chimney
	const chimneyGeometry = new THREE.CylinderBufferGeometry( 0.5, 0.25, 1, 32 );
	const chimneyMesh = new THREE.Mesh( chimneyGeometry, trainBaseColor );
	chimneyMesh.rotation.set( 0, Math.PI/2, 0 );
	chimneyMesh.position.set( 0, 0.75, 3.5 );
	train.add( chimneyMesh );

	scene.add( train );
}

function createTrack() {
	// Build track
	track = new THREE.Group();

	const trackGeometry = new THREE.BoxBufferGeometry( 0.25, 0.25, 100 );
	const trackBarGeometry = new THREE.BoxBufferGeometry( 0.25, 0.25, 2.25 );
	const trackMaterial = new THREE.MeshStandardMaterial({
		color: 0x999966,
		flatShading: true
	});
	trackMaterial.color.convertSRGBToLinear();
	const trackLeftMesh = new THREE.Mesh( trackGeometry, trackMaterial );
	trackLeftMesh.position.set( -1, -2.35, 50 );
	const trackRightMesh = new THREE.Mesh( trackGeometry, trackMaterial );
	trackRightMesh.position.set( 1, -2.35, 50 );

	const trackBarMesh = new THREE.Mesh( trackBarGeometry, trackMaterial );
	trackBarMesh.rotation.set( 0, Math.PI/2, 0 );
	trackBarMesh.position.set( 0, -2.35, 0 );

	for(var i = 0; i < 100; i++){
		trackBarMesh[i] = new THREE.Mesh( trackBarGeometry, trackMaterial );
		trackBarMesh[i].rotation.set( 0, Math.PI/2, 0 );
		trackBarMesh[i].position.set( 0, -2.35, (i * 1) );
		track.add(trackBarMesh[i])
	};

	track.add( 
		trackLeftMesh,
		trackRightMesh
	);

	trackGroup.add(track);
}
