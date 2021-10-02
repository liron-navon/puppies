import { getTestUrl } from "../../test-utils/test-server";
import { ImageUploadEvent, ImageUploadComponent } from './image-upload.component';
const path = require('path');

describe('pup-image-upload', () => {
  beforeAll(async () => {
    await page.goto(getTestUrl('pup-image-upload', 'primary'));
  })

  it('should allow to upload an image', async () => {
    await page.evaluate(() => {
      (window as any).testImages = [];
      const imageUploader = document.querySelector('pup-image-upload') as ImageUploadComponent;
      imageUploader.addEventListener('onImageUpload', (event) => {
        // store the images on the window so we can evaluate it again later
        (window as any).testImages.push((event as ImageUploadEvent).detail.image);
      })

      const dropZone = imageUploader.shadowRoot.querySelector('.root');

      // emulate drop event
      dropZone.dispatchEvent(Object.assign(
        new Event("drop"),
        {
          dataTransfer: {
            files: [
              new File(["drop"], "filename.txt", { type: "image/jpeg" })
            ]
          }
        }
      ));

      // emulate file input event
      imageUploader.inputChangeHandler({
        target: {
          files: [
            new File(["input"], "filename.txt", { type: "image/jpeg" })
          ]
        }
      } as unknown as InputEvent)
    });

    const testImages = await page.evaluate(() => (window as any).testImages);
    expect(testImages).toEqual([
      "data:image/jpeg;base64,ZHJvcA==",
      "data:image/jpeg;base64,aW5wdXQ="
    ]);
  })
})