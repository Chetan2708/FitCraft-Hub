import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../features/user/authenticationSlice";

const store = configureStore({
    reducer:{
        auth:authSlice
    }
})

export {store};