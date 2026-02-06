import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { NAV_ITEMS } from '../data'
import './SideMenu.css'

export function SideMenu() {
  return (
    <nav className="bottom-bar">
      <motion.div
        className="bottom-bar-inner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `bottom-bar-link ${isActive ? 'active' : ''}`
            }
            end={item.path === '/'}
          >
            <span className="bottom-bar-icon">{item.icon}</span>
            <span className="bottom-bar-label">{item.label}</span>
          </NavLink>
        ))}
      </motion.div>
    </nav>
  )
}
