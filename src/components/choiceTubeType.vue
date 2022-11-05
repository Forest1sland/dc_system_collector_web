<template>
    <div>
        <h1 id="title">
            选择采集类型
        </h1>
        <div id="bottom">
            <van-button @click="toPerson">扫描试管码</van-button>
        </div>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';


const router = useRouter()
const toPerson = () => {
    router.replace({
        name: 'qrcode',
        query: {
            toPage: 'person'
        }
    })
}

</script>

<script >

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