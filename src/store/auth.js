import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import base64 from 'base-64';
import cookie from 'react-cookies';
const url = 'https://todoappmohammadalhaj.herokuapp.com'

export const signin = createAsyncThunk('auth/signin',async (info,thunkApi)=>{

const {rejectWithValue} = thunkApi
    try{
        const request = await axios.post(`${url}/signin`,{},{
            headers:{
              'authorization':`Basic ${base64.encode(`${info.username}:${info.password}`)}`  
            }
        })
        console.log(request.data)
        return request.data

    }catch(err){
        console.log(err)
        return rejectWithValue(err.message)
    }

    

}) 
export const singup = createAsyncThunk('auth/singup',async (info,thunkApi)=>{
    const {rejectWithValue} = thunkApi
    try{
    const request = await axios.post(`${url}/signup`,info)
    console.log(request.data)
    return request.data
    }catch(error){
        console.log(error)
        return rejectWithValue(error.response.data.message)
    }
}) 


 const initialState = {
    isSingin:cookie.load('token')?true:false
    ,isLoading:false,
    errorSingin:null,
    errorSignup:null,
    actions:cookie.load('actions')||[]
}

 const authSlice = createSlice({
    name:'auth',
    initialState,

    reducers:{
        isSinginRed(state,action){
            console.log(action.payload)
            state.isSingin=action.payload
        },
        // permission(state,action) {

        // }
    },
    extraReducers:{
        // singin
        [signin.fulfilled]:(state,action)=>{
            state.isSingin = true
            cookie.save('token',action.payload.token)
            cookie.save('actions',action.payload.actions)
            state.actions = cookie.load('actions')
         state.isLoading = false
         state.errorSingin = null
      
        },
        [signin.pending]:(state,action)=>{
            state.isLoading = true
            state.errorSingin = null

        },
        [signin.rejected]:(state,action)=>{
            state.isLoading = false
            state.errorSingin = action.payload
        },

        // signup
        [singup.fulfilled]:(state,action)=>{
            window.location.reload()
         state.isLoading = false
         state.errorSignup = null
        },
        [singup.pending]:(state,action)=>{
            state.isLoading = true
            state.errorSignup = null
        },
        [singup.rejected]:(state,action)=>{
            state.isLoading = false
            state.errorSignup = action.payload
        },

    }
})


export const {isSinginRed} = authSlice.actions
export default authSlice.reducer
