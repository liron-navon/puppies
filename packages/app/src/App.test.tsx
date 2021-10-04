import './api/classify-dog-breeds/tensorflow.mocks';
import React from 'react';
import App from './App';
import fetchMock from 'fetch-mock';
import { ImageRecognition } from './components/ImageRecognition/ImageRecognition';
import { Gallery } from './components/Gallery/Gallery';
import { DogBreedPrediction } from './api/classify-dog-breeds/classifyDogBreeds';
import { API_URL } from './api/dogs/dogs';
import { dogsBreedImagesResponse } from './api/dogs/dogs.mocks';
import { waitFor } from '@testing-library/react';
import { shallow } from 'enzyme';

describe('App', () => {
  test('renders the app properly', async () => {
    const wrapper = shallow(<App />);
    const breed = 'x';
    // mock the url response
    fetchMock.get(`${API_URL}/breed/${breed}/images`, dogsBreedImagesResponse);

    const imageRecognition = wrapper.find(ImageRecognition)
    const { onRecognitionStart, onRecognitionEnd } = imageRecognition.props()

    // mock recogntion for a dog
    onRecognitionStart();
    onRecognitionEnd([
      {
        breed: 'x',
        probability: 1
      }
    ] as DogBreedPrediction[]);

    // make sure the images are set
    await waitFor(() => {
      const gallery = wrapper.find(Gallery);
      expect(gallery!.props()!.images!.length).toBe(3);
    });
    expect(wrapper.text()).toContain(`Your dog is a ${breed}`);
  });
})

