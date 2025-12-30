import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Alert, AlertTitle, AlertDescription } from '../alert'

describe('Alert', () => {
  it('renders children correctly', () => {
    render(<Alert>Alert content</Alert>)
    expect(screen.getByText('Alert content')).toBeInTheDocument()
  })

  it('has role alert for accessibility', () => {
    render(<Alert>Alert message</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
  })

  it('has correct data-slot attribute', () => {
    render(<Alert data-testid="alert">Content</Alert>)
    expect(screen.getByTestId('alert')).toHaveAttribute('data-slot', 'alert')
  })

  it('applies default variant styles', () => {
    render(<Alert data-testid="alert">Default alert</Alert>)
    const alert = screen.getByTestId('alert')
    expect(alert).toHaveClass('bg-card')
  })

  it('applies destructive variant styles', () => {
    render(<Alert variant="destructive" data-testid="alert">Error alert</Alert>)
    const alert = screen.getByTestId('alert')
    expect(alert).toHaveClass('text-destructive')
  })

  it('applies custom className', () => {
    render(<Alert className="custom-alert" data-testid="alert">Alert</Alert>)
    expect(screen.getByTestId('alert')).toHaveClass('custom-alert')
  })

  it('renders with icon', () => {
    const { container } = render(
      <Alert>
        <svg data-testid="alert-icon" />
        Alert with icon
      </Alert>
    )
    expect(screen.getByTestId('alert-icon')).toBeInTheDocument()
  })

  it('renders complete alert structure', () => {
    render(
      <Alert>
        <svg data-testid="icon" />
        <AlertTitle>Error occurred</AlertTitle>
        <AlertDescription>Please try again later</AlertDescription>
      </Alert>
    )

    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByText('Error occurred')).toBeInTheDocument()
    expect(screen.getByText('Please try again later')).toBeInTheDocument()
  })

  it('applies grid layout for icon placement', () => {
    render(<Alert data-testid="alert">Alert</Alert>)
    const alert = screen.getByTestId('alert')
    expect(alert).toHaveClass('grid')
  })
})

describe('AlertTitle', () => {
  it('renders children correctly', () => {
    render(<AlertTitle>Alert Title</AlertTitle>)
    expect(screen.getByText('Alert Title')).toBeInTheDocument()
  })

  it('has correct data-slot attribute', () => {
    render(<AlertTitle data-testid="title">Title</AlertTitle>)
    expect(screen.getByTestId('title')).toHaveAttribute('data-slot', 'alert-title')
  })

  it('applies font-medium class', () => {
    render(<AlertTitle data-testid="title">Title</AlertTitle>)
    expect(screen.getByTestId('title')).toHaveClass('font-medium')
  })

  it('applies grid column positioning', () => {
    render(<AlertTitle data-testid="title">Title</AlertTitle>)
    expect(screen.getByTestId('title')).toHaveClass('col-start-2')
  })

  it('applies custom className', () => {
    render(<AlertTitle className="text-lg" data-testid="title">Title</AlertTitle>)
    expect(screen.getByTestId('title')).toHaveClass('text-lg')
  })

  it('applies line-clamp for long titles', () => {
    render(<AlertTitle data-testid="title">Long title</AlertTitle>)
    expect(screen.getByTestId('title')).toHaveClass('line-clamp-1')
  })
})

describe('AlertDescription', () => {
  it('renders children correctly', () => {
    render(<AlertDescription>Alert description text</AlertDescription>)
    expect(screen.getByText('Alert description text')).toBeInTheDocument()
  })

  it('has correct data-slot attribute', () => {
    render(<AlertDescription data-testid="desc">Description</AlertDescription>)
    expect(screen.getByTestId('desc')).toHaveAttribute('data-slot', 'alert-description')
  })

  it('applies muted text color', () => {
    render(<AlertDescription data-testid="desc">Description</AlertDescription>)
    expect(screen.getByTestId('desc')).toHaveClass('text-muted-foreground')
  })

  it('applies grid column positioning', () => {
    render(<AlertDescription data-testid="desc">Description</AlertDescription>)
    expect(screen.getByTestId('desc')).toHaveClass('col-start-2')
  })

  it('applies custom className', () => {
    render(<AlertDescription className="text-xs" data-testid="desc">Description</AlertDescription>)
    expect(screen.getByTestId('desc')).toHaveClass('text-xs')
  })

  it('renders with paragraph elements', () => {
    render(
      <AlertDescription>
        <p>First paragraph</p>
        <p>Second paragraph</p>
      </AlertDescription>
    )
    expect(screen.getByText('First paragraph')).toBeInTheDocument()
    expect(screen.getByText('Second paragraph')).toBeInTheDocument()
  })
})
