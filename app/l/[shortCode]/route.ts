import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { getLinkByShortCode } from '@/data/links';

/**
 * Validates that a URL is safe for redirection
 * Only allows http:// and https:// protocols to prevent open redirect attacks
 */
function isSafeRedirectUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    // Only allow HTTP and HTTPS protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return false;
    }
    return true;
  } catch {
    // Invalid URL format
    return false;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await params;

  // Look up the link in the database
  const link = await getLinkByShortCode(shortCode);

  // If link not found, return 404
  if (!link) {
    return new Response('Link not found', { status: 404 });
  }

  // Validate URL to prevent open redirect vulnerabilities
  if (!isSafeRedirectUrl(link.originalUrl)) {
    return new Response('Invalid redirect URL', { status: 400 });
  }

  // Redirect to the original URL
  redirect(link.originalUrl);
}
