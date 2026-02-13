---
description: Read this before implementing any data mutations or server actions in the project. This file outlines the architecture and best practices for server-side data operations.
---

# Server Actions & Data Mutations

## Overview

This application follows a strict server actions pattern for all data mutations, ensuring type safety, validation, and proper authentication checks.

## Core Principles

1. **Server Actions Only**: All data mutations must be done via server actions
2. **Client Component Invocation**: Server actions must be called from client components
3. **Colocated Actions**: Server action files must be named `actions.ts` and placed in the same directory as the calling component
4. **Type Safety**: All data must have explicit TypeScript types (never use the generic `FormData` type)
5. **Validation Required**: All incoming data must be validated using Zod schemas
6. **Authentication First**: Always verify user authentication before any database operations
7. **Data Layer Abstraction**: Use helper functions from `/data` directory instead of direct Drizzle queries

## File Structure

```
app/
  dashboard/
    page.tsx              // Client component
    actions.ts            // Server actions for dashboard
components/
  link-card.tsx           // Client component
  actions.ts              // Server actions for link-card
```

## Implementation Guidelines

### 1. Creating Server Actions

**File naming**: Always use `actions.ts`

```typescript
// app/dashboard/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink } from "@/data/links";

// Define Zod schema for validation
const createLinkSchema = z.object({
  url: z.string().url(),
  title: z.string().min(1).max(100),
  slug: z.string().min(3).max(50),
});

export async function createLinkAction(data: {
  url: string;
  title: string;
  slug: string;
}) {
  // 1. Check authentication
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  // 2. Validate data with Zod
  const result = createLinkSchema.safeParse(data);
  if (!result.success) {
    return { error: "Invalid data", details: result.error };
  }

  // 3. Call data layer helper function
  try {
    const link = await createLink({
      ...result.data,
      userId,
    });
    return { success: true, link };
  } catch (error) {
    return { error: "Failed to create link" };
  }
}
```

### 2. Calling Server Actions from Client Components

```typescript
// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import { createLinkAction } from "./actions";

export default function DashboardPage() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const result = await createLinkAction({ url, title, slug });
    
    if (result.error) {
      console.error(result.error);
    } else {
      console.log("Link created:", result.link);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### 3. Data Layer Helper Functions

All database operations must go through helper functions in the `/data` directory:

```typescript
// data/links.ts
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createLink(data: {
  url: string;
  title: string;
  slug: string;
  userId: string;
}) {
  const [link] = await db.insert(links).values(data).returning();
  return link;
}

export async function getLinksByUserId(userId: string) {
  return await db.select().from(links).where(eq(links.userId, userId));
}

export async function deleteLink(id: string, userId: string) {
  await db.delete(links).where(eq(links.id, id)).and(eq(links.userId, userId));
}
```

## Rules Summary

### ✅ Do This

- Define `actions.ts` files colocated with components
- Use explicit TypeScript types for all parameters
- Validate all data with Zod schemas
- Check authentication with `auth()` from Clerk
- Use helper functions from `/data` directory
- Return structured responses with `{ success, error }` patterns
- Handle errors gracefully

### ❌ Don't Do This

```typescript
// ❌ Using FormData type
export async function createLinkAction(formData: FormData) { }

// ❌ Direct Drizzle queries in server actions
export async function createLinkAction(data: any) {
  await db.insert(links).values(data); // Don't do this
}

// ❌ No authentication check
export async function createLinkAction(data: LinkData) {
  // Missing: const { userId } = await auth();
  await createLink(data);
}

// ❌ No validation
export async function createLinkAction(data: any) { // 'any' type
  const { userId } = await auth();
  await createLink(data); // Not validated
}
```

## Best Practices

1. **Error Handling**: Always wrap database operations in try-catch blocks
2. **Return Types**: Use consistent return types (e.g., `{ success: boolean; error?: string; data?: T }`)
3. **Revalidation**: Use `revalidatePath()` or `revalidateTag()` to update cached data after mutations
4. **Loading States**: Handle loading and error states in client components
5. **Optimistic Updates**: Consider using optimistic UI updates for better UX

## Example: Complete Flow

```typescript
// data/links.ts
export async function updateLink(id: string, data: Partial<Link>) {
  const [updated] = await db
    .update(links)
    .set(data)
    .where(eq(links.id, id))
    .returning();
  return updated;
}

// components/link-card/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { updateLink } from "@/data/links";
import { revalidatePath } from "next/cache";

const updateLinkSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(100).optional(),
  url: z.string().url().optional(),
});

export async function updateLinkAction(data: {
  id: string;
  title?: string;
  url?: string;
}) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  const result = updateLinkSchema.safeParse(data);
  if (!result.success) {
    return { error: "Invalid data" };
  }

  try {
    const link = await updateLink(result.data.id, result.data);
    revalidatePath("/dashboard");
    return { success: true, link };
  } catch (error) {
    return { error: "Failed to update link" };
  }
}

// components/link-card.tsx
"use client";

import { updateLinkAction } from "./actions";

export function LinkCard({ link }: { link: Link }) {
  async function handleUpdate(title: string) {
    const result = await updateLinkAction({
      id: link.id,
      title,
    });
    
    if (result.error) {
      alert(result.error);
    }
  }

  return <div>{/* component UI */}</div>;
}
```
