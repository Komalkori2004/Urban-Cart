import { createAsyncThunk } from "@reduxjs/toolkit"

import api from "../../services/api"



export const getAllCategory = createAsyncThunk(
    "category/getAllCategory",

    async (_, thunkAPI) => {


        try {
            const { data } = await api.get("/category/")
            return data.categories
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }

)


export const createCategory = createAsyncThunk(
    "category/create",

    async (categoryData, thunkAPI) => {

        try {
            const token = thunkAPI.getState().auth.token

            const config = {
                Headers: {

                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await api.post("/category/create", categoryData, config)
            return data.category


        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }

)