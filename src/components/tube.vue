<template>

    <div id="body">
        <h1 id="title">试管列表</h1>
        <h3>当前转运箱:{{ store.boxId }}</h3>
        <h3>试管数量:{{ list.length }}</h3>
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>

        <div id="bottom">
            <van-button @click="toPerson" round type="success" style="width: 20%;">开管</van-button>
            <van-button @click="sealCase" round type="success" style="width: 20%;">封箱</van-button>
        </div>


    </div>
</template>

<script setup>
import axios from '../axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Dialog } from 'vant';
import useStore from '../stores/store';
const router = useRouter()

const store = useStore()
//扫完转运箱码会将码号存进store中，调用
//获取箱中的试管
//开管 封箱按钮 悬浮
//开管类型 已添加的试管数量
//查询箱中试管数量




//开管
const toPerson = () => {
    router.push({
        name: 'choiceTubeType'
    })
}



//获取数据列表
const list = ref([])
const loading = ref(false);
const finished = ref(false);

const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    axios({
        method: 'get',
        url: '/tube/getTubesByBoxId',
        params: {
            boxId : store.boxId
        }
    })

    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (list.value.length >= 10) {
        finished.value = true;
    }



    //请求后端获取列表
    // axios({
    //     method: 'get',
    //     url: '',
    //     params: {
    //         caseId:''
    //     },
    // }).then(res=>{})
};


const sealCase = () => {
    Dialog.confirm({
        title: '是否封箱',

    })
        .then(() => {
            store.boxId = ''
            store.tubeId = ''
            router.back()

        })
        .catch(() => { });
}
</script>



<style lang="scss" scoped>
#body {
    height: 90vh;
}

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
</style>