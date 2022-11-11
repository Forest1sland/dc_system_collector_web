<template>
    <div class="scan">
        <div class="video-container">
            <video class="video" id="video-1" v-if="isVisible"></video>
        </div>
    </div>
</template>

<script setup>
import {
    BrowserMultiFormatReader,
    ChecksumException,
    FormatException,
} from "@zxing/library";
import { onMounted, onUnmounted, reactive, watch, ref } from "vue";
import { Notify } from 'vant';
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
             * @Param boxCode
             * @Return boxId
             */
            axios({
                method: 'post',
                url: '/box/insertBox.do',
                data: {
                    boxCode: decodeResult.value.text
                }
            }).then(res => {
                if (res.code == 200) {
                    store.boxId = res.object
                }
            })
            break;
        case 'profile':
            //通过扫描的人员id查询
            store.peopleId = decodeResult.value.text
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
            }).then(res => {
                console.log(res)
                store.testTubeId = res.object
            })
            break;
    }
    router.replace({
        name: route.query.toPage,
    })

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