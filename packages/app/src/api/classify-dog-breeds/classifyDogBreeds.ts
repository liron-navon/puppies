import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';
import breedsMap from './dogBreedsMap.json';

export interface Prediction {
    className: string;
    probability: number;
}

export interface DogBreedPrediction {
    breed: string | null;
    probability: number;
}

// used to memorize the mobilenet for future use
let model: mobilenet.MobileNet;
export const classifyImage = async (img: ImageData | HTMLImageElement) => {
    if (!model) {
        model = await mobilenet.load();
    }
    return model.classify(img);
}

// given a classification of an image of a dog, find the exact breed from the dog breeds map
export const normalizeDogBreed = (breedDescription: string): string | null => {
    const words = breedDescription.match(/\b(\w+)\b/g);
    if (!words) {
        return null;
    }

    // find the dog breed
    for (let i = 0; i < words.length; i++) {
        const breed = words[i] as string;
        if (breed in breedsMap) {
            const subBreedsList = (breedsMap as Record<string, string[]>)[breed];
            if (subBreedsList && subBreedsList.length) {
                // find the sub breed
                for (let k = 0; k < words.length; k++) {
                    const subBreed = words[k];
                    if (subBreedsList.includes(subBreed)) {
                        return `${subBreed} ${breed}`
                    }
                }
            }
            return breed
        }
    }
    return null
}

// given an image of a dog, detect the most probable dog breed
export const classifyDogBreeds = async (img: ImageData | HTMLImageElement): Promise<DogBreedPrediction[]> => {
    const results = await classifyImage(img);
    return results.map(result => {
        const breed = normalizeDogBreed(result.className);
        return {
            breed,
            probability: result.probability
        }
    })
}