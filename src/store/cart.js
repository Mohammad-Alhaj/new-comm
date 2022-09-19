import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from 'react-cookies';
import { getData } from "./API";
import { toast } from 'react-toastify';
const url = 'https://todoappmohammadalhaj.herokuapp.com/api/v2'

export const updateAmount = createAsyncThunk('cart/updateAmount', async(data,thunkApi)=>{
    console.log(data)
    const {rejectWithValue,dispatch} = thunkApi
    const dataUpdate = {
        name:data.name,
        category: data.category,
        description:  data.description,
        price: data.price,
        amount: data.amount -1,
        image:data.image
    }
    console.log(dataUpdate)
    try {
        const req = await axios.put(`${url}/myStore/${data.id}`, dataUpdate, {
          headers: {
            authorization: `Bearer ${cookie.load("token")}`,
          },
        });
        dispatch(removeCart(data))
        return req.data;
      } catch (error) {
        console.log(error.response.data.message)
        return rejectWithValue(error.response.data.message);
      }
  
})

const initialState = {
    cart:JSON.parse(localStorage.getItem('cart'))?
    JSON.parse(localStorage.getItem('cart')):[],

    category:[],
    error:null,
    cartQuantity:0,
}

JSON.parse(localStorage.getItem('cart'))
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addCart:(state,action)=>{
            console.log(state.cart)
            const isInCart = state.cart.findIndex(ele=>ele.id === action.payload.id)
            if(isInCart >= 0) {
                state.cart[isInCart].cartQuantity++
            }else {
                let itemWithQuan = {...action.payload,cartQuantity:1}
                state.cart.push(itemWithQuan) 
            }

            cookie.save('cart',state.cart)
            localStorage.setItem('cart',JSON.stringify(state.cart))
            toast.success(`The ${action.payload.name} added to cart`,{autoClose: 2500})
        },
        removeCart:(state,action)=>{
            state.cart =  state.cart.filter(ele=>ele.id!==action.payload.id)
            localStorage.setItem('cart',JSON.stringify(state.cart))  
            toast.info(`The${action.payload.name} removed from cart`,{autoClose: 2000})
        },
          
        categoryAction:(state,action)=>{
            state.category =  state.category.filter(ele=>ele.category===action.payload.category)

        },
        clearAllCart:(state,action)=>{
            state.cart = []
            localStorage.removeItem('cart');
            toast.error(`removed all items! from cart`,{autoClose: 2000})

         
            
        }

    },
    extraReducers:{
        // Listen to action
        [getData.fulfilled]:(state,action)=>{
            state.category = action.payload;
        },

        // updateAmount...
        [updateAmount.fulfilled]:(state,action)=>{
            state.error =null;
        },
        [updateAmount.pending]:(state,action)=>{
            state.error =null;
        },
        [updateAmount.rejected]:(state,action)=>{
            state.error = action.payload;
        }
    }
})

export const {addCart,removeCart,categoryAction,clearAllCart} = cartSlice.actions
export default cartSlice.reducer