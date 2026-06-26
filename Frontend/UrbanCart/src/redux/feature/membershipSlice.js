
import { createSlice } from "@reduxjs/toolkit";

import { getAllMembership } from "../thunks/membershipThunk";



const initialState = {
    membershipPlans: [],
    loading: false,

    error: null,
    success: false
}


const membershipSlice = createSlice({

    name: "membership",
    initialState,
    reducers: {},


    extraReducers: (builder) => {
        builder
            .addCase(getAllMembership.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllMembership.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.membershipPlans = action.payload
            })
            .addCase(getAllMembership.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
















    }



})



export default membershipSlice.reducer;