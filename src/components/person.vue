<!-- 试管内人员列表 -->
<template>

    <div id="body">

        <div id="title">
            <h1>人员列表</h1>
            <h3>当前试管:{{ store.testTubeId }}</h3>
            <h3>人数:{{ list.length }}/{{ count }}</h3>
        </div>
        <div id="list">
            <van-list @load="onLoad">
                <van-swipe-cell v-for="(item, index) in list" :key="index" :title="item.people.name"
                    :value="item.people.idCard">
                    <van-cell :key="index" :title="item.people.name" :value="item.people.idCard" />
                    <template #right>
                        <van-button square type="danger" text="删除" @click="deleteOne(item.people.peopleId)" />
                    </template>
                </van-swipe-cell>
            </van-list>
        </div>

        <div id="bottom">
            <van-button @click="toPerson" type="success" round style="width: 20%;">身份码</van-button>
            <van-button @click="sealTube" type="success" round style="width: 20%;">封管</van-button>
        </div>
    </div>
</template>

<script setup>
import { Dialog } from 'vant';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import useStore from '../stores/store';
import axios from '../axios';
import { Toast } from 'vant';

onMounted(() => {
    store.resetPeople()
})
/**
 * 点击身份码，进入扫码页面
 * 判断是否是满管
 */
const router = useRouter()
const toPerson = () => {
    if (list.value.length >= count.value) {
        Toast.fail('当前试管已满，请封管！')

    } else
        router.push({
            name: 'qrcode',
            query: {
                toPage: 'profile',
            }
        })
}



/**
 * 获取该试管下人员列表
 * 通过id查询数据返回试管列表
 * 通过id查询采集类型返回最大人数
 */
const list = ref([])
const count = ref('')
const onLoad = () => {
    if (store.testTubeId != '') {
        setTimeout(() => {
            axios({
                url: '/sample/selectInfoUnderSample.do',
                data: {
                    testTubeId: store.testTubeId,
                }
            }).then(res => {
                if (res.object != null) {
                    list.value = res.object
                }
            })
            axios({
                url: '/testTube/selectTestTube.do',
                data: {
                    testTubeId: store.testTubeId,
                }
            }).then(res => {
                count.value = res.object[0].collectType
            })
        }, 300)
    }

};


/**
 * 点击封管
 * 改变试管状态
 * 返回上级页面
 */
const store = useStore()
const sealTube = () => {
    Dialog.confirm({
        title: '是否封管',
    }).then(() => {
        // on confirm
        axios({
            url: '/testtube/updateTestTube.do',
            data: {
                testTubeId: store.testTubeId
            }
        })
        store.tubeId = ''
        router.back()

    }).catch(() => {
        // on cancel
    });
}


/**
 * 点击删除按钮
 * 删除样本表中的用户
 * @param {*} id 
 */
const deleteOne = id => {
    Dialog.confirm({
        title: '确定删除吗？',
    }).then(() => {
        axios({
            url: '/sample/deleteOneByPeopleId',
            data: {
                peopleId: id,
                testTubeId: store.testTubeId
            }
        }).then(res => {
            Toast.success('删除成功！')
            onLoad()
        })
    });
}

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

#list {
    width: 100%;
    margin: 0 auto;
}

#bottom {
    display: flex;
    position: fixed;
    bottom: 10vh;
    width: 100%;
    justify-content: space-around;
}
</style>