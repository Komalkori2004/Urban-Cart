

import { createSlice } from "@reduxjs/toolkit";

import { getAllCategory, createCategory } from "../thunks/categoryThunks";


const initialState = {
    categories: [],
    loading: false,
    error: null
}



const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // create category
            .addCase(createCategory.pending, (state) => {
                state.loading = true
                state.error = null
            })

            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false
                state.categories.push(action.payload)
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            // get all categorie

            .addCase(getAllCategory.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.loading = false
                state.categories = action.payload
            })
            .addCase(getAllCategory.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})



export default categorySlice.reducer