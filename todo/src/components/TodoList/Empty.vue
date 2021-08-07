<template>
  <div class="empty">
    <img src="./empty.png">
    <div class="empty__text">空空如也</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .empty {
    padding: 50px;
    text-align: center;
    img {
      width: 300px;
    }
    &__text {
      margin-top: 15px;
      color: #999;
    }
  }
</style>