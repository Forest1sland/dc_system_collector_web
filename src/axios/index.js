import axios from 'axios'
import comm from "../common/comm.js";
import { Toast } from 'vant';

var CODE = comm.RESULT_CODE

const instance = axios.create({
    baseURL: '/api',
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {

    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    console.log(response.data.code)
    switch (response.data.code) {
        case 301:
            Toast.fail('登录失败');
            break;
        case 200:
            Toast.success('登录成功');
            break;
        case 300: break;
        case 400: break;
    }

    return response.data;
}, function (error) {

    return Promise.reject(error);
});

export default instance