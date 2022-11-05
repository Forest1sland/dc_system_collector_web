<template>
    <h1>个人信息</h1>
    <h2>请核对个人信息</h2>
    <van-cell-group>
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
    <van-button @click="onSubmit">确认信息</van-button>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import axios from '../axios';
import useStore from '../stores/store'

const store = useStore()
//根据id获取个人信息
// axios({
//     method: 'post',
//     url: '/',
//     params: {
//         personId:''
//     }
// })

console.log(store.personId)
const router = useRouter()
//信息正确确认
const onSubmit = () => {
    // axios({
    //     method: 'get',
    //     url: '',

    // }).then(res => {
    //     store.personId = ''
    //     router.back();

    // })
    store.personId = ''
    router.back();
}
</script>

<script >

</script>

<style lang="scss" scoped>

</style>