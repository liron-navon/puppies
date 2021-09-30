export const API_URL: Readonly<string> = 'https://dog.ceo/api';

// docs: https://dog.ceo/dog-api/documentation/breed
export const fetchAllDogBreedImages = async (dogBreed: string): Promise<string[]> => {
    const url = `${API_URL}/breed/${dogBreed}/images`;
    const response = await fetch(url);
    const json = await response.json();
    return json.message as string[];
}
