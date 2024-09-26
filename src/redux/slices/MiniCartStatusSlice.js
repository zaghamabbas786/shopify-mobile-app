import {createSlice} from '@reduxjs/toolkit';
const miniCartStatus = createSlice({
  name: 'miniCartStatus',
  initialState: {miniCartStatus: false},
  reducers: {
    miniCartStatusFunc: (state, action) => {
      state.miniCartStatus = action.payload;
    },
  },
});

export const {miniCartStatusFunc} = miniCartStatus.actions;

export default miniCartStatus.reducer;
