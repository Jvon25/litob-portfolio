import * as THREE from 'three';

/**
 * Simple Orbit Controls - Mouse-based 3D camera navigation
 * Left drag: rotate around target
 * Scroll: zoom in/out
 * Right drag: pan camera
 */
class SimpleOrbitControls {
    constructor(camera, domElement) {
        this.camera = camera;
        this.domElement = domElement;
        
        this.target = new THREE.Vector3(0, 12, 0);
        this.radius = 80;
        this.theta = 0;
        this.phi = Math.PI / 4;
        
        this.isDragging = false;
        this.isPanning = false;
        this.previousMousePosition = { x: 0, y: 0 };
        
        this.minRadius = 30;
        this.maxRadius = 200;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.domElement.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.domElement.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.domElement.addEventListener('mouseup', () => this.onMouseUp());
        this.domElement.addEventListener('wheel', (e) => this.onMouseWheel(e), { passive: false });
        this.domElement.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    onMouseDown(event) {
        this.previousMousePosition = { x: event.clientX, y: event.clientY };
        
        if (event.button === 0) {
            this.isDragging = true;
        } else if (event.button === 2) {
            this.isPanning = true;
        }
    }
    
    onMouseMove(event) {
        const deltaX = event.clientX - this.previousMousePosition.x;
        const deltaY = event.clientY - this.previousMousePosition.y;
        
        if (this.isDragging) {
            this.theta -= deltaX * 0.005;
            this.phi -= deltaY * 0.005;
            
            this.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.phi));
        }
        
        if (this.isPanning) {
            const panSpeed = 0.3;
            const right = new THREE.Vector3();
            const up = new THREE.Vector3(0, 1, 0);
            
            this.camera.getWorldDirection(new THREE.Vector3()).cross(up).normalize().multiplyScalar(deltaX * panSpeed);
            const panVector = new THREE.Vector3();
            panVector.addScaledVector(right, deltaX * panSpeed);
            panVector.addScaledVector(up, -deltaY * panSpeed);
            
            this.target.add(panVector);
        }
        
        this.previousMousePosition = { x: event.clientX, y: event.clientY };
        this.updateCamera();
    }
    
    onMouseUp() {
        this.isDragging = false;
        this.isPanning = false;
    }
    
    onMouseWheel(event) {
        event.preventDefault();
        
        const zoomSpeed = 0.1;
        if (event.deltaY > 0) {
            this.radius += this.radius * zoomSpeed;
        } else {
            this.radius -= this.radius * zoomSpeed;
        }
        
        this.radius = Math.max(this.minRadius, Math.min(this.maxRadius, this.radius));
        this.updateCamera();
    }
    
    updateCamera() {
        const x = this.target.x + this.radius * Math.sin(this.phi) * Math.cos(this.theta);
        const y = this.target.y + this.radius * Math.cos(this.phi);
        const z = this.target.z + this.radius * Math.sin(this.phi) * Math.sin(this.theta);
        
        this.camera.position.set(x, y, z);
        this.camera.lookAt(this.target);
    }
}

export function initControls(camera, domElement) {
    const controls = new SimpleOrbitControls(camera, domElement);
    controls.updateCamera();
    return controls;
}
