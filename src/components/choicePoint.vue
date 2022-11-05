<template>
    <div>
        <h1 id="title">选择采集点</h1>

        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="(item, index) in list.data" :key="index" :title="item.pointname"
                @click="toCase(item.pointid)" />
        </van-list>

    </div>

</template>

<script setup>

import axios from '../axios';
import useStore from '../stores/store'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';


//获取地区下的采集点信息列表
const list = reactive({ data: [] })
const loading = ref(false);
const finished = ref(false);

const onLoad = () => {
    axios({
        method: 'post',
        url: '/point/getAllPoints'
    }).then(res => {

        list.data = res
        console.log(list)
        loading.value = false;
        finished.value = true;
    })

};

const store = useStore()
const router = useRouter()
const toCase = (id) => {
    store.pointId = id
    router.push({ name: 'case' })
}


</script>

<style lang="scss" scoped>
#title {
    margin: 6vh auto 6vh 6%;
}
</style>