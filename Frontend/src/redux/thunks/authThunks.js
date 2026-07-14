
import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../services/api"


export const loginUser = createAsyncThunk(
    "auth/loginUser",

    async (formData, thunkAPI) => {
        try {


            const { data } = await api.post("/auth/login", formData)
            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            // set axios token
            api.defaults.headers.common["Authorization"] =
                `Bearer ${data.token}`;

            return data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const registerUser = createAsyncThunk(
    "auth/registerUser",


    async (formData, thunkAPI) => {
        try {

            const { data } = await api.post("/auth/register", formData)

            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)

        }
    }
)


export const verifyEmail = createAsyncThunk(
    "auth/verifyEmail",


    async (token, thunkAPI) => {
        try {
            const { data } = await api.get(`/auth/verify/${token}`)
            return data

        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }




    }
)

 

export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (email, thunkAPI) => {
        try {
            const { data } = await api.post("/auth/forgot-password", { email })
            return data
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const resetPassword=createAsyncThunk(

    "auth/resetPassword",

    async ({token,password},thunkAPI)=>{

        try{
            const {data}=await api.post(`/auth/reset-password/${token}`,{password})
            return data
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)


export const getProfile=createAsyncThunk(
    "auth/getProfile",
    async (_,thunkAPI)=>{
        try{
            const {data}=await api.get("/auth/profile")
            return data
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)




export const getAllUser=createAsyncThunk(
    "auth/getAllUser",

    async(_,thunkAPI)=>{

        try{
            const token=thunkAPI.getState().auth.token
            const config={
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            const {data}=await api.get("/auth/all-users",config)
            return data.users
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



export const getAddresses=createAsyncThunk(
    "auth/getAddresses",

    async(_,thunkAPI)=>{

        try{
            const token=thunkAPI.getState().auth.token
            const config={
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            const {data}=await api.get("/auth/address",config)
            return data.addresses
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)


export const addAddress=createAsyncThunk(

    "auth/addAddress",

async(addressData,thunkAPI)=>{
    try{
        const token=thunkAPI.getState().auth.token
        const config={
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        const {data}=await api.post("/auth/address",addressData,config)
        return data.addresses
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
}


)




// user profile update thunk




export const updateProfile = createAsyncThunk(
    "auth/updateProfile",

    async (profileData, thunkAPI) => {
        try {

            const { data } = await api.put(
                "/users/profile",
                profileData
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            return data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );

        }
    }
);





export const changePassword = createAsyncThunk(
    "auth/changePassword",

    async (passwordData, thunkAPI) => {

        try {

            const { data } = await api.put(
                "/users/change-password",
                passwordData
            );

            return data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );

        }

    }
);


export const uploadProfileImage = createAsyncThunk(
    "auth/uploadProfileImage",

    async (formData, thunkAPI) => {

        try {

            const { data } = await api.put(
                "/users/profile-image",
                formData
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            return data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );

        }

    }
);