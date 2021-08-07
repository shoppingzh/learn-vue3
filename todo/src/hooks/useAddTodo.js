import { reactive, ref } from 'vue'
import * as api from '@/api/item'

export default function() {
  const label = ref('')
  const loading = ref(false)

  const add = () => {
    return new Promise(async(resolve, reject) => {
      try {
        loading.value = true
        const data = await api.add({
          label: label.value,
          done: false
        })
        label.value = ''
        resolve(data)
      } catch (err) {
        reject(err)
      } finally {
        loading.value = false
      }
    })
  }

  return {
    label,
    loading,
    add
  }
}
