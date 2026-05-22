

import { createSlice } from '@reduxjs/toolkit'


import { updateCart, getCart } from '../thunks/cartThunks'


const initialState = {
    items=[],
    loading: false,
    error: null
}


const cartSlice = createSlice({

    name: "cart",
    initialState,
    reducers: {},


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
                state.items = action.payload
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }


})

export default cartSlice.reducer