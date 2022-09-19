import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
favoriteList: JSON.parse(localStorage.getItem('favorite'))?
JSON.parse(localStorage.getItem('favorite')):[],
}

const favoriteSlice =createSlice({
    name:'favorite',
    initialState,
    reducers:{
        addFavorite:(state,action)=>{
            let result=state.favoriteList.find(ele=>ele.id === action.payload.id)

     if(!result){
                state.favoriteList.push(action.payload) 
            localStorage.setItem('favorite',JSON.stringify(state.favoriteList))
            toast.success(`The ${action.payload.name} added to favorite`,{autoClose: 2500})
        }else {
            toast.error(`The ${action.payload.name} already added to favorite list`,{autoClose: 2500})
        }

        },
        removeFavorite:(state,action)=>{
            state.favoriteList =  state.favoriteList.filter(ele=>ele.id!==action.payload.id)
            localStorage.setItem('favorite',JSON.stringify(state.favoriteList))  
            toast.info(`The${action.payload.name} removed from favorite list`,{autoClose: 2000})
        },
          

    },
}) 

export default favoriteSlice.reducer
export const {addFavorite,removeFavorite} = favoriteSlice.actions