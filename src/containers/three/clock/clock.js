import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { useGLTF } from '@react-three/drei';

let container;
let scene;
let camera;
let renderer;
let loader;
let textureLoader
let controls;

let clock;
let clockFace;
let seconds;
let hourHand;
let minutesHand;
let secondsHand;
let hoursHand;
let clockDetail;

let start;
let secondsPivot;
let minutesPivot;
let hoursPivot;
let rotaionSeconds = 0;
let rotationMinutes = 0;
let rotationHours = 0;

export function init(){

    console.log('INIT')
	scene = new THREE.Scene();
	scene.background = new THREE.Color("skyblue");
	// scenes.add( new THREE.AxesHelper( 15 ) );

	createCamera();
	createRenderer();
	createLights();
	createControls();

	loader = new GLTFLoader();
	textureLoader = new THREE.TextureLoader()
	loadClockBody();
	// loadClockFace();
	// loadClockFaceDetail();
	// loadClockHourHand();
	// loadClockMinuteHand();
	// loadClockSecondsHand();
	// loadClockDetail();

	start = Date.now();

	secondsPivot = new THREE.Object3D();
	secondsPivot.rotation.set( 0, 0, 0 );
	minutesPivot = new THREE.Object3D();
	minutesPivot.rotation.set(0, 0, 0);
	hoursPivot = new THREE.Object3D();
	hoursPivot.rotation.set(0, 0, 0);

	scene.add(secondsPivot);
	scene.add(minutesPivot);
	scene.add(hoursPivot);

	renderer.setAnimationLoop( () => {
		render();
	});

	container = document.querySelector("#container");
	container.appendChild(renderer.domElement);
};

function loadClockBody(){
    console.log('load clock');
	// const gltfModel = useGLTF('../../../resources/clock/clockBody.glb', true);
	// loader.load('../../../resources/clock/clockBody.glb', (gltf) => {
    return new Promise((resolve, reject) => {
        console.log('Promise')
        loader.load('../../../resources/clock/clockBody.glb', function(gltf) {
            console.log('resolve data: ', gltf);
            clock = gltf.scene;
            clock.rotation.set( 0, 2*Math.PI, 0 );
            clock.children[0].material.map = textureLoader.load( '../../../resources/clock/clockBody.jpg', function(){
                scene.add(clock);
            });
        });
    });
        // function ( xhr ) {
        //     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        // },
        // function(err){
        //     console.log(err);
        // });
};

function loadClockFace(){
	loader.load('../../../resources/clock/clockFace.glb', function(gltf){
		clockFace = gltf.scene;
		clockFace.rotation.set( 0, 2*Math.PI, 0 );
		clockFace.children[0].material.map = textureLoader.load( '../../../resources/clock/clockFace.jpg', function() {
			scene.add(clockFace);
		});
	}, 
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function(err){
		console.log(err);
	});
};

function loadClockFaceDetail() {
	const fontLoader = new THREE.FontLoader();
	fontLoader.load('./helvetiker_bold.typeface.json', function(font){
		const options = {
			font: font,
			size: 60,
			height: 1,
			curveSegments: 12,
			bevelEnabled: false,
			bevelThickness: 5,
			bevelSize: 4,
			bevelOffset: 0,
			bevelSegments: 2
		}
		let clockNumberTwelve = new THREE.TextGeometry('12', options);
		let clockNumberSix = new THREE.TextGeometry('6', options);

		const textMaterial = new THREE.MeshPhongMaterial({
			color: 0xffffff,
			specular: 0x00ffff
		});

		const meshTwelve = new THREE.Mesh( clockNumberTwelve, textMaterial );
		meshTwelve.scale.set( 0.002, 0.002, 0.002 );
		meshTwelve.rotation.set( 0, Math.PI/2, 0 );
		meshTwelve.position.set( 0, 0.55, 0.125 );

		const meshSix = new THREE.Mesh( clockNumberSix, textMaterial );
		meshSix.scale.set( 0.002, 0.002, 0.002 );
		meshSix.rotation.set( 0, Math.PI/2, 0 );
		meshSix.position.set( 0, -0.65, 0.05 );

		scene.add( meshTwelve );
		scene.add( meshSix );
	});
};

function loadClockHourHand(){
	loader.load('../../../resources/clock/clockHour2.glb', function(gltf){
		hoursHand = gltf.scene;
		hoursHand.rotation.set( Math.random(), 0, 0 );
		hoursHand.children[0].material.map = textureLoader.load( '../../../resources/clock/clock.jpg', function(){
			hoursPivot.add(hoursHand);
		});
	}, 
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function(err){
		console.log(err);
	});
};

function loadClockMinuteHand(){
	loader.load('../../../resources/clock/clockMinutes.glb', function(gltf){
		minutesHand = gltf.scene;
		minutesHand.rotation.set( Math.random(), 0, 0 );
		minutesHand.children[0].material.map = textureLoader.load( '../../../resources/clock/clock.jpg', function(){
			minutesPivot.add( minutesHand );
		} );
	}, 
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function(err){
		console.log(err);
	});
};

function loadClockSecondsHand(){
	loader.load('../../../resources/clock/clockSeconds.glb', function(gltf){
		secondsHand = gltf.scene;
		secondsHand.rotation.set( Math.random(), 0, 0);
		secondsHand.children[0].material.map = textureLoader.load( '../../../resources/clock/clock.jpg', function(){
			secondsPivot.add( secondsHand );
		});
	}, 
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function(err){
		console.log(err);
	});
};

function loadClockDetail(){
	loader.load( '../../../resources/clock/clockDetail.glb', function(gltf){
		clockDetail = gltf.scene;
		clockDetail.rotation.set( -Math.PI/2, 0, 0 );
		clockDetail.children[0].material.map = textureLoader.load( '../../../resources/clock/clockBody.jpg', function() {
			scene.add( clockDetail );
		});
	},
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function(err){
		console.log(err);
	});
}

function createCamera(){
	const fov = 50;
	const aspect = window.innerWidth / window.innerHeight;
	const near = 1;
	const far = 1000;

	camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( 0, 0, 5 );
};

function createRenderer() {
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setPixelRatio(window.devicePixelRatio);
	document.body.appendChild( renderer.domElement );
}

function render(){
	let millis = Date.now() - start;
	let elapsed = Math.floor(millis/1000);
	rotaionSeconds = (elapsed*(Math.PI / 180)) * 6;
	rotationMinutes = rotaionSeconds / 60;
	rotationHours = rotationMinutes / 24;
	if(secondsHand){
		secondsPivot.rotation.x = -rotaionSeconds;
	}
	if(minutesHand){
		minutesPivot.rotation.x = -rotationMinutes;
	}
	if(hoursHand){
		hoursPivot.rotation.x = -rotationHours;
	}
	renderer.render(scene, camera);
};

function createControls() {
	// controls = new THREE.OrbitControls( camera );
	controls = new OrbitControls( camera, renderer.domElement );
}

function createLights() {
	const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 2 );
	const mainLight = new THREE.DirectionalLight( 0xffffff, 2 );
	mainLight.position.set( 10, 10, 10 );

	scene.add( ambientLight, mainLight );
}

function onWindowResize(){
	camera.aspect = container.clientWidth / container.clientHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( container.clentWidth / container.clientHeight );
};
window.addEventListener( 'resize', onWindowResize );
