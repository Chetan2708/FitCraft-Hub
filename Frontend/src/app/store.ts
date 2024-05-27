import {configureStore , combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/user/authenticationSlice";
import exerciseSlice from "../features/exercises/exerciseSlice";
import storage from 'redux-persist/lib/storage'; 
import { persistReducer } from 'redux-persist';


const persistConfig = {
    key: 'root',
    version:1,
    storage,
    whitelist: ['exercise']
  };


const rootReducer = combineReducers({
    auth: authSlice,
    exercise: exerciseSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
})

export {store};