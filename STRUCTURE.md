# Project Structure & Architecture

## 📁 Complete File Tree

```
portfolio/
├── public/                          # Static assets
│   ├── images/                      # User photos & creative works
│   ├── models/                      # 3D model files (.glb, .gltf)
│   ├── textures/                    # Texture maps
│   └── sounds/                      # Ambient audio (optional)
│
├── src/                             # Source code
│   ├── main.js                      # ⭐ App initialization & render loop
│   ├── scene.js                     # 3D scene & all desk objects
│   ├── camera.js                    # OrbitControls & camera functions
│   ├── interactions.js              # Raycaster & click handling
│   │
│   ├── sections/                    # Portfolio content modules
│   │   ├── index.js                 # Section loader & initializer
│   │   ├── hero.js                  # Hero/intro section
│   │   ├── about.js                 # About me section
│   │   ├── skills.js                # Technical skills section
│   │   ├── projects.js              # Projects showcase
│   │   ├── reflections.js           # Journal entries
│   │   ├── creative.js              # Creative works gallery
│   │   └── contact.js               # Contact & social links
│   │
│   └── ui/                          # UI components
│       ├── desktop.js               # Virtual desktop icons
│       ├── panel.js                 # Panel open/close logic
│       └── overlay.css              # All panel & UI styles
│
├── index.html                       # ⭐ Main HTML file
├── style.css                        # ⭐ Global styles
├── vite.config.js                   # Vite build configuration
├── package.json                     # Dependencies & scripts
├── .gitignore                       # Git ignore patterns
│
├── README.md                        # Full documentation
├── QUICKSTART.md                    # Quick start guide
├── DEPLOYMENT.md                    # Deployment instructions
└── STRUCTURE.md                     # This file
```

## 🔄 Data Flow

```
index.html
    ↓
main.js (initializes)
    ├─→ scene.js (create 3D objects)
    ├─→ camera.js (setup OrbitControls)
    ├─→ interactions.js (setup Raycaster)
    ├─→ sections/index.js (load content)
    │   ├─→ Each section/*.js
    │   └─→ ui/panel.js (setup listeners)
    └─→ ui/desktop.js (create icons)
```

## 📝 File Descriptions

### Core Application Files

#### `index.html`
- HTML structure
- Canvas element
- Section panel containers
- Script imports & CDN links
- Font imports from Google Fonts

#### `style.css`
- Global styles & CSS variables
- Loading screen styles
- Canvas styling
- Responsive design rules

#### `vite.config.js`
- Vite dev server configuration
- Build output settings
- ES module mappings

#### `package.json`
- Project metadata
- npm scripts (dev, build)
- Dependencies: Three.js, GSAP, Vite

### Application Logic

#### `src/main.js` ⭐ **CRITICAL**
- WebGL Renderer setup
- Scene initialization
- Camera & OrbitControls creation
- Animation loop (requestAnimationFrame)
- Window resize handler
- Exports: scene, camera, renderer, getOrbitControls()

**Key Functions:**
```javascript
init()              // Initializes app
animate()           // Main render loop
onWindowResize()    // Handles window resize
```

#### `src/scene.js`
- Creates Three.js Scene
- Sets background, fog, lighting
- Creates 3D desk objects:
  - Monitor (primary interactive object)
  - Keyboard, Mouse, Books
  - Coffee Cup, Lamp
  - Desk Surface
- Each object has `mesh.name` for Raycaster

**Key Functions:**
```javascript
setupScene()        // Returns configured scene
setupLighting()     // Creates lights
createMonitor()     // Main clickable object
// ... other object creators
```

#### `src/camera.js`
- Creates perspective camera
- Sets up OrbitControls with exact settings:
  - Rotation limits: azimuth ±60°, polar 60-100°
  - Zoom: 2-8 units
  - Damping for smooth feel
- Camera zoom functions for monitor focus

**Key Functions:**
```javascript
setupCamera()           // Returns {camera, orbitControls}
zoomToMonitor()        // GSAP tween to monitor
zoomBackFromMonitor()  // GSAP tween back out
zoomToObject()         // Generic zoom to any object
```

#### `src/interactions.js`
- Three.js Raycaster setup
- Click event listener for clicking objects
- Hover effect (cursor change to pointer)
- Routes clicks to appropriate handlers

**Key Functions:**
```javascript
setupInteractions()  // Main setup
showDesktopOverlay() // Shows desktop icons
hideDesktopOverlay() // Hides desktop icons
```

### UI Components

#### `src/ui/panel.js`
- GSAP animations for panel open/close
- Loading manager setup (progress bar)
- Panel event listeners
- Handles zoom back when closing

**Key Functions:**
```javascript
setupLoadingManager()  // Returns LoadingManager
openSection()          // Fade in panel + GSAP
closeSection()         // Fade out panel + zoom back
setupPanelEventListeners()  // Setup close buttons
```

#### `src/ui/desktop.js`
- Creates virtual desktop icon grid
- Dynamically generates icons
- Attaches click listeners to icons

**Key Functions:**
```javascript
createDesktopIcons()  // Generate icons
initDesktop()         // Initialize desktop
```

