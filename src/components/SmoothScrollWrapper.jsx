import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScrollWrapper({ children }) {
  const reducedMotion = useReducedMotion()
  useEffect(() => {
    if (reducedMotion) return undefined
    const lenis = new Lenis({ duration: 1.08, lerp: 0.095, smoothWheel: true, syncTouch: false, wheelMultiplier: 0.9 })
    const update = (time) => lenis.raf(time * 1000)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(update); lenis.destroy() }
  }, [reducedMotion])
  return children
}
