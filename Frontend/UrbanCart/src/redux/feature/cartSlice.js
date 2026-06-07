

import { createSlice } from '@reduxjs/toolkit'


import { updateCart, getCart, addToCart,removeCart } from '../thunks/cartThunks'


const initialState = {
    items: [],
    loading: false,
    error: null
}


const cartSlice = createSlice({

    name: "cart",
    initialState,
  reducers: {
    clearCart: (state) => {
        state.items = []
        state.loading = false
        state.error = null
    }
},


    extraReducers: (builder) => {
        builder


            // get cart
            .addCase(getCart.pending, (state) => {
                state.loading = true
                state.error = null

            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload

            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })


            // update cart
            .addCase(updateCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload.items
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload.items
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // remove cart

            .addCase(removeCart.pending,(state)=>{
                state.loading=true,
                state.error=null
            })
            .addCase(removeCart.fulfilled,(state,action)=>{
                state.loading=false,
                state.items=action.payload.items

            })
            .addCase(removeCart.rejected,(state,action)=>{
                state.loading=false,
                state.error=action.payload
                
            })



    }


})
export const { clearCart } = cartSlice.actions
export default cartSlice.reducer