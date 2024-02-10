import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import profileSlice from "./Slices/profileSlice";
import cartSlice from "./Slices/cartSlice";
export default configureStore({
    reducer:{
        auth:authSlice,
        profile:profileSlice,
        cart:cartSlice
    }
})