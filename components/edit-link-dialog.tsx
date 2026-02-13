"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Loader2 } from "lucide-react";
import { updateLinkAction } from "@/app/dashboard/actions";

interface EditLinkDialogProps {
  id: string;
  currentShortCode: string;
  currentOriginalUrl: string;
}

export function EditLinkDialog({ 
  id, 
  currentShortCode, 
  currentOriginalUrl 
}: EditLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [originalUrl, setOriginalUrl] = useState(currentOriginalUrl);
  const [shortCode, setShortCode] = useState(currentShortCode);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await updateLinkAction({
      id,
      originalUrl,
      shortCode,
    });

    setIsLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      // Success - close dialog
      setOpen(false);
      setError(null);
    }
  }

  // Reset form when dialog opens
  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (isOpen) {
      setOriginalUrl(currentOriginalUrl);
      setShortCode(currentShortCode);
      setError(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2">
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Short Link</DialogTitle>
            <DialogDescription>
              Update the URL or customize the short code for this link.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-originalUrl">
                Original URL <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-originalUrl"
                type="url"
                placeholder="https://example.com/very-long-url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-shortCode">
                Short Code <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-shortCode"
                type="text"
                placeholder="my-link"
                value={shortCode}
                onChange={(e) => setShortCode(e.target.value)}
                required
                disabled={isLoading}
                maxLength={20}
              />
              <p className="text-xs text-muted-foreground">
                Must be between 3-20 characters
              </p>
            </div>
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !originalUrl || !shortCode}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
