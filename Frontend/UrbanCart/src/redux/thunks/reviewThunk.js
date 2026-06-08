import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";


export const addReview=createAsyncThunk(
    "review/addReview",

    async({productId,rating,comment})=>{
        try{
            const token=thunklAPI.getState().auth.token
            const config={
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            const {data}=await api.post(`/product/${productId}/review`,{rating,comment},config)

        }catch(error){
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
            
    }


)


