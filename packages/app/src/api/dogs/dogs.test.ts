import { fetchAllDogBreedImages, API_URL } from './dogs';
import { dogsBreedImagesResponse } from './dogs.mocks';
import fetchMock from 'fetch-mock';

describe('dogs api', () => {
    it('can use fetchAllDogBreedImages to fetch images of dogs by breed', async() => {
        const dogBreed = 'hound';
        fetchMock.get(`${API_URL}/breed/${dogBreed}/images`, dogsBreedImagesResponse);
        const images = await fetchAllDogBreedImages(dogBreed);
        expect(images.length).toBe(3);
    })
    afterEach(() => fetchMock.reset());
});