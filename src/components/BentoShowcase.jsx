import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Heart, Orbit, Sparkles, Sun } from 'lucide-react'
import { content } from '../resources/content'
import { useReducedMotion } from '../hooks/useReducedMotion'
import SectionLabel from './SectionLabel'

gsap.registerPlugin(ScrollTrigger)
const icons = { orbit: Orbit, heart: Heart, spark: Sparkles, sun: Sun }

export default function BentoShowcase() {
  const section = useRef(null)
  const reducedMotion = useReducedMotion()
  useLayoutEffect(() => {
    if (reducedMotion || !section.current) return undefined
    const context = gsap.context(() => {
      const cards = gsap.utils.toArray('.bento-card')
      const media = gsap.matchMedia()
      media.add('(min-width: 900px)', () => {
        const timeline = gsap.timeline({ scrollTrigger: { trigger: section.current, start: 'top top', end: '+=170%', scrub: 0.8, pin: '.bento-stage', anticipatePin: 1 } })
        timeline.from(cards, { y: (index) => 180 + index * 42, x: (index) => (index % 2 ? 90 : -90), scale: 0.72, rotate: (index) => (index % 2 ? 4 : -4), opacity: 0, stagger: 0.12, duration: 1, ease: 'power2.out' }).to('.bento-heading-line', { scaleX: 1, duration: 0.5 }, '-=0.55')
      })
      media.add('(max-width: 899px)', () => cards.forEach((card) => gsap.from(card, { scrollTrigger: { trigger: card, start: 'top 86%' }, y: 46, opacity: 0, duration: 0.65, ease: 'power2.out' })))
      return () => media.revert()
    }, section)
    return () => context.revert()
  }, [reducedMotion])

  return (
    <section ref={section} id="day" data-section="day" className="bento-section">
      <div className="bento-stage"><div className="bento-heading"><SectionLabel index="02" light>More than a classroom</SectionLabel><h2 data-cursor="text">Built for every kind of brilliance.</h2><span className="bento-heading-line" aria-hidden="true" /></div><div className="bento-grid">{content.pillars.map((pillar) => { const Icon = icons[pillar.icon]; return <article className={`bento-card bento-card--${pillar.tone}`} key={pillar.number} data-cursor="text"><div className="bento-card__top"><span>{pillar.number}</span><Icon aria-hidden="true" /></div><div><h3>{pillar.title}</h3><p>{pillar.text}</p></div></article> })}</div></div>
    </section>
  )
}
