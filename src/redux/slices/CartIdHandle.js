import {createSlice} from '@reduxjs/toolkit';
const cartIdHandle = createSlice({
  name: 'cartId',
  initialState: {cartId: false},
  reducers: {
    setCartId: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const {setCartId} = cartIdHandle.actions;

export default cartIdHandle.reducer;
