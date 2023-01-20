import { DragControls } from "three/examples/jsm/controls/DragControls";

export function dragControls(canvas,dragAction,object, renderer, scene, camera) {  
    var mouseDown = false,
        mouseX = 0,
        mouseY = 0;
        
    console.log('mouseevents',canvas,object)
    
    canvas.addEventListener('pointermove', function (evt) {
            if (!mouseDown) {return}
            //console.log('drag')
            evt.preventDefault();
            var deltaX = evt.clientX - mouseX,
                deltaY = evt.clientY - mouseY;
            mouseX = evt.clientX;
            mouseY = evt.clientY;
            dragAction(deltaX, deltaY, object, canvas);
            render(renderer, scene, camera) 
        }, false);
        
    canvas.addEventListener('pointerdown', function (evt) {
        console.log('pointerdown')
        evt.preventDefault();
        mouseDown = true;
        mouseX = evt.clientX;
        mouseY = evt.clientY;
    }, false);
    
    canvas.addEventListener('pointerup', function (evt) {
        console.log('pointerup')
        evt.preventDefault();
        mouseDown = false;
    }, false);
}

function render(renderer, scene, camera) {
    renderer.render(scene, camera);
}

export function dragAction(deltaX, deltaY, object, renderer, scene, camera) {
    object.rotateZ(-deltaY / 100);
    // object.rotation.x += deltaY / 100;
}


// export default dragAction;