<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import './assets/style/theme.less';
#app{
  width: 100%;
  height: 100%;
  // background-color: #f7f7f7;
}
</style>
