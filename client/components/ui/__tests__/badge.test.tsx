import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge, badgeVariants } from '../badge'

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('applies default variant styles', () => {
    render(<Badge>Default Badge</Badge>)
    const badge = screen.getByText('Default Badge')
    expect(badge).toHaveClass('bg-primary')
  })

  it('applies destructive variant styles', () => {
    render(<Badge variant="destructive">Error</Badge>)
    const badge = screen.getByText('Error')
    expect(badge).toHaveClass('bg-destructive')
  })

  it('applies secondary variant styles', () => {
    render(<Badge variant="secondary">Info</Badge>)
    const badge = screen.getByText('Info')
    expect(badge).toHaveClass('bg-secondary')
  })

  it('applies outline variant styles', () => {
    render(<Badge variant="outline">Outline</Badge>)
    const badge = screen.getByText('Outline')
    expect(badge).toHaveClass('text-foreground')
  })

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>)
    const badge = screen.getByText('Custom')
    expect(badge).toHaveClass('custom-class')
  })

  it('has correct data-slot attribute', () => {
    render(<Badge>Badge</Badge>)
    const badge = screen.getByText('Badge')
    expect(badge).toHaveAttribute('data-slot', 'badge')
  })

  it('renders as span by default', () => {
    const { container } = render(<Badge>Badge</Badge>)
    const badge = container.querySelector('span')
    expect(badge).toBeInTheDocument()
  })

  it('renders as child component when asChild is true', () => {
    render(
      <Badge asChild>
        <a href="/test">Link Badge</a>
      </Badge>
    )
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  it('renders SVG icons correctly', () => {
    const { container } = render(
      <Badge>
        <svg data-testid="test-icon" />
        Badge with icon
      </Badge>
    )
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })
})

describe('badgeVariants', () => {
  it('generates correct default variant classes', () => {
    const classes = badgeVariants()
    expect(classes).toContain('bg-primary')
  })

  it('generates correct variant classes', () => {
    const destructive = badgeVariants({ variant: 'destructive' })
    expect(destructive).toContain('bg-destructive')
    
    const secondary = badgeVariants({ variant: 'secondary' })
    expect(secondary).toContain('bg-secondary')
    
    const outline = badgeVariants({ variant: 'outline' })
    expect(outline).toContain('text-foreground')
  })
})
