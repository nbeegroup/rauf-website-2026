import { AtSign, Camera, MapPin, Music2, Phone, UsersRound } from 'lucide-react'
import { content } from '../resources/content'

export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-brand">
      <img className="footer-logo" src="/logo-rauf.png" alt="Ra'uf International Preschool" />
      <p>{content.brand.promise}</p>
    </div>
    <div className="footer-contact">
      {/* <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}><Phone aria-hidden="true" />{content.contact.phone}</a> */}
      <p><MapPin aria-hidden="true" />{content.contact.address}</p>
      <a href="https://www.instagram.com/raufpreschool/" target="_blank" rel="noreferrer"><Camera aria-hidden="true" />Instagram</a>
      <a href="https://www.facebook.com/raufpreschool/" target="_blank" rel="noreferrer"><UsersRound aria-hidden="true" />Facebook</a>
      {/* <a href="https://www.threads.com/raufpreschool/" target="_blank" rel="noreferrer"><AtSign aria-hidden="true" />Threads</a> */}
      <a href="https://www.tiktok.com/@raufpreschool/" target="_blank" rel="noreferrer"><Music2 aria-hidden="true" />TikTok</a>
    </div>
    <div className="footer-meta"><span>© {new Date().getFullYear()} Ra’uf International Preschool</span>
      <a href="#home">Back to top ↑</a>
    </div>
  </footer>
}