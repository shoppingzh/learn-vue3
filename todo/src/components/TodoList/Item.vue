<template>
  <div class="item">
    <div class="item__label">
      {{ data.label }}
    </div>
    <div class="item__actions">
      <div class="item__action" @click="handleRemove"><i class="icon-shanchu" /></div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/item'

export default {
  props: {
    data: { type: Object, required: true }
  },
  setup(props, ctx) {
    const handleRemove = async () => {
      try {
        await api.remove(props.data.id)
        ctx.emit('remove-success')
      } catch (err) {
        ctx.emit('remove-failed', err)
      }
    }
    return {
      handleRemove
    }
  }
}
</script>

<style lang="less" scoped>
  .item {
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