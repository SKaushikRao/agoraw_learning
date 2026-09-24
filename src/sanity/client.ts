import { createClient } from '@sanity/client';

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'i1zx9y9l';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01';
export const writeToken = import.meta.env.VITE_SANITY_WRITE_TOKEN;

// In development, default to useCdn: false so that new/edited Sanity content appears immediately on refresh
export const useCdn = import.meta.env.VITE_SANITY_USE_CDN === 'true';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
});

// Write client for creating/updating documents (requires token)
export const writeClient = writeToken ? createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
  perspective: 'published',
}) : null;

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

/**
 * Helper to create a document in Sanity
 */
export async function sanityCreate<T>(doc: Omit<T, '_id'>): Promise<T | null> {
  if (!writeClient) {
    console.error('Write client not configured. Set VITE_SANITY_WRITE_TOKEN environment variable.');
    return null;
  }
  try {
    const data = await writeClient.create(doc);
    return data;
  } catch (error) {
    console.error('Error creating document in Sanity:', error);
    return null;
  }
}
