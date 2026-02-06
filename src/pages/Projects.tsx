import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { PageTransition, itemVariants } from '../components/PageTransition'
import { ProjectModal } from '../components/ProjectModal'
import { PROJECTS } from '../data'
import { fetchProjectMedia } from '../utils/projectMedia'
import './Projects.css'

// Projects with media (App Store, website, or Play Store screenshots) - shown first
const PROJECTS_WITH_ICONS = PROJECTS.filter(
  (p) => p.appStore || (p.playStore && p.screenshotSource === 'playstore') || p.screenshotSource === 'website'
).sort((a, b) => {
  const aBoth = a.appStore && a.playStore ? 1 : 0
  const bBoth = b.appStore && b.playStore ? 1 : 0
  return bBoth - aBoth // Both links first
})
// Projects without media - shown at bottom of page
const PROJECTS_WITHOUT_ICONS = PROJECTS.filter(
  (p) => !p.appStore && !(p.playStore && p.screenshotSource === 'playstore') && p.screenshotSource !== 'website'
)

export function Projects() {
  const gridRef = useRef(null)
  const isInView = useInView(gridRef, { once: true, margin: '-50px' })
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null)
  const [icons, setIcons] = useState<Record<string, string>>({})
  const [descriptions, setDescriptions] = useState<Record<string, string>>({})

  // Lazy load app icons and descriptions from App Store in batches (5 at a time)
  useEffect(() => {
    const appsWithStore = PROJECTS_WITH_ICONS
    let index = 0
    const batchSize = 5

    const fetchBatch = async () => {
      const batch = appsWithStore.slice(index, index + batchSize)
      const results = await Promise.all(
        batch.map(async (p) => {
          const media = await fetchProjectMedia(p)
          return {
            name: p.name,
            icon: media?.icon || null,
            description: media?.description || null,
          }
        })
      )
      setIcons((prev) => {
        const next = { ...prev }
        results.forEach((r) => r.icon && (next[r.name] = r.icon))
        return next
      })
      setDescriptions((prev) => {
        const next = { ...prev }
        results.forEach((r) => r.description && (next[r.name] = r.description))
        return next
      })
      index += batchSize
      if (index < appsWithStore.length) {
        setTimeout(fetchBatch, 300)
      }
    }
    fetchBatch()
  }, [])

  return (
    <PageTransition className="page projects-page">
      <div className="page-content page-content-wide">
        <motion.h2 className="section-title" variants={itemVariants}>
          Projects
        </motion.h2>
        <p className="projects-hint">Click on any project to view App Store screenshots</p>
        <div className="projects-grid" ref={gridRef}>
          {PROJECTS_WITH_ICONS.map((project, i) => (
            <motion.article
              key={project.name}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4, boxShadow: '0 0 30px var(--accent-glow)' }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-card-preview">
                {icons[project.name] ? (
                  <img src={icons[project.name]} alt="" className="project-card-icon" referrerPolicy="no-referrer" />
                ) : (
                  <div className="project-card-placeholder">
                    <span>📱</span>
                  </div>
                )}
                <span className="project-card-view">View screenshots</span>
              </div>
              <div className="project-title">
                {project.name}
                <span className="project-role">{project.role}</span>
              </div>
              <p className="project-desc">{descriptions[project.name] || project.desc}</p>
              <div className="project-tech">
                {project.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              {(project.appStore || project.playStore) && (
                <div className="project-links" onClick={(e) => e.stopPropagation()}>
                  {project.appStore && (
                    <a href={project.appStore} target="_blank" rel="noopener noreferrer" className="project-link">
                      App Store →
                    </a>
                  )}
                  {project.playStore && (
                    <a href={project.playStore} target="_blank" rel="noopener noreferrer" className="project-link">
                      Play Store →
                    </a>
                  )}
                </div>
              )}
            </motion.article>
          ))}
        </div>

        {PROJECTS_WITHOUT_ICONS.length > 0 && (
          <>
            <h3 className="projects-section-title">Other Projects</h3>
            <div className="projects-grid">
              {PROJECTS_WITHOUT_ICONS.map((project, i) => (
                <motion.article
                  key={project.name}
                  className="project-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.4, delay: (PROJECTS_WITH_ICONS.length + i) * 0.05 }}
                  whileHover={{ y: -4, boxShadow: '0 0 30px var(--accent-glow)' }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-card-preview">
                    <div className="project-card-placeholder">
                      <span>📱</span>
                    </div>
                    <span className="project-card-view">View details</span>
                  </div>
                  <div className="project-title">
                    {project.name}
                    <span className="project-role">{project.role}</span>
                  </div>
                  <p className="project-desc">{descriptions[project.name] || project.desc}</p>
                  <div className="project-tech">
                    {project.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  {(project.appStore || project.playStore) && (
                    <div className="project-links" onClick={(e) => e.stopPropagation()}>
                      {project.appStore && (
                        <a href={project.appStore} target="_blank" rel="noopener noreferrer" className="project-link">
                          App Store →
                        </a>
                      )}
                      {project.playStore && (
                        <a href={project.playStore} target="_blank" rel="noopener noreferrer" className="project-link">
                          Play Store →
                        </a>
                      )}
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          </>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </PageTransition>
  )
}
