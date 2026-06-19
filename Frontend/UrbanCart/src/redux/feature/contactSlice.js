import { createSlice } from "@reduxjs/toolkit";

import {
    createContact,
    getContact,
    markAsRead,
} from "../thunks/contactThunk";


const initialState = {
    loading: false,
    contacts: [],
    success: false,
    message: "",
    error: null,
};




const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        resetContactState: (state) => {
            state.loading = false;
            state.success = false;
            state.message = "";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createContact.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createContact.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(createContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            .addCase(getContact.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(getContact.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.contacts = action.payload.contacts;
            })
            .addCase(getContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            .addCase(markAsRead.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(markAsRead.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(markAsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
    },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;


