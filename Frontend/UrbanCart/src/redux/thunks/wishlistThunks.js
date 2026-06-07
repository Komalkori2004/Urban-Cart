
import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";

export const addToWishlist = createAsyncThunk(
    "wishlist/addToWishlist",

    async (productId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await api.post(
                "/wishlist/add",
                { productId },
                config
            )
            console.log(data)
            return data




        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }

    }
)

export const getWishlist = createAsyncThunk(
    "wishlist/getWishlist",


    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await api.get("/wishlist", config)
            return data.wishlist?.products || []
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)


export const removeWishlist = createAsyncThunk(
    "wishlist/removeWishlist",

    async (productId, thunkAPI) => {

        try {

            const token = thunkAPI.getState().auth.token

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            await api.delete(
                `/wishlist/${productId}`,
                config
            )

            return productId

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            )
        }
    }
)
