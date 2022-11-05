<template>
    <div id="body">
        <h1 id="title">转运箱</h1>
        <div id="bottom">
            <van-button @click="openCase" round type="success" style="width: 20%;">开箱</van-button>
            <van-button @click="toCaseList" round type="success" style="width: 20%;">列表</van-button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

//开箱扫码
const openCase = () => {
    router.push({
        name: 'qrcode',
        query: {
            toPage: 'tube'
        }
    })
}

const toCaseList = () => {

}
</script>



<style lang="scss" scoped>
#title {
    margin: 6vh auto 6vh 6%;
}

#bottom {
    display: flex;
    position: fixed;
    bottom: 10vh;
    width: 100%;
    justify-content: space-around;
}

#body {
    height: 90vh;
}
</style>