
import fs from 'fs';
import path from 'path';
import { detectImageObject, detectDogBreed } from './detectDogBreed';
import * as tfnode from '@tensorflow/tfjs-node';

describe('detectDogBreed', () => {
    // in the browser we can just pass an img tag, but in node we need to decode the image type
    const loadTestImage = (imageName: string) => {
        const testImage = path.join(__dirname, `../../public/test-images`, imageName);
        const buffer = fs.readFileSync(testImage);
        return tfnode.node.decodeJpeg(new Uint8Array(buffer));
    }

    test('fails to detect a banana as a dog', async() => {
        const image = loadTestImage('banana.jpeg');
        const breed = await detectDogBreed(image);
        expect(breed).toBe(null);
    });

    test('can detect golden retriever breed', async() => {
        const image = loadTestImage('golden-retriever.jpeg');
        const breed = await detectDogBreed(image);
        expect(breed?.breed).toBe('golden retriever');
    });

    test('can detect huskey breed', async() => {
        const image = loadTestImage('huskey.jpeg');
        const breed = await detectDogBreed(image);
        expect(breed?.breed).toBe('husky');
    });

    test('can provide predictions for a huskey image', async() => {
        const image = loadTestImage('huskey.jpeg');
        const predictions = await detectImageObject(image);
        expect(predictions[0].className).toBe('Eskimo dog, husky');
    });
})
