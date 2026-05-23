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


export const getsingleProduct = createAsyncThunk(
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

// create product



export const createProduct = createAsyncThunk(

    "product/createProduct",

    async (productData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token

            const config = {
                headers: {

                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }
            const { data } = await api.post("/products/create", productData,config)
            return data.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }






)