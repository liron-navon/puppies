import React, { useState } from 'react';
import { ImageRecognition } from './components/ImageRecognition';
import { ImageGallery } from './components/ImageGallery';
import { DogBreedPrediction } from './api/classify-dog-breeds/classifyDogBreeds';
// import logo from './logo.svg';
import './App.css';

function App() {
  const [ classification, setClassification ] = useState<DogBreedPrediction[]>();
  return (
    <div className="App">
      <header className="App-header">

        <ImageRecognition onRecognition={setClassification}/>
        { classification &&  <ImageGallery classifications={classification}/>}

        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <pup-title primary>Main title</pup-title> */}
      </header>
    </div>
  );
}

export default App;
