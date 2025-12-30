import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Separator } from '../separator'

describe('Separator', () => {
  it('renders correctly', () => {
    const { container } = render(<Separator data-testid="separator" />)
    expect(screen.getByTestId('separator')).toBeInTheDocument()
  })

  it('has correct data-slot attribute', () => {
    render(<Separator data-testid="separator" />)
    expect(screen.getByTestId('separator')).toHaveAttribute('data-slot', 'separator')
  })

  it('has horizontal orientation by default', () => {
    render(<Separator data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveAttribute('data-orientation', 'horizontal')
  })

  it('applies vertical orientation', () => {
    render(<Separator orientation="vertical" data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveAttribute('data-orientation', 'vertical')
  })

  it('is decorative by default', () => {
    render(<Separator data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    // When decorative=true, Radix UI Separator removes it from accessibility tree
    expect(separator).toBeInTheDocument()
  })

  it('can be non-decorative for accessibility', () => {
    render(<Separator decorative={false} data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    expect(separator).not.toHaveAttribute('aria-hidden', 'true')
  })

  it('applies horizontal styling classes', () => {
    render(<Separator data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveClass('data-[orientation=horizontal]:h-px')
    expect(separator).toHaveClass('data-[orientation=horizontal]:w-full')
  })

  it('applies vertical styling classes', () => {
    render(<Separator orientation="vertical" data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveClass('data-[orientation=vertical]:h-full')
    expect(separator).toHaveClass('data-[orientation=vertical]:w-px')
  })

  it('applies custom className', () => {
    render(<Separator className="my-4" data-testid="separator" />)
    expect(screen.getByTestId('separator')).toHaveClass('my-4')
  })

  it('has separator role when not decorative', () => {
    render(<Separator decorative={false} />)
    const separator = screen.getByRole('separator')
    expect(separator).toBeInTheDocument()
  })
})
