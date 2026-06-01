import { createAsyncThunk } from "@reduxjs/toolkit"

import api from "../../services/api"


export const createOrder = createAsyncThunk(
    "order/createOrder",

    async (_, thunkAPI) => {

        try {
            const token = thunkAPI.getState().auth.token

            const config = {
                headers: {

                    Authorization: `Bearer ${token}`,

                }
            }
            const { data } = await api.get("/order", config)



        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }

    }
)
