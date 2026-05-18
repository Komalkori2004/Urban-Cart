import { createSlice } from '@reduxjs/toolkit'
import { loginUser, registerUser } from '../thunks/authThunks';




const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false
};

const authSlice = createSlice({

    name: "auth",
    initialState,


    reducers: {
        logoutUser: (state) => {
            state.user = null
            state.token = null
            state.isAuthenticated = false
            localStorage.removeItem("token")
            localStorage.removeItem("user")

        }
    },

    extraReducers: (builder) => {

        builder


        // for login user
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.isAuthenticated = true;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // for register user

            .addCase(registerUser.pending, (state) => {
                state.loading = null,
                    state.error = null


            })

            .addCase(registerUser.fulfilled,(state)=>{
                state.loading=false

            })
            .addCase(registerUser.rejected,(state)=>{
                state.loading=false,
                state.error=action.payload
            })

    }


})

export const { logoutUser } = authSlice.actions

export default authSlice.reducer;