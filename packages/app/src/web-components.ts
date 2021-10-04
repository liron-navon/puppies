import { ImageUploadComponentAttributes, LazyLoadedGalleryComponentAttributes } from 'puppies-components';
import 'puppies-components';

// provides type definitions for the web components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'pup-lazy-loaded-gallery': LazyLoadedGalleryComponentAttributes
      'pup-image-upload': ImageUploadComponentAttributes
    }
  }
}

export {};