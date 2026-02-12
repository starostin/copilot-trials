import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link2, Zap, BarChart3, Shield, Clock, Globe } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  
  if (userId) {
    redirect("/dashboard");
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            Free & Fast URL Shortening
          </Badge>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Shorten Your Links,
            <br />
            Amplify Your Reach
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Create short, memorable links in seconds. Track clicks, analyze
            performance, and share with confidence. Perfect for marketers,
            businesses, and content creators.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                <Zap className="h-5 w-5" />
                Get Started Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-border bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to manage and track your shortened links
            </p>
          </div>
          
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Link2 className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Instant Shortening</CardTitle>
                <CardDescription>
                  Create shortened links in milliseconds. No delays, no hassle.
                  Just paste your URL and go.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Track clicks, monitor performance, and gain insights with
                  detailed analytics for every link.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Secure & Reliable</CardTitle>
                <CardDescription>
                  Your links are protected with enterprise-grade security.
                  99.9% uptime guaranteed.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Custom Expiration</CardTitle>
                <CardDescription>
                  Set expiration dates for your links. Perfect for time-sensitive
                  campaigns and promotions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Custom Domains</CardTitle>
                <CardDescription>
                  Use your own branded domain for shortened links. Build trust
                  and reinforce your brand.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Blazing fast redirects with global CDN coverage. Your users
                  won't even notice the redirect.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl rounded-lg border border-border bg-card px-8 py-12 text-center shadow-sm">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of users who trust our platform for their link
            shortening needs. No credit card required.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              <Zap className="h-5 w-5" />
              Create Your First Link
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Link Shortener. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
