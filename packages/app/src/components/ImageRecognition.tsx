import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { ImageUploadComponent, ImageUploadEvent, imageUploadEventName } from 'puppies-components';
import { classifyDogBreeds, DogBreedPrediction } from '../api/classify-dog-breeds/classifyDogBreeds';

interface IProps {
  onRecognition: (predictions: DogBreedPrediction[]) => void;
}

const dogPlaceHolderImage = '/images/dog-placeholder.svg';

export const ImageRecognition = ({ onRecognition }: IProps) => {
  const [image, setImage] = useState(dogPlaceHolderImage);
  const [error, setError] = useState<Error>();
  const imageUpload = useRef<ImageUploadComponent>(null);

  const recognizeImage = async (event: SyntheticEvent<HTMLImageElement, Event>) => {
    if(image === dogPlaceHolderImage) {
      return;
    }
    try {
      onRecognition(await classifyDogBreeds(event.target as HTMLImageElement));
    } catch(err) {
      setError(err as Error);
    }
  };

  useEffect(() => {
    imageUpload.current!.addEventListener(imageUploadEventName, event => {
      setImage((event as ImageUploadEvent).detail.image);
    });
  }, []);

  return (
    <div>
        { error && <div>got error...</div> }
        <img className="image"
        alt="upload" 
        onLoad={recognizeImage} 
        src={image}/>
        <pup-image-upload ref={imageUpload}></pup-image-upload>
    </div>
  );
}
