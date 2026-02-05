# Contributing to Global Trade Hub

Thank you for your interest in contributing to Global Trade Hub! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect different viewpoints and experiences

## How to Contribute

### Reporting Bugs

Before creating a bug report:
1. Check if the issue already exists
2. Collect relevant information (error messages, logs, steps to reproduce)
3. Test on the latest version

When creating a bug report, include:
- Clear and descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/logs if applicable
- Environment details (OS, browser, Go version, etc.)

### Suggesting Enhancements

Enhancement suggestions are welcome! Include:
- Clear description of the feature
- Use cases and benefits
- Potential implementation approach
- Any mockups or examples

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
6. **Push to your fork**
7. **Open a Pull Request**

## Development Guidelines

### Backend (Go)

#### Code Style
- Follow standard Go conventions
- Use `gofmt` for formatting
- Run `golangci-lint` before committing
- Write clear, descriptive function/variable names
- Add comments for exported functions

#### Structure
```
internal/domain/[domain]/
├── model.go       # Domain entities and DTOs
├── repository.go  # Data access layer
├── service.go     # Business logic
└── handler.go     # HTTP handlers
```

#### Best Practices
- Keep handlers thin (delegate to service layer)
- Put business logic in service layer
- Use repositories for all database access
- Return errors, don't panic
- Use context for cancellation
- Validate input in handlers
- Use prepared statements for SQL

#### Testing
```bash
# Run tests
go test ./...

# Run tests with coverage
go test -cover ./...

# Run tests for specific package
go test ./internal/domain/product/...
```

### Frontend (React/TypeScript)

#### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use functional components and hooks
- Use Tailwind CSS for styling
- Follow the existing component structure

#### Component Structure
```typescript
// Use named exports
export const MyComponent = () => {
  // Hooks first
  const { t } = useLanguage();
  const [state, setState] = useState();
  
  // Event handlers
  const handleClick = () => {
    // ...
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

#### Best Practices
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use TypeScript interfaces for props
- Avoid prop drilling (use Context or composition)
- Handle loading and error states
- Use semantic HTML
- Ensure accessibility (ARIA labels, keyboard navigation)

#### Testing
```bash
# Run linter
npm run lint

# Build to check for TypeScript errors
npm run build
```

### API Services

When adding new API endpoints:

1. **Backend**: Create in appropriate domain
   - Define model in `model.go`
   - Implement repository in `repository.go`
   - Add business logic in `service.go`
   - Create HTTP handler in `handler.go`
   - Register route in `router.go`
   - Wire up in `main.go`

2. **Frontend**: Create service file
   - Add TypeScript interfaces
   - Implement API calls using `api.ts` utilities
   - Export from `services/index.ts`

3. **Documentation**: Update `API.md` with new endpoint

## Commit Message Guidelines

Use conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```
feat(product): add product filtering by price range

Add min/max price filters to product list endpoint and frontend UI

Closes #123

fix(auth): resolve token refresh race condition

The refresh token logic was not properly handling concurrent requests

refactor(order): simplify order status update logic

docs(api): add examples for RFQ endpoints
```

## Code Review Process

All submissions require review. Reviewers will check:
- Code quality and style
- Test coverage
- Documentation updates
- Breaking changes
- Performance implications

## Database Migrations

When modifying database schema:

1. Create new migration files (don't modify existing ones):
```bash
cd backend/migrations
# Create numbered migration files
# 003_your_change.up.sql
# 003_your_change.down.sql
```

2. Test both up and down migrations:
```bash
make migrate-up
make migrate-down
make migrate-up
```

3. Update seed data if necessary

## Adding New Features

### Checklist

- [ ] Backend domain implementation (model, repository, service, handler)
- [ ] Database migration (if schema changes)
- [ ] Frontend service implementation
- [ ] Update relevant components/pages
- [ ] Add TypeScript types
- [ ] Update API documentation
- [ ] Test manually
- [ ] Update README if needed
- [ ] Consider localization (add i18n keys)

### Example: Adding a "Reviews" Feature

1. **Backend** (`backend/internal/domain/review/`):
   ```go
   // model.go - Define Review struct and DTOs
   // repository.go - Implement MySQL CRUD
   // service.go - Business logic (validation, calculations)
   // handler.go - HTTP endpoints
   ```

2. **Database** (`backend/migrations/003_add_reviews.up.sql`):
   ```sql
   CREATE TABLE reviews (...);
   ```

3. **Router** (`backend/internal/http/router.go`):
   ```go
   reviewHandler := review.NewHandler(reviewService)
   api.GET("/products/:id/reviews", reviewHandler.List)
   protected.POST("/reviews", reviewHandler.Create)
   ```

4. **Frontend** (`src/services/review.service.ts`):
   ```typescript
   export const reviewService = {
     async list(productId: string) { ... },
     async create(data: CreateReviewRequest) { ... }
   };
   ```

5. **Components** (`src/components/review/`):
   - ReviewList.tsx
   - ReviewForm.tsx
   - ReviewCard.tsx

6. **Documentation** (`backend/API.md`):
   - Document new endpoints
   - Add request/response examples

## Translation (i18n)

When adding new UI text:

1. Add keys to `src/lib/i18n.ts`:
```typescript
en: {
  translation: {
    newFeature: {
      title: "New Feature",
      description: "Feature description"
    }
  }
}
```

2. Add translations for all languages (en, fa, ar)

3. Use in components:
```typescript
const { t } = useLanguage();
<h1>{t('newFeature.title')}</h1>
```

## Performance Considerations

### Backend
- Use context with timeout for all database operations
- Implement pagination for list endpoints
- Use indexes for frequently queried columns
- Avoid N+1 queries
- Consider caching for expensive operations

### Frontend
- Use React.memo for expensive components
- Implement lazy loading for routes
- Optimize images (WebP, proper sizing)
- Use code splitting
- Minimize bundle size

## Security Guidelines

- Never commit sensitive data (.env files, secrets, etc.)
- Always validate and sanitize user input
- Use parameterized queries (prevent SQL injection)
- Implement proper authentication checks
- Follow OWASP security guidelines
- Keep dependencies updated

## Questions?

If you have questions about contributing:
- Open a GitHub Discussion
- Check existing issues and PRs
- Review the codebase documentation

---

Thank you for contributing to Global Trade Hub! 🎉
