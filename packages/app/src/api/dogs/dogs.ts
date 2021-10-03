export const API_URL: Readonly<string> = 'https://dog.ceo/api';

// docs: https://dog.ceo/dog-api/documentation/breed
export const fetchAllDogBreedImages = async (dogBreed: string): Promise<string[]> => {
    const url = `${API_URL}/breed/${dogBreed}/images`;
    const response = await fetch(url);
    const json = await response.json();
    return json.message;
}

type BreedsMap = Record<string, string[]>;

export const fetchDogBreedsList = async (): Promise<BreedsMap> => {
    const url = `${API_URL}/breed/list/all`;
    const response = await fetch(url);
    const json = await response.json();
    return json.message;
}
