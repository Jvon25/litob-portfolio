// Web Audio API sound effects
// Hacker-themed sounds for portfolio interactions

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Resume audioContext on first user interaction (browser security requirement)
const resumeAudioContext = () => {
  if (audioContext.state === 'suspended') {
    audioContext.resume();
    console.log('✅ Audio context resumed');
  }
};

// Listen for any user interaction to resume audio
document.addEventListener('click', resumeAudioContext, { once: true });
document.addEventListener('touchstart', resumeAudioContext, { once: true });

// Master volume for all sounds
const MASTER_VOLUME = 0.5; // Increased for better audibility

// Background ambient sound
let ambientOscillators = [];
let ambientGains = [];
let isAmbientPlaying = false;

// Real audio file (Hackerkaba.mp3) - use simple HTML Audio element
let ambientAudioElement = null;

export const sounds = {
  // Ambient hacker workspace background - Hackerkaba.mp3 only
  startAmbientBackground: () => {
    // Resume audio context if needed
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    if (isAmbientPlaying) return; // Prevent multiple instances
    isAmbientPlaying = true;
    
    console.log('🎵 Starting Hackerkaba ambient audio...');
    
    // Create HTML Audio element for Hackerkaba.mp3
    if (!ambientAudioElement) {
      ambientAudioElement = new Audio();
      ambientAudioElement.src = '/sounds/Hackerkaba.mp3';
      ambientAudioElement.loop = true;
      ambientAudioElement.preload = 'auto';
      ambientAudioElement.volume = 0.1; // 10% volume - presentation-safe
    }
    
    // Play the audio
    if (ambientAudioElement.paused) {
      ambientAudioElement.currentTime = 0;
      const playPromise = ambientAudioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('⚠️ Could not play Hackerkaba.mp3:', err);
        });
      }
    }
  },

  stopAmbientBackground: () => {
    isAmbientPlaying = false;
    
    // Stop the real audio file
    if (ambientAudioElement) {
      ambientAudioElement.pause();
      ambientAudioElement.currentTime = 0;
    }
  },

  // Glitchy system alert - zoom in (unauthorized access alert)
  glitchyAlert: () => {
    const now = audioContext.currentTime;
    
    // Create multiple oscillators for glitchy effect
    for (let i = 0; i < 3; i++) {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      // Random pitch jumps for glitch effect
      const startFreq = 200 + Math.random() * 600;
      const endFreq = 150 + Math.random() * 700;
      
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.08);
      
      gain.gain.setValueAtTime(MASTER_VOLUME * 0.25, now + i * 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      
      osc.start(now + i * 0.03);
      osc.stop(now + 0.15);
    }
  },

  // Rapid typing - sidebar clicks (executing commands)
  hackTyping: () => {
    const now = audioContext.currentTime;
    
    // Rapid short clicks like mechanical keyboard
    for (let i = 0; i < 3; i++) {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      // High pitch for keystroke
      osc.frequency.setValueAtTime(800 + i * 100, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);
      
      gain.gain.setValueAtTime(MASTER_VOLUME * 0.3, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      
      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.05);
    }
  },

  // Terminal bell - panel close (command complete)
  terminalBell: () => {
    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    // Classic Unix bell: 1000 Hz
    osc.frequency.setValueAtTime(1000, now);
    osc.frequency.setValueAtTime(1000, now + 0.15);
    
    gain.gain.setValueAtTime(MASTER_VOLUME * 0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.start(now);
    osc.stop(now + 0.15);
  },

  // Data stream whoosh - START button (initiating hack)
  dataWhoosh: () => {
    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    // Sweeping pitch effect (ascending whoosh)
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.4);
    
    gain.gain.setValueAtTime(MASTER_VOLUME * 0.32, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    osc.start(now);
    osc.stop(now + 0.4);
  },

  // Close/exit sound - zoom out (connection severed)
  connectionLost: () => {
    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    // Descending pitch (disconnection)
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.2);
    
    gain.gain.setValueAtTime(MASTER_VOLUME * 0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    
    osc.start(now);
    osc.stop(now + 0.2);
  }
};

export default sounds;

