import * as THREE from 'three';
import {dragControls,dragAction} from './dragTHREE.js';

window.addEventListener('load', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();
    const geometry = new THREE.CircleGeometry( 1, 10 ).toNonIndexed();
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff} ); 
    const circle = new THREE.Mesh( geometry, material );
    scene.add( circle );
    camera.position.z = 2;

    const container = document.querySelector('#scene-container');
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.render( scene, camera );
    container.append(renderer.domElement);
    
    var raycaster, mouse;
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2()

    // renderer.domElement.addEventListener('click', onClick, false);
    renderer.domElement.addEventListener('click', onClick, false);
    
    function onClick() {
        // console.log('onclick')
        // event.preventDefault();
      
        // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
        // raycaster.setFromCamera(mouse, camera);
      
        // var intersects = raycaster.intersectObject(scene, true);
      
        // if (intersects.length > 0) {
        //     console.log('onlick but intersects')
        //     var object = intersects[0].object;
        //     object.material.color.set( Math.random() * 0xffffff );
        //     object.rotateZ(90)
      
        // }
          
        render();
      
      }


    dragControls(renderer.domElement, dragAction, circle, renderer, scene, camera)

    // function render() {
    //     renderer.render(scene, camera);
    // }

});