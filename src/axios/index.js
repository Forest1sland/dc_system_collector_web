import axios from 'axios'
import comm from "../common/comm.js";
import { Toast } from 'vant';

var CODE = comm.RESULT_CODE


const instance = axios.create({
    baseURL: '/api',
    method: 'post',
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
        case CODE.LOGIN_FAILED:
            Toast.fail(response.data.message);
            break;
        case CODE.SUCCESS:

            break;
        case CODE.LOGIN_TIME_OUT:
            Toast.fail(response.data.message);
            break;
        case CODE.BUSINESS_ERROR:
            Toast.fail(response.data.message);
            break;
    }

    return response.data;
}, function (error) {
    Toast.fail('无法连接网络！')
    return Promise.reject(error);
});

export default instance