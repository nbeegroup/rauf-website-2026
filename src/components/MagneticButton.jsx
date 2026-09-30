import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticButton({ href, children, variant = 'primary', className = '' }) {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 240, damping: 18 }); const springY = useSpring(y, { stiffness: 240, damping: 18 })
  const move = (event) => { const rect = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - rect.left - rect.width / 2) * 0.16); y.set((event.clientY - rect.top - rect.height / 2) * 0.16) }
  const reset = () => { x.set(0); y.set(0) }
  return <motion.a href={href} className={`button button--${variant} ${className}`} data-cursor="magnetic" style={{ x: springX, y: springY }} onMouseMove={move} onMouseLeave={reset} whileTap={{ scale: 0.97 }}><span>{children}</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6" /></svg></motion.a>
}
