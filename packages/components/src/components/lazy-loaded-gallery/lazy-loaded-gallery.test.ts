import { getTestUrl } from "../../test-utils/test-server";

describe('pup-lazy-loaded-gallery', () => {
  beforeAll(async () => {
    await page.goto(getTestUrl('pup-lazy-loaded-gallery', 'primary'));
  })

  it('should lazy load images', async () => {
    const imagesBeforeScroll = await page.evaluate( async () => {
      const galleryComponent = document.querySelector('pup-lazy-loaded-gallery').shadowRoot;
      const images = galleryComponent.querySelectorAll('img').length;
      const wrapper = galleryComponent.querySelector('.gallery-wrapper');
      wrapper.scrollBy(0,1000); // scroll a bit in the gallery
      return images;
    })
    expect(imagesBeforeScroll).toEqual(12);

    // wait for a network response (at least 1 image is loaded)
    await page.waitForResponse(() => true);

    const imagesAfterScroll = await page.evaluate( async () => {
      const galleryComponent = document.querySelector('pup-lazy-loaded-gallery').shadowRoot;
      return galleryComponent.querySelectorAll('img').length;
    })

    // check that more images are loaded as we scroll
    expect(imagesAfterScroll).toEqual(18);
  })
})
