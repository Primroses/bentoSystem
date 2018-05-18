<template>
    <div class="button_container">
        <div class="button">
            <slot>按钮</slot>
        </div>
    </div>
</template>

<script>
export default {
  props: ["textColor","bgColor"],
  mounted() {

  }
};
</script>

<style lang="less">
@import "../assets/style/theme.less";
.button_container {
  width: 1200px;
  margin: 20px auto;
  .button {
    border-radius: 20px;
    margin: 0 auto;
    width: 100px;
    height: 30px;
    padding: 15px 20px;
    background-color: pink;
    text-align: center;
    color: white;
  }
  .button:hover{
      cursor:auto;
  }
}
</style>
