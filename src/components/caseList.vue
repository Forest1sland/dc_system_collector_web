<template>
    <div>
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell-group inset>
                <van-cell v-for="(item, index) in list.data" :key="index" :title="item.boxId" size="large" />
            </van-cell-group>
        </van-list>
    </div>

</template>

<script setup>
import axios from '../axios'
import { reactive, ref } from 'vue'




const list = reactive({ data: [] })
const loading = ref(false);
const finished = ref(false);

const onLoad = () => {

    axios({
        method: 'post',
        url: '/box/getBox.do',
        data: {

        }
    }).then(res => {

        list.data = res.object
        console.log(list)
        loading.value = false;
        finished.value = true;
    })


};
</script>

<script >

</script>

<style lang="scss" scoped>

</style>