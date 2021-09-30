import "../../mocks/tensorflow.mocks";
import { normalizeDogBreed } from "./classifyDogBreeds";
import { classifyImage, classifyDogBreeds } from './classifyDogBreeds';

describe('classify dog breeds', () => {
    /**
     * tfjs might return non existent sub breeds of dogs like Eskimo/Siberian husky, 
     * while the api we work with will only accept husky, 
     * or with 'Alaskan malamute' where we only have 'malamute' to work with
     * but for other dogs it might accept the sub breed as well
     * 
     * for that reason we need to normalize the dog breed before we can pass it to the dogs api
     */
    describe('normalizeDogBreed', () => {
        test('can find dog breed from image description', () => {
            expect(normalizeDogBreed('Eskimo dog, husky')).toBe('husky');
            expect(normalizeDogBreed('Siberian husky')).toBe('husky');
            expect(normalizeDogBreed('golden retriever')).toBe('golden retriever');
            expect(normalizeDogBreed('malamute, malemute, Alaskan malamute')).toBe('malamute');
        });
    })


    describe('classifyDogBreeds', () => {
        /**
         * The app is only meant for dog breeds, a banana is not a dog, 
         * therefore we need to filter such non dog images
         */
        it('fails to detect a banana as a dog', async () => {
            const image = document.createElement('img');
            image.id = 'banana'
            const breeds = await classifyDogBreeds(image);
            expect(breeds[0].breed).toBe(null);
            expect(breeds[1].breed).toBe(null);
            expect(breeds[2].breed).toBe(null);
        });

        it('can detect golden retriever breed', async () => {
            const image = document.createElement('img');
            image.id = 'golden retriever'
            const breeds = await classifyDogBreeds(image);
            expect(breeds[0].breed).toBe('golden retriever');
            expect(breeds[1].breed).toBe('cocker spaniel');
            expect(breeds[2].breed).toBe('retriever');
        });

        it('can detect huskey breed', async () => {
            const image = document.createElement('img');
            image.id = 'huskey'
            const breeds = await classifyDogBreeds(image);
            expect(breeds[0].breed).toBe('husky');
            expect(breeds[1].breed).toBe('husky');
            expect(breeds[2].breed).toBe('malamute');
        });

        it('can handle errors', () => {
            const image = document.createElement('img');
            image.id = 'error'
            expect(classifyDogBreeds(image)).rejects.toEqual('mocked test error');
        });
    })

    it('can provide predictions for a huskey image', async () => {
        const image = document.createElement('img');
        image.id = 'huskey'
        const predictions = await classifyImage(image);
        expect(predictions[0].className).toBe('Eskimo dog, husky');
        expect(predictions[1].className).toBe('Siberian husky');
        expect(predictions[2].className).toBe('malamute, malemute, Alaskan malamute');
    });
})
