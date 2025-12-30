# UI Component Tests

This directory contains unit tests for the UI components in `client/components/ui/`.

## Test Coverage

The test suite covers the following components:

### Simple Components
- **Button** - Tests all variants (default, destructive, outline, secondary, ghost, link), sizes (sm, lg, icon), and the `asChild` pattern
- **Badge** - Tests all variants, styling, and the `asChild` pattern
- **Input** - Tests input types, user interaction, validation states, and accessibility
- **Label** - Tests text rendering, styling, and form association
- **Spinner** - Tests loading indicator with accessibility attributes
- **Skeleton** - Tests loading placeholder with various layouts

### Composite Components
- **Card** - Tests Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, and CardFooter
- **Alert** - Tests Alert, AlertTitle, and AlertDescription with variants

### Interactive Components
- **Checkbox** - Tests checked/unchecked states, user interaction, controlled/uncontrolled mode, and accessibility
- **Switch** - Tests toggle states, user interaction, keyboard navigation, and accessibility
- **Progress** - Tests progress indicator with different values and visual feedback
- **Separator** - Tests horizontal/vertical orientation and decorative/semantic modes

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with UI (interactive test viewer)
npm run test:ui
```

## Testing Patterns

### Component Rendering
All components are tested to verify:
- They render children correctly
- They have the correct `data-slot` attribute
- They apply default and custom styling

### Variants and Sizes
Components with variants (Button, Badge, Alert) are tested for:
- All variant options
- Proper CSS class application
- Visual distinction between variants

### Interactive Behavior
Interactive components (Checkbox, Switch, Input) are tested for:
- User interactions (clicks, typing, keyboard navigation)
- Controlled and uncontrolled modes
- State changes and callbacks
- Form integration

### Accessibility
All components are tested for:
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Semantic HTML roles

### Custom Styling
Every component is tested to ensure:
- Custom `className` props are properly merged
- Default styles are not overridden unintentionally
- The `cn()` utility correctly combines classes

## Testing with Radix UI

Many components are built on Radix UI primitives. When testing these:
- Focus on the component's API and behavior rather than implementation details
- Test accessibility features (roles, ARIA attributes)
- Verify that props are forwarded correctly
- Understand that some attributes (like `name` for form integration) may be handled internally by Radix

## Test Structure

Each test file follows this structure:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ComponentName } from '../component-name'

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName>Content</ComponentName>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  // More tests...
})
```

## Adding New Tests

When adding tests for new components:

1. Create a new file in `__tests__/` named `component-name.test.tsx`
2. Import the component and testing utilities
3. Group related tests with `describe` blocks
4. Write clear, descriptive test names using `it` or `test`
5. Test core functionality first, then edge cases
6. Ensure accessibility is tested
7. Run tests to verify they pass

## Best Practices

- **Test behavior, not implementation** - Focus on what the component does, not how it does it
- **Keep tests focused** - Each test should verify one specific behavior
- **Use clear test names** - Describe what the test verifies in plain English
- **Avoid testing internal details** - Test the public API only
- **Test accessibility** - Ensure components work for all users
- **Test edge cases** - Consider empty states, disabled states, and error conditions

## Tools and Libraries

- **Vitest** - Fast unit test framework with excellent DX
- **React Testing Library** - Tests React components the way users interact with them
- **@testing-library/jest-dom** - Custom matchers for asserting on DOM elements
- **@testing-library/user-event** - Simulates user interactions more realistically than `fireEvent`
- **jsdom** - Browser-like environment for Node.js

## Coverage Goals

The test suite aims for:
- ✅ All exported components have basic rendering tests
- ✅ All component variants and sizes are tested
- ✅ User interactions are verified with user-event
- ✅ Accessibility features are validated
- ✅ Custom styling and className merging works correctly

## Continuous Integration

Tests run automatically on:
- Pull request creation and updates
- Commits to main branch
- Local development (via watch mode)

Tests must pass before code can be merged.
