"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link2, ExternalLink, Copy, Trash2 } from "lucide-react";

interface LinkCardProps {
  id: string;
  shortCode: string;
  originalUrl: string;
  createdAt: string;
}

export function LinkCard({ shortCode, originalUrl, createdAt }: LinkCardProps) {
  const shortUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${shortCode}`;
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    // TODO: Add toast notification
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Link2 className="h-4 w-4 text-primary" />
              <span className="truncate font-mono">{shortCode}</span>
            </CardTitle>
            <CardDescription className="break-all">
              {originalUrl}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {createdAt}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Short URL:</p>
            <p className="font-mono text-sm font-medium">{shortUrl}</p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            <Button
              size="sm"
              variant="outline"
              asChild
            >
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Visit
              </a>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
