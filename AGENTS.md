# Agent Instructions - Project Coding Standards

This project is a **Next.js 16 Link Shortener** application with TypeScript, employing modern best practices and conventions.

## 📚 Documentation Structure

Agent instructions are organized into separate files for clarity.

> **⚠️ CRITICAL**: It is **ABSOLUTELY MANDATORY** to read the relevant individual instruction files within the `/docs` directory. You **MUST** read and apply the standards defined in these files **BEFORE** generating any code.

ALWAYS refer to the relevant .md file BEFORE generating any code:

- **[Authentication](./docs/authentication.md)**: Clerk authentication, protected routes, and user management
- **[UI Components](./docs/ui-components.md)**: shadcn/ui component standards and usage


## 🎯 Quick Reference

### Technology Stack
- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **UI Library**: React 19
- **Authentication**: Clerk
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Styling**: Tailwind CSS v4, shadcn/ui (New York style)
- **Icons**: Lucide React
- **Linting**: ESLint with Next.js config

### Key Principles
1. **Type Safety First**: Use TypeScript strictly, avoid `any`
2. **Server Components by Default**: Use client components only when necessary
3. **Functional Components**: Always use function declarations
4. **Consistent Imports**: Use `@/*` path aliases
5. **Semantic HTML**: Proper accessibility and semantic markup
6. **Responsive Design**: Mobile-first with Tailwind utilities
7. **Performance**: Optimize images, fonts, and bundle size

### Path Aliases
```typescript
import Component from "@/components/Component"
import { cn } from "@/lib/utils"
import { schema } from "@/db/schema"
```

### Code Style
- **Indentation**: 2 spaces
- **Quotes**: Double quotes for JSX/TSX, single quotes for TypeScript
- **Semicolons**: Required
- **Trailing Commas**: Yes
- **Line Length**: 80-100 characters (soft limit)

## 🚀 Getting Started

When working on this project:
1. Read the relevant standards document before making changes
2. Follow existing patterns in the codebase
3. Use provided utilities (`cn()`, type helpers)
4. Ensure type safety and proper error handling
5. Test authentication flows with Clerk
6. Run `npm run lint` before committing

## 📝 Notes for AI Agents

- Always check existing code patterns before creating new ones
- Preserve existing formatting and style
- Use the `cn()` utility for conditional className logic
- Implement proper loading and error states
- Consider server-side vs client-side rendering implications
- Follow Next.js App Router conventions strictly
