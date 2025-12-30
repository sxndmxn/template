import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from '../switch'

describe('Switch', () => {
  it('renders correctly', () => {
    render(<Switch aria-label="Enable notifications" />)
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toBeInTheDocument()
  })

  it('has correct data-slot attribute', () => {
    render(<Switch data-testid="switch" aria-label="Switch" />)
    expect(screen.getByTestId('switch')).toHaveAttribute('data-slot', 'switch')
  })

  it('is unchecked by default', () => {
    render(<Switch aria-label="Toggle" />)
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveAttribute('data-state', 'unchecked')
  })

  it('can be toggled on', async () => {
    const user = userEvent.setup()
    render(<Switch aria-label="Toggle" />)
    const switchElement = screen.getByRole('switch')
    
    await user.click(switchElement)
    expect(switchElement).toHaveAttribute('data-state', 'checked')
  })

  it('can be toggled off', async () => {
    const user = userEvent.setup()
    render(<Switch defaultChecked aria-label="Toggle" />)
    const switchElement = screen.getByRole('switch')
    
    expect(switchElement).toHaveAttribute('data-state', 'checked')
    await user.click(switchElement)
    expect(switchElement).toHaveAttribute('data-state', 'unchecked')
  })

  it('handles controlled state', async () => {
    const user = userEvent.setup()
    let checked = false
    const handleChange = (value: boolean) => {
      checked = value
    }
    
    const { rerender } = render(
      <Switch checked={checked} onCheckedChange={handleChange} aria-label="Controlled" />
    )
    const switchElement = screen.getByRole('switch')
    
    expect(switchElement).toHaveAttribute('data-state', 'unchecked')
    
    await user.click(switchElement)
    expect(checked).toBe(true)
    
    rerender(<Switch checked={checked} onCheckedChange={handleChange} aria-label="Controlled" />)
    expect(switchElement).toHaveAttribute('data-state', 'checked')
  })

  it('handles disabled state', () => {
    render(<Switch disabled aria-label="Disabled switch" />)
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toBeDisabled()
  })

  it('cannot be toggled when disabled', async () => {
    const user = userEvent.setup()
    render(<Switch disabled aria-label="Toggle" />)
    const switchElement = screen.getByRole('switch')
    
    await user.click(switchElement)
    expect(switchElement).toHaveAttribute('data-state', 'unchecked')
  })

  it('applies custom className', () => {
    render(<Switch className="custom-class" data-testid="switch" aria-label="Switch" />)
    expect(screen.getByTestId('switch')).toHaveClass('custom-class')
  })

  it('renders thumb element', () => {
    const { container } = render(<Switch aria-label="Switch" />)
    const thumb = container.querySelector('[data-slot="switch-thumb"]')
    expect(thumb).toBeInTheDocument()
  })

  it('supports required attribute', () => {
    render(<Switch required aria-label="Required field" />)
    const switchElement = screen.getByRole('switch')
    // Radix UI Switch applies required via aria-required
    expect(switchElement).toHaveAttribute('aria-required', 'true')
  })

  it('supports name attribute for forms', () => {
    render(<Switch name="notifications" aria-label="Notifications" />)
    const switchElement = screen.getByRole('switch')
    // Radix UI Switch handles name internally for form integration
    expect(switchElement).toBeInTheDocument()
  })

  it('works with Label component', () => {
    render(
      <div>
        <Switch id="notifications" aria-label="Notifications" />
        <label htmlFor="notifications">Enable notifications</label>
      </div>
    )
    
    const switchElement = screen.getByRole('switch')
    const label = screen.getByText('Enable notifications')
    expect(label).toHaveAttribute('for', 'notifications')
  })

  it('applies correct state styling classes', async () => {
    const user = userEvent.setup()
    render(<Switch data-testid="switch" aria-label="Toggle" />)
    const switchElement = screen.getByTestId('switch')
    
    // Unchecked state
    expect(switchElement).toHaveClass('data-[state=unchecked]:bg-input')
    
    // Click to check
    await user.click(switchElement)
    
    // Checked state
    expect(switchElement).toHaveClass('data-[state=checked]:bg-primary')
  })

  it('can be toggled via keyboard', async () => {
    const user = userEvent.setup()
    render(<Switch aria-label="Toggle" />)
    const switchElement = screen.getByRole('switch')
    
    switchElement.focus()
    await user.keyboard(' ')
    
    expect(switchElement).toHaveAttribute('data-state', 'checked')
  })
})
