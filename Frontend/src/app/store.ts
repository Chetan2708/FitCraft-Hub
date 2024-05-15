import {configureStore , combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/user/authenticationSlice";
import exerciseSlice from "../features/exercises/exerciseSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    exercise: exerciseSlice
});



const store = configureStore({
    reducer: rootReducer
})

export {store};