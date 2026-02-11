"use client";

import Link from "next/link";

export function Header() {
  const handleSignIn = () => {
    alert("Sign in functionality requires Clerk configuration. Please set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in .env.local");
  };
  
  const handleSignUp = () => {
    alert("Sign up functionality requires Clerk configuration. Please set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in .env.local");
  };
  
  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto flex h-20 items-center justify-between px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-foreground">
            Link Shortener
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleSignIn}
            className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            Sign In
          </button>
          <button 
            onClick={handleSignUp}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
