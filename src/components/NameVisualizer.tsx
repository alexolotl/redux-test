import React, { FunctionComponent, PropsWithChildren } from 'react';
import { apiSetNameThunk } from 'redux/fakeApi';
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import fakeApiClient from 'fakeApi/fakeApiClient';

const NameVisualizer: FunctionComponent = () => {
  const { 
    fakeApiNameValue,
    setNameStatus,
    getNameStatus,
  } = useSelector((state: RootState) => state.fakeApi);

  const dispatch = useDispatch();

  const handleDispatchThunk = () => {
    dispatch(apiSetNameThunk(fakeApiClient));
  }

  const renderButtonText = () => {
    switch(setNameStatus) {
      case 'fulfilled':
        return 'Done. Change name again?';
      case 'rejected':
        return 'Error, try again';
      case 'pending':
        return 'Fetching change name endpoint from pseudo-API...';
      default:
        return 'CLICK ME TO CHANGE NAME VIA API';
    }
  }

  const renderName = () => {
    switch(getNameStatus) {
      case 'fulfilled':
        return fakeApiNameValue;
      case 'rejected':
        return 'Error, try again';
      case 'pending':
        return 'Loading initial name from fake API...';
      default:
        return 'Loading';
    }
  }

  return (
    <div>
      <div>
        <p>NAME FROM FAKE API:</p>
        <p>{renderName()}</p>
      </div>
      {
        getNameStatus === 'fulfilled' ?
          <button onClick={handleDispatchThunk}>
            {
              renderButtonText()
            }
          </button>
          :
          null
      }
    </div>
  );
}

export default NameVisualizer;