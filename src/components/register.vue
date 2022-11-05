<template>
    <div id="body">
        <div id="title_div">
            <h1 id="title">注册</h1>
        </div>

        <van-form @submit="onSubmit" id="form">
            <van-cell-group inset>
                <van-field v-model="register.data.name" name="name" label="姓名" placeholder="姓名"
                    :rules="[{ required: true, message: '请输入姓名' }]" />
                <van-field v-model="register.data.tel" name="tel" label="手机号" placeholder="手机号"
                    :rules="[{ required: true, message: '请输入手机号' }]" />
                <van-field v-model="register.data.idCard" name="idCard" label="身份证号" placeholder="身份证号"
                    :rules="[{ required: true, message: '请输入身份证号' }]" />
                <van-field v-model="register.data.password" type="password" name="password" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请输入密码' }]" />
                <van-field v-model="register.data.passwordAgain" type="password" name="passwordAgain" label="确认密码"
                    placeholder="确认密码" :rules="[{ required: true, message: '两次密码不一致' }]" />
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

/**
 * 提交注册信息
 */
const register = reactive({
    data: {
        phoneNumber: '',
        name: '',
        password: '',
        passwordAgain: '',
        idCard: '',
    }
})
const onSubmit = (values) => {
    register.data = values
    console.log(register.data);
    axios({
        method: 'post',
        url: '/collector/register.do',
        data: register.data

    }).then(res => {

    })
};

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
}

.van-cell {
    background-color: #f5f5f5;
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