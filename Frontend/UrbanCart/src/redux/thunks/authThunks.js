
import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../services/api"


export const loginUser = createAsyncThunk(
    "auth/loginUser",

    async (formData, thunkAPI) => {
        try {


            const { data } = await api.post("/auth/login", formData)
            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            // set axios token
            api.defaults.headers.common["Authorization"] =
                `Bearer ${data.token}`;

            return data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const registerUser = createAsyncThunk(
    "auth/registerUser",


    async (formData, thunkAPI) => {
        try {

            const { data } = await api.post("/auth/register", formData)

            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)

        }
    }
)


 export  const verifyEmail = createAsyncThunk(
    "auth/verifyEmail",


    async (token, thunkAPI) => {
        try {
            const { data } = await api.get(`/auth/verify/${token}`)
            return data

        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }




    }
)