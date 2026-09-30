import { Camera, MapPin, Phone } from 'lucide-react'
import { content } from '../resources/content'

export default function Footer() {
  return <footer className="site-footer"><div className="footer-brand"><img className="footer-logo" src="/logo-rauf.png" alt="Ra'uf International Preschool" /><p>{content.brand.promise}</p></div><div className="footer-contact"><a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}><Phone aria-hidden="true" />{content.contact.phone}</a><p><MapPin aria-hidden="true" />{content.contact.address}</p><a href="https://www.instagram.com/raufpreschool/" target="_blank" rel="noreferrer"><Camera aria-hidden="true" />Instagram</a></div><div className="footer-meta"><span>© {new Date().getFullYear()} Ra’uf International Preschool</span><a href="#home">Back to top ↑</a></div></footer>
}
