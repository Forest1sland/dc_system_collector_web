import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useStore = defineStore('store', () => {
  const collectorId = ref('')
  const collectorName = ref('')
  const pointId = ref('')
  const boxCode = ref('')
  const boxId = ref('')
  const testTubeId = ref('')
  const testTubeCode = ref('')
  const testTubeType = ref('')
  const peopleId = ref('')


  const resetBox = () => {
    boxId.value = ''
    boxCode.value = ''
    resetPeople()
    resetTestTube()
  }

  const resetTestTube = () => {
    testTubeId.value = ''
    testTubeCode.value = ''
    testTubeType.value  = ''
    resetPeople()
  }
  const resetPeople = () => {
    peopleId.value = ''
  }
  return { boxId, boxCode, testTubeId, testTubeCode, testTubeType, peopleId, pointId, collectorId, collectorName, resetBox, resetPeople, resetTestTube }
})

export default useStore