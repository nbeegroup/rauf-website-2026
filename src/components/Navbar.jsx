import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { content } from '../resources/content'
import { useExperience } from '../context/ExperienceContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { currentScrollProgress } = useExperience()
  return (
    <header className="site-header">
      <div className="scroll-progress" style={{ transform: `scaleX(${currentScrollProgress})` }} />
      <a className="brand" href="#home" aria-label="Ra'uf International Preschool home" data-cursor="magnetic"><img className="brand__logo" src="/logo-rauf.png" alt="Ra'uf International Preschool" /></a>
      <nav className="desktop-nav" aria-label="Primary navigation">{content.navigation.map((item) => <a key={item.href} href={item.href} data-cursor="magnetic">{item.label}</a>)}</nav>
      <a className="header-cta" href={content.contact.href} data-cursor="magnetic">Enrol now<span aria-hidden="true">↗</span></a>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
      <AnimatePresence>{open && <motion.nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>{content.navigation.map((item, index) => <motion.a key={item.href} href={item.href} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}</motion.a>)}</motion.nav>}</AnimatePresence>
    </header>
  )
}
