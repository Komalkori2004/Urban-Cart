
import { createSlice } from "@reduxjs/toolkit";
import { getAllproduct, getsingleProduct } from "../thunks/productThunks";


const initialState = {

    products: [],
    singleProduct: {},
    loading: false,
    error: null

}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder




            .addCase(getAllproduct.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(getAllproduct.fulfilled, (state, action) => {
                state.loading = false,
                    state.products = action.payload
            })
            .addCase(getAllproduct.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            .addCase(getsingleProduct.pending, (state) => {
                state.loading = true,
                    state.error = null

            })
            .addCase(getsingleProduct.fulfilled, (state, action) => {
                state.loading = false,
                    state.singleProduct = action.payload
            })
            .addCase(getsingleProduct.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
    }
})


export default productSlice.reducer