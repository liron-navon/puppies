import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { ImageUploadComponent, ImageUploadEvent, imageUploadEventName } from 'puppies-components';
import { classifyDogBreeds, DogBreedPrediction } from '../../api/classify-dog-breeds/classifyDogBreeds';
import './ImageRecognition.css';

interface Props {
  onRecognitionEnd: (predictions?: DogBreedPrediction[], error?: Error) => void;
  onRecognitionStart: () => void;
}

const dogPlaceHolderImage = '/images/dog-placeholder.svg';

export const ImageRecognition = ({ onRecognitionEnd, onRecognitionStart }: Props) => {
  const [image, setImage] = useState(dogPlaceHolderImage);
  const imageUpload = useRef<ImageUploadComponent>(null);

  const onImageLoaded = async (event: SyntheticEvent<HTMLImageElement, Event>) => {
    if (image === dogPlaceHolderImage) {
      return;
    }
    onRecognitionStart();
    try {
      const results = await classifyDogBreeds(event.target as HTMLImageElement);
      onRecognitionEnd(results);
    } catch (err) {
      onRecognitionEnd(undefined, err as Error);
    }
  };

  useEffect(() => {
    imageUpload.current!.addEventListener(imageUploadEventName, event => {
      setImage((event as ImageUploadEvent).detail.image);
    });
  }, []);

  return (
    <div>
      <img className="image-recognition--image"
        alt="upload"
        onLoad={onImageLoaded}
        src={image} />
      <div className="image-recognition--upload-container">
        <pup-image-upload ref={imageUpload}></pup-image-upload>
      </div>
    </div>
  );
}
