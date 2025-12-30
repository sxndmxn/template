# UI Component Tests

This directory contains unit tests for the UI components using Bun's built-in test runner.

## Running Tests

```bash
# Run all tests
bun test

# Run tests for specific component
bun test components/ui/button.test.tsx

# Run tests in watch mode
bun test --watch
```

## Test Structure

Each component has a corresponding `.test.tsx` file that tests:

- **Rendering**: Ensures components render correctly with default and custom props
- **Variants**: Tests all variant options (where applicable)
- **Styling**: Verifies className application and base styling
- **Props**: Validates that component props are properly passed through
- **Accessibility**: Checks for proper ARIA attributes and semantic markup

## Coverage

Tests are provided for the following components:

- Badge (variants: default, secondary, destructive, outline)
- Button (variants: default, destructive, outline, secondary, ghost, link; sizes: sm, default, lg, icon)
- Card (with sub-components: Header, Title, Description, Action, Content, Footer)
- Checkbox
- Input
- Label
- Progress
- Separator
- Skeleton
- Spinner
- Switch
- Textarea

## Test Configuration

- **Test Runner**: Bun's built-in test runner
- **Configuration**: `bunfig.toml` in the client directory
- **Setup**: `test-setup.ts` for global test configuration and mocks
