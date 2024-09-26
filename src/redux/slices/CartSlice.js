
import {createSlice} from '@reduxjs/toolkit';
const cartSlice = createSlice({
  name: 'cart',
  initialState: {cart: false, loading: 'idle'},
  reducers: {
    addItemTocart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const {addItemTocart} = cartSlice.actions;

export default cartSlice.reducer;
