import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";

export const getAllproduct = createAsyncThunk(
    "product/getAllproduct",

    async (_, thunkAPI) => {
        try {
            const { data } = await api.get("/products/")
            return data.products


        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)


export const getsingleProduct= createAsyncThunk(
    "product/getsingleProduct",


    async (slug, thunkAPI) => {

        try {


            const { data } = await api.get(`/products/${slug}`)
            return data.product
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)

        }

    }
) 