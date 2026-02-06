import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageTransition, itemVariants } from '../components/PageTransition'
import { CONTACT } from '../data'
import './Contact.css'

export function Contact() {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null)

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedLabel(label)
      setTimeout(() => setCopiedLabel(null), 2000)
    } catch {
      if (label === 'Email') window.location.href = `mailto:${text}`
    }
  }

  const contactItems = [
    {
      icon: '✉️',
      label: 'Email',
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      copyable: true,
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'Connect with me',
      href: CONTACT.linkedin,
      copyable: false,
    },
    {
      icon: '⌨️',
      label: 'GitHub',
      value: 'View my code',
      href: CONTACT.github,
      copyable: false,
    },
  ]

  return (
    <PageTransition className="page contact-page">
      <div className="page-content contact-content-wide">
        {/* Hero */}
        <motion.div className="contact-hero" variants={itemVariants}>
          <h2 className="section-title">Get in Touch</h2>
          <p className="contact-lead">
            {CONTACT.availability}. Whether you have a project in mind, want to discuss mobile 
            development, or just want to connect—I'd love to hear from you.
          </p>
          <div className="contact-availability">
            <span className="contact-availability-dot" />
            <span>{CONTACT.availability}</span>
          </div>
        </motion.div>

        {/* Contact cards */}
        <motion.div className="contact-grid" variants={itemVariants}>
          {contactItems.map((item, i) => (
            <motion.div
              key={item.label}
              className="contact-card"
              variants={itemVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: '0 0 30px var(--accent-glow)' }}
            >
              <span className="contact-card-icon">{item.icon}</span>
              <h3 className="contact-card-label">{item.label}</h3>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.label === 'LinkedIn' || item.label === 'GitHub' ? '_blank' : undefined}
                  rel={item.label === 'LinkedIn' || item.label === 'GitHub' ? 'noopener noreferrer' : undefined}
                  className={`contact-card-value ${item.copyable ? 'contact-card-value-clickable' : ''}`}
                  onClick={item.copyable ? (e) => { e.preventDefault(); copyToClipboard(item.value, item.label); } : undefined}
                >
                  {item.value}
                  {item.copyable && (
                    <span className="contact-copy-hint">
                      {copiedLabel === item.label ? 'Copied!' : 'Click to copy'}
                    </span>
                  )}
                </a>
              ) : (
                <div
                  className="contact-card-value contact-card-value-clickable"
                  onClick={() => item.copyable && copyToClipboard(item.value, item.label)}
                  role={item.copyable ? 'button' : undefined}
                  tabIndex={item.copyable ? 0 : undefined}
                  onKeyDown={(e) => item.copyable && (e.key === 'Enter' || e.key === ' ') && copyToClipboard(item.value, item.label)}
                >
                  {item.value}
                  {item.copyable && (
                    <span className="contact-copy-hint">
                      {copiedLabel === item.label ? 'Copied!' : 'Click to copy'}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div className="contact-cta" variants={itemVariants}>
          <p className="contact-cta-text">Let's build something great together.</p>
          <motion.a
            href={`mailto:${CONTACT.email}?subject=Portfolio%20Contact`}
            className="contact-cta-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start a Conversation
          </motion.a>
        </motion.div>
      </div>
    </PageTransition>
  )
}