#### `src/ui/overlay.css`
- Panel container styles
- Desktop icon grid styles
- Skill badges, project cards, journal entries
- Contact links, creative card layouts
- Scrollbar styling
- Responsive breakpoints (768px, 480px)

### Content Sections

#### `src/sections/index.js`
- Imports all section populators
- Calls each populateFunction()
- Initializes UI components
- Ensures correct load order

#### `src/sections/hero.js`
- Portfolio intro section
- Name, title, school, track
- TODO placeholders for customization

#### `src/sections/about.js`
- Bio and background
- Photo placeholder
- Interests and goals
- TODO placeholders

#### `src/sections/skills.js`
- Technical skills grid
- Tools & platforms grid
- Soft skills section
- Proficiency levels

#### `src/sections/projects.js`
- Project cards (3-4 projects)
- Project title, description, tech used
- Links to GitHub/demo
- Development process
- TODO placeholders

#### `src/sections/reflections.js`
- Journal entry cards
- Date, title, content for each entry
- Serif font (Lora) for journal feel
- 3-5 sample entries

#### `src/sections/creative.js`
- Creative works gallery (masonry grid)
- Image placeholders
- Title, type, description per work
- TODO: Image ownership reminders

#### `src/sections/contact.js`
- Platform-based contact links
- GitHub, LinkedIn, Facebook, Twitter
- NO personal email/phone
- RA 10173 compliance statement

## 🎮 User Interaction Flow

```
1. User loads portfolio
   ↓ (Loading screen appears with progress bar)
   
2. 3D scene renders
   ↓ (User sees desk setup from default camera angle)
   
3. User explores with mouse controls
   ├─ LEFT DRAG: Rotate scene
   ├─ SCROLL: Zoom in/out
   └─ RIGHT DRAG: Pan camera
   
4. User hovers over clickable object
   └─ Cursor changes to pointer
   
5. User clicks monitor
   ├─ Raycaster detects click
   ├─ GSAP tweens camera toward monitor
   ├─ Desktop overlay shows with icons
   └─ Desktop icons visible
   
6. User clicks desktop icon (e.g., "About Me")
   ├─ Panel fades in with GSAP
   └─ Content displayed
   
7. User clicks close button
   ├─ Panel fades out
   ├─ GSAP tweens camera back out
   ├─ Desktop overlay hidden
   └─ OrbitControls re-enabled
   
8. User can click other objects
   └─ Direct panel opens (no desktop)
```

## 🔧 Import/Export Chain

```
main.js (entry point)
  ├─ imports: scene.js
  ├─ imports: camera.js
  ├─ imports: interactions.js
  │   └─ imports: camera.js (zoomToMonitor, zoomBack)
  │   └─ imports: ui/panel.js (openSection)
  │   └─ imports: interactions.js (hideDesktopOverlay)
  │
  └─ imports: sections/index.js
      ├─ imports: sections/*.js (all populators)
      ├─ imports: ui/desktop.js
      │   └─ imports: ui/panel.js (openSection)
      └─ imports: ui/panel.js (setupPanelEventListeners)
```

## 📊 State Management

**Global State (via exports):**
- scene (Three.js Scene object)
- camera (Three.js Camera object)
- renderer (Three.js Renderer)
- orbitControls (OrbitControls instance)

**DOM State:**
- .hidden class on panels (show/hide)
- opacity via GSAP animations

**UI State:**
- Section panels (7 total)
- Desktop overlay
- Loading screen

## 🎨 Styling System

**CSS Variables (`:root`):**
```css
--bg-dark: #0a0a0a              /* Dark background */
--primary-accent: #2779a7       /* Blue */
--secondary-accent: #49c5b6     /* Teal */
--text-light: #f0f0f0           /* Light text */
--panel-bg: rgba(10,10,10,0.95) /* Panel background */
--glow: #7df9ff                 /* Cyan glow */
```

**Font Stack:**
- Headings: Space Grotesk
- Body: Inter
- Journals: Lora (serif)

## 🚀 Build & Deploy

**Development:**
```bash
npm run dev      # Start Vite dev server
```

**Production:**
```bash
npm run build    # Creates optimized dist/
npm run preview  # Preview production build locally
```

**Deployment Targets:**
- GitHub Pages
- Vercel
- Netlify

---

## 🔑 Key Technical Decisions

1. **Three.js** — For 3D rendering with WebGL
2. **Vite** — Fast ES modules build tool
3. **OrbitControls** — Professional camera controls
4. **Raycaster** — 3D object click detection
5. **GSAP** — Smooth animations
6. **Vanilla JS** — No framework overhead
7. **CSS Grid** — Responsive layouts

---

## 📈 Performance Optimizations

- Soft shadows (PCFSoftShadowMap)
- SRGB color encoding
- Tone mapping for realistic colors
- Responsive pixel ratio
- Module bundling with Vite
- Minified production builds

---

## 🎯 Next Steps After Setup

1. ✅ Customize all [BRACKET] values
2. ✅ Add your photos to `public/images/`
3. ✅ Test locally with `npm run dev`
4. ✅ Build with `npm run build`
5. ✅ Deploy to GitHub Pages, Vercel, or Netlify

See **DEPLOYMENT.md** for detailed deployment instructions.

---

Created: April 2025
Updated: April 2025
