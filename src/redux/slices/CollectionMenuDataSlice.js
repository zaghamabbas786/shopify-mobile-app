import {createSlice} from '@reduxjs/toolkit';
const collectionData = createSlice({
  name: 'collectionData',
  initialState: {collectionData: {}},
  reducers: {
    addCollectionData(state, action) {
      state.collectionData = action.payload;
    },
  },
});

export const {addCollectionData} = collectionData.actions;

export default collectionData.reducer;
