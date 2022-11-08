<template>
    <div id="head">
        <!-- <van-button round block @click="toBack" id="back">{{'<'}}</van-button> -->
        <!-- <van-sticky :offset-top="0"> -->
        <van-nav-bar left-arrow @click-left="toBack" :fixed=true :placeholder=true id="bar" />

        <!-- </van-sticky> -->
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
const toBack = () => {
    router.back();
}
</script>


<style lang="scss" scoped>

</style>