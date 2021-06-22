import React, { FunctionComponent, PropsWithChildren } from 'react';
import { apiSetNameThunk } from 'redux/fakeApi';
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import fakeApiClient from 'fakeApi/fakeApiClient';

const RandomNumberVisualizer: FunctionComponent = () => {
  const { 
    fakeApiCounterValue,
  } = useSelector((state: RootState) => state.fakeApi);

  const dispatch = useDispatch();

  return (
    <div style={{border: '1px solid black'}}>
      <p>API RANDOM NUMBER (redux store updates stored number with events emitted by fake api):</p>
      <p>{fakeApiCounterValue ?? ''}</p>
    </div>
  );
}

export default RandomNumberVisualizer;