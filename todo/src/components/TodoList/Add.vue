<template>
  <div class="add">
    <input
      v-model="value"
      type="text"
      placeholder="请输入内容，按下回车提交"
      @keydown.enter="handleAdd" >
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { add } from '@/api/item'

export default {
  setup(props, ctx) {
    const value = ref('')

    const handleAdd = async () => {
      try {
        await add({
          label: value.value
        })
        value.value = ''
        ctx.emit('success')
      } catch (err) {
        ctx.emit('failed')
      }
    }

    return {
      value,
      handleAdd
    }
  }
}
</script>

<style lang="less" scoped>
  .add {
    margin-bottom: 25px;
    input {
      display: block;
      width: 100%;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 6px;
      outline: none;
      transition: border .3s linear;
      &:focus {
        border-color: orange;
      }
    }
  }
</style>