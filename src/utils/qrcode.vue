<template>
    <div class="scan">
        <div class="video-container">
            <video class="video" id="video-1"></video>
        </div>
        <!-- <div class="camera-container" v-if="videoInputDevices.length">
            <label>摄像头：</label>
            <select v-model="currentVideoInputDevice">
                <option v-for="(videoInputDevice, index) in videoInputDevices" :key="index" :value="videoInputDevice">
                    {{ videoInputDevice.label }}
                </option>
            </select>
        </div> -->
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

//扫描二维码
const codeReader = reactive(new BrowserMultiFormatReader())
const videoInputDevices = ref([])
const currentVideoInputDevice = ref({})
const decodeResult = ref('')

const openScan = async () => {
    //获取输入设备
    codeReader
        .listVideoInputDevices()
        .then((Devices) => {
            if (Devices && Devices.length) {
                if (Devices.length > 1) {
                    Devices.reverse();
                } //防止先唤出前摄像头
                videoInputDevices.value = Devices;
                currentVideoInputDevice.value = videoInputDevices[0];
            }
        })
        .catch(() => { });
}

//检测二维码
const decodeFromInputVideo = () => {

    codeReader.reset();
    // 多次
    codeReader.decodeFromVideoDevice(
        currentVideoInputDevice.deviceId,
        "video-1",
        (result, err) => {
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


const store = useStore()
const router = useRouter()
const route = useRoute()
const successDecode = () => {
    // Notify({ type: 'primary', message: decodeResult.value.text });
    console.log(route.query.toPage)
    switch (route.query.toPage) {
        case 'tube': store.caseId = decodeResult.value.text
            break;
        case 'profile': store.personId = decodeResult.value.text
            break;
        case 'person': store.tubeId = decodeResult.value.text
            break;
    }
    router.replace({
        name: route.query.toPage,

    })

}

watch(currentVideoInputDevice, async (o, n) => {
    decodeFromInputVideo()
})

watch(decodeResult, async (o, n) => {
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