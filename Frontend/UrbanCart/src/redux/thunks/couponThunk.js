import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";



export const applyCoupon = createAsyncThunk(
    "coupon/applyCoupon",
    async (couponCode, thunkAPI) => {
        try {

            const token = thunkAPI.getState().auth.token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }


            const { data } = await api.post("/coupon/apply-coupon", couponCode, config)
            return data
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Something went wrong"
            )
        }
    }
)



