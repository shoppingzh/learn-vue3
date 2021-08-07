<template>
  <div class="todo-list">
    <Add @success="load" />
    <transition-group v-if="!isEmpty" name="list-transition" class="todo-list__inner">
      <Item
        v-for="item in list"
        :key="item.id"
        :data="item"
        @remove-success="handleRemoveItem(item)" />
    </transition-group>
    <Empty v-else />
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import * as api from '@/api/item'
import Empty from './Empty.vue'
import Add from './Add.vue'
import Item from './Item.vue'

export default {
  components: { Empty, Add, Item },
  setup(props, context) {
    const list = ref([])
    const loading = reactive({
      load: false
    })

    const load = async () => {
      try {
        loading.load = true
        const data = await api.list()
        list.value = data || []
      } catch (err) {
      } finally {
        loading.load = false
      }
    }
    const isEmpty = computed(() => !list.value || !list.value.length)

    const handleRemoveItem = (item) => {
      const idx = list.value.findIndex(o => o.id === item.id)
      if (idx < 0) return
      list.value.splice(idx, 1)
    }

    load()

    return {
      list,
      isEmpty,
      load,
      handleRemoveItem
    }
  }
}
</script>

<style lang="less" scoped>
  .todo-list {
    width: 500px;
    margin: 40px auto 0;
    &__inner {
      padding: 10px;
    }
  }

  .list-transition {
    &-enter-from, &-leave-to {
      transform: translateY(100%);
    }
    &-enter-active, &-leave-active {
      transition: transform .1s ease-in-out;
    }
  }
</style>