import { createAsyncThunk } from "@reduxjs/toolkit"

import api from "../../services/api"


export const getAllOrders = createAsyncThunk(
    "order/getAllOrders",

    async (_, thunkAPI) => {

        try {
            const token = thunkAPI.getState().auth.token

            const config = {
                headers: {

                    Authorization: `Bearer ${token}`,

                }
            }
            const { data } = await api.get("/order", config)
            return data.data


        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }

    }
)
