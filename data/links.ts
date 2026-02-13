import { db } from '@/db';
import { links } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

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
