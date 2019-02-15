
//// MOUSE HANDLING ////

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

////////////////////////

//// SKETCH ////

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.y = 200;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById("sketch-container").appendChild( renderer.domElement );

const clock = new THREE.Clock;

// Plano texturado con shader de sangría
let sangria;

// instantiate a loader
const loader = new THREE.TextureLoader();

// load a resource
const loadTexture = url => {
    return new Promise( (resolve, reject) => {
        loader.load(
            url,
        
            // onLoad callback
            function ( texture ) {
                // in this example we create the material when the texture is loaded
                resolve(texture);
            },
        
            // onProgress callback currently not supported
            undefined,
        
            // onError callback
            function ( err ) {
                reject(err);
            }
        );
    });
}


const init = async () => {

    // ESTRELLAS
    const starsMaterials = [
        new THREE.PointsMaterial( { color: 0x888888, size: 2, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x888888, size: 1, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x555555, size: 2, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x555555, size: 3, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0x3a3a3a, size: 1, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0xfafafa, size: 2, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0xf4f4f4, size: 2, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: 0xdadada, size: 1, sizeAttenuation: false } )
    ];

    const starsGeometry = new THREE.Geometry();
    starsGeometry.vertices = tabulate(1000, i => {
        const vector = randomVector();
        vector.multiplyScalar(randBetween(100, 3000));
        return vector;
    });

    starsMaterials.forEach( material => {
        const stars = new THREE.Points( starsGeometry, material );
        const eulerAngs = randomUnitVector();
        stars.rotation.x = eulerAngs.x;
        stars.rotation.y = eulerAngs.y;
        stars.rotation.z = eulerAngs.z;
        
        stars.matrixAutoUpdate = false;
        stars.updateMatrix();

        scene.add(stars);
    });

    // SANGRIA

    const jarraAlpha = await loadTexture('../img/jarraAlpha2.png');
    const jarraMask = await loadTexture('../img/jarraMask2.png');

    const sangriaGeometry = new THREE.PlaneGeometry(1, 1);
    const sangriaMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 },
            timeMultiplier: { value: 2.0 },
            wineFill: { value: 0.8 },
            jarraTex: { type: 't', value: jarraAlpha },
            jarraMask: { type: 't', value: jarraMask },
        },

        vertexShader: document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
    });
    sangriaMaterial.transparent = true;

    sangria = new THREE.Mesh(sangriaGeometry, sangriaMaterial);
    sangria.position.z = -1;

    const scrollSpeed = 0.0001;
    const cameraSpeed = 0.1;
    document.addEventListener('wheel', e => {
        const wineFill = sangria.material.uniforms.wineFill.value;
        camera.position.y -= e.deltaY * cameraSpeed;
        sangria.material.uniforms.wineFill.value = constrain(wineFill - e.deltaY * scrollSpeed, 0.2, 0.8);
    });

    scene.add(sangria);
    
    animate();
}

const animate = () => {
    requestAnimationFrame( animate );

    updateSangria();

    sangria.position.y = camera.position.y;

    renderer.render( scene, camera );
}

const updateSangria = () => {
    sangria.material.uniforms.time.value += clock.getDelta();
}

init();

