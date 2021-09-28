import { TitleComponentAttributes } from 'puppies-components';
import 'puppies-components';

// provides type definitions for the web components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "pup-title": TitleComponentAttributes;
    }
  }
}

export {};