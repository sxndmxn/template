import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Spinner } from '../spinner'

describe('Spinner', () => {
  it('renders with default props', () => {
    const { container } = render(<Spinner />)
    const spinner = container.querySelector('svg')
    expect(spinner).toBeInTheDocument()
  })

  it('has role status for accessibility', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('has aria-label for screen readers', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveAttribute('aria-label', 'Loading')
  })

  it('applies animate-spin class', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass('animate-spin')
  })

  it('applies default size class', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass('size-4')
  })

  it('applies custom className', () => {
    render(<Spinner className="size-8 text-blue-500" />)
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass('size-8', 'text-blue-500')
  })

  it('forwards SVG props correctly', () => {
    render(<Spinner data-testid="custom-spinner" />)
    expect(screen.getByTestId('custom-spinner')).toBeInTheDocument()
  })

  it('can override aria-label', () => {
    render(<Spinner aria-label="Processing" />)
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveAttribute('aria-label', 'Processing')
  })
})
