import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { SideMenu } from './components/SideMenu'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Projects } from './pages/Projects'
import { Contact } from './pages/Contact'
import './App.css'

function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="app-layout">
      <SideMenu />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
        <footer className="footer">
          © {new Date().getFullYear()} Hamza Yasin. References furnished on demand.
        </footer>
      </main>
    </div>
  )
}

export default App
