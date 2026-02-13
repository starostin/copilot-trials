---
description: Read this before implementing any authentication-related features in the project. This file outlines the architecture and best practices for using Clerk as the authentication provider.
---

# Authentication Architecture

## Overview

This application uses **Clerk** as the exclusive authentication provider. No other authentication methods or libraries should be implemented.

## Core Principles

1. **Clerk Only**: All authentication, authorization, and user management must go through Clerk
2. **Modal Authentication**: Sign-in and sign-up flows must always launch as modals
3. **Protected Routes**: Implement proper route protection for authenticated areas
4. **Redirect Logic**: Handle automatic redirects based on authentication state

## Route Protection

### Protected Routes

- `/dashboard` - Requires authentication
- Any routes under `/dashboard/*` - Requires authentication

**Implementation**: Use Clerk's proxy pattern (see `proxy.ts`) or `auth()` helper to verify authentication before rendering protected pages.

### Redirect Behavior

- **Authenticated users on `/`**: Redirect to `/dashboard`
- **Unauthenticated users on `/dashboard`**: Redirect to sign-in modal

## Authentication Flow

### Sign Up
- Trigger: User clicks "Sign Up" button
- Behavior: Opens Clerk sign-up modal
- On Success: Redirect to `/dashboard`

### Sign In
- Trigger: User clicks "Sign In" button
- Behavior: Opens Clerk sign-in modal
- On Success: Redirect to `/dashboard`

### Sign Out
- Trigger: User clicks "Sign Out" button
- Behavior: Clerk handles session termination
- On Success: Redirect to `/`

## Implementation Guidelines

### Modal Configuration

Always configure Clerk components to use modal mode:

```typescript
<ClerkProvider>
  <SignIn routing="modal" />
  <SignUp routing="modal" />
</ClerkProvider>
```

### Proxy Pattern

Use Clerk proxy configuration to protect routes:

```typescript
// proxy.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
```

**Note**: This project uses `proxy.ts` instead of `middleware.ts` as the latter is deprecated in Next.js 16.

### Page-Level Protection

For `/dashboard` and nested routes:

```typescript
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/');
  }
  
  // Render protected content
}
```

### Homepage Redirect

Check authentication state on homepage:

```typescript
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  // Render landing page
}
```

## User Data

### Accessing User Information

Use Clerk's hooks and server functions:

```typescript
// Client Component
import { useUser } from '@clerk/nextjs';

export function UserProfile() {
  const { user } = useUser();
  return <div>{user?.firstName}</div>;
}

// Server Component
import { currentUser } from '@clerk/nextjs/server';

export default async function Profile() {
  const user = await currentUser();
  return <div>{user?.firstName}</div>;
}
```

## Security Best Practices

1. **Never bypass Clerk**: Don't create custom JWT handling or session management
2. **Validate on server**: Always verify authentication server-side for sensitive operations
3. **Use Clerk webhooks**: Sync user data to your database via Clerk webhooks
4. **Secure API routes**: Protect API endpoints using Clerk's `auth()` in route handlers

## Common Patterns

### Protected API Route

```typescript
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Handle authenticated request
}
```

### Conditional UI Rendering

```typescript
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export function Header() {
  return (
    <header>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
```

## Forbidden Practices

❌ **Do Not**:
- Implement custom JWT verification
- Use NextAuth.js or Passport.js
- Create custom session management
- Store passwords or credentials
- Build custom authentication forms (use Clerk components)

✅ **Do**:
- Use Clerk components and hooks
- Configure modal routing for auth flows
- Implement proper redirects
- Validate authentication server-side
- Use Clerk webhooks for data syncing
