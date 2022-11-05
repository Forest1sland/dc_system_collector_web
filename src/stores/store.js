import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useStore = defineStore('store', () => {
  const collectorId = ref('')
  const pointId = ref('')
  const personId = ref('')
  const boxId = ref('')
  const tubeId = ref('')


  return { boxId: boxId, tubeId, personId, pointId, collectorId }
})

export default useStore