# Contributing to INT Platform Explorer

Thank you for your interest in contributing to INT Platform Explorer!

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Make your changes
5. Submit a pull request

## Code Standards

### TypeScript
- Use strict TypeScript with explicit types
- Prefer interfaces over type aliases for object shapes
- Use Zod schemas for runtime validation

### React Components
- Use functional components with hooks
- Include `data-testid` attributes for testable elements
- Wrap risky components with ErrorBoundary

### Styling
- Use Tailwind CSS utility classes
- Follow the design guidelines in `design_guidelines.md`
- Ensure dark mode compatibility

### Accessibility
- Include ARIA labels where appropriate
- Ensure keyboard navigation works
- Test with screen readers

## Commit Messages

Use conventional commit format:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Formatting changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Request review from maintainers

## Reporting Issues

Please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information

## Questions?

Open a discussion or reach out to the maintainers.
