"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { nanoid } from "nanoid";
import { createLink, getLinkByShortCode, updateLink, deleteLink } from "@/data/links";
import { revalidatePath } from "next/cache";

// Define Zod schema for validation
const createLinkSchema = z.object({
  originalUrl: z.string().url("Please enter a valid URL"),
  shortCode: z
    .string()
    .min(3, "Short code must be at least 3 characters")
    .max(20, "Short code must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Short code can only contain letters, numbers, hyphens, and underscores"
    )
    .optional(),
});

export async function createLinkAction(data: {
  originalUrl: string;
  shortCode?: string;
}) {
  // 1. Check authentication
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  // 2. Validate data with Zod
  const result = createLinkSchema.safeParse(data);
  if (!result.success) {
    return {
      error: "Invalid data",
      details: result.error.flatten().fieldErrors,
    };
  }

  // 3. Generate short code if not provided
  let shortCode = result.data.shortCode;
  if (!shortCode) {
    shortCode = nanoid(8);
  }

  // 4. Check if short code already exists
  const existingLink = await getLinkByShortCode(shortCode);
  if (existingLink) {
    return { error: "This short code is already taken" };
  }

  // 5. Create the link
  try {
    const link = await createLink({
      shortCode,
      originalUrl: result.data.originalUrl,
      userId,
    });

    // 6. Revalidate the dashboard page to show the new link
    revalidatePath("/dashboard");

    return { success: true, link };
  } catch (error) {
    console.error("Error creating link:", error);
    return { error: "Failed to create link" };
  }
}

const updateLinkSchema = z.object({
  id: z.string().uuid("Invalid link ID"),
  originalUrl: z.string().url("Please enter a valid URL"),
  shortCode: z
    .string()
    .min(3, "Short code must be at least 3 characters")
    .max(20, "Short code must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Short code can only contain letters, numbers, hyphens, and underscores"
    ),
});

export async function updateLinkAction(data: {
  id: string;
  originalUrl: string;
  shortCode: string;
}) {
  // 1. Check authentication
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  // 2. Validate data with Zod
  const result = updateLinkSchema.safeParse(data);
  if (!result.success) {
    return {
      error: "Invalid data",
      details: result.error.flatten().fieldErrors,
    };
  }

  // 3. Check if the new short code already exists (if it's different from the current one)
  const existingLink = await getLinkByShortCode(result.data.shortCode);
  if (existingLink && existingLink.id !== result.data.id) {
    return { error: "This short code is already taken" };
  }

  // 4. Update the link
  try {
    const link = await updateLink(result.data.id, userId, {
      shortCode: result.data.shortCode,
      originalUrl: result.data.originalUrl,
    });

    if (!link) {
      return { error: "Link not found or unauthorized" };
    }

    // 5. Revalidate the dashboard page
    revalidatePath("/dashboard");

    return { success: true, link };
  } catch (error) {
    console.error("Error updating link:", error);
    return { error: "Failed to update link" };
  }
}

export async function deleteLinkAction(id: string) {
  // 1. Check authentication
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  // 2. Delete the link
  try {
    const success = await deleteLink(id, userId);

    if (!success) {
      return { error: "Link not found or unauthorized" };
    }

    // 3. Revalidate the dashboard page
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error deleting link:", error);
    return { error: "Failed to delete link" };
  }
}
