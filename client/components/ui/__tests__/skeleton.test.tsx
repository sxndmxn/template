import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Skeleton } from '../skeleton'

describe('Skeleton', () => {
  it('renders correctly', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  it('has correct data-slot attribute', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveAttribute('data-slot', 'skeleton')
  })

  it('applies animate-pulse class for loading effect', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveClass('animate-pulse')
  })

  it('applies background color', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveClass('bg-accent')
  })

  it('applies rounded corners', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveClass('rounded-md')
  })

  it('applies custom className', () => {
    render(<Skeleton className="h-10 w-full" data-testid="skeleton" />)
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveClass('h-10', 'w-full')
  })

  it('can be used for text placeholder', () => {
    render(<Skeleton className="h-4 w-3/4" data-testid="text-skeleton" />)
    const skeleton = screen.getByTestId('text-skeleton')
    expect(skeleton).toHaveClass('h-4', 'w-3/4')
  })

  it('can be used for circular avatar placeholder', () => {
    render(<Skeleton className="h-12 w-12 rounded-full" data-testid="avatar-skeleton" />)
    const skeleton = screen.getByTestId('avatar-skeleton')
    expect(skeleton).toHaveClass('rounded-full', 'h-12', 'w-12')
  })

  it('renders multiple skeletons for complex layouts', () => {
    const { container } = render(
      <div>
        <Skeleton className="h-12 w-12 rounded-full" data-testid="skeleton-1" />
        <Skeleton className="h-4 w-full" data-testid="skeleton-2" />
        <Skeleton className="h-4 w-3/4" data-testid="skeleton-3" />
      </div>
    )
    
    expect(screen.getByTestId('skeleton-1')).toBeInTheDocument()
    expect(screen.getByTestId('skeleton-2')).toBeInTheDocument()
    expect(screen.getByTestId('skeleton-3')).toBeInTheDocument()
  })

  it('renders as a div element', () => {
    const { container } = render(<Skeleton data-testid="skeleton" />)
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton.tagName).toBe('DIV')
  })
})
