import { openSection } from './panel.js'

/* ========================================
   VIRTUAL DESKTOP ICON GRID
   ======================================== */

export function createDesktopIcons() {
  const container = document.getElementById('desktop-icons')
  container.innerHTML = '' // Clear existing
  
  const icons = [
    { id: 'desktop-about', label: 'About Me', section: 'about' },
    { id: 'desktop-skills', label: 'Skills', section: 'skills' },
    { id: 'desktop-projects', label: 'Projects', section: 'projects' },
    { id: 'desktop-reflections', label: 'Journals', section: 'reflections' },
    { id: 'desktop-creative', label: 'Creative', section: 'creative' },
    { id: 'desktop-contact', label: 'Contact', section: 'contact' }
  ]
  
  // Create icon grid layout (3 columns)
  const grid = document.createElement('div')
  grid.className = 'icon-grid'
  
  icons.forEach((icon) => {
    const iconElement = document.createElement('div')
    iconElement.className = 'desktop-icon'
    iconElement.id = icon.id
    iconElement.innerHTML = `
      <div class="icon-box">
        <div class="icon-symbol">📁</div>
      </div>
      <div class="icon-label">${icon.label}</div>
    `
    
    iconElement.addEventListener('click', (e) => {
      e.stopPropagation()
      openSection(icon.section)
    })
    
    grid.appendChild(iconElement)
  })
  
  container.appendChild(grid)
}

/* ========================================
   INITIALIZE DESKTOP ON LOAD
   ======================================== */

export function initDesktop() {
  createDesktopIcons()
}
