<template>
    <div class="scan">
        <div class="video-container">
            <video class="video" id="video-1" v-if="isVisible"></video>
        </div>
    </div>
</template>

<script setup>
/**
 * 当query为tube时，发送请求将转运箱添加到转运箱表
 * 传递boxCode，collectorId返回boxId存入store中，
 * 当query为person时，发送请求将试管添加到试管表中
 * 当query为profile时，将peopleId存入store中
 */
import {
    BrowserMultiFormatReader,
    ChecksumException,
    FormatException,
} from "@zxing/library";
import { onMounted, onUnmounted, reactive, watch, ref } from "vue";
import { Notify, Tab, Toast } from 'vant';
import { useRoute, useRouter } from "vue-router";
import useStore from "../stores/store";
import axios from "../axios";
/**
 * codeReader 获取识别二维码对象
 * videoInputDevices 摄像头设备列表
 * currentVideoInputDevice 当前摄像头设备
 */
const codeReader = reactive(new BrowserMultiFormatReader())
const videoInputDevices = ref([])
const currentVideoInputDevice = ref({})
const decodeResult = ref('')
const isVisible = ref(false)

const openScan = async () => {
    //获取输入设备
    codeReader
        .listVideoInputDevices()
        .then((Devices) => {
            if (Devices && Devices.length) {
                if (Devices.length > 1) {
                    Devices.reverse();
                }
                videoInputDevices.value = Devices;
                currentVideoInputDevice.value = videoInputDevices[0];
                isVisible.value = true
            }
        })
        .catch(() => { });
}

//检测二维码
const decodeFromInputVideo = () => {

    codeReader.reset();
    // 探测二维码并识别
    codeReader.decodeFromVideoDevice(
        currentVideoInputDevice.deviceId,
        "video-1",
        (result, err) => {
            //识别到二维码
            if (result) {
                decodeResult.value = result;
            }
            if (err) {
                if (err instanceof ChecksumException) {
                    console.log(
                        "A code was found, but it's read value was not valid."
                    );
                }
                if (err instanceof FormatException) {
                    console.log("A code was found, but it was in a invalid format.");
                }
            }
        }
    );
}

/**
 * 识别成功跳转页面
 */
const store = useStore()
const router = useRouter()
const route = useRoute()
const successDecode = () => {
    console.log(route.query.toPage)
    switch (route.query.toPage) {
        case 'tube':
            /**
             * 将扫描的转运箱加入到box表中
             * @Param boxCode collectorId
             * @Return boxId
             */
            axios({
                method: 'post',
                url: '/box/insertBox.do',
                data: {
                    boxCode: decodeResult.value.text,
                    collectorId: store.collectorId
                }
            }).then(res1 => {
                if (res1.code == 200) {
                    store.boxId = res1.object
                    router.replace({
                        name: route.query.toPage,
                    })
                } else {
                    if (res1.message == '该转运箱已存在') {
                        store.boxId = res1.object
                        console.log(res1)
                        axios({
                            url: '/box/getBox.do',
                            data: {
                                boxId: res1.object
                            }
                        }).then(res2 => {
                            if (res2.object[0].status == 0) {
                                Toast.success('该转运箱未封箱，可继续添加试管')
                                router.replace({
                                    name: route.query.toPage,
                                })
                            } else {
                                Toast.fail('该转运箱已封箱，请重新扫描')
                                router.back()
                            }
                        })
                    } else {
                        Toast.fail(res1.message)
                        router.back()
                    }

                }
            })
            break;
        case 'profile':
            //通过扫描的人员id查询
            store.peopleId = decodeResult.value.text
            router.replace({
                name: route.query.toPage,
            })
            break;
        case 'person':
            /**
             * 扫描试管码添加试管
             * @Param testTubeCode collectType boxId
             * @Return 试管id
             */

            axios({
                url: '/testTube/insertTestTube.do',
                data: {
                    testTubeCode: decodeResult.value.text,
                    collectType: store.collectType,
                    boxId: store.boxId
                }
            }).then(res1 => {
                if (res1.code == 200) {
                    console.log(res1)
                    store.testTubeId = res1.object
                    router.replace({
                        name: route.query.toPage,
                    })
                } else {
                    if (res1.message == '该试管已存在') {
                        store.testTubeId = res1.object
                        axios({
                            url: '/testTube/selectTestTube.do',
                            data: {
                                testTubeId: store.testTubeId
                            }
                        }).then(res2 => {
                            if (res2.object[0].status == 0) {
                                Toast.success('该试管未封管，可继续添加信息')
                                router.replace({
                                    name: route.query.toPage,
                                })
                            } else {
                                Toast.fail('该试管已封管，请重新扫描')
                                router.back()
                            }
                        })
                    } else {
                        Toast.fail(res1.message)
                        router.back()
                    }

                }
            })
            break;
    }
}

watch(currentVideoInputDevice, async (o, n) => {
    decodeFromInputVideo()
})

//监听获取结果
watch(decodeResult, async (o, n) => {
    Notify({ type: 'primary', message: '识别成功！' });

    successDecode();
})

onMounted(() => {
    openScan()
})

onUnmounted(() => {
    codeReader.reset()
})

</script>



<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

}

.scan {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ff9900;
    // width: 100vw;
    // height: 100vh;
    background: #000;
    height: 100vh;

    .video-container {
        // margin-top: 10px;
        display: flex;
        justify-content: center;

        video {
            width: 100vw;
            max-height: 80vh;
        }

        @media (min-width: 500px) {
            video {
                max-width: 96vw;
                height: 80vh;
            }
        }
    }

    // .camera-container {
    //     margin-top: 5vh;
    //     width: 80%;
    //     height: 50px;
    //     line-height: 44px;
    //     border-radius: 10px;
    //     border: 3px solid #ff9900;
    //     display: flex;
    //     justify-content: center;

    //     select {
    //         width: calc(100% - 80px);
    //         color: #ff9900;
    //         background: transparent;
    //         border: none;
    //         outline: none;
    //     }
    // }
}
</style>