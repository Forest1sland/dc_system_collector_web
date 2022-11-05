

export default {
    VERSION: "V1.0", //需要显示版本号的地方使用 //返回代码常量，要和后台的常量定义保持一致 
    RESULT_CODE: {
        
        SUCCESS:200, LOGIN_TIME_OUT:300, LOGIN_FAILED:301, BUSINESS_ERROR:400

    }, utils: {
        nullToEmpty(obj) {
            if (obj == null || typeof (obj) == "undefined") {
                return "";
            } return obj;
        }
    }
}