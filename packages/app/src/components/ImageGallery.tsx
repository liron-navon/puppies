import React, { useEffect, useState } from 'react';
import { DogBreedPrediction } from '../api/classify-dog-breeds/classifyDogBreeds';
import { fetchAllDogBreedImages } from '../api/dogs/dogs';

interface IProps {
  classifications: DogBreedPrediction[];
}

export const ImageGallery = (props: IProps) => {
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>();
  const [notADog, setNotADog] = useState<boolean>(false);

  const fetchImages = async () => {
    const bestPrediction = props.classifications.find(prediction => prediction.breed !== null);
    if(!bestPrediction) {
      return setNotADog(true);
    }
    setIsLoading(true);
    setNotADog(false);
    try {
      const imagesResponse = await fetchAllDogBreedImages(bestPrediction?.breed!);
      setImages(imagesResponse);
      setIsLoading(false);
    } catch(e) {
      setError(e as Error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchImages();
  }, [props.classifications]);


  return (
    <div style={{width: '500px', height: '500px'}}>
        { notADog && 
        <div>
          <span>This doesn't seem to be a picture of a dog</span>
          <img className="image" alt="not a dog" src="/images/not-a-dog.jpeg"/>
        </div> }

        { isLoading &&
          <span>loading...</span>
        }

        { error && <div>got error...</div> }

        { images && <pup-lazy-loaded-gallery images={JSON.stringify(images) as any}></pup-lazy-loaded-gallery> }
    </div>
  );
}