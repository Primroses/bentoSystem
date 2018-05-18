<template>
    <div class="footer">
          <!-- 尾部 -->
          <footer>
              <div>Copyright © 2018-present 信管某小组</div>
          </footer>
      </div>
</template>

<script>
export default {};
</script>

<style lang="less">
@import "../assets/style/theme.less";
.footer {
  justify-content: center;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  line-height: 10vh;
  background-color: @accentColor;
  footer {
    width: @clientWidth;
    margin: 0 auto;
    & div {
      // padding-top: 10vh;
      text-align: center;
      color: white;
    }
  }
}
@media screen and (max-width: 1200px) {
  .footer {
    footer {
      width: @arrowWidth;
    }
  }
}
@media screen and (max-width: 960px) {
  .footer {
    footer {
      width: @mobileWidth;
    }
  }
}
@media screen and (max-width: 640px) {
  .footer {
    footer {
      width: 320px;
    }
  }
}
</style>
