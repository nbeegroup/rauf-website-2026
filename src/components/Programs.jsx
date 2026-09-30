import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Clock3, Star } from 'lucide-react'
import { content } from '../resources/content'
import SectionLabel from './SectionLabel'
import MagneticButton from './MagneticButton'

export default function Programs() {
  const [active, setActive] = useState(content.programs[0].id)
  const current = content.programs.find((program) => program.id === active)
  return (
    <>
      <section id="programs" data-section="programs" className="programs-section">
        <div className="programs-header"><SectionLabel index="03">Find their rhythm</SectionLabel><h2>A little world<br />made for them.</h2></div>
        <div className="programs-layout"><div className="program-tabs" role="tablist" aria-label="Preschool programs">{content.programs.map((program) => <button key={program.id} id={`${program.id}-tab`} role="tab" aria-selected={active === program.id} aria-controls={`${program.id}-panel`} onClick={() => setActive(program.id)} data-cursor="magnetic"><span>{program.age}</span><strong>{program.title}</strong><i aria-hidden="true">↗</i></button>)}</div><div className="program-panel-wrap"><AnimatePresence mode="wait"><motion.article key={current.id} id={`${current.id}-panel`} role="tabpanel" aria-labelledby={`${current.id}-tab`} className="program-panel" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }} style={{ '--program-color': current.color }}><div className="program-panel__media"><img src={current.image} alt={current.imageAlt} loading="lazy" /></div><div className="program-panel__content"><span className="program-panel__age">{current.age}</span><h3>{current.title}</h3><p>{current.text}</p><ul>{current.details.map((detail) => <li key={detail}><Check aria-hidden="true" />{detail}</li>)}</ul></div></motion.article></AnimatePresence></div></div>
        <div className="activity-marquee" aria-label="Learning activities"><div>{[...content.activities, ...content.activities].map((activity, index) => <span key={`${activity}-${index}`}>{activity}<i>•</i></span>)}</div></div>
      </section>
      <section className="schedule-section" aria-labelledby="schedule-title"><div><SectionLabel index="04">Care that fits family life</SectionLabel><h2 id="schedule-title">From good morning<br />to home time.</h2></div><div className="schedule-list">{content.schedule.map((item, index) => <div key={item.name}><span>0{index + 1}</span><strong>{item.name}</strong><p><Clock3 aria-hidden="true" />{item.time}</p></div>)}</div></section>
      <section id="families" data-section="families" className="family-section"><div className="family-quote"><span className="quote-mark" aria-hidden="true">“</span><blockquote>{content.testimonial.quote}</blockquote><div><strong>{content.testimonial.author}</strong><span>{content.testimonial.meta}</span></div></div><div className="family-score"><strong>4.8</strong><div aria-label="4.8 out of 5 stars">{[0, 1, 2, 3, 4].map((star) => <Star key={star} fill="currentColor" aria-hidden="true" />)}</div><p>Families choose Ra’uf for care that feels personal and progress they can see.</p></div></section>
      <section className="enrol-section"><div className="enrol-orb" aria-hidden="true" /><p>2027 intake · Ages 2–6</p><h2 data-cursor="text">Come see their<br />next big world.</h2><MagneticButton href={content.contact.href} variant="light">Book a school tour</MagneticButton></section>
    </>
  )
}
