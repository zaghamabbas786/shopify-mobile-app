import {createSlice} from '@reduxjs/toolkit';

const searchFocusSlice = createSlice({
  name: 'search',
  initialState: {focus: false},
  reducers: {
    setFocus: (state, action) => {
      state.focus = action.payload;
    },
  },
});

export const {setFocus} = searchFocusSlice.actions;

export default searchFocusSlice.reducer;
