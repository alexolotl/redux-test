import { useEffect } from 'react';
import { apiGetNameThunk, setFakeApiCounterValue } from 'redux/fakeApi';
import { useDispatch } from 'react-redux';

import fakeApiClient from 'fakeApi/fakeApiClient';
// NOTE - unlike our app, I'm initializing the client and exporting it from its own file, not within a react component
// This allows the initialized client to be imported to any file directly, including non-react files such as redux slices 
// However, if the client is initialized in a provider (as in our current app), then the client can be passed into the
// args of a thunk. My goal here is to get rid of most of our many many root level providers, or at least simplify them to be
// providing just their respective client objects - and store all the state, and api related actions as thunks in redux

export const useFakeApiSubscriptions = () => {
  const dispatch = useDispatch();

  // set up app-level event listeners from this specific api
  useEffect(() => {
    const handleIncrementEvent = (newVal: number) => {
      console.log("external api event occurred, handling it now...");
      dispatch(setFakeApiCounterValue(newVal));
    }

    fakeApiClient.on('fake_api_increment_event', handleIncrementEvent);

    return () => {
      fakeApiClient.off('fake_api_increment_event', handleIncrementEvent);
    }
  }, []);

  // also initialize values if needed
  useEffect(() => {
    dispatch(apiGetNameThunk(fakeApiClient));
  }, []);
};