import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export enum LoadingState {
  Analyzing,
  Downloading,
  Done
}

interface Props {
  state: LoadingState
}

export const AppLoadingState = ({ state }: Props) => {
  if (state === LoadingState.Done) {
    return null;
  }
  return (
    <Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      {
        state === LoadingState.Analyzing &&
        <span> <CircularProgress color="secondary" /> Analyzing...</span>
      }
      {
        state === LoadingState.Downloading &&
        <span> <CircularProgress color="success" /> Downloading...</span>
      }
    </Backdrop>
  )
}