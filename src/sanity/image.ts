import createImageUrlBuilder from '@sanity/image-url';
import { projectId, dataset } from './client';

const imageBuilder = createImageUrlBuilder({
  projectId,
  dataset,
});

/**
 * Image URL builder for Sanity Image assets
 */
export function urlFor(source: any) {
  return imageBuilder.image(source);
}

/**
 * Helper to get an optimized image URL with dimensions and fit
 */
export function getSanityImageUrl(
  source: any,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    fit?: 'crop' | 'clip' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
  } = {}
): string | undefined {
  if (!source) return undefined;
  
  // If it's already a regular HTTP URL string
  if (typeof source === 'string' && (source.startsWith('http://') || source.startsWith('https://') || source.startsWith('/'))) {
    return source;
  }

  // If it's a Sanity image object or asset reference
  try {
    let builder = urlFor(source).auto('format');
    if (options.width) builder = builder.width(options.width);
    if (options.height) builder = builder.height(options.height);
    if (options.quality) builder = builder.quality(options.quality);
    if (options.fit) builder = builder.fit(options.fit);
    return builder.url();
  } catch {
    return undefined;
  }
}
