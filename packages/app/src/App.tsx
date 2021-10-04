import React, { useState } from 'react';
import { ImageRecognition } from './components/ImageRecognition/ImageRecognition';
import { DogBreedPrediction } from './api/classify-dog-breeds/classifyDogBreeds';
import { fetchAllDogBreedImages } from './api/dogs/dogs';
import { Gallery } from './components/Gallery/Gallery';
import { AppLoadingState, LoadingState } from './components/AppLoadingState/AppLoadingState';
import { ErrorType, AppError } from './components/AppError/AppError';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './App.css';

function App() {
  const [dogBreed, setDogBreed] = useState<string>();
  const [error, setError] = useState<ErrorType>(ErrorType.None);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Done);
  const [images, setImages] = useState<string[]>([]);

  const onRecognitionEnd = async (classifications?: DogBreedPrediction[], error?: Error) => {
    if (classifications) {
      const Prediction = classifications.find(c => c.breed !== null);
      if (Prediction) {
        // fetch images for the given dog breed
        setDogBreed(Prediction?.breed!);
        setLoadingState(LoadingState.Downloading);
        try {
          const imagesResponse = await fetchAllDogBreedImages(Prediction?.breed!);
          setImages(imagesResponse);
          setLoadingState(LoadingState.Done);
          setError(ErrorType.None);
        } catch (err) {
          // failed to fetch images
          setImages([]);
          setError(ErrorType.FailedToFetchImages);
          setLoadingState(LoadingState.Done);
        }
      } else {
        // no dog breed in the image
        setLoadingState(LoadingState.Done);
        setDogBreed(undefined);
        setError(ErrorType.NotADog);
        setImages([]);
      }
    } else {
      // error detecting the breed
      setLoadingState(LoadingState.Done);
      setError(ErrorType.FaildToClassify);
      setImages([]);
      setDogBreed(undefined);
      console.error(error);
    }
  }
  const onRecognitionStart = () => setLoadingState(LoadingState.Analyzing);
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Doogle
          </Typography>
        </Toolbar>
      </AppBar>

      <header className="App-header">
        <AppLoadingState state={loadingState} />
        <ImageRecognition
          onRecognitionEnd={onRecognitionEnd}
          onRecognitionStart={onRecognitionStart} />
        <AppError error={error} />
        {dogBreed && <Alert severity="info">Your dog is a {dogBreed} </Alert>}
        <Gallery images={images}></Gallery>
      </header>
    </div>
  );
}

export default App;
