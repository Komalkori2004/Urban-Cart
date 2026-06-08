

import { createSlice } from "@reduxjs/toolkit"
import { addReview } from "../thunks/reviewThunk"


const initialState = {
    // reviews:[]

    loading: false,
    error: null,
    success: false
}

const reviewSlice = createSlice({
    name: "review",
    initialState,

    reducers: {resetReviewState: (state) => {
            state.success = false
            state.error = null
        }},

    extraReducers: (builder) => {
        builder
            .addCase(addReview.pending, (state) => {
                state.loading = true
                state.error = null
                state.success = false
            })
            .addCase(addReview.fulfilled, (state) => {
                state.loading = false
                state.error = null
                state.success = true
            })
            .addCase(addReview.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.success = false
            })
    }
})


export const { resetReviewState } = reviewSlice.actions

export default reviewSlice.reducer