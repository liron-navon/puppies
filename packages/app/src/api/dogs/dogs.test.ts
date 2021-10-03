import { fetchAllDogBreedImages, API_URL, fetchDogBreedsList } from './dogs';
import { dogsBreedImagesResponse, dogsBreedListResponse } from './dogs.mocks';
import fetchMock from 'fetch-mock';

describe('dogs api', () => {
    it('can use fetchAllDogBreedImages to fetch images of dogs by breed', async() => {
        const dogBreed = 'hound';
        fetchMock.get(`${API_URL}/breed/${dogBreed}/images`, dogsBreedImagesResponse);
        const images = await fetchAllDogBreedImages(dogBreed);
        expect(images.length).toBe(3);
    })
    it('can list all breeds', async() => {
        const dogBreed = 'hound';
        fetchMock.get(`${API_URL}/breed/list/all`, dogsBreedListResponse);
        const dogBreeds = await fetchDogBreedsList();
        expect(dogBreeds.bulldog).toContain('english');
    })
    afterEach(() => fetchMock.reset());
});