import {createSlice} from '@reduxjs/toolkit';

const cartCountSlice = createSlice({
  name: 'cartCount',
  initialState: {count: 0},
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const {setCount} = cartCountSlice.actions;

export default cartCountSlice.reducer;
