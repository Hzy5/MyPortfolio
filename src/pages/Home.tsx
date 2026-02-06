import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition } from '../components/PageTransition'
import './Home.css'

const firstName = 'Hamza '
const lastName = 'Yasin'

export function Home() {
  return (
    <PageTransition className="page home-page">
      <div className="hero">
        <div className="hero-content">
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            7+ Years Experience
          </motion.span>
          <motion.h1
            className="hero-name"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.2,
                },
              },
              hidden: {},
            }}
          >
            {firstName.split('').map((char, i) => (
              <motion.span
                key={`first-${i}`}
                className="hero-char"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                {char}
              </motion.span>
            ))}
            {lastName.split('').map((char, i) => (
              <motion.span
                key={`last-${i}`}
                className="hero-char hero-char-accent"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Senior Software Engineer (Mobile)
          </motion.p>
          <motion.p
            className="hero-subtitle hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            iOS · Android · VOIP · Machine Learning
          </motion.p>
          <motion.div
            className="hero-location"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span>✉️ hamzayasin999@gmail.com</span>
          </motion.div>
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link to="/contact" className="btn btn-primary">
              Get in Touch
            </Link>
            <Link to="/projects" className="btn btn-secondary">
              View Projects
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
