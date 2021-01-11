import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { overlay } from './overlay';
import { building } from './models/building';
import { assets } from './models/assets';
import { avatars } from './models/avatars';

let canvas;
let renderer;
let camera;
let scene;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

export function init() {
	canvas = document.querySelector('#buildingContainer');
	renderer = new THREE.WebGLRenderer({canvas});
	camera = createCamera(canvas);
	camera.position.x = 34.335455200136145;
	camera.position.y = 49.51461494289882;
	camera.position.z = 23.341719057165292;
  
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x000000);

	// overlay(canvas.clientWidth, canvas.clientHeight);
	building(scene);
	assets(scene);
	avatars(scene)
	overlay(canvas.clientWidth, canvas.clientHeight);

	createLights(scene);
	createControls( camera, renderer );
  
	function resizeRendererToDisplaySize(renderer) {
	  const canvas = renderer.domElement;
	  const pixelRatio = window.devicePixelRatio;
	  const width  = canvas.clientWidth  * pixelRatio | 0;
	  const height = canvas.clientHeight * pixelRatio | 0;
	  const needResize = canvas.width !== width || canvas.height !== height;
	  if (needResize) {
		renderer.setSize(width, height, false);
	  }
	  return needResize;
	}
  
	function render() {
  
	  if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	  }

	// // update the picking ray with the camera and mouse position
	// raycaster.setFromCamera( mouse, camera );

	  renderer.render(scene, camera);
  
	  requestAnimationFrame(render);
	}
  
	requestAnimationFrame(render);
  }

  function createCamera(canvas) {
		// Camera setup
		const fov = 45;
		const aspect = canvas.width / canvas.height;
		const near = 1;
		const far = 1000;
		return new THREE.PerspectiveCamera( fov, aspect, near, far );
	}

  function createLights(scene) {
	const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 0.1;
    const ambientLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
	const mainLight = new THREE.DirectionalLight( 0xffffff, 2 );
	mainLight.position.set( 10, 10, 10 );

	scene.add( ambientLight, mainLight );
}

function createControls( camera, renderer ) {
	return new OrbitControls( camera, renderer.domElement );
}

// var raycaster = new THREE.Raycaster();
// var mouse = new THREE.Vector2();
export function onClick( event ) {
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );
	console.log(scene.children);
	var intersects = raycaster.intersectObjects( scene.children, true );
	console.log(intersects[1]);
	if ( intersects.length > 0 ) {
		intersects[0].object.parent.callback();
	}
}
  