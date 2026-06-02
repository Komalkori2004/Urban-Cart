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


export const updateOrderStatus = createAsyncThunk(
    "order/updateOrderStatus",

    async ({ id, orderStatus }, thunkAPI) => {

        try {
            const token = thunkAPI.getState().auth.token
            const config = {
                headers: {

                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await api.put(`/order/${id}/status`, { orderStatus }, config)
            return data.data

        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)


export const getOrderById=createAsyncThunk(
    "order/getOrderById",

    async(id,thunkAPI)=>{
        try{

            const token = thunkAPI.getState().auth.token
            const config = {
                headers: {  
                    Authorization: `Bearer ${token}`
                }
            }
            const {data}=await api.get(`/order/${id}`,config)

            return data.data

        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)
