import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map';

export interface GalleryConfig {
  imageHeight?: number
  imageWidth?: number,
  alt?: string,
}

export const defaultConfig: Readonly<GalleryConfig>  = {
  imageHeight: 250,
  imageWidth: 250,
  alt: 'image from gallery'
}

@customElement('pup-lazy-loaded-gallery')
export class LazyLoadedGalleryComponent extends LitElement {
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

  private imagesToRender: string[] = [];
  // the internal configuration used internally
  private internalConfig: GalleryConfig;
  // the configuration passed to the component
  config: GalleryConfig;
  // a list of images to load
  images: string[] = [];

  connectedCallback() {
    super.connectedCallback()
    this.internalConfig = {
      ...defaultConfig,
      ...(this.config || {})
    }

    const { imagesPerRow, linesBuffer } = this.galleryData;
    this.imagesToRender = this.images.slice(0, (imagesPerRow * linesBuffer) * 2);
    this.onScroll.bind(this);
  }

  get galleryData() {
    const { offsetHeight, offsetWidth } = (this.parentNode as HTMLElement);

    // how many images fit per row
    const imagesPerRow = Math.round(offsetWidth / this.internalConfig.imageHeight);
    // how many lines should we keep as buffer - we keep the viewport height as buffer
    const linesBuffer = Math.round(offsetHeight / this.internalConfig.imageHeight);
    // what should be the height of the pictures with the buffer
    const picturesHeightWithBuffer = ((this.imagesToRender.length / imagesPerRow) - linesBuffer) * this.internalConfig.imageHeight;

    return {
      imagesPerRow,
      linesBuffer,
      picturesHeightWithBuffer
    }
  }

  onScroll(event) {
    const { imagesPerRow, linesBuffer, picturesHeightWithBuffer } = this.galleryData;
    
    // the height we scrolled from the top
    const passedHeight = event.target.scrollTop;
    // the height of the view port - the visible gallery
    const viewPortHeight = event.target.offsetHeight;
    // the bottom of the view port
    const bottomOfVisibleGallery = passedHeight + viewPortHeight;

    // if we need to render more images to reach the buffer, add more
    if (picturesHeightWithBuffer < bottomOfVisibleGallery) {
      const imagesToAdd =  linesBuffer * imagesPerRow;
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
    const { imagesPerRow } = this.galleryData;
    return this.images.length * (this.internalConfig.imageHeight / imagesPerRow);
  }

  static get styles() {
    return css`
    .root {
      overflow: hidden;
      background: red;
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
    }
    `
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