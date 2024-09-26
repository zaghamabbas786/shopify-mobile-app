import {createSlice} from '@reduxjs/toolkit';

const HeaderShownSlice = createSlice({
  name: 'headerShown',
  initialState: {show: false},
  reducers: {
    setHeaderShow: (state, action) => {
      state.show = action.payload;
    },
  },
});

export const {setHeaderShow} = HeaderShownSlice.actions;

export default HeaderShownSlice.reducer;
