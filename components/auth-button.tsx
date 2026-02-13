"use client";

import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

interface AuthButtonProps {
  children: ReactNode;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  className?: string;
  redirectTo?: string;
}

export function AuthButton({ 
  children, 
  size = "default",
  variant = "default",
  className,
  redirectTo = "/dashboard"
}: AuthButtonProps) {
  const router = useRouter();

  return (
    <>
      <SignedOut>
        <SignInButton 
          mode="modal"
          forceRedirectUrl={redirectTo}
          fallbackRedirectUrl={redirectTo}
        >
          <Button size={size} variant={variant} className={className}>
            {children}
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <Button 
          size={size} 
          variant={variant} 
          className={className}
          onClick={() => router.push(redirectTo)}
        >
          {children}
        </Button>
      </SignedIn>
    </>
  );
}
