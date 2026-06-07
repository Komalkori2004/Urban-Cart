
import { createSlice } from "@reduxjs/toolkit";

import { addToWishlist, getWishlist, removeWishlist } from "../thunks/wishlistThunks";


const initialState = {
    wishlist: [],
    loading: false,
    error: null
}

const wishlistSlice = createSlice({

    name: "wishlist",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(addToWishlist.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.loading = false
                  state.wishlist = action.payload.wishlist.products
                    // state.wishlist = action.payload || []
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            // get wishlist
            .addCase(getWishlist.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.loading = false,
                    state.wishlist = action.payload
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            // remove wishlist
            .addCase(removeWishlist.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(
                removeWishlist.fulfilled,
                (state, action) => {

                    state.loading = false

                    state.wishlist = state.wishlist.filter(
                        (product) =>
                            product._id !== action.payload
                    )
                }
            )
            .addCase(removeWishlist.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

    }




})


export default wishlistSlice.reducer