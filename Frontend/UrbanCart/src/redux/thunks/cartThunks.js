import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";


export const updateCart = createAsyncThunk(
    "cart/updateCart",

    async (cartData, thunkAPI) => {

        try {
            const token = thunkAPI.getState().auth.token

            const config = {
                Headers: {

                    Authorization: `Bearer ${token}`
                }
            }


            const { data } = await api.patch("/cart/update", cartData, config)
            return data.data


        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)

        }

    }

)




export const getCart = createAsyncThunk(
    "cart/getCart",


    async (_, thunkAPI) => {

        try {

            const token = thunkAPI.getState().auth.token

            const config = {
                headers: {

                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await api.get("/cart", config)
            return data.items
        }
        catch (error) {

            return thunkAPI.rejectWithValue(error.response.data.message)

        }


    }

)


export const addToCart = createAsyncThunk(



    "cart/addToCart",

    async (cartData, thunkAPI) => {

        try {
             const token = thunkAPI.getState().auth.token

            const config = {
                headers: {

                    Authorization: `Bearer ${token}`
                }
            }
            const {data}=await api.post("/cart/add",cartData,config)
 return data.data


        } catch (error) {

        }
    }



)