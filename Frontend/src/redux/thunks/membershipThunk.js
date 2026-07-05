import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";



export const getAllMembership = createAsyncThunk(
    "membership/getAllMembership",

    async (_, thunkAPI) => {
        try {
            const { data } = await api.get("/membership")
            return data.membershipPlans;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch memberships"
            );
        }
    }
)



export const purchaseMembership = createAsyncThunk(
    "membership/purchaseMembership",

    async (planId, thunkAPI) => {


        try {
            const token = thunkAPI.getState().auth.token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await api.post(`/membership/purchase/${planId}`, {}, config)
            return data
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch memberships"
            );
        }
    }
)




export const verifyMembershipPayment = createAsyncThunk(
    "membership/verifyMembershipPayment",


    async (paymentData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await api.post("/membership/verify-payment", paymentData, config)
            return data
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch memberships"
            );
        }

    }
)


export const getMyMembership = createAsyncThunk(
    "membership/getMyMembership",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await api.get("/membership/my-membership", config)
            return data.membership;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch memberships"
            );
        }
    }
)



export const getMembershipHistory = createAsyncThunk(
    "membership/getMembershipHistory",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await api.get("/membership/history", config)
            return data.memberships;

        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch memberships"
            );
        }
    }
)


export const cancelMembership = createAsyncThunk(
    "membership/cancelMembership",



    async (_, thunkAPI) => {
        try {

            const token = thunkAPI.getState().auth.token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await api.patch("/membership/cancel", {}, config)
            return data.membership;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch memberships"
            );
        }
    }
)




export const checkPremiumStatus = createAsyncThunk(
    "membership/checkPremiumStatus",



    async (_, thunkAPI) => {
        try {

            const token = thunkAPI.getState().auth.token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await api.get("/membership/premium-status", {}, config)
            return data.membership;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch memberships"
            );
        }
    }
)




export const createMembershipPlan = createAsyncThunk(
    "membership/createMembershipPlan",
    async (membershipData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await api.post("/membership/create", membershipData, config)
            return data.membershipPlan
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to create membership plan"
            );
        }
    }
)



export const updateMembershipPlan = createAsyncThunk(
    "membership/updateMembershipPlan",
    async ({id, membershipData},thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await api.patch(`/membership/${id}`, membershipData, config)
            return data.membershipPlan
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to update membership plan"
            );
        }
    }
)



export const deleteMembershipPlan = createAsyncThunk(
    "membership/deleteMembershipPlan",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await api.delete(`/membership/${id}`, config)
            return data.membershipPlan
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete membership plan"
            );
        }
    }    
)




export const getMembershipStats = createAsyncThunk(
    "membership/getMembershipStats",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await api.get("/membership/admin/stats", config)
            return data.stats;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch memberships"
            );
        }
    }    
)




export const getSingleMembership = createAsyncThunk(
    "membership/getSingleMembership",
    async (slug, thunkAPI) => {
        try {
          
            const { data } = await api.get(`/membership/${slug}`)
            return data.membershipPlan;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch memberships"
            );
        }
    }
)