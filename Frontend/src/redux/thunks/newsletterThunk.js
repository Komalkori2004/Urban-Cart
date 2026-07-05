


import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";


export const subscribeNewsletter = createAsyncThunk(
    "newsletter/subscribeNewsletter",

    async (email, thunkAPI) => {

        try {
            const { data } = await api.post("/newsletter/subscribe", { email })
            return data
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }



    }

)


export const getSubscribers = createAsyncThunk(
    "newsletter/getSubscribers",


async(_,thunkAPI)=>{

    try{

        const token = thunkAPI.getState().auth.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await api.get("/newsletter", config)
        return data
    }
    catch(error){
        return thunkAPI.rejectWithValue(
            error.response?.data?.message ||
            "Something went wrong"
        );
    }
}

)