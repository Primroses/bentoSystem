<template>
  <div class="home">
    <!-- 头部 -->
    <div class="header_content">
      <div class="home_header">
      <!-- 图片 -->
      <div class="home_img">
        <router-link :to="{path:'/home'}"><img src="../assets/images/logo1.png"></router-link>
      </div>
      <div class="home_order" v-if="!manager">
        <router-link :to="{path:'/order'}">我的订单</router-link>
      </div>
      <div class="home_info">
        <p v-if="username">用户{{ username }}，欢迎你</p>
        <p v-if="manager">管理员,欢迎你</p>
        <span @click="logout">退出</span>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import fetchData from "../util/fetch";

export default {
  props: ["username", "manager"],
  methods: {
    logout() {
      var _this = this;
      fetchData("DELETE", "user/systemLogout")
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            if (!_this.manager) {
              _this.$notify({
                title: "用户" + sessionStorage.getItem("username"),
                message: "欢迎再次使用",
                position: "top-right",
                offset: 300
              });
            } else {
              _this.$notify({
                title: "管理员",
                message: "欢迎再次使用",
                position: "top-right",
                offset: 300
              });
            }
            _this.$router.push({ path: "/" });
            sessionStorage.clear();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less">
@import "../assets/style/theme.less";
.home {
  width: 100%;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  .header_content {
    justify-content: center;
    width: 100%;
    padding: 20px 0;
    background-color: @accentColor;
    .home_header {
      width: @clientWidth;
      margin: 0 auto;
      display: flex;
      .home_img {
        flex-grow: 0.5;
        img {
          width: 50%;
        }
      }
      .home_order {
        flex-grow: 20;
        & a {
          color: white;
          font-size: 18px;
        }
      }
      .home_info {
        flex-flow: 0.5;
        color: white;
        text-align: center;
        font-size: 16px;
        display: flex;
        justify-content: center;
        & span {
          margin-left: 30px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
