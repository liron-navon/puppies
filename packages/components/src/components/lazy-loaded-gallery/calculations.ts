import { GalleryConfig } from './lazy-loaded-gallery.component';

export interface GalleryImagesCalculations {
    imagesPerRow: number
    linesBuffer: number,
    picturesHeightWithBuffer: number
}

export const calculateGallery = (element: HTMLElement, config: GalleryConfig, numOfImages: number): GalleryImagesCalculations => {
    const { offsetHeight, offsetWidth } = element;

    // how many images fit per row
    const imagesPerRow = Math.round(offsetWidth / config.imageHeight);
    // how many lines should we keep as buffer - we keep the viewport height as buffer
    const linesBuffer = Math.round(offsetHeight / config.imageHeight);
    // what should be the height of the pictures with the buffer
    const picturesHeightWithBuffer = (Math.round(numOfImages / imagesPerRow) - linesBuffer) * config.imageHeight;

    return {
        imagesPerRow,
        linesBuffer,
        picturesHeightWithBuffer
    }
}

export const howManyImagesToBeAdded = (galleryData: GalleryImagesCalculations, scrollElement: HTMLElement) => {
    const { imagesPerRow, linesBuffer, picturesHeightWithBuffer } = galleryData;

    // the height we scrolled from the top
    const passedHeight = scrollElement.scrollTop;
    // the height of the view port - the visible gallery
    const viewPortHeight = scrollElement.offsetHeight;
    // the bottom of the view port
    const bottomOfVisibleGallery = passedHeight + viewPortHeight;

    // if we need to render more images to reach the buffer, add more
    if (picturesHeightWithBuffer < bottomOfVisibleGallery) {
        return linesBuffer * imagesPerRow;
    }
    return 0;
}