import { calculateGallery, GalleryImagesCalculations, howManyImagesToBeAdded } from "./calculations";

describe('pup-lazy-loaded-gallery calculations', () => {
  const elementMock = { 
    offsetHeight: 1000, 
    offsetWidth: 500
  } as unknown as HTMLElement;
  const numOfImages = 100;
  const galleryConfig = {
    imageHeight: 100,
    imageWidth: 100
  };

  it('should calculate the right values for the image gallery', async () => {
    const { 
      imagesPerRow, 
      linesBuffer, 
      picturesHeightWithBuffer 
    } = calculateGallery(elementMock, galleryConfig, numOfImages);

    // per row we have 5 images, and to fill the screen we need 10 lines;
    expect(imagesPerRow).toBe(5);
    expect(linesBuffer).toBe(10);
    
    // the height of the pictures that needs to be on the screen (10 lines of images)
    expect(picturesHeightWithBuffer).toBe(1000);
  })
})
