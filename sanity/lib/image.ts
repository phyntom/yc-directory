import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

// Optimized image URL generator with automatic format and quality optimization
export const optimizedImageUrl = (
  source: SanityImageSource, 
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
    fit?: 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'clip' | 'min';
  } = {}
) => {
  const { width, height, quality = 80, format = 'webp', fit = 'crop' } = options;
  
  let imageBuilder = builder.image(source)
    .format(format)
    .quality(quality)
    .fit(fit);
  
  if (width) imageBuilder = imageBuilder.width(width);
  if (height) imageBuilder = imageBuilder.height(height);
  
  return imageBuilder.url();
}
