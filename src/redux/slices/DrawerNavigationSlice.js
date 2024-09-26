import {createSlice} from '@reduxjs/toolkit';

const DrawerNavigationSlice = createSlice({
  name: 'drawer',
  initialState: {open: false},
  reducers: {
    drawer: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const {drawer} = DrawerNavigationSlice.actions;

export default DrawerNavigationSlice.reducer;
