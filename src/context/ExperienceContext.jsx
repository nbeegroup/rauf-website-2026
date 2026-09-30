/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'

const ExperienceContext = createContext(null)

export function ExperienceProvider({ children }) {
  const [isIntroFinished, setIntroFinished] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [currentScrollProgress, setCurrentScrollProgress] = useState(0)
  const value = useMemo(() => ({ isIntroFinished, setIntroFinished, activeSection, setActiveSection, currentScrollProgress, setCurrentScrollProgress }), [activeSection, currentScrollProgress, isIntroFinished])
  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
}

export function useExperience() {
  const value = useContext(ExperienceContext)
  if (!value) throw new Error('useExperience must be used within ExperienceProvider')
  return value
}
