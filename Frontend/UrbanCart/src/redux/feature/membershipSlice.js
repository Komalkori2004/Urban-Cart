
import { createSlice } from "@reduxjs/toolkit";

import {
    getAllMembership, purchaseMembership, verifyMembershipPayment, getMyMembership,
    getMembershipHistory, cancelMembership,checkPremiumStatus
} from "../thunks/membershipThunk";



const initialState = {
    membershipPlans: [],

    membershipOrder: null,
    verifiedMembership: null,
    myMembership: null,
    membershipHistory: [],
    cancelledMembership: null,
    premiumStatus: {
        isPremium: false,
        membership: null
    },

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

            .addCase(verifyMembershipPayment.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(verifyMembershipPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.verifiedMembership = action.payload
            })
            .addCase(verifyMembershipPayment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(getMyMembership.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(
                getMyMembership.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.myMembership =
                        action.payload;
                }
            )
            .addCase(getMyMembership.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(getMembershipHistory.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getMembershipHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.membershipHistory =
                    action.payload;
            })
            .addCase(getMembershipHistory.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(
                cancelMembership.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                cancelMembership.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.success = true;

                    state.cancelledMembership =
                        action.payload;

                    state.myMembership = null;
                }
            )

            .addCase(
                cancelMembership.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;
                }
            )

            .addCase(
                checkPremiumStatus.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                checkPremiumStatus.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.success = true;

                    state.premiumStatus =
                        action.payload;
                }
            )

            .addCase(
                checkPremiumStatus.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;
                }
            )
    }



})



export default membershipSlice.reducer;