import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchProjectMedia } from '../utils/projectMedia'
import './ProjectModal.css'

interface Project {
  name: string
  role: string
  desc: string
  tech: string[]
  appStore: string | null
  playStore: string | null
  screenshotSource?: 'website' | 'playstore'
  screenshotUrl?: string
}

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [media, setMedia] = useState<{ icon: string; screenshots: string[]; description?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!project) {
      setMedia(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setActiveIndex(0)
    fetchProjectMedia(project).then((data) => {
      setMedia(data)
      setLoading(false)
    })
  }, [project])

  if (!project) return null

  const hasScreenshots = media && media.screenshots.length > 0
  const hasIcon = media && media.icon

  return (
    <AnimatePresence>
      <motion.div
        className="project-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="project-modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="project-modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>

          <div className="project-modal-header">
            <div className="project-modal-title-row">
              {hasIcon && (
                <img src={media.icon} alt="" className="project-modal-icon" referrerPolicy="no-referrer" />
              )}
              <div>
                <h3 className="project-modal-title">{project.name}</h3>
                <span className="project-modal-role">{project.role}</span>
              </div>
            </div>
            <p className="project-modal-desc">{media?.description || project.desc}</p>
            <div className="project-modal-tech">
              {project.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>

          <div className="project-modal-gallery">
            {loading ? (
              <div className="project-modal-loading">
                <div className="project-modal-spinner" />
                <span>Loading screenshots...</span>
              </div>
            ) : hasScreenshots ? (
              <>
                <div className="project-modal-main-image-wrapper">
                  <img
                    src={media!.screenshots[activeIndex]}
                    alt={`${project.name} screenshot ${activeIndex + 1}`}
                    className="project-modal-main-image"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {media!.screenshots.length > 1 && (
                  <div className="project-modal-thumbnails">
                    {media!.screenshots.slice(0, 8).map((url, i) => (
                      <button
                        key={url}
                        className={`project-modal-thumb ${i === activeIndex ? 'active' : ''}`}
                        onClick={() => setActiveIndex(i)}
                      >
                        <img src={url} alt="" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="project-modal-no-images">
                <span>No screenshots available</span>
                <p>Visit the store links below to see the app</p>
              </div>
            )}
          </div>

          <div className="project-modal-links">
            {project.appStore && (
              <a href={project.appStore} target="_blank" rel="noopener noreferrer" className="project-modal-store-link">
                View on App Store
              </a>
            )}
            {project.playStore && (
              <a href={project.playStore} target="_blank" rel="noopener noreferrer" className="project-modal-store-link">
                View on Play Store
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
