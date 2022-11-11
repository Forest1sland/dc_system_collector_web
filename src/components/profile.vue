<template>
    <div id="body">
        <div id="title">
            <h1>个人信息</h1>
            <h2>请核对个人信息</h2>
        </div>
        <div>


            <van-cell-group inset>
                <van-cell title="姓名" :value="people.name">{{ people.data.name }}</van-cell>
                <van-cell title="证件号" :value="people.idCard">{{ people.data.idCard }}</van-cell>
                <van-cell title="手机号" :value="people.tel">{{ people.data.tel }}</van-cell>

            </van-cell-group>

            <van-button type="primary" @click="onSubmit" block id="button">确认信息</van-button>


        </div>
    </div>


</template>

<script setup>
import { Toast } from 'vant';
import { onUnmounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '../axios';
import useStore from '../stores/store'

const store = useStore()
// 根据id获取个人信息

const people = reactive({
    data: {

    }
})

setTimeout(() => {
    axios({
        url: '/people/getOnePeople.do',
        data: {
            peopleId: store.peopleId,
        }
    }).then(res => {
        people.data = res.object
        console.log(people.data)
    })
}, 300)


const router = useRouter()
//信息正确确认
const onSubmit = () => {
    axios({
        url: '/sample/insertSample.do',
        data: {
            peopleId: store.peopleId,
            testTubeId: store.testTubeId
        }
    }).then(res => {
        if (res.code == 200) {
            Toast.success(res.message)
            router.back();
        } else {
            Toast.fail(res.message)
        }
    })
}
</script>

<script >

</script>

<style lang="scss" scoped>
#title {
    padding: 6vh;
    margin: 0;
}


#body {
    height: 100vh;
    position: relative;
    background-color: #F7F8FA;


}

#button {
    position: fixed;
    bottom: 3vh;
    margin: 0 5%;
    width: 90%;
}
</style>