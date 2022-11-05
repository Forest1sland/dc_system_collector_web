<!-- 试管内人员列表 -->
<template>
    <h1 id="title">人员列表</h1>
    <h3>当前试管:{{list.length}}</h3>
    <h3>人数</h3>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
    <div id="bottom">

        <van-button @click="toPerson" type="success" round style="width: 20%;">身份码</van-button>
        <van-button @click="sealTube" type="success" round style="width: 20%;">封管</van-button>
    </div>

</template>

<script setup>
import { Dialog } from 'vant';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import useStore from '../stores/store';


const router = useRouter()
const toPerson = () => {
    router.push({
        name: 'qrcode',
        query: {
            toPage: 'profile',
            type: '',
        }
    })
}


//获取数据列表
const list = ref([])
const loading = ref(false);
const finished = ref(false);

const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
        for (let i = 0; i < 50; i++) {
            list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 10) {
            finished.value = true;
        }
    }, 1000);
};


const store = useStore()
const sealTube = () => {
    Dialog.confirm({
        title: '是否封管',
        // message:
        //     '如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。',
    })
        .then(() => {
            // on confirm
            store.tubeId = ''
            router.back()

        })
        .catch(() => {
            // on cancel
        });
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
</style>