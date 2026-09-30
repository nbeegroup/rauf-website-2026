import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../App'

describe('Ra\u2019uf experience', () => {
  it('renders the main brand promise and key actions', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Small steps.Big worlds.')
    expect(screen.getAllByText('Book a school tour').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Ages 2\u20133').length).toBeGreaterThan(0)
    expect(screen.getByRole('img', { name: /three preschool children raising the Malaysian flag/i })).toHaveAttribute('src', '/images/Children Raising Jalur Gemilang.png')
    expect(screen.getByRole('img', { name: /playschool student exploring geometric blocks/i })).toHaveAttribute('src', '/images/Playschool_Student_1920x1080.jpg')
  })

  it('switches between program content', async () => {
    render(<App />)
    fireEvent.click(screen.getByRole('tab', { name: /Ages 4\u20136Junior/i }))
    await waitFor(() => expect(screen.getByRole('tabpanel')).toHaveTextContent('ICT & storytelling'))
    expect(screen.getByRole('img', { name: /junior student concentrating/i })).toHaveAttribute('src', '/images/Junior_Student_1920x1080.jpg')
  })

  it('exposes accessible navigation landmarks', () => {
    render(<App />)
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
