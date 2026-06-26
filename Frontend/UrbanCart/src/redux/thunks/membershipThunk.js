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