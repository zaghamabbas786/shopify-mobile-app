import { createSlice } from "@reduxjs/toolkit";


export const CreateSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [{
      status: false
    }]
  },
  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.cart.find((item) => item.id == action.payload.id);

      if (itemPresent) {
        itemPresent.quintity++
      }
      else {
        state.cart.push({ ...action.payload, quintity: 1 })
      }

    },

    removeFromCart: (state, action) => {

      console.log("sadasd", action.payload.id);

      const present = state.cart.find((item) => item.id == action.payload.id);

      if (present && present.quintity > 1) {
        present.quintity--
      }



    },
    cartStatus: (state, action) => {

      state.cart[0].status = action.payload

    }


  }
})

export const { addToCart, removeFromCart, cartStatus } = CreateSlice.actions

export default CreateSlice.reducer