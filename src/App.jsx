import { lazy, Suspense, useRef } from 'react'
import { ExperienceProvider } from './context/ExperienceContext'
import { useGSAPOrchestrator } from './hooks/useGSAPOrchestrator'
import SmoothScrollWrapper from './components/SmoothScrollWrapper'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StorySection from './components/StorySection'
import BentoShowcase from './components/BentoShowcase'
import Programs from './components/Programs'
import Footer from './components/Footer'
import { useMediaQuery } from './hooks/useMediaQuery'
import { useReducedMotion } from './hooks/useReducedMotion'

const Scene3D = lazy(() => import('./canvas/Scene3D'))

function Experience() {
  const appRef = useRef(null)
  const isMobile = useMediaQuery('(max-width: 767px)')
  const reducedMotion = useReducedMotion()
  useGSAPOrchestrator(appRef)

  return (
    <SmoothScrollWrapper>
      <div ref={appRef} className="relative min-h-screen overflow-clip bg-ink text-ivory">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="intro-wipe" aria-hidden="true">
          <div className="intro-wipe__mark">
            <img src="/logo-rauf.png" alt="" />
          </div>
          <p>Where wonder begins</p>
        </div>
        {!isMobile && !reducedMotion && (
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        )}
        <CustomCursor />
        <Navbar />
        <main id="main-content" className="relative z-10">
          <Hero />
          <StorySection />
          <BentoShowcase />
          <Programs />
        </main>
        <Footer />
      </div>
    </SmoothScrollWrapper>
  )
}

export default function App() {
  return (
    <ExperienceProvider>
      <Experience />
    </ExperienceProvider>
  )
}
