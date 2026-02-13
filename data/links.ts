import { db } from '@/db';
import { links } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

/**
 * Creates a new shortened link
 * @param data - The link data including shortCode, originalUrl, and userId
 * @returns The created link object
 */
export async function createLink(data: {
  shortCode: string;
  originalUrl: string;
  userId: string;
}) {
  const [link] = await db
    .insert(links)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();
  
  return link;
}

/**
 * Fetches all links for a specific user
 * @param userId - The Clerk user ID
 * @returns Array of links ordered by most recently created
 */
export async function getUserLinks(userId: string) {
  return await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));
}

/**
 * Fetches a single link by its short code
 * @param shortCode - The short code of the link
 * @returns The link object or undefined
 */
export async function getLinkByShortCode(shortCode: string) {
  const result = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  
  return result[0];
}

/**
 * Fetches a single link by ID for a specific user
 * @param id - The link ID
 * @param userId - The Clerk user ID
 * @returns The link object or undefined
 */
export async function getUserLinkById(id: string, userId: string) {
  const result = await db
    .select()
    .from(links)
    .where(eq(links.id, id))
    .limit(1);
  
  const link = result[0];
  
  // Verify ownership
  if (link && link.userId !== userId) {
    return undefined;
  }
  
  return link;
}

/**
 * Updates a link by ID
 * @param id - The link ID
 * @param userId - The Clerk user ID
 * @param data - The data to update
 * @returns The updated link object or undefined
 */
export async function updateLink(
  id: string,
  userId: string,
  data: {
    shortCode?: string;
    originalUrl?: string;
  }
) {
  // Verify ownership before updating
  const existingLink = await getUserLinkById(id, userId);
  if (!existingLink) {
    return undefined;
  }

  const [updatedLink] = await db
    .update(links)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(links.id, id))
    .returning();

  return updatedLink;
}

/**
 * Deletes a link by ID
 * @param id - The link ID
 * @param userId - The Clerk user ID
 * @returns True if deleted successfully, false otherwise
 */
export async function deleteLink(id: string, userId: string) {
  // Verify ownership before deleting
  const existingLink = await getUserLinkById(id, userId);
  if (!existingLink) {
    return false;
  }

  await db.delete(links).where(eq(links.id, id));

  return true;
}
