import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

// NOTE - in the real app, we split some of these into separate files such as types.ts, etc

interface FakeApiState {
  fakeApiCounterValue: number | null;
  fakeApiNameValue: string;
  setNameStatus: string;
  getNameStatus: string;
}

const initialState: FakeApiState = {
  fakeApiCounterValue: null,
  fakeApiNameValue: '',
  setNameStatus: 'idle',
  getNameStatus: 'idle',
};



// Thunks
export const apiGetNameThunk = createAsyncThunk(
  'fakeApi/apiGetNameThunk',
  async (fakeApiInstance: any, thunkAPI) => {
    const initName = await fakeApiInstance.asyncGetNameValue();
    thunkAPI.dispatch(setFakeApiNameValue(initName));
  }
)

export const apiSetNameThunk = createAsyncThunk(
  'fakeApi/apiSetNameThunk',
  async (fakeApiInstance, thunkAPI) => {
    const nameOptions = ['violet', 'lilac', 'lilly', 'petunia', 'lavender'];
    const newName = nameOptions[Math.floor(Math.random()*nameOptions.length)]
    const newVal = await fakeApiInstance.asyncSetNameValue(newName);
    thunkAPI.dispatch(setFakeApiNameValue(newName));
  }
)



// Slice
const fakeApiSlice = createSlice({
  name: 'fakeApi',
  initialState,
  reducers: {
    setFakeApiCounterValue: (state, action: PayloadAction<number>) => {
      state.fakeApiCounterValue = action.payload;
    },
    setFakeApiNameValue: (state, action: PayloadAction<string>) => {
      state.fakeApiNameValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apiSetNameThunk.pending, (state, action) => {
      state.setNameStatus = 'pending';
    });
    builder.addCase(apiSetNameThunk.fulfilled, (state, action) => {
      state.setNameStatus = 'fulfilled';
    });
    builder.addCase(apiSetNameThunk.rejected, (state, action) => {
      state.setNameStatus = 'rejected';
    });

    builder.addCase(apiGetNameThunk.pending, (state, action) => {
      state.getNameStatus = 'pending';
    });
    builder.addCase(apiGetNameThunk.fulfilled, (state, action) => {
      state.getNameStatus = 'fulfilled';
    });
    builder.addCase(apiGetNameThunk.rejected, (state, action) => {
      state.getNameStatus = 'rejected';
    });
  }
});


// Actions
export const { setFakeApiCounterValue, setFakeApiNameValue } = fakeApiSlice.actions;

// Reducers
export default fakeApiSlice.reducer;

// Custom Selectors
export const fakeApiSelector = (state: RootState) => state.fakeApi;