<template>
    <div class="body">
        <div id="title">
            <h1>选择采集点</h1>
        </div>
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell-group inset>
                <van-cell v-for="(item, index) in list.data" :key="index" :title="item.pointname"
                    @click="toCase(item.pointid)" size="large" />
            </van-cell-group>
        </van-list>
    </div>
</template>

<script setup>
/**
 * 获取采集点列表
 * 点击某一采集点跳转到case页面
 */
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
    router.push({
        name: 'case'
    })
}


</script>

<style lang="scss" scoped>
#title {

    margin: 0;
}

#title h1 {
    padding: 6vh;
    margin: 0;
    display: block;
}

.body {
    background-color: #F7F8FA;
    height: 100vh;
}
</style>