import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";


export const addReview = createAsyncThunk(
    "review/addReview",

    async ({ productId, rating, comment }, thunkAPI) => {
        try {

            const token = thunkAPI.getState().auth.token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await api.post(`/products/${productId}/review`, { rating, comment }, config)

        } catch (error) {

            console.log("Review Error:", error)

            console.log("Response:", error.response)

            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            )
        }
    }


)


