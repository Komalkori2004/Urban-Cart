
import { createSlice } from "@reduxjs/toolkit";
import { getAllproduct, getsingleProduct, createProduct, deleteProduct, updateProduct ,getSingleProductById} from "../thunks/productThunks";


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


            // get all products
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

            // get single product 

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

            // create product by admin

            .addCase(createProduct.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products.push(action.payload)
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            // remove product by admin

            .addCase(deleteProduct.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(deleteProduct.fulfilled,
                (state, action) => {

                    state.loading = false;



                    state.products =
                        state.products.filter(

                            (product) =>

                                product._id !==
                                action.payload
                        );
                })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })



            // update product by admin

            .addCase(updateProduct.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false,
                    state.products =
                    state.products.map((product) =>

                        product._id ===
                            action.payload._id

                            ? action.payload

                            : product
                    );
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            // get single forproduct by id for admin

            .addCase(getSingleProductById.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(getSingleProductById.fulfilled, (state, action) => {
                state.loading = false,
                    state.singleProduct = action.payload
            })
            .addCase(getSingleProductById.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
    }


})


export default productSlice.reducer