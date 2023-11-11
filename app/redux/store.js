"use client"


import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./features/counter/counterSlice"
import authReducer from "./features/auth/authSlice"

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
  };

const reducers = combineReducers({
    counter: counterReducer,
    auth: authReducer
  });

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
})

//export type RootState = ReturnType<typeof store.getState>;
//export type AppDispatch =typeof store.dispatch;