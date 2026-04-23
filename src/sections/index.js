import { populateHero } from './hero.js'
import { populateAbout } from './about.js'
import { populateSkills } from './skills.js'
import { populateProjects } from './projects.js'
import { populateReflections } from './reflections.js'
import { populateCreative } from './creative.js'
import { populateContact } from './contact.js'
import { initDesktop } from '../ui/desktop.js'
import { setupPanelEventListeners } from '../ui/panel.js'

export async function populateAllSections(loadingManager) {
  // Populate all content sections
  await populateHero(loadingManager)
  await populateAbout(loadingManager)
  await populateSkills(loadingManager)
  await populateProjects(loadingManager)
  await populateReflections(loadingManager)
  await populateCreative(loadingManager)
  await populateContact(loadingManager)
  
  // Setup UI after all sections are populated
  setupPanelEventListeners()
  initDesktop()
}
