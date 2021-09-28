import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs'
import breedsMap from './breedsMap.json';

export interface Prediction {
    className: string;
    probability: number;
}

export interface DogBreedPrediction {
    breed: string;
    probability: number;
}

// used to memorize the mobile net for future use
let model: mobilenet.MobileNet;

// detect an object in an image
export const detectImageObject = async (img: tf.Tensor3D | ImageData | HTMLImageElement) => {
    if(!model) {
        model = await mobilenet.load();
    }
    return await model.classify(img);
}

// given a description of a dog, find the exact breed from the dog breeds map
export const findDogBreed = (breedDescription: string): string | null => {
    const matchedWords = breedDescription.match(/\b(\w+)\b/g);
    if(!matchedWords) {
        return null;
    }

    let breed = null;
    matchedWords.find(word => {
        const subBreeds = (breedsMap as Record<string, string[]>)[word];
        if(subBreeds) {
            breed = word;
            matchedWords.find(subBreedWord => {
                if(subBreeds.includes(subBreedWord)) {
                    breed = `${subBreedWord} ${word}`
                }
                return true;
            });
            return true;
        }
        return false
    })
    return breed;
}

// given an image of a dog, detect the most probable dog breed, in case of no matches will return null
export const detectDogBreed = async (img: tf.Tensor3D | ImageData | HTMLImageElement): Promise<DogBreedPrediction | null> => {
    try {
        const results = await detectImageObject(img);
        for(let i = 0; i < results.length; i++) {
            const result = results[i];
            const breed = findDogBreed(result.className);      
            if(breed) {
                return {
                    breed,
                    probability: result.probability
                }
            }
          }
          return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}