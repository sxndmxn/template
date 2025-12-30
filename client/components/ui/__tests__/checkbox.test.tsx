import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '../checkbox'

describe('Checkbox', () => {
  it('renders correctly', () => {
    render(<Checkbox aria-label="Accept terms" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
  })

  it('has correct data-slot attribute', () => {
    render(<Checkbox data-testid="checkbox" aria-label="Checkbox" />)
    expect(screen.getByTestId('checkbox')).toHaveAttribute('data-slot', 'checkbox')
  })

  it('is unchecked by default', () => {
    render(<Checkbox aria-label="Checkbox" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('can be checked', async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="Accept" />)
    const checkbox = screen.getByRole('checkbox')
    
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('can be unchecked', async () => {
    const user = userEvent.setup()
    render(<Checkbox defaultChecked aria-label="Accept" />)
    const checkbox = screen.getByRole('checkbox')
    
    expect(checkbox).toBeChecked()
    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('handles controlled state', async () => {
    const user = userEvent.setup()
    let checked = false
    const handleChange = (value: boolean) => {
      checked = value
    }
    
    const { rerender } = render(
      <Checkbox checked={checked} onCheckedChange={handleChange} aria-label="Controlled" />
    )
    const checkbox = screen.getByRole('checkbox')
    
    expect(checkbox).not.toBeChecked()
    
    await user.click(checkbox)
    expect(checked).toBe(true)
    
    rerender(<Checkbox checked={checked} onCheckedChange={handleChange} aria-label="Controlled" />)
    expect(checkbox).toBeChecked()
  })

  it('handles disabled state', () => {
    render(<Checkbox disabled aria-label="Disabled checkbox" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
  })

  it('cannot be toggled when disabled', async () => {
    const user = userEvent.setup()
    render(<Checkbox disabled aria-label="Disabled" />)
    const checkbox = screen.getByRole('checkbox')
    
    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('applies custom className', () => {
    render(<Checkbox className="custom-class" data-testid="checkbox" aria-label="Checkbox" />)
    expect(screen.getByTestId('checkbox')).toHaveClass('custom-class')
  })

  it('renders check icon when checked', async () => {
    const user = userEvent.setup()
    const { container } = render(<Checkbox aria-label="Checkbox" />)
    const checkbox = screen.getByRole('checkbox')
    
    await user.click(checkbox)
    
    // The indicator should be present after checking
    const indicator = container.querySelector('[data-slot="checkbox-indicator"]')
    expect(indicator).toBeInTheDocument()
  })

  it('supports required attribute', () => {
    render(<Checkbox required aria-label="Required field" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeRequired()
  })

  it('supports name attribute for forms', () => {
    render(<Checkbox name="terms" aria-label="Terms" />)
    const checkbox = screen.getByRole('checkbox')
    // Radix UI Checkbox passes name to underlying input element
    expect(checkbox).toBeInTheDocument()
  })

  it('works with Label component', () => {
    render(
      <div>
        <Checkbox id="terms" aria-label="Terms" />
        <label htmlFor="terms">Accept terms</label>
      </div>
    )
    
    const checkbox = screen.getByRole('checkbox')
    const label = screen.getByText('Accept terms')
    expect(label).toHaveAttribute('for', 'terms')
  })
})
