<template>
    <div id="body">
        <div id="title_div">
            <h1 id="title">核酸检测采集平台</h1>
        </div>

        <div id="login">
            <van-form @submit="onSubmit">
                <van-field class="input" v-model="people.tel" name="tel" placeholder="请输入手机号" label-width="5em"
                    style="font-size: 20px;" :center=true input-align="center" />
                <van-field class="input" v-model="people.password" type="password" name="password" placeholder="请输入密码"
                    style="font-size: 20px;" :center="true" input-align="center" label-width="5em" />
            
                <div id="login_div">
                    <van-button round block type="success" native-type="submit" id="login_btn">
                        <svg t="1667615474530" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="3255" width="30" height="30">
                            <path
                                d="M885.113 489.373L628.338 232.599c-12.496-12.497-32.758-12.497-45.254 0-12.497 12.497-12.497 32.758 0 45.255l203.3 203.3H158.025c-17.036 0-30.846 13.811-30.846 30.846 0 17.036 13.811 30.846 30.846 30.846h628.36L583.084 746.147c-12.497 12.496-12.497 32.758 0 45.255 6.248 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.372l256.775-256.775a31.999 31.999 0 0 0 0-45.254z"
                                fill="#ffffff" p-id="3256"></path>
                        </svg>
                    </van-button>
                </div>

            </van-form>
            <div id="reg">
                <a id="reg_btn" @click="toRegister">注册</a>
            </div>
        </div>
    </div>
</template>

<script setup>
/**
 * 通过手机号和密码登录
 * 当输入框为空时提示
 * 当密码错误时提示
 * 登录成功时弹出登录成功，保存collectorId和collectorName并跳转到选择采集点页面
 */
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../axios'
import useStore from '../stores/store';
import { Toast } from 'vant';


/**
 * 登录功能
 * @Param Person person
 */
const people = reactive({
    data: {
        tel: '',
        password: '',
    }
})

/**
 * 点击提交发送登录请求并跳转页面
 */
const store = useStore()
const onSubmit = (values) => {
    people.data = values
    if (people.data.tel != '' && people.data.password != '')
        axios({
            method: 'post',
            url: '/collector/loginCollector.do',
            data: people.data
        }).then(res => {
            if (res.code == 200) {
                store.collectorId = res.object[0].collectorId
                store.collectorName = res.object[0].name
                Toast.success(res.message);
                router.push({
                    name: 'choicePoint'
                })
            }
        })
    else
        Toast.fail('请输入手机号和密码')
};


//进入注册页面
const router = useRouter()
const toRegister = () => {
    router.push('register')
}
</script>

<style lang="scss" scoped>
#body {

    height: 100vh;
    width: 100%;
    position: relative;
    background-color: #F7F8FA;
}

#title {
    display: inline-block;
    padding-top: 13vh;
}

#login {
    // background-color: rgb(39, 40, 34);
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: -35px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
}

.van-cell {
    background-color: #f5f5f5;
}

#reg {
    margin: 0 auto;
    position: fixed;
    bottom: 10vh;
    text-align: center;
    width: 80%;
}

#reg_btn {
    display: inline-block
}

.input {
    margin: 10px 0px;
    border-radius: 2000px;
    height: 8vh;

}

#login_btn {
    background: linear-gradient(-45deg, #ffb8a3, #ffa5c7, #7ed9fb, #7ee5cd);
    /* 背景尺寸 - 原理3 */
    background-size: 600% 600%;
    /* 循环动画 - 原理4 */
    animation: gradientBG 5s ease infinite;
    height: 100%;
    width: 10vh;
    display: inline-block;
    border: 0;
    margin-top: 40px;

    @keyframes gradientBG {
        0% {
            background-position: 0% 50%;
        }

        50% {
            background-position: 100% 50%;
        }

        100% {
            background-position: 0% 50%;
        }
    }
}

#login_div {
    text-align: center;
    width: 100%;
    height: 10vh;
}

#title_div {
    width: 100%;
    text-align: center;
}
</style>