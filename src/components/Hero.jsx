import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import MagneticButton from './MagneticButton'
import { content } from '../resources/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

function SplitLine({ children, lineIndex }) {
  const reducedMotion = useReducedMotion()
  return <span className="hero-line-mask" aria-label={children}><span aria-hidden="true" className="hero-line">{[...children].map((character, index) => <motion.span key={`${character}-${index}`} className="hero-char" initial={reducedMotion ? false : { y: '115%', rotate: 4 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 0.78, delay: reducedMotion ? 0 : 1.25 + lineIndex * 0.12 + index * 0.018, ease: [0.22, 1, 0.36, 1] }}>{character === ' ' ? '\u00A0' : character}</motion.span>)}</span></span>
}

export default function Hero() {
  return (
    <section id="home" data-section="home" className="hero-section">
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-copy">
        <div className="hero-reveal hero-kicker"><span className="signal-dot" />{content.hero.eyebrow}</div>
        <h1 data-cursor="text">{content.hero.title.map((line, index) => <SplitLine key={line} lineIndex={index}>{line}</SplitLine>)}</h1>
        <p className="hero-reveal hero-body">{content.hero.body}</p>
        <div className="hero-reveal hero-actions"><MagneticButton href={content.contact.href}>{content.hero.primaryCta}</MagneticButton><a className="text-link" href="#world" data-cursor="magnetic">{content.hero.secondaryCta}</a></div>
      </div>
      <div className="hero-art hero-reveal" data-cursor="text"><img src="/images/Children Raising Jalur Gemilang.jpeg" alt="Three preschool children raising the Malaysian flag beneath a bright blue sky" fetchPriority="high" /><div className="hero-art__label"><span>Now</span><strong>{content.hero.note}</strong></div></div>
      <div className="hero-footer hero-reveal"><div className="scroll-note"><ArrowDown aria-hidden="true" /><span>Scroll to discover</span></div><div className="hero-stats">{content.hero.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></div>
    </section>
  )
}
