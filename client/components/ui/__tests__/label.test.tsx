import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Label } from '../label'

describe('Label', () => {
  it('renders children correctly', () => {
    render(<Label>Label text</Label>)
    expect(screen.getByText('Label text')).toBeInTheDocument()
  })

  it('has correct data-slot attribute', () => {
    render(<Label data-testid="label">Label</Label>)
    expect(screen.getByTestId('label')).toHaveAttribute('data-slot', 'label')
  })

  it('applies font-medium class', () => {
    render(<Label data-testid="label">Label</Label>)
    expect(screen.getByTestId('label')).toHaveClass('font-medium')
  })

  it('applies custom className', () => {
    render(<Label className="text-lg" data-testid="label">Label</Label>)
    expect(screen.getByTestId('label')).toHaveClass('text-lg')
  })

  it('associates with input using htmlFor', () => {
    render(
      <div>
        <Label htmlFor="test-input">Email</Label>
        <input id="test-input" type="email" />
      </div>
    )
    const label = screen.getByText('Email')
    expect(label).toHaveAttribute('for', 'test-input')
  })

  it('applies select-none for better UX', () => {
    render(<Label data-testid="label">Label</Label>)
    expect(screen.getByTestId('label')).toHaveClass('select-none')
  })

  it('applies flex layout for icon support', () => {
    render(<Label data-testid="label">Label</Label>)
    expect(screen.getByTestId('label')).toHaveClass('flex', 'items-center')
  })

  it('renders with icon', () => {
    render(
      <Label>
        <svg data-testid="label-icon" />
        Label with icon
      </Label>
    )
    expect(screen.getByTestId('label-icon')).toBeInTheDocument()
    expect(screen.getByText('Label with icon')).toBeInTheDocument()
  })
})
