import { createSlice } from '@reduxjs/toolkit'
import { loginUser, registerUser, verifyEmail } from '../thunks/authThunks';




const initialState = {
    user: JSON.parse(
        localStorage.getItem("user")
    ) || null,

    token:
        localStorage.getItem("token") || null,

    loading: false,

    error: null,
    message: null,

    isAuthenticated:
        !!localStorage.getItem("token")
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
                state.loading = true,
                    state.error = null


            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false

            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            // verify email

            // verify email

            .addCase(
                verifyEmail.pending,

                (state) => {

                    state.loading = true

                    state.error = null
                }
            )
            .addCase(
                verifyEmail.fulfilled,

                (state, action) => {

                    state.loading = false

                    state.message =
                        action.payload.message
                }
            )
            .addCase(
                verifyEmail.rejected,

                (state, action) => {

                    state.loading = false

                    state.error =
                        action.payload
                }
            )
    }


})

export const { logoutUser } = authSlice.actions

export default authSlice.reducer;