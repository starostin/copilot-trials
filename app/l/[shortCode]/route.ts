import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { getLinkByShortCode } from '@/data/links';

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

  // Redirect to the original URL
  redirect(link.originalUrl);
}
