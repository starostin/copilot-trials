import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserLinks } from "@/data/links";
import { LinkCard } from "@/components/link-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Link2 } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }
  
  const userLinks = await getUserLinks(userId);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Links</h1>
          <p className="text-muted-foreground">
            Manage your shortened links and track their performance
          </p>
        </div>
        <Button className="gap-2 sm:w-auto">
          <Plus className="h-4 w-4" />
          Create New Link
        </Button>
      </div>
      
      {userLinks.length === 0 ? (
        <Card className="border-dashed">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Link2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle>No links yet</CardTitle>
            <CardDescription>
              Get started by creating your first shortened link
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Link
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {userLinks.map((link) => {
            const formattedDate = new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }).format(new Date(link.createdAt));
            
            return (
              <LinkCard
                key={link.id}
                id={link.id}
                shortCode={link.shortCode}
                originalUrl={link.originalUrl}
                createdAt={formattedDate}
              />
            );
          })}
        </div>
      )}
      
      {userLinks.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Showing {userLinks.length} {userLinks.length === 1 ? 'link' : 'links'}
          </p>
        </div>
      )}
    </div>
  );
}
