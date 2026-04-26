import * as THREE from 'three';
import gsap from 'gsap';
import { sounds } from './sounds.js';

// --- GLOBALS ---
let isZoomedIn = false;
let originalCameraPos = null;
let originalTarget = { x: 0, y: 0, z: 0 };
let computerModel = null;
let screenMesh = null;
let camera = null;
let controls = null;

export function setupInteractions(model, cameraParam, controlsParam, screenMeshParam) {
  computerModel = model;
  camera = cameraParam;
  controls = controlsParam;
  screenMesh = screenMeshParam;

  // Setup orbit controls for FREE movement in any perspective
  controls.enableRotate = true;
  controls.enableZoom = true;
  controls.enablePan = false;
  controls.minPolarAngle = Math.PI / 6;
  controls.maxPolarAngle = Math.PI / 1.8;
  controls.minAzimuthAngle = -Infinity;
  controls.maxAzimuthAngle = Infinity;
  controls.minDistance = 2;
  controls.maxDistance = 12;
  controls.dampingFactor = 0.08;

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  // Track mouse down position to distinguish click from drag
  let mouseDownPos = { x: 0, y: 0 };
  let isDragging = false;

  window.addEventListener('mousedown', (event) => {
    mouseDownPos.x = event.clientX;
    mouseDownPos.y = event.clientY;
    isDragging = false;
  });

  window.addEventListener('mousemove', (event) => {
    // If mouse moved more than 5 pixels, it's a drag, not a click
    const deltaX = Math.abs(event.clientX - mouseDownPos.x);
    const deltaY = Math.abs(event.clientY - mouseDownPos.y);
    if (deltaX > 5 || deltaY > 5) {
      isDragging = true;
    }
  });

  window.addEventListener('mouseup', (event) => {
    if (isDragging) return; // It was a drag, not a click

    // Update mouse position for click
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(computerModel.children, true);
    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      console.log('Clicked:', clickedObject.name || clickedObject.userData);

      // Check if screen was clicked
      if (
        clickedObject.name === 'monitor' ||
        clickedObject.userData?.clickable
      ) {
        if (!isZoomedIn) {
          zoomInToScreen();
        } else {
          zoomOutFromScreen();
        }
      }
    }
  });

  // ESC key to close desktop
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isZoomedIn) {
      zoomOutFromScreen();
    }
  });
}

// --- ZOOM FUNCTIONS ---
function zoomInToScreen() {
  if (isZoomedIn) {
    console.log('Already zoomed in');
    return;
  }
  console.log('Starting zoom in animation...');
  isZoomedIn = true;

  // Store original camera position
  originalCameraPos = camera.position.clone();
  originalTarget.x = controls.target.x;
  originalTarget.y = controls.target.y;
  originalTarget.z = controls.target.z;

  // Play zoom sound
  sounds.glitchyAlert();

  // Tween camera to screen
  gsap.to(camera.position, {
    x: 0,
    y: 0.5,
    z: 1.5,
    duration: 2.2,
    ease: 'power2.inOut'
  });

  // Tween FOV (zoom in)
  gsap.to(camera, {
    fov: 45,
    duration: 2.2,
    ease: 'power2.inOut',
    onUpdate: () => {
      camera.updateProjectionMatrix();
    }
  });

  // Tween orbit target
  gsap.to(controls.target, {
    x: 0,
    y: 0.5,
    z: 0,
    duration: 2.2,
    ease: 'power2.inOut'
  });

  // Show virtual desktop after animation
  setTimeout(() => {
    // Hide canvas to reveal Kali interface
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.style.visibility = 'hidden';
      canvas.style.pointerEvents = 'none';
    }
    
    const virtualDesktop = document.getElementById('virtual-desktop');
    if (virtualDesktop) {
      console.log('Showing virtual desktop...');
      virtualDesktop.classList.remove('hidden');
      virtualDesktop.classList.add('show');
      console.log('Classes applied:', virtualDesktop.className);
      
      try {
        setupPanelInteractions();
        console.log('Panel interactions set up');
      } catch (err) {
        console.error('Error setting up panels:', err);
      }
      
      try {
        updateClock();
        console.log('Clock updated');
      } catch (err) {
        console.error('Error updating clock:', err);
      }
    } else {
      console.error('virtual-desktop element not found!');
    }
  }, 2200);
}

