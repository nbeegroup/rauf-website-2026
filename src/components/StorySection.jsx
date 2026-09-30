import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import { content } from '../resources/content'

export default function StorySection() {
  return <section id="world" data-section="world" className="story-section"><SectionLabel index="01">{content.manifesto.eyebrow}</SectionLabel><div className="story-grid"><motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-12%' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} data-cursor="text">{content.manifesto.heading}</motion.h2><div className="story-aside"><p>{content.manifesto.body}</p><div className="story-orbit" aria-hidden="true"><span>R</span><svg viewBox="0 0 120 120"><path id="orbitPath" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" fill="none" /><text><textPath href="#orbitPath">CURIOUS · CAPABLE · KIND · </textPath></text></svg></div></div></div></section>
}
