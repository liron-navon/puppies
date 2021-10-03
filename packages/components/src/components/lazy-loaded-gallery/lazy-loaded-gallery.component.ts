import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map';
import { calculateGallery, GalleryImagesCalculations, howManyImagesToBeAdded } from './calculations';

export interface GalleryConfig {
  imageHeight?: number
  imageWidth?: number,
  alt?: string,
}

export const defaultConfig: Readonly<GalleryConfig> = {
  imageHeight: 250,
  imageWidth: 250,
  alt: 'image from gallery'
}

@customElement('pup-lazy-loaded-gallery')
export class LazyLoadedGalleryComponent extends LitElement {
  // a flag to determine if the component is loaded into dom
  private didLoad: boolean = false;
  // the images that needs to be rendered
  private imagesToRender: string[] = [];
  // the internal configuration used internally
  private internalConfig: GalleryConfig;
  // the configuration passed to the component
  config: GalleryConfig;
  // a list of images to load
  images: string[] = [];

  static get properties() {
    return {
      images: {
        type: Array,
        reflect: true
      },
      imagesToRender: {
        state: true
      },
      config: {
        type: Object
      }
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.setupComponent();
    this.didLoad = true;
  }

  // reset the component when some properties change
  requestUpdate(name?: PropertyKey, oldValue?: unknown) {
    if ((name === 'images' || name === 'config') && this.didLoad) {
      this.setupComponent();
    }
    return super.requestUpdate(name, oldValue);
  }

  get galleryCalculation(): GalleryImagesCalculations {
    return calculateGallery(
      (this.parentNode as HTMLElement),
      this.internalConfig,
      this.imagesToRender.length
    );
  }

  setupComponent() {
    this.internalConfig = {
      ...defaultConfig,
      ...(this.config || {})
    };

    const { imagesPerRow, linesBuffer } = this.galleryCalculation;
    this.imagesToRender = this.images.slice(0, (imagesPerRow * linesBuffer * 2));
    this.onScroll.bind(this);
  }

  onScroll(event: Event) {
    const imagesToAdd = howManyImagesToBeAdded(this.galleryCalculation, event.target as HTMLElement);
    if (imagesToAdd) {
      this.imagesToRender = [
        ...this.imagesToRender,
        ...this.images.slice(
          this.imagesToRender.length,
          this.imagesToRender.length + imagesToAdd
        )
      ];
    }
  }

  // what is the height if we scrolled all the way down the gallery
  get expectedHeightAfterFullScroll() {
    const { imagesPerRow } = this.galleryCalculation;
    return this.images.length * (this.internalConfig.imageHeight / imagesPerRow);
  }

  static get styles() {
    return css`
    .root {
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
    .gallery-wrapper {
      overflow: scroll;
      height: 100%;
      height: 100%;
    }
    .gallery-wrapper::-webkit-scrollbar {
      display: none;
    }
    .image-wrapper {
      overflow: none;
    }
    .gallery {
      display:flex;
      align-items:flex-start;
      align-content:flex-start;
      flex-wrap: wrap;
      justify-content: center;
    }
    img {
      width:100%; 
      height:100%;
      object-fit: cover;
      object-position: center;
    }`
  }

  render() {
    const gallery = { height: this.expectedHeightAfterFullScroll + 'px' };
    const imageWrapperStyle = { height: this.internalConfig.imageHeight + 'px', width: this.internalConfig.imageWidth + 'px' };
    return html`
    <div class="root">
      <div class="gallery-wrapper" @scroll="${this.onScroll}">
        <div class="gallery" style="${styleMap(gallery)}">
          ${repeat(this.imagesToRender, id => id, item => {
      return html`
              <div class="image-wrapper" style="${styleMap(imageWrapperStyle)}">
                <img loading="lazy" src="${item}" alt="${this.internalConfig.alt}"/>
              </div>`
    })}
        </div>
      </div>
    </div>
    `;
  }
}

export interface LazyLoadedGalleryComponentAttributes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  primaconfigry?: GalleryConfig;
  images: string[];
}