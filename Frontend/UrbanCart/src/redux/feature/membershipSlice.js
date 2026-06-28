
import { createSlice } from "@reduxjs/toolkit";

import {
    getAllMembership, purchaseMembership, verifyMembershipPayment, getMyMembership,
    getMembershipHistory, cancelMembership, checkPremiumStatus, createMembershipPlan, updateMembershipPlan, deleteMembershipPlan
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

    createLoading: false,
    createSuccess: false,
    createError: null,

    updateLoading: false,
    updateSuccess: false,
    updateError: null,

    deleteLoading: false,
    deleteSuccess: false,
    deleteError: null,

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


            .addCase(
                createMembershipPlan.pending,
                (state) => {

                    state.createLoading = true;

                    state.createError = null;

                    state.createSuccess = false;
                }
            )

            .addCase(
                createMembershipPlan.fulfilled,
                (state, action) => {

                    state.createLoading = false;

                    state.createSuccess = true;

                    state.membershipPlans.push(
                        action.payload
                    );
                }
            )

            .addCase(
                createMembershipPlan.rejected,
                (state, action) => {

                    state.createLoading = false;

                    state.createError =
                        action.payload;
                }
            )



            .addCase(
                updateMembershipPlan.pending,
                (state) => {

                    state.updateLoading = true;

                    state.updateError = null;

                    state.updateSuccess = false;
                }
            )

            .addCase(
                updateMembershipPlan.fulfilled,
                (state, action) => {

                    state.updateLoading = false;

                    state.updateSuccess = true;

                    state.membershipPlans =
                        state.membershipPlans.map(
                            (plan) =>
                                plan._id === action.payload._id
                                    ? action.payload
                                    : plan
                        );
                }
            )

            .addCase(
                updateMembershipPlan.rejected,
                (state, action) => {

                    state.updateLoading = false;

                    state.updateError =
                        action.payload;
                }
            )




            .addCase(
                deleteMembershipPlan.pending,
                (state) => {

                    state.deleteLoading = true;

                    state.deleteError = null;

                    state.deleteSuccess = false;
                }
            )

            .addCase(
                deleteMembershipPlan.fulfilled,
                (state, action) => {

                    state.deleteLoading = false;

                    state.deleteSuccess = true;

                    state.membershipPlans =
                        state.membershipPlans.filter(
                            plan =>
                                plan._id !== action.payload
                        );
                }
            )

            .addCase(
                deleteMembershipPlan.rejected,
                (state, action) => {

                    state.deleteLoading = false;

                    state.deleteError =
                        action.payload;
                }
            )
    }



})



export default membershipSlice.reducer;