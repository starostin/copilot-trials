"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link2, ExternalLink, Copy, Trash2, Loader2 } from "lucide-react";
import { EditLinkDialog } from "@/components/edit-link-dialog";
import { deleteLinkAction } from "@/app/dashboard/actions";

interface LinkCardProps {
  id: string;
  shortCode: string;
  originalUrl: string;
  createdAt: string;
}

export function LinkCard({ id, shortCode, originalUrl, createdAt }: LinkCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const shortUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${shortCode}`;
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    // TODO: Add toast notification
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteLinkAction(id);
    
    if (result.error) {
      // TODO: Show error toast
      console.error("Failed to delete link:", result.error);
      setIsDeleting(false);
    }
    // No need to set loading false on success since the component will unmount
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
            <EditLinkDialog
              id={id}
              currentShortCode={shortCode}
              currentOriginalUrl={originalUrl}
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the short link{" "}
                    <span className="font-mono font-semibold">{shortCode}</span>.
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
