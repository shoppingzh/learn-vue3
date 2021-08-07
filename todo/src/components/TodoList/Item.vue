<template>
  <div class="item" :class="{ 'is-done': data.done }" @click="handleToggleDone">
    <div class="item__done">
      <input v-model="data.done" type="checkbox">
    </div>
    <div class="item__inner">
      <div class="item__label">{{ data.label }}</div>
      <div class="item__time">{{ new Date(data.createTime).toLocaleString() }}</div>
    </div>
    <div class="item__actions">
      <div class="item__action" @click="handleRemove"><i class="icon-shanchu" /></div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/item'
import { watch } from 'vue'

export default {
  props: {
    data: { type: Object, required: true }
  },
  setup(props, ctx) {
    const handleRemove = async () => {  
      try {
        if (!confirm('确定删除？')) return
        await api.remove(props.data.id)
        ctx.emit('remove-success')
      } catch (err) {
        ctx.emit('remove-failed', err)
      }
    }
    const handleToggleDone = () => {
      props.data.done = !props.data.done
    }

    watch(() => props.data.done, (newVal) => {
      api.toggleDone(props.data.id, newVal)
    })

    return {
      handleRemove,
      handleToggleDone
    }
  }
}
</script>

<style lang="less" scoped>
  .item {
    display: flex;
    align-items: center;
    position: relative;
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
    cursor: pointer;
    transition: all .3s ease-in-out;
    &:hover {
      background-color: #eee;
    }
    & + & {
      margin-top: 12px;
    }
    &__done {
      margin-right: 12px;
    }
    &__inner {
      width: 0;
      flex: 1;
      .is-done & {
        text-decoration: line-through;
        color: #999;
      }
    }
    &__time {
      margin-top: 10px;
      font-size: 12px;
      color: #999;
    }
    &__actions {
      position: absolute;
      padding: 0 15px;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
    }
    &__action {
      padding: 5px;
    }
  }
</style>