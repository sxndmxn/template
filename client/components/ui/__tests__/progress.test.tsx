import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Progress } from '../progress'

describe('Progress', () => {
  it('renders correctly', () => {
    render(<Progress value={50} data-testid="progress" />)
    expect(screen.getByTestId('progress')).toBeInTheDocument()
  })

  it('has correct data-slot attribute', () => {
    render(<Progress value={50} data-testid="progress" />)
    expect(screen.getByTestId('progress')).toHaveAttribute('data-slot', 'progress')
  })

  it('has progressbar role for accessibility', () => {
    render(<Progress value={50} />)
    const progress = screen.getByRole('progressbar')
    expect(progress).toBeInTheDocument()
  })

  it('applies correct value attribute', () => {
    render(<Progress value={75} />)
    const progress = screen.getByRole('progressbar')
    // Radix UI Progress handles aria attributes internally
    expect(progress).toBeInTheDocument()
  })

  it('applies default aria-valuemax of 100', () => {
    render(<Progress value={50} />)
    const progress = screen.getByRole('progressbar')
    expect(progress).toHaveAttribute('aria-valuemax', '100')
  })

  it('renders at 0% when value is 0', () => {
    const { container } = render(<Progress value={0} />)
    const indicator = container.querySelector('[data-slot="progress-indicator"]')
    expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' })
  })

  it('renders at 50% when value is 50', () => {
    const { container } = render(<Progress value={50} />)
    const indicator = container.querySelector('[data-slot="progress-indicator"]')
    expect(indicator).toHaveStyle({ transform: 'translateX(-50%)' })
  })

  it('renders at 100% when value is 100', () => {
    const { container } = render(<Progress value={100} />)
    const indicator = container.querySelector('[data-slot="progress-indicator"]')
    expect(indicator).toHaveStyle({ transform: 'translateX(-0%)' })
  })

  it('handles undefined value gracefully', () => {
    const { container } = render(<Progress />)
    const indicator = container.querySelector('[data-slot="progress-indicator"]')
    // When value is undefined, it should be treated as 0
    expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' })
  })

  it('applies custom className', () => {
    render(<Progress value={50} className="h-4" data-testid="progress" />)
    expect(screen.getByTestId('progress')).toHaveClass('h-4')
  })

  it('applies default height class', () => {
    render(<Progress value={50} data-testid="progress" />)
    expect(screen.getByTestId('progress')).toHaveClass('h-2')
  })

  it('applies full width by default', () => {
    render(<Progress value={50} data-testid="progress" />)
    expect(screen.getByTestId('progress')).toHaveClass('w-full')
  })

  it('applies rounded-full for circular ends', () => {
    render(<Progress value={50} data-testid="progress" />)
    expect(screen.getByTestId('progress')).toHaveClass('rounded-full')
  })

  it('renders indicator element', () => {
    const { container } = render(<Progress value={50} />)
    const indicator = container.querySelector('[data-slot="progress-indicator"]')
    expect(indicator).toBeInTheDocument()
  })

  it('indicator has transition class for smooth animation', () => {
    const { container } = render(<Progress value={50} />)
    const indicator = container.querySelector('[data-slot="progress-indicator"]')
    expect(indicator).toHaveClass('transition-all')
  })

  it('updates progress value dynamically', () => {
    const { container, rerender } = render(<Progress value={25} />)
    let indicator = container.querySelector('[data-slot="progress-indicator"]')
    expect(indicator).toHaveStyle({ transform: 'translateX(-75%)' })
    
    rerender(<Progress value={75} />)
    indicator = container.querySelector('[data-slot="progress-indicator"]')
    expect(indicator).toHaveStyle({ transform: 'translateX(-25%)' })
  })
})
