<template>

    <div id="body">
        <h1 id="title">试管列表</h1>
        <h3>当前转运箱:{{ store.boxId }}</h3>
        <h3>试管数量:{{ list.length }}</h3>
        <van-list @load="onLoad">
            <van-cell-group inset>
                <van-cell v-for="(item, index) in list" :title="item.testTubeId" :value="item.collectType"
                    :key="index" />
            </van-cell-group>
        </van-list>

        <div id="bottom">
            <van-button @click="toPerson" round type="success" style="width: 20%;">开管</van-button>
            <van-button @click="sealCase" round type="success" style="width: 20%;">封箱</van-button>
        </div>


    </div>
</template>

<script setup>
import axios from '../axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Dialog, Toast } from 'vant';
import useStore from '../stores/store';


const router = useRouter()

const store = useStore()


onMounted(() => {
    store.resetTestTube()
})


/**
 * 开管
 */
const toPerson = () => {
    router.push({
        name: 'choiceTubeType'
    })
}


//获取箱中的试管
const list = ref([])
const onLoad = () => {
    if (store.boxId != '') {
        axios({
            url: '/testTube/selectTestTube.do',
            data: {
                boxId: store.boxId
            }
        }).then(res => {
            console.log(res)
            list.value = res.object
        })
    }
};

/**
 * 点击封箱 清空箱号 发送更改箱子状态请求
 */
const sealCase = () => {
    Dialog.confirm({
        title: '是否封箱',

    }).then(() => {
        axios({
            url: '/box/updateBox.do',
            data: {
                boxId: store.boxId,
                status: 1 //已封箱
            }
        }).then(res => {
            Toast.success(res.message)
            store.boxId = ''
            store.tubeId = ''
            router.back()
        })
    })
        .catch(() => { });
}
</script>



<style lang="scss" scoped>
#body {
    height: 100vh;
    position: relative;
    background-color: #F7F8FA;

}

h3 {
    padding-left: 3vh;

}

#title {
    padding: 6vh;
    margin: 0;
}



#bottom {
    display: flex;
    position: fixed;
    bottom: 10vh;
    width: 100%;
    justify-content: space-around;
}
</style>