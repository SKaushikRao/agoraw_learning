import { createClient } from '@sanity/client';

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'i1zx9y9l';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01';

// In development, default to useCdn: false so that new/edited Sanity content appears immediately on refresh
export const useCdn = import.meta.env.VITE_SANITY_USE_CDN === 'true';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
});

/**
 * Helper to fetch data with error handling
 */
export async function sanityFetch<T>(query: string, params: Record<string, any> = {}): Promise<T | null> {
  try {
    const data = await client.fetch<T>(query, params);
    return data;
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    return null;
  }
}
