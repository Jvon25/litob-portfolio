import * as THREE from 'three';
import gsap from 'gsap';

// Import Three.js scene setup
import { initScene, renderScene, getScene, getRenderer } from './scene.js';
import { initCamera, resetCameraPosition } from './camera.js';
import { initInteractions } from './interactions.js';
import { initControls } from './controls.js';
import { closePanel } from './ui/panel.js';

// Import all section content generators
import { generateHeroContent } from './sections/hero.js';
import { generateAboutContent } from './sections/about.js';
import { generateSkillsContent } from './sections/skills.js';
import { generateProjectsContent } from './sections/projects.js';
import { generateReflectionsContent } from './sections/reflections.js';
import { generateCreativeContent } from './sections/creative.js';
import { generateContactContent } from './sections/contact.js';

/**
 * Main Application Entry Point
 * Initializes all systems and starts the rendering loop
 */

let isLoading = true;

// Initialize application
async function init() {
    console.log('🚀 Initializing 3D Portfolio...');

    // Setup camera first (needed by scene)
    initCamera();
    console.log('✓ Camera initialized');

    // Initialize Three.js scene
    const containerElement = document.getElementById('canvas-container');
    initScene(containerElement);
    console.log('✓ Scene initialized');

    // Setup raycaster and click interactions
    initInteractions();
    console.log('✓ Interactions initialized');

    // Setup camera controls (mouse drag, scroll zoom, right-click pan)
    initControls(window.portfolioCamera, containerElement);
    console.log('✓ Camera controls initialized - Drag to rotate, scroll to zoom, right-click to pan');

    // Register section content generators globally
    window.portfolioSections = {
        hero: generateHeroContent,
        about: generateAboutContent,
        skills: generateSkillsContent,
        projects: generateProjectsContent,
        reflections: generateReflectionsContent,
        creative: generateCreativeContent,
        contact: generateContactContent
    };
    console.log('✓ Section generators registered');

    // Setup audio toggle button
    setupAudioToggle();
    console.log('✓ Audio toggle setup');

    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
    console.log('✓ Keyboard shortcuts setup');

    // Simulate loading progress
    simulateLoadingProgress();

    // Start rendering loop
    startAnimationLoop();

    console.log('✅ Portfolio loaded successfully!');
    console.log('💡 Tip: Click on 3D objects to view portfolio sections');
}

/**
 * Setup audio toggle button (bottom-right)
 */
function setupAudioToggle() {
    const audioToggle = document.getElementById('audio-toggle');
    const audio = document.getElementById('ambient-audio');

    audioToggle.addEventListener('click', () => {
        if (audio.muted) {
            audio.muted = false;
            audio.play().catch(e => console.log('Audio play failed:', e));
            audioToggle.classList.remove('muted');
            audioToggle.title = 'Mute ambient music';
        } else {
            audio.muted = true;
            audio.pause();
            audioToggle.classList.add('muted');
            audioToggle.title = 'Unmute ambient music';
        }
    });

    // Audio starts muted
    audio.muted = true;
    audioToggle.classList.add('muted');
}

/**
 * Setup keyboard shortcuts
 * ESC = close panel and reset camera
 */
function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePanel();
            resetCameraPosition();
        }
    });
}

/**
 * Simulate loading progress and hide loading screen
 */
function simulateLoadingProgress() {
    const progressFill = document.getElementById('progress-fill');
    const loadingScreen = document.getElementById('loading-screen');

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;

        progressFill.style.width = progress + '%';

        if (progress === 100) {
            clearInterval(interval);

            // Hide loading screen after brief delay
            setTimeout(() => {
                gsap.to(loadingScreen, {
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    onComplete: () => {
                        loadingScreen.style.display = 'none';
                        isLoading = false;
                    }
                });
            }, 500);
        }
    }, 100);
}

/**
 * Start rendering loop
 * Continuously renders the 3D scene and updates animations
 */
function startAnimationLoop() {
    function animate() {
        requestAnimationFrame(animate);

        // Update particle effects
        if (window.animateParticles) {
            window.animateParticles();
        }

        // Render scene
        renderScene();
    }
    animate();
}

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', init);
