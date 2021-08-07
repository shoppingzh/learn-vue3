<template>
  <div class="add">
    <input
      v-model="label"
      type="text"
      :disabled="loading"
      placeholder="请输入内容，按下回车提交"
      @keydown.enter="handleAdd" >
  </div>
</template>

<script>
import useAddTodo from '@/hooks/useAddTodo'

export default {
  setup(props, ctx) {
    const { label, add, loading } = useAddTodo()

    const handleAdd = async () => {
      try {
        await add()
        ctx.emit('success')
      } catch (err) {
        ctx.emit('failed', err)
      }
    }

    return {
      label,
      handleAdd,
      loading
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