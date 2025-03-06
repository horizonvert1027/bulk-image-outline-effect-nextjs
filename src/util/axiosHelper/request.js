/*
 * @Author: wangzhipeng 623301600@qq.com
 * @Date: 2024-10-11 17:08:18
 * @LastEditors: wangzhipeng 623301600@qq.com
 * @LastEditTime: 2024-10-31 18:27:42
 * @FilePath: \swapanything-nextjs\src\util\axiosHelper\request.js
 * @Description:
 *
 */
import axios from "axios"

const pendingTasks = [] // 维护一个请求队列，用于刷新token时保存请求
let instance = null // 用于存储已创建的axios实例

function createRequestInstance() {
    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        timeout: 1000 * 60 * 5,
        // onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
        // onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
    })

    // 全局请求拦截器
    axiosInstance.interceptors.request.use(
        (config) => {
            // config.headers["Access-Control-Allow-Origin"] = "*"
            // config.headers["Access-Control-Allow-Methods"] =
            //     "GET, POST, PUT, DELETE, OPTIONS"
            // config.headers["Access-Control-Allow-Headers"] =
            //     "Content-Type, Authorization"
            // config.url = `api${config.url}`
            console.log(`全局请求拦截器:${config.url}入参是->`, config.data || "")

            // const accessToken = localStorage.getItem("accessToken")
            // if (accessToken)
            //     config.headers.Authorization = `Bearer ${accessToken}`

            return config
        },
        (err) => Promise.reject(err)
    )

    // 全局响应拦截器
    axiosInstance.interceptors.response.use(
        // (response) => {
        // console.log(`全局响应拦截器`, response)

        ({ data, status }) => {
            console.log(`全局响应拦截器`, data)
            let { code, data: responseData, message } = data
            if (code == 200) {
                return responseData
            } else {
                return Promise.reject(data)
            }
        },
        async (err) => {
            console.log(`异常情况`, err)

            if (err.code === "ECONNABORTED" && err.message.indexOf("timeout") !== -1) {
                //    '请求超时',
                //    'Time out. Server is currently not responding. Please try again later.',
            } else {
                const { status, data, config } = err.response

                if (status === 500) {
                    notification.error({
                        message: "服务器错误",
                        description: data.message || "未知错误",
                    })
                } else if (status === 413) {
                    notification.error({
                        message: "文件过大",
                        description: "文件过大，选个小点的吧~",
                    })
                } else if (status === 404) {
                    notification.error({
                        message: "请求资源不存在",
                        description: "请求的资源不存在，请检查接口地址",
                    })
                } else if (status === 400) {
                    notification.error({
                        message: "客户端错误",
                        description: Array.isArray(data.message) ? data.message.join("；") : data.message || "未知错误",
                    })
                } else {
                    // `Network connection lost. Please check your internet connection and try again.`,
                }
            }
            return Promise.reject(err) // 返回一个错误的promise，防止继续执行
        }
    )

    return axiosInstance
}

function getRequestInstance(config) {
    if (!instance) {
        instance = createRequestInstance(config)
    }
    return instance
}

/**
 *
 * config的结构：
 * {
 *  url:"/xxx/zzz",
 *  method:"Get|POST|PUT"
 *  data,
 *  params
 * }
 * @param {*} config
 * @returns
 */
function request(config) {
    return new Promise((resolve, reject) => {
        const axiosInstance = getRequestInstance()
        axiosInstance
            .request(config)
            .then((res) => {
                // 若为单个响应设置拦截器，使用单个响应的拦截器

                if (config.interceptors?.responseInterceptors) {
                    res = config.interceptors.responseInterceptors(res) // 将res放到拦截器中处理完后再返回
                }
                resolve(res)
            })
            .catch((err) => {
                console.log(`异常了`, err)

                reject({ code: err.code, data: err.data, message: err.msg })
            })
    })
}

export default request
