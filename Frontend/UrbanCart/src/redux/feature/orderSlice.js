

import { createSlice } from "@reduxjs/toolkit"
import { getAllOrders } from "../thunks/orderThunks"


const initialState = {
    orders: [],
    loading: false,
    error: null,
};


const orderSlice = createSlice({

    name: "order",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.loading = true,
                    state.error = null

            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false,
                    state.orders = action.payload
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })



    }




})


export default orderSlice.reducer