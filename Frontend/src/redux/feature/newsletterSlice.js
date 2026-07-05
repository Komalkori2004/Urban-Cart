

import { createSlice } from "@reduxjs/toolkit"


import { subscribeNewsletter, getSubscribers } from "../thunks/newsletterThunk"




const initialState = {
    loading: false,
    success: false,
    message: "",
    error: null,
    subscribers: [],
};





const newsletterSlice = createSlice({

    name: "newsletter",
    initialState,
    reducers: {
        resetNewsletterState: (state) => {
            state.loading = false;
            state.success = false;
            state.message = "";
            state.error = null;
        },
    },
    extraReducers: (builder) => {

        builder
            .addCase(subscribeNewsletter.pending, (state) => {
                state.loading = true,
                    state.error = null
            })

            .addCase(subscribeNewsletter.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message =
                    action.payload.message;
            })

            .addCase(subscribeNewsletter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // 

            .addCase(getSubscribers.pending, (state) => {
                state.loading = true,
                    state.error = null
            })

            .addCase(getSubscribers.fulfilled, (state, action) => {
                state.loading = false;
                state.subscribers =
                    action.payload.subscribers;
            })

            .addCase(getSubscribers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
})



export const { resetNewsletterState } = newsletterSlice.actions
export default newsletterSlice.reducer