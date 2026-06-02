

import { createSlice } from "@reduxjs/toolkit"
import { getAllOrders, updateOrderStatus, getOrderById } from "../thunks/orderThunks"


const initialState = {
    order: [],
    loading: false,
    error: null,
    selectedOrder: null,
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
                    state.order = action.payload
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedOrder =
                    action.payload;

                state.order =
                    state.order.map((item) =>
                        item._id === updatedOrder._id
                            ? updatedOrder
                            : item
                    );

            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            .addCase(getOrderById.pending, (state) => {
                state.loading = true,
                    state.error = null

            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false,
                    state.selectedOrder = action.payload;

            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })






    }




})


export default orderSlice.reducer