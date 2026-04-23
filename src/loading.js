// Loading screen management
import { sounds } from './sounds.js';

export function initializeLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  const startupScreen = document.getElementById('startup-screen');
  const startupBtn = document.getElementById('startup-btn');
  const progressFill = document.getElementById('progress-fill');
  const loadingPercentage = document.getElementById('loading-percentage');
  const loadingStatus = document.getElementById('loading-status');

  let progress = 0;
  const startTime = Date.now();
  const minimumDuration = 5000; // 5 seconds minimum

  const statuses = [
    'Initializing system kernel',
    'Loading security modules',
    'Mounting file systems',
    'Establishing network',
    'Validating certificates',
    'System ready'
  ];
  let currentStatusIndex = 0;

  // Simulate loading progress
  const loadingInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress_percent = (elapsed / minimumDuration) * 100;

    // Fill to 100% over 5 seconds
    progress = Math.min(progress_percent, 100);

    // Update progress bar and percentage
    progressFill.style.width = progress + '%';
    loadingPercentage.textContent = Math.floor(progress) + '%';

    // Change status text based on progress
    const statusIndex = Math.floor((progress / 100) * (statuses.length - 1));
    if (statusIndex > currentStatusIndex && statusIndex < statuses.length) {
      currentStatusIndex = statusIndex;
      loadingStatus.textContent = statuses[currentStatusIndex];
    }

    // When loading reaches 100%, show startup screen
    if (progress >= 100) {
      clearInterval(loadingInterval);
      showStartupScreen();
    }
  }, 100);

  function showStartupScreen() {
    // Hide loading screen
    loadingScreen.classList.add('hidden');
    // Show startup screen immediately
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      startupScreen.style.display = 'flex';
      // Trigger opacity transition
      setTimeout(() => {
        startupScreen.classList.add('show');
      }, 10);
    }, 300);
  }

  // Handle START button click - Start 3D animation and transition
  startupBtn.addEventListener('click', async () => {
    // Play data stream whoosh (initiating hack)
    sounds.dataWhoosh();
    
    try {
      // Import scene module to start animation
      const { startAnimation } = await import('./scene.js');
      startAnimation();
    } catch (err) {
      console.error('Error starting animation:', err);
    }

    startupScreen.classList.remove('show');
    startupScreen.classList.add('hidden');
    
    setTimeout(() => {
      startupScreen.style.display = 'none';
      // Show portfolio
      const hintText = document.getElementById('hint-text');
      const portfolioName = document.getElementById('portfolio-name');
      if (hintText) {
        hintText.classList.add('show');
      }
      if (portfolioName) {
        portfolioName.classList.add('show');
      }
    }, 1000);
  });

  return {
    complete: () => {
      clearInterval(loadingInterval);
      progress = 100;
      progressFill.style.width = '100%';
      loadingPercentage.textContent = '100%';
      loadingStatus.textContent = 'System ready';
      showStartupScreen();
    }
  };
}

export function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  const startupScreen = document.getElementById('startup-screen');
  if (loadingScreen) {
    loadingScreen.classList.add('hidden');
  }
  if (startupScreen) {
    startupScreen.classList.add('hidden');
  }
  setTimeout(() => {
    if (loadingScreen) loadingScreen.style.display = 'none';
    if (startupScreen) startupScreen.style.display = 'none';
  }, 1000);
}
