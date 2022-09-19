import { configureStore } from '@reduxjs/toolkit'

import shirt from './API'
import auth from './auth'
import cart from './cart'
import favorite from './favorite'
const store = configureStore({
    reducer:{
        shirt:shirt,
        auth:auth,
        cartSlice:cart,
        favoriteSlice:favorite
    }
})

export default store