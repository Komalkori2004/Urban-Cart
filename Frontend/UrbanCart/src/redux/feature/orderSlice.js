

import { createSlice } from "@reduxjs/toolkit"
import { getAllOrders, updateOrderStatus, getOrderById, getMyOrders, cancleOrder } from "../thunks/orderThunks"


const initialState = {
    orders: [],      // Admin Orders
    myOrders: [],    // User Orders
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
                    state.orders = action.payload
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
                state.orders = state.orders.map((item) =>
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

            .addCase(getMyOrders.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.loading = false,
                    state.myOrders = action.payload;
            })
            .addCase(getMyOrders.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            .addCase(cancleOrder.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(cancleOrder.fulfilled, (state, action) => {
                state.loading = false
                const updatedOrder = action.payload
                state.myOrders = state.myOrders.map((item) =>
                    item._id === updatedOrder._id
                        ? updatedOrder
                        : item
                )
                if (
                    state.selectedOrder &&
                    state.selectedOrder._id === updatedOrder._id
                ) {
                    state.selectedOrder = updatedOrder;
                }
            })
            .addCase(cancleOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })





    }




})


export default orderSlice.reducer