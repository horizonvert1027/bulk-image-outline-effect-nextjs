/*
 * @Author: 623301600@qq.com 623301600@qq.com
 * @Date: 2024-08-07 21:47:36
 * @LastEditors: wzp_vicky 623301600@qq.com
 * @LastEditTime: 2024-09-05 11:55:39
 * @FilePath: /-website/src/store/modules/userSlice.js
 * @Description:
 *
 */

"use client"

import { createSlice } from "@reduxjs/toolkit"

const userStore = createSlice({
    name: "user",

    initialState: {
        age: 65,
        isLogin: false,
        userInfo: null,
        userType: {},
        paddleInfo: {},
    },

    reducers: {
        setUserInfo(state, action) {
            let userInfo = action.payload
            state.isLogin = userInfo != null
            state.userInfo = userInfo

            let userType = ""
            let userTypeAlias = ""
            if (userInfo != null) {
                let { memberType, registerType } = userInfo
                if (
                    userInfo == null ||
                    Object.keys(userInfo ?? {}).length == 0
                ) {
                    userType = "N/A"
                    userTypeAlias = "non-login"
                } else if (memberType == 1) {
                    userType = "Monthly Plan"
                    userTypeAlias = `M${
                        registerType == 1 ? "S" : registerType == 2 ? "P" : "A"
                    }`
                } else if (memberType == 3) {
                    userType = "Yearly Plan"
                    userTypeAlias = `Y${
                        registerType == 1 ? "S" : registerType == 2 ? "P" : "A"
                    }`
                } else if (memberType == 4) {
                    userType = "Lifetime Plan"
                    userTypeAlias = "LP"
                } else {
                    userType = "Free Account"
                    userTypeAlias = "Free"
                }

                state.userType = {
                    userType,
                    userTypeAlias,
                    subscribeType:
                        registerType == 0 || memberType == 4
                            ? ""
                            : " / " +
                              (registerType == 1
                                  ? "Starter"
                                  : registerType == 2
                                  ? "Premium"
                                  : "Business"),
                }
                /**
                 * registerType:-1 ip
                 *           0 是Free
                 *           123 会员类型那一列（starter）
                 *
                 * memberType：0 免费   1 月  2（以前是天） 3年   4：终身
                 */
            } else {
                state.userInfo = null
                state.userType = {}
            }
        },
        changeLoginStatus(state, action) {
            state.isLogin = action.payload
        },

        setPaddleInfo(state, action) {
            state.paddleInfo = action.payload
        },

        updateDownloadCount(state, action) {
            if (!state.isLogin) return
            let credits = action.payload
            state.userInfo["downloadCount"] = credits
        },
    },
})

const userReducer = userStore.reducer

export const {
    setUserInfo,
    changeLoginStatus,
    setPaddleInfo,
    updateDownloadCount,
} = userStore.actions

export default userReducer
