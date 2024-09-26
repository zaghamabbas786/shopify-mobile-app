import {createSlice} from '@reduxjs/toolkit';
const adminData = createSlice({
  name: 'adminData',
  initialState: {adminData: {}},
  reducers: {
    addAdminData(state, action) {
      state.adminData = action.payload;
    },
  },
});

export const {addAdminData} = adminData.actions;

export default adminData.reducer;
