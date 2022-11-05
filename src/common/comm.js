

export default {
    VERSION: "V1.0", //需要显示版本号的地方使用 //返回代码常量，要和后台的常量定义保持一致 
    RESULT_CODE: {
        SUCCESS: 100, ERROR: 200
        // , LOGIN_ERROR: 101, NOT_LOGIN: 102
    }, utils: {
        nullToEmpty(obj) {
            if (obj == null || typeof (obj) == "undefined") {
                return "";
            } return obj;
        }
    }
}