function zoomOutFromScreen() {
  if (!isZoomedIn) {
    console.log('Not zoomed in');
    return;
  }
  console.log('Starting zoom out animation...');
  isZoomedIn = false;

  // Play exit sound
  sounds.connectionLost();

  // Hide virtual desktop
  const virtualDesktop = document.getElementById('virtual-desktop');
  if (virtualDesktop) {
    virtualDesktop.classList.remove('show');
    virtualDesktop.classList.add('hidden');
    console.log('Virtual desktop hidden');
  }

  // Show canvas again
  const canvas = document.querySelector('canvas');
  if (canvas) {
    canvas.style.visibility = 'visible';
    canvas.style.pointerEvents = 'auto';
  }

  // Tween camera back
  gsap.to(camera.position, {
    x: originalCameraPos.x,
    y: originalCameraPos.y,
    z: originalCameraPos.z,
    duration: 2.2,
    ease: 'power2.inOut'
  });

  // Tween FOV back
  gsap.to(camera, {
    fov: 60,
    duration: 2.2,
    ease: 'power2.inOut',
    onUpdate: () => {
      camera.updateProjectionMatrix();
    }
  });

  // Tween orbit target back
  gsap.to(controls.target, {
    x: originalTarget.x,
    y: originalTarget.y,
    z: originalTarget.z,
    duration: 2.2,
    ease: 'power2.inOut'
  });
}

// --- PANEL INTERACTIONS ---
function setupPanelInteractions() {
  // Sidebar icons
  const icons = {
    'icon-about': 'panel-about',
    'icon-skills': 'panel-skills',
    'icon-projects': 'panel-projects',
    'icon-reflections': 'panel-reflections',
    'icon-journeymap': 'panel-journeymap',
    'icon-creative': 'panel-creative',
    'icon-contact': 'panel-contact'
  };

  Object.entries(icons).forEach(([iconId, panelId]) => {
    const icon = document.getElementById(iconId);
    if (icon) {
      icon.addEventListener('click', () => {
        openPanel(panelId, iconId);
      });
    }
  });

  // Close buttons
  document.querySelectorAll('.kali-panel-close').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const panel = e.target.closest('.kali-panel');
      if (panel) {
        panel.classList.remove('active');
        sounds.terminalBell();
      }
    });
  });

  // Folder interactions
  document.querySelectorAll('.folder-item').forEach((item) => {
    item.addEventListener('click', () => {
      const targetPanel = item.getAttribute('data-target');
      if (targetPanel) {
        openPanel(targetPanel, 'icon-creative');
      }
    });
  });

  // Back buttons
  document.querySelectorAll('.kali-panel-back').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetPanel = btn.getAttribute('data-target');
      if (targetPanel) {
        openPanel(targetPanel, 'icon-creative');
      }
    });
  });

  // Virtual desktop close button
  const vdCloseBtn = document.getElementById('vd-close-btn');
  if (vdCloseBtn) {
    vdCloseBtn.addEventListener('click', () => {
      zoomOutFromScreen();
    });
  }
}

function openPanel(panelId, iconId) {
  // Hide all panels
  document.querySelectorAll('.kali-panel').forEach((panel) => {
    panel.classList.remove('active');
  });

  // Deactivate all icons
  document.querySelectorAll('.kali-sidebar-icon').forEach((icon) => {
    icon.classList.remove('active');
  });

  // Show selected panel
  const panel = document.getElementById(panelId);
  if (panel) {
    panel.classList.add('active');
    sounds.hackTyping();
  }

  // Activate selected icon
  const icon = document.getElementById(iconId);
  if (icon) {
    icon.classList.add('active');
  }
}

// --- CLOCK UPDATE ---
function updateClock() {
  const updateTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;

    const vdClock = document.getElementById('vd-clock');
    const tbClock = document.getElementById('tb-clock');
    if (vdClock) vdClock.textContent = timeStr;
    if (tbClock) tbClock.textContent = timeStr;
  };

  updateTime();
  setInterval(updateTime, 1000);
}
