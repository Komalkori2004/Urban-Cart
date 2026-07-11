import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";

export const getAllproduct = createAsyncThunk(
    "product/getAllproduct",

    async ({ page = 1, search = "", category = "All" }, thunkAPI) => {
        try {
            const { data } = await api.get(
                `/products?page=${page}&search=${search}&category=${category}`
            )
            return data;


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
            const { data } = await api.post("/products/create", productData, config)
            return data.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)


export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",

    async (productId, thunkAPI) => {
        try {

            const token = thunkAPI.getState().auth.token

            const config = {
                headers: {

                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }
            const { data } = await api.delete(`/products/${productId}`, config)

            return productId


        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }


)



// update product


export const updateProduct = createAsyncThunk(

    "product/updateProduct",

    async ({ id, productData }, thunkAPI) => {

        try {
            const token = thunkAPI.getState().auth.token

            const config = {
                headers: {

                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }

            const { data } =
                await api.put(

                    `/products/${id}`,

                    productData,

                    config
                )
            return data.data

        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }

)

// 


export const getSingleProductById =
    createAsyncThunk(

        "product/getSingleProductById",

        async (id, thunkAPI) => {

            try {

                const token =
                    thunkAPI.getState()
                        .auth.token;



                const config = {

                    headers: {

                        Authorization:
                            `Bearer ${token}`
                    }
                };



                const { data } =
                    await api.get(

                        `/products/single/${id}`,

                        config
                    );



                return data.product;

            } catch (error) {

                return thunkAPI.rejectWithValue(

                    error.response.data.message
                );
            }
        }
    );


// search product 


export const searchProducts = createAsyncThunk(
    "product/searchProducts",
    async (keyword, thunkAPI) => {
        try {
            const { data } = await api.get(`/products/search?keyword=${keyword}`)
            return data.product
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    }
)