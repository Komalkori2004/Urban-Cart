



import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";



export const createContact = createAsyncThunk(
    "contact/createContact",
    async (contactData, thunkAPI) => {
        try {
            const { data } = await api.post("/contact/create", contactData)
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }

    }
)


export const getContact = createAsyncThunk(
    "contact/getContact",
    async (_, thunkAPI) => {
        try {

            const token = thunkAPI.getState().auth.token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await api.get(
                "/contact",
                config
            );
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    }
)

export const markAsRead= createAsyncThunk(
    "contact/markAsRead",
    async (id,thunkAPI)=>{
        try{
            const token=thunkAPI.getState().auth.token
            const config={
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            const {data}=await api.put(`/contact/${id}/read`,{},config)
            return data
        }
        catch(error){
return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Something went wrong"
            );        }
    }
)