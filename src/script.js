import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

    init();
    
    function init() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.set( 0, 0, 1.5 );

        const container = document.querySelector('#scene-container');
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.append(renderer.domElement);
        
        const controls = new OrbitControls(camera, renderer.domElement)
        // const controls = new TransformControls(camera, renderer.domElement)
        
        var mesh=[];

        let wheel = new THREE.Object3D();
        function loadObject(){
            const loader = new GLTFLoader();
            loader.load( './wheel.glb', function ( glb ) {
                wheel = glb.scene;
                
                wheel.rotation.x = 0.02;
                wheel.rotateY(-0.6613919996057788)
                
                wheel.inner = glb.scene.children[0]
                // wheel.second = wheel.first.scene.child

                scene.add( wheel );

                // scene.add(wheel.inner)

                console.log(wheel.inner)

                // wheel.inner.position.set( center.x, center.y, center.z );
                // wheel.inner.geometry.applyMatrix(new THREE.Matrix4().makeTranslation( -center.x, -center.y, -center.z ) );
                
                // glb.scene.traverse(function(child) {
                //     if(child.isMesh){ mesh[child.name]=child; }
                // })

                let box = new THREE.Box3().setFromObject(wheel.inner);
                var center = new THREE.Vector3();
            // let offset = box.center();
            console.log(center)
            wheel.inner.geometry = wheel.geometry;
            // wheel.inner.geometry.center();

            // wheel.inner.position.x = offset.x;
            // wheel.inner.position.y = offset.y;
            // wheel.inner.position.z = offset.z;


                // mesh.Wheel_Inner.rotation.z = 9;
            }, undefined, function ( error ) {
                console.error( error );
            } );
        }

        loadObject();

        const light = new THREE.DirectionalLight(0xffffff, 1)
        light.position.set(1, 1, 50)
        scene.add(light)

        
        
        function spin() {
            console.log(wheel)
            wheel.rotation.z += 0.1;
            renderer.render( scene, camera );
        }

        function initialAnimate() {
            requestAnimationFrame( initialAnimate );
            renderer.render( scene, camera );
        }

        initialAnimate();

        let segments = 8;
        let rotateDegs = [];
        let deg = (360 / segments)
        while (segments > 0) {
            rotateDegs.push(deg * segments)
            segments = segments -1
        }

        function animate() {
            requestAnimationFrame( animate );
            let momentum = 5;
            let momentumButSameTile = (Math.PI / 180 * (360 * momentum)) + (Math.PI / 180 * (rotateDegs[3]));

            

            if (wheel.rotation.x < momentumButSameTile ) {
                // wheel.rotation.z += 0.01;
                wheel.inner.rotation.z += 0.01;
                // wheel.inner.rotateOnAxis(new THREE.Vector3(0,0,1), 0.01); 
                // wheel.inner.rotateOnAxis(new THREE.Vector3(0,1,0), 0.01)
            }
            renderer.render( scene, camera );
        }
        
        // requestAnimationFrame( animate );
        // renderer.render( scene, camera );
        

        document.addEventListener('click', () => {
            // spin()
            animate()
        })
    }

    
