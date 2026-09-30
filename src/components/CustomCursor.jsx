import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function CustomCursor() {
  const isFinePointer = useMediaQuery('(pointer: fine)')
  const reducedMotion = useReducedMotion()
  const x = useMotionValue(-100); const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 560, damping: 38, mass: 0.38 })
  const springY = useSpring(y, { stiffness: 560, damping: 38, mass: 0.38 })
  const [mode, setMode] = useState('default')

  useEffect(() => {
    if (!isFinePointer || reducedMotion) return undefined
    const onMove = (event) => {
      const target = event.target.closest?.('[data-cursor]')
      const magnetic = target?.dataset.cursor === 'magnetic'
      if (magnetic) {
        const rect = target.getBoundingClientRect(); x.set(rect.left + rect.width / 2); y.set(rect.top + rect.height / 2)
      } else { x.set(event.clientX); y.set(event.clientY) }
      setMode(target?.dataset.cursor || 'default')
    }
    const onLeave = () => setMode('hidden')
    window.addEventListener('pointermove', onMove, { passive: true }); document.documentElement.addEventListener('mouseleave', onLeave)
    return () => { window.removeEventListener('pointermove', onMove); document.documentElement.removeEventListener('mouseleave', onLeave) }
  }, [isFinePointer, reducedMotion, x, y])

  if (!isFinePointer || reducedMotion) return null
  return <motion.div className="custom-cursor" style={{ x: springX, y: springY }} animate={{ width: mode === 'text' ? 72 : mode === 'magnetic' ? 54 : 18, height: mode === 'text' ? 72 : mode === 'magnetic' ? 54 : 18, opacity: mode === 'hidden' ? 0 : 1, backgroundColor: mode === 'default' ? '#c7f35b' : 'rgba(199, 243, 91, 0.12)' }} transition={{ type: 'spring', stiffness: 420, damping: 26 }} aria-hidden="true">{mode === 'text' && <span>VIEW</span>}</motion.div>
}
