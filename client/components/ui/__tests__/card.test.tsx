import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardAction, 
  CardContent, 
  CardFooter 
} from '../card'

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('has correct data-slot attribute', () => {
    render(<Card data-testid="card">Content</Card>)
    expect(screen.getByTestId('card')).toHaveAttribute('data-slot', 'card')
  })

  it('applies default styling', () => {
    render(<Card data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('bg-card', 'rounded-xl', 'border')
  })

  it('applies custom className', () => {
    render(<Card className="custom-class" data-testid="card">Content</Card>)
    expect(screen.getByTestId('card')).toHaveClass('custom-class')
  })

  it('renders complete card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description text</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Main content</CardContent>
        <CardFooter>Footer content</CardFooter>
      </Card>
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card description text')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('Main content')).toBeInTheDocument()
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })
})

describe('CardHeader', () => {
  it('renders children correctly', () => {
    render(<CardHeader>Header content</CardHeader>)
    expect(screen.getByText('Header content')).toBeInTheDocument()
  })

  it('has correct data-slot attribute', () => {
    render(<CardHeader data-testid="header">Header</CardHeader>)
    expect(screen.getByTestId('header')).toHaveAttribute('data-slot', 'card-header')
  })

  it('applies grid layout classes', () => {
    render(<CardHeader data-testid="header">Header</CardHeader>)
    const header = screen.getByTestId('header')
    expect(header).toHaveClass('grid')
  })

  it('applies custom className', () => {
    render(<CardHeader className="custom-header" data-testid="header">Header</CardHeader>)
    expect(screen.getByTestId('header')).toHaveClass('custom-header')
  })
})

describe('CardTitle', () => {
  it('renders children correctly', () => {
    render(<CardTitle>Title Text</CardTitle>)
    expect(screen.getByText('Title Text')).toBeInTheDocument()
  })

  it('has correct data-slot attribute', () => {
    render(<CardTitle data-testid="title">Title</CardTitle>)
    expect(screen.getByTestId('title')).toHaveAttribute('data-slot', 'card-title')
  })

  it('applies semibold font weight', () => {
    render(<CardTitle data-testid="title">Title</CardTitle>)
    expect(screen.getByTestId('title')).toHaveClass('font-semibold')
  })

  it('applies custom className', () => {
    render(<CardTitle className="text-2xl" data-testid="title">Title</CardTitle>)
    expect(screen.getByTestId('title')).toHaveClass('text-2xl')
  })
})

describe('CardDescription', () => {
  it('renders children correctly', () => {
    render(<CardDescription>Description text</CardDescription>)
    expect(screen.getByText('Description text')).toBeInTheDocument()
  })

  it('has correct data-slot attribute', () => {
    render(<CardDescription data-testid="desc">Description</CardDescription>)
    expect(screen.getByTestId('desc')).toHaveAttribute('data-slot', 'card-description')
  })

  it('applies muted text color', () => {
    render(<CardDescription data-testid="desc">Description</CardDescription>)
    expect(screen.getByTestId('desc')).toHaveClass('text-muted-foreground')
  })

  it('applies custom className', () => {
    render(<CardDescription className="italic" data-testid="desc">Description</CardDescription>)
    expect(screen.getByTestId('desc')).toHaveClass('italic')
  })
})

describe('CardAction', () => {
  it('renders children correctly', () => {
    render(<CardAction>Action Button</CardAction>)
    expect(screen.getByText('Action Button')).toBeInTheDocument()
  })

  it('has correct data-slot attribute', () => {
    render(<CardAction data-testid="action">Action</CardAction>)
    expect(screen.getByTestId('action')).toHaveAttribute('data-slot', 'card-action')
  })

  it('applies grid positioning classes', () => {
    render(<CardAction data-testid="action">Action</CardAction>)
    const action = screen.getByTestId('action')
    expect(action).toHaveClass('col-start-2', 'row-span-2')
  })

  it('applies custom className', () => {
    render(<CardAction className="custom-action" data-testid="action">Action</CardAction>)
    expect(screen.getByTestId('action')).toHaveClass('custom-action')
  })
})

describe('CardContent', () => {
  it('renders children correctly', () => {
    render(<CardContent>Main content</CardContent>)
    expect(screen.getByText('Main content')).toBeInTheDocument()
  })

  it('has correct data-slot attribute', () => {
    render(<CardContent data-testid="content">Content</CardContent>)
    expect(screen.getByTestId('content')).toHaveAttribute('data-slot', 'card-content')
  })

  it('applies padding classes', () => {
    render(<CardContent data-testid="content">Content</CardContent>)
    expect(screen.getByTestId('content')).toHaveClass('px-6')
  })

  it('applies custom className', () => {
    render(<CardContent className="py-8" data-testid="content">Content</CardContent>)
    expect(screen.getByTestId('content')).toHaveClass('py-8')
  })
})

describe('CardFooter', () => {
  it('renders children correctly', () => {
    render(<CardFooter>Footer content</CardFooter>)
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('has correct data-slot attribute', () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>)
    expect(screen.getByTestId('footer')).toHaveAttribute('data-slot', 'card-footer')
  })

  it('applies flex layout', () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>)
    expect(screen.getByTestId('footer')).toHaveClass('flex', 'items-center')
  })

  it('applies custom className', () => {
    render(<CardFooter className="justify-end" data-testid="footer">Footer</CardFooter>)
    expect(screen.getByTestId('footer')).toHaveClass('justify-end')
  })
})
