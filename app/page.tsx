"use client";

import { Link2, BarChart3, Zap, Shield } from "lucide-react";

export default function Home() {
  const handleGetStarted = () => {
    // This would normally open Clerk SignUp modal
    alert("Sign up functionality requires Clerk configuration. Please set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in .env.local");
  };
  
  const handleSignIn = () => {
    // This would normally open Clerk SignIn modal
    alert("Sign in functionality requires Clerk configuration. Please set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in .env.local");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <Zap className="h-4 w-4 text-blue-500" />
            <span>Fast, Secure, and Simple</span>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl lg:text-7xl">
            Shorten URLs,
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Amplify Reach
            </span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
            Transform long, complex URLs into short, memorable links. Track clicks, analyze traffic, and manage all your links in one place.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button 
              onClick={handleGetStarted}
              className="flex h-12 w-full items-center justify-center rounded-lg bg-blue-600 px-8 text-base font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
            >
              Get Started Free
            </button>
            <button 
              onClick={handleSignIn}
              className="flex h-12 w-full items-center justify-center rounded-lg border border-zinc-300 bg-white px-8 text-base font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 sm:w-auto"
            >
              Sign In
            </button>
          </div>
          
          <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-500">
            No credit card required • Free forever plan
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Everything you need to manage links
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              Powerful features to help you create, track, and optimize your shortened URLs
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Link2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Custom Short Links
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Create branded, memorable short URLs that reflect your identity and build trust.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Detailed Analytics
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Track clicks, geographic data, and referrer information to understand your audience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Lightning Fast
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Instant URL shortening with blazing-fast redirects for the best user experience.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                Secure & Reliable
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Enterprise-grade security with 99.9% uptime guarantee and automatic backups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-12 text-center shadow-2xl">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mb-8 text-lg text-blue-50">
            Join thousands of users who trust us with their links. Start shortening today!
          </p>
          <button 
            onClick={handleGetStarted}
            className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-base font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            Create Free Account
          </button>
        </div>
      </section>
    </div>
  );
}
