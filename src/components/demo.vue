<template>
  <div class="demo">
    <div class="demo_top">
        demo.top
    </div>
    <div class="demo_bottom">
      <but class="button">确认订单</but>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.demo {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .demo_top {
    flex: 1 1 auto;
    width: 50%;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: center;
    justify-content: center;
    margin: 0 auto;
    background-color: red;
  }
  .demo_bottom {
    flex: 0 0 1;
    justify-content: center;
    position: relative;
    width: 100%;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    height: 200px;
    text-align: center;
  }
}
</style>
