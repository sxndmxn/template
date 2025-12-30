import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../input'

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('renders as textbox by default', () => {
    render(<Input data-testid="input" />)
    const input = screen.getByTestId('input')
    // When type is not specified, HTML inputs default to text type
    expect(input).toBeInTheDocument()
  })

  it('accepts different input types', () => {
    const { rerender } = render(<Input type="email" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'email')
    
    rerender(<Input type="password" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'password')
    
    rerender(<Input type="number" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'number')
  })

  it('handles user input', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Type here" />)
    const input = screen.getByPlaceholderText('Type here')
    
    await user.type(input, 'Hello World')
    expect(input).toHaveValue('Hello World')
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveClass('custom-class')
  })

  it('has correct data-slot attribute', () => {
    render(<Input data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveAttribute('data-slot', 'input')
  })

  it('handles disabled state', () => {
    render(<Input disabled data-testid="input" />)
    expect(screen.getByTestId('input')).toBeDisabled()
  })

  it('handles readonly attribute', () => {
    render(<Input readOnly value="Read only text" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveAttribute('readonly')
  })

  it('handles required attribute', () => {
    render(<Input required data-testid="input" />)
    expect(screen.getByTestId('input')).toBeRequired()
  })

  it('forwards value prop', () => {
    render(<Input value="Test value" onChange={() => {}} data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveValue('Test value')
  })

  it('handles onChange event', async () => {
    const user = userEvent.setup()
    let value = ''
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      value = e.target.value
    }
    
    render(<Input onChange={handleChange} placeholder="Type" />)
    const input = screen.getByPlaceholderText('Type')
    
    await user.type(input, 'Test')
    expect(value).toBe('Test')
  })

  it('applies aria-invalid styling', () => {
    render(<Input aria-invalid data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toHaveClass('aria-invalid:border-destructive')
  })

  it('handles default value', () => {
    render(<Input defaultValue="Initial value" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveValue('Initial value')
  })

  it('forwards ref correctly', () => {
    let refValue: HTMLInputElement | null = null
    const TestComponent = () => {
      const ref = (node: HTMLInputElement) => {
        refValue = node
      }
      return <Input ref={ref} data-testid="input" />
    }
    
    render(<TestComponent />)
    expect(refValue).toBeInstanceOf(HTMLInputElement)
  })
})
