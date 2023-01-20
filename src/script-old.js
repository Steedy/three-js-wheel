import './style.css'

// import * as THREE from './node_modules/three/build/three.module.js';
import * as THREE from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

window.addEventListener('load', () => {
    const imgRadius = 100;
    const wheelRadius = 800;
    const numberOfSegments = 8;
    const radianInterval = (2 * Math.PI) / numberOfSegments;
    const centerOfWheel = {
        x: 0,
        y: 0
    }

    // scene and objects

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();

    const geometry = new THREE.CircleGeometry( 1, 10 ).toNonIndexed();
    const material = new THREE.MeshBasicMaterial( { vertexColors: true } ); 
    const circle = new THREE.Mesh( geometry, material );
    scene.add( circle );

    const positionAttribute = geometry.getAttribute( 'position' );
    // console.log(positionAttribute)

    const colors = [
        0.18823529411764706, 0.28627450980392155, 0.396078431372549, 0.18823529411764706, 0.28627450980392155, 0.396078431372549, 0.18823529411764706, 0.28627450980392155, 0.396078431372549,
        0.49411764705882355, 0.47058823529411764, 0.7372549019607844, 0.49411764705882355, 0.47058823529411764, 0.7372549019607844, 0.49411764705882355, 0.47058823529411764, 0.7372549019607844,
        0.3215686274509804, 0.09411764705882353, 0.34901960784313724, 0.3215686274509804, 0.09411764705882353, 0.34901960784313724, 0.3215686274509804, 0.09411764705882353, 0.34901960784313724,
        0.36470588235294116, 0.39215686274509803, 0.5568627450980392, 0.36470588235294116, 0.39215686274509803, 0.5568627450980392, 0.36470588235294116, 0.39215686274509803, 0.5568627450980392,
        0.3764705882352941, 0.13333333333333333, 0.5176470588235295, 0.3764705882352941, 0.13333333333333333, 0.5176470588235295, 0.3764705882352941, 0.13333333333333333, 0.5176470588235295,
        0.17647058823529413, 0.18823529411764706, 0.043137254901960784, 0.17647058823529413, 0.18823529411764706, 0.043137254901960784, 0.17647058823529413, 0.18823529411764706, 0.043137254901960784,
        0.7411764705882353, 0.043137254901960784, 0.4980392156862745, 0.7411764705882353, 0.043137254901960784, 0.4980392156862745, 0.7411764705882353, 0.043137254901960784, 0.4980392156862745,
        0.2901960784313726, 0.7490196078431373, 0.6313725490196078, 0.2901960784313726, 0.7490196078431373, 0.6313725490196078, 0.2901960784313726, 0.7490196078431373, 0.6313725490196078,
        0.9, 0.4, 0.6, 0.9, 0.4, 0.6, 0.9, 0.4, 0.6,
        0.2, 0.1, 0.6, 0.2, 0.1, 0.6, 0.2, 0.1, 0.6
    ];
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

		
    // const facematerial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    // const facemesh = new THREE.Mesh( facematerial );

    // const controls = new OrbitControls(camera, renderer.domElement)

    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // const cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );
    
    // var helper = new THREE.PolarGridHelper( 1, 8, 1, 8 );
    // helper.rotation.x = 2;
    // helper.position.y = -1;
    // scene.add( helper );

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var intersects;
    // document.addEventListener("mousedown", onMouseDown, false);
    
    intersects = raycaster.intersectObject(circle);
    var faces = intersects;
    // for(var i = 0 ; i < faces.length; i++){
    //     var face = faces[i].face;
    //     var color = new THREE.Color("rgb(255, 200, 0)");
    //     face.color = color;
    //     console.log(face)
    //     geometry.colorsNeedUpdate = true;
    //     circle.geometry.colorsNeedUpdate = true;
    // }

    // function onMouseDown(event) {
    //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    //     raycaster.setFromCamera(mouse, camera);
    //     intersects = raycaster.intersectObject(circle);

    //     if (intersects.length == 0) return;

    //     face = new THREE.Mesh(face, facematerial)
    //     // var color = new THREE.Color("rgb(255, 0, 0)");
    //     // intersects[0].face.color = color.setHex(0x1A75F )
    //     // intersects[0].object.geometry.colorsNeedUpdate = true;
    //     circle.geometry.elementsNeedUpdate = true;
    //     console.log(face)
    // }

    let segments = 10;
    let rotateDegs = [];
    let deg = (360 / segments)
    while (segments > 0) {
        rotateDegs.push(deg * segments)
        segments = segments -1
    }

    console.log(rotateDegs.reverse())

    let numberOfClicks = 0;

    function animate() {
        requestAnimationFrame( animate );
        // circle.rotation.set(0, -Math.PI / 2, 0)
        // circle.position.set(-0.05, 0.005, 0)
        // show prize position
        // circle.rotation.z += -Math.PI * 3.49
        // circle.rotation.x += 0.01;
        // circle.rotation.z += 0.01;

        // let momentum = 2;
        // let momentumButSameTile = (Math.PI / 180 * (360 * momentum)) + (Math.PI / 180 * rotateDegs[5]);
        // if (circle.rotation.z < momentumButSameTile) {
        //     circle.rotation.z += 0.01;
        // }

        // circle.rotation.z = (Math.PI / 180 * rotateDegs[numberOfClicks])
        
        renderer.render( scene, camera );
        // controls.update()
    }

    animate()

    const controls = new TransformControls(camera, renderer.domElement)
    controls.attach(circle)
    // controls.showY = false;
    // controls.showX = false;
    controls.showZ = true;
    controls.setMode('rotate')
    scene.add(controls)
    controls.setSize(0)
    let raycasterCont = controls.getRaycaster()
    // console.log(raycasterCont)

    circle.on('click', () => {
        console.log('clicked')
        // circle.rotateOnAxis(z, 90)
        circle.rotateZ(90)
    })
    
    

    // document.addEventListener('click', () => {
    //     animate();
    //     if (numberOfClicks > 8) {
    //         numberOfClicks = 0
    //     } else {
    //         numberOfClicks = numberOfClicks + 1;
    //     }
    // })
   
    // const controls = new OrbitControls( camera, renderer.domElement );
    // const controls = new DragControls( objects, camera, renderer.domElement );
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.01;
    // controls.minPolarAngle = Math.PI/2;
    // controls.maxPolarAngle = Math.PI/2;
    camera.position.z = 2;

    // controls.addEventListener('dragstart', () => {
    //     console.log('drag')
    //     // animate();
    // })
    
    const container = document.querySelector('#scene-container');
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.render( scene, camera );
    container.append(renderer.domElement);

    

})