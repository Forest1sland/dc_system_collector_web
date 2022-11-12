<template>
    <div id="body">
        <div id="title_div">
            <h1 id="title">注册</h1>
        </div>

        <van-form @submit="onSubmit" id="form">
            <van-cell-group inset>
                <van-field v-model="register.data.name" name="name" label="姓名" placeholder="姓名"
                    :rules="[{ pattern: nameCheck, message: '请输入姓名' }]" />
                <van-field v-model="register.data.tel" name="tel" label="手机号" placeholder="手机号"
                    :rules="[{ pattern: telCheck, message: '请输入正确的手机号' }]" />
                <van-field v-model="register.data.idCard" name="idCard" label="身份证号" placeholder="身份证号"
                    :rules="[{ pattern: idCardCheck, message: '请输入正确的身份证号' }]" />
                <van-field v-model="register.data.password" type="password" name="password" label="密码"
                    :rules="[{ required: true, message: '请输入密码' }]" placeholder="密码" />
                <van-field v-model="register.data.passwordAgain" type="password" name="passwordAgain" label="确认密码"
                    :rules="[{ required: true, message: '请再次输入密码' }]" placeholder="确认密码" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>

</template>

<script setup>

import axios from '../axios';
import { reactive } from 'vue';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';

/**
 * 提交注册信息
 */
const register = reactive({
    data: {
        tel: '',
        name: '',
        password: '',
        passwordAgain: '',
        idCard: '',
    }
})

const router = useRouter()
const onSubmit = (values) => {
    register.data = values
    if (!checkData(register.data)) {
        return
    }
    axios({
        url: '/collector/registerCollector.do',
        data: register.data
    }).then(res => {
        if (res.code == 200) {
            router.back()
        }
    })
};



const idCardCheck = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
const telCheck = /^1[3-9]\d{9}$/
const nameCheck = /^[\u4E00-\u9FA5\uf900-\ufa2d·s\-]{2,20}$/
const passwordCheck = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/

const checkData = (data) => {
    if (data.password != data.passwordAgain) {
        Toast.fail('两次密码不一致');
        return false;
    }
    return true
}
</script>


<style lang="scss" scoped>
#form {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

}

#body {
    height: 100vh;
    position: relative;
    background-color: #F7F8FA;

}

.van-cell {

}

#title {
    display: inline-block;
    height: 15vh;
    width: 100%;
    padding-top: 5vh;
}

#title_div {
    width: 100%;
    text-align: center;
}
</style>