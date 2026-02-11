# UI Components - shadcn/ui Standards

## Core Principle

**All UI elements in this application use shadcn/ui components exclusively.**

## Rules

1. **Never create custom UI components** - Use existing shadcn/ui components instead
2. **Composition over creation** - Combine shadcn/ui components to build complex interfaces
3. **Styling with Tailwind** - Use Tailwind CSS utilities to customize shadcn/ui components
4. **Use the `cn()` utility** - For conditional className logic (imported from `@/lib/utils`)

## Available shadcn/ui Components

This project uses the **New York style** variant of shadcn/ui. Common components include:

- **Layout**: Card, Separator, Tabs
- **Forms**: Button, Input, Label, Select, Textarea, Checkbox, Radio Group
- **Feedback**: Alert, Toast, Dialog, Popover, Tooltip
- **Navigation**: Navigation Menu, Dropdown Menu
- **Data Display**: Table, Badge, Avatar

## Examples

### ✅ Correct - Using shadcn/ui
```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Click me</Button>
      </CardContent>
    </Card>
  );
}
```

### ❌ Incorrect - Creating custom components
```tsx
// DON'T DO THIS
export function CustomButton({ children }: { children: React.ReactNode }) {
  return <button className="...">{children}</button>;
}
```

## Adding New shadcn/ui Components

If a needed shadcn/ui component is not yet installed, it can be added using:

```bash
npx shadcn@latest add [component-name]
```

Always prefer adding official shadcn/ui components over creating custom ones.
