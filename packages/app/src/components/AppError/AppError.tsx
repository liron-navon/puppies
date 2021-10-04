import React from 'react';
import Alert from '@mui/material/Alert';

export enum ErrorType {
  NotADog,
  FaildToClassify,
  FailedToFetchImages,
  None,
}

interface Props {
  error: ErrorType
}

export const AppError = ({ error }: Props) => {
  return (
    <>
      {error === ErrorType.NotADog && <Alert severity="warning">This isn't an image of a dog</Alert>}
      {error === ErrorType.FaildToClassify && <Alert severity="error">Faied to classify the image, please try a different image.</Alert>}
      {error === ErrorType.FailedToFetchImages && <Alert severity="error">Failed to fetch images, please check your network connection and try again.</Alert>}
    </>
  )
}