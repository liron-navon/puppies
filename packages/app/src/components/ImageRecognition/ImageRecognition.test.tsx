import '../../api/classify-dog-breeds/tensorflow.mocks';
import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { ImageRecognition } from './ImageRecognition';
import { ImageUploadComponent, imageUploadEventName } from 'puppies-components';

describe('ImageRecognition', () => {
  afterEach(cleanup);
  test('can recognize image', async () => {
    const imageRecognitionMock = 'husky';
    const end = jest.fn();
    const start = jest.fn();

    const { container } = render(<ImageRecognition
      onRecognitionEnd={end}
      onRecognitionStart={start}
    />);

    // fire an event to upload an image
    const uploader = container.querySelector('pup-image-upload') as ImageUploadComponent;
    fireEvent(
      uploader,
      new CustomEvent(imageUploadEventName, {
        detail: {
          image: imageRecognitionMock
        }
      }),
    )

    // fire an event that the image was loaded and set id to mock mobilenet
    const img = container.querySelector('.image-recognition--image') as HTMLImageElement;
    img.id = imageRecognitionMock;
    fireEvent.load(img);

    await waitFor(() => expect(start.mock.calls.length).toBe(1));
    await waitFor(() => expect(end.mock.calls.length).toBe(1));

    const predictions = end.mock.calls[0][0];
    expect(predictions[0].breed).toBe(imageRecognitionMock)
  });
})

