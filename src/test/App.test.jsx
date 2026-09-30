import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../App'

describe('Ra\u2019uf experience', () => {
  it('renders the main brand promise and key actions', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Small steps.Big worlds.')
    expect(screen.getAllByText('Book a school tour').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Ages 2\u20133').length).toBeGreaterThan(0)
  })

  it('switches between program content', async () => {
    render(<App />)
    fireEvent.click(screen.getByRole('tab', { name: /Ages 4\u20136Junior/i }))
    await waitFor(() => expect(screen.getByRole('tabpanel')).toHaveTextContent('ICT & storytelling'))
  })

  it('exposes accessible navigation landmarks', () => {
    render(<App />)
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
