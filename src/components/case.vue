<template>
    <div id="body">
        <h1 id="title">{{ store.collectorName }},欢迎您</h1>
        <van-cell-group inset class="cell">
            <van-cell title="开箱" size="large" label="请扫描箱码" value=">" @click="openCase" />
        </van-cell-group>

        <van-cell-group inset class="cell">
            <van-cell title="列表" size="large" label="查看转运箱列表" value=">" @click="toCaseList" />
        </van-cell-group>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import useStore from '../stores/store'
const router = useRouter()
const store = useStore()

onMounted(() => {
    store.resetBox()
})

//开箱扫码
const openCase = () => {
    router.push({
        name: 'qrcode',
        query: {
            toPage: 'tube'
        }
    })
}

//跳转到转运箱列表
const toCaseList = () => {
    router.push({
        name: 'caseList'
    })
}
</script>



<style lang="scss" scoped>
#title {
    padding: 6vh;
    margin: 0;
}



#body {
    height: 100vh;
    background-color: #F7F8FA;

}

.cell {
    margin: 3vh;
}
</style>