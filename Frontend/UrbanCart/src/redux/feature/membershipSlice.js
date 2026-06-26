
import { createSlice } from "@reduxjs/toolkit";

import { getAllMembership, purchaseMembership } from "../thunks/membershipThunk";



const initialState = {
    membershipPlans: [],
   
   membershipOrder: null,
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

            .addCase(purchaseMembership.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(purchaseMembership.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.membershipOrder = action.payload
            })
            .addCase(purchaseMembership.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
















    }



})



export default membershipSlice.reducer;