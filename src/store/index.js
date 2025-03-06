/*
 * @Author: 623301600@qq.com 623301600@qq.com
 * @Date: 2024-08-07 21:46:55
 * @LastEditors: 623301600@qq.com 623301600@qq.com
 * @LastEditTime: 2024-08-08 08:18:44
 * @FilePath: /serveraction-test/src/store/index.js
 * @Description:
 *
 */
"use client"
import { configureStore, combineReducers } from "@reduxjs/toolkit"

import userReducer from "./modules/userSlice"

import { Provider } from "react-redux"

const rootReducer = combineReducers({
    user: userReducer,
    //add all your reducers here
})

const store = configureStore({
    reducer: rootReducer,
})

export default store

export function ReduxProvider({ children }) {
    return <Provider store={store}>{children}</Provider>
}
