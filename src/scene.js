import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { setupInteractions } from './interactions.js';
import { initializeLoadingScreen } from './loading.js';
import { sounds } from './sounds.js';
import gsap from 'gsap';

// Initialize loading screen
initializeLoadingScreen();

// --- SCENE ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a12);
scene.fog = null;

// --- CAMERA ---
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.5, 5);
camera.lookAt(0, 0, 0);

// --- RENDERER ---
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

// --- ORBIT CONTROLS ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableRotate = true;
controls.rotateSpeed = 0.5;
controls.enableZoom = true;
controls.zoomSpeed = 0.8;
controls.minDistance = 2;
controls.maxDistance = 10;
controls.enablePan = false;
controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = Math.PI / 2;
controls.minAzimuthAngle = -Math.PI / 2.5;
controls.maxAzimuthAngle = Math.PI / 2.5;
controls.target.set(0, 0, 0);
controls.update();

// --- LIGHTS ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
mainLight.position.set(2, 4, 4);
mainLight.castShadow = true;
scene.add(mainLight);

const leftFill = new THREE.DirectionalLight(0xffffff, 0.6);
leftFill.position.set(-3, 2, 2);
scene.add(leftFill);

const screenGlow = new THREE.PointLight(0x88ccff, 1.5, 4);
screenGlow.position.set(0, 0.5, 1.2);
scene.add(screenGlow);

const rimLight = new THREE.DirectionalLight(0xffeedd, 0.4);
rimLight.position.set(0, 3, -5);
scene.add(rimLight);

// --- LOAD GLB MODEL ---
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  'https://www.gstatic.com/draco/versioned/decoders/1.5.6/'
);

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

let computerModel = null;
let screenMesh = null;

gltfLoader.load(
  '/models/old-computer.glb',
  (gltf) => {
    console.log('✅ Model loaded successfully');
    computerModel = gltf.scene;
    computerModel.scale.set(2, 2, 2);
    computerModel.position.set(0, -1.5, 0);
    computerModel.rotation.y = Math.PI / 6;

    computerModel.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.name === 'CRTmonitorShape_CRTscreen_Material_0') {
          screenMesh = child;
          screenMesh.name = 'monitor';
          if (screenMesh.material) {
            screenMesh.material.emissive = new THREE.Color(0x2255ff);
            screenMesh.material.emissiveIntensity = 0.3;
            screenMesh.material.needsUpdate = true;
          }
        }
      }
    });

    scene.add(computerModel);
    setupInteractions(computerModel, camera, controls, screenMesh);
  },
  (progress) => {
    if (progress.total > 0) {
      const pct = Math.round((progress.loaded / progress.total) * 100);
      console.log('Loading:', pct + '%');
    }
  },
  (error) => {
    console.error('❌ Model load error:', error);
  }
);

// --- RESIZE HANDLER ---
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// --- ANIMATION LOOP STATE ---
let isAnimating = false;
let audioEnabled = true;

// --- ANIMATION LOOP ---
function animate() {
  requestAnimationFrame(animate);
  // Always update controls (for free rotation)
  controls.update();
  // Always render the scene
  renderer.render(scene, camera);
}
animate();

export { scene, camera, renderer, controls, screenMesh, isAnimating };

export function startAnimation() {
  const canvas = document.querySelector('canvas');
  if (canvas) {
    canvas.style.visibility = 'visible';
  }
  
  if (audioEnabled) {
    sounds.startAmbientBackground();
  }
}

export function stopAnimation() {
  sounds.stopAmbientBackground();
}
