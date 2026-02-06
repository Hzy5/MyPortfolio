import { motion } from 'framer-motion'
import { PageTransition, itemVariants } from '../components/PageTransition'
import { SKILL_CATEGORIES, ABOUT_STATS, EXPERTISE_AREAS } from '../data'
import './About.css'

export function About() {
  return (
    <PageTransition className="page about-page">
      <div className="page-content about-content-wide">
        {/* Hero intro */}
        <motion.div className="about-hero" variants={itemVariants}>
          <h2 className="section-title">About Me</h2>
          <p className="about-lead">
            I build mobile apps people love. 7+ years. iOS & Android. Fitness, e-commerce, telehealth, social—I've shipped them all.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div className="about-stats" variants={itemVariants}>
          {ABOUT_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="about-stat"
              variants={itemVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -2 }}
            >
              {'icon' in stat && <span className="about-stat-icon">{stat.icon}</span>}
              <span className={`about-stat-value ${stat.value.length > 10 ? 'about-stat-value-long' : ''}`}>{stat.value}</span>
              <span className="about-stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.div className="about-bio" variants={itemVariants}>
          <h3 className="about-subtitle">What I Do</h3>
          <p>
            I build iOS, Android, and web apps. Swift, SwiftUI, React Native, React. VOIP calling, payments, machine learning—I've done it all.
          </p>
          <p>
            I lead teams. I mentor. I ship. 35+ apps to the App Store and Play Store.
          </p>
          <h3 className="about-subtitle section-title-spaced">Education</h3>
          <p>
            BSCS from University of Sargodha (2013–2017). Lahore before that.
          </p>
        </motion.div>

        {/* Expertise areas */}
        <motion.h3 className="about-subtitle section-title-spaced" variants={itemVariants}>
          Expertise
        </motion.h3>
        <motion.div className="expertise-grid" variants={itemVariants}>
          {EXPERTISE_AREAS.map((area, i) => (
            <motion.div
              key={area.title}
              className="expertise-card"
              variants={itemVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, borderColor: 'var(--accent)' }}
            >
              <span className="expertise-icon">{area.icon}</span>
              <h4 className="expertise-title">{area.title}</h4>
              <p className="expertise-desc">{area.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills by category */}
        <motion.h3 className="about-subtitle section-title-spaced" variants={itemVariants}>
          Skills
        </motion.h3>
        <motion.div className="skills-categories" variants={itemVariants}>
          {SKILL_CATEGORIES.map((category, i) => (
            <motion.div
              key={category.title}
              className="skill-category"
              variants={itemVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: i * 0.05 }}
            >
              <div className="skill-category-header">
                <span className="skill-category-icon">{category.icon}</span>
                <h4 className="skill-category-title">{category.title}</h4>
              </div>
              <div className="skill-category-tags">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="skill-tag"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, borderColor: 'var(--accent)' }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  )
}
