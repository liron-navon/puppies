import { Prediction } from '../dog-breed-detector/detectDogBreed';

/**
 * This file contains mocks for tensorflow operations
 */

const classificationMocks = {
  'banana': [
    { "className": "banana", "probability": 0.9986435770988464 },
    { "className": "nipple", "probability": 0.0004263592418283224 },
    { "className": "butternut squash", "probability": 0.00027253988082520664 }
  ],
  'golden retriever': [
    { "className": "golden retriever", "probability": 0.9892788529396057 },
    { "className": "cocker spaniel, English cocker spaniel, cocker", "probability": 0.005890714004635811 },
    { "className": "Labrador retriever", "probability": 0.0011467165313661098 }
  ],
  'huskey': [
    { "className": "Eskimo dog, husky", "probability": 0.6533669233322144 },
    { "className": "Siberian husky", "probability": 0.1835794746875763 },
    { "className": "malamute, malemute, Alaskan malamute", "probability": 0.12867644429206848 }
  ]
} as Record<string, Prediction[]>

export const tfjs = jest.mock('@tensorflow/tfjs', () => ({}));
export const mobilenet = jest.mock('@tensorflow-models/mobilenet', () => ({
  load: () => Promise.resolve({
    classify: (img: HTMLImageElement) => {
      if(img.id === 'error') {
        return Promise.reject('mocked test error');
      }
      return Promise.resolve(classificationMocks[img.id]);
    }
  })
}));