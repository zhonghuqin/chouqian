import axios from "axios";
const request = axios.create({
    baseURL: '150.158.53.178:1004'
})
// 添加请求拦截
// 将token放在请求头里面
request.interceptors.request.use(
    (config) => {
        config.headers.Authorization = window.sessionStorage.getItem('token')
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 添加响应拦截器
request.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)
export default request
