import { createSlice } from "@reduxjs/toolkit"



import { applyCoupon } from "../thunks/couponThunk"
const initialState = {
    couponCode: "",
    cartTotal: 0,
    discount: 0,
    finalAmount: 0,
    loading: false,
    error: null
}


const couponSlice=createSlice({
    name:"coupon",
    initialState,
reducers:{
resetCoupon:(state)=>{
        state.couponCode=""
        state.cartTotal=0
        state.discount=0
        state.finalAmount=0
        state.error=null
    }


},

    extraReducers:(builder)=>{
        builder
        .addCase(applyCoupon.pending,(state)=>{
            state.loading=true,
            state.error=null

        })
        .addCase(applyCoupon.fulfilled,(state,action)=>{
            state.loading=false,
            state.couponCode=action.payload.couponCode,
            state.cartTotal=action.payload.cartTotal,
            state.discount=action.payload.discount,
            state.finalAmount=action.payload.finalAmount
        })
        .addCase(applyCoupon.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
    }
})


export const {resetCoupon}=couponSlice.actions
export default couponSlice.reducer