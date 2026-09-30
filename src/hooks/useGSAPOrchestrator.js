import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useExperience } from '../context/ExperienceContext'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function useGSAPOrchestrator(scope) {
  const { setIntroFinished, setActiveSection, setCurrentScrollProgress } = useExperience()
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (!scope.current) return undefined
    if (reducedMotion) {
      gsap.set('.intro-wipe', { display: 'none' })
      setIntroFinished(true)
      return undefined
    }
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.inOut' }, onComplete: () => setIntroFinished(true) })
        .from('.intro-wipe__mark', { yPercent: 120, opacity: 0, duration: 0.7 })
        .from('.intro-wipe p', { opacity: 0, y: 12, duration: 0.45 }, '-=0.25')
        .to('.intro-wipe__mark, .intro-wipe p', { y: -18, opacity: 0, duration: 0.35, delay: 0.35 })
        .to('.intro-wipe', { yPercent: -100, duration: 1.05 }, '-=0.05')
        .from('.site-header', { y: -32, opacity: 0, duration: 0.65 }, '-=0.55')
        .from('.hero-reveal', { y: 30, opacity: 0, stagger: 0.09, duration: 0.75 }, '-=0.65')

      ScrollTrigger.create({ trigger: scope.current, start: 'top top', end: 'bottom bottom', onUpdate: (self) => setCurrentScrollProgress(self.progress) })
      gsap.utils.toArray('[data-section]').forEach((section) => {
        ScrollTrigger.create({ trigger: section, start: 'top 55%', end: 'bottom 45%', onToggle: ({ isActive }) => isActive && setActiveSection(section.dataset.section) })
      })
    }, scope)
    return () => context.revert()
  }, [reducedMotion, scope, setActiveSection, setCurrentScrollProgress, setIntroFinished])
}
