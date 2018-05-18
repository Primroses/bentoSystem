<template>
  <div id="index">
      <!-- 头部 -->
      <header>
        <div class="index_top">
          <div class="top_left">
              <router-link :to="{path:'/home'}">WEST-TAKE-OUT</router-link>
          </div>
          <div class="top_right">
              <span><router-link :to="{path:'/login',query: {login:false}}">注册</router-link></span>
              <span>|</span>
              <span><router-link :to="{path:'/login',query: {login:true}}">登录</router-link></span>
          </div>
        </div>
      </header>
      <!-- 中间content -->
      <can></can>
      <div class="index_content">
        
          <img src="../assets/images/logo.png">
          <!-- 文字解说 -->
          <div class="index_content_word">
              海大首创"学生自负盈亏"模式，让西区没有饥饿的角落
          </div>
          <!-- 地图 -->
          <keep-alive>
          <div id="allmap" class="allmap"></div>
          </keep-alive>
          <p>海大地图</p>
      </div>
      <!-- 尾部 -->
      <foot></foot>
  </div>
</template>

<script>
import { MP } from "../util/map.js";
export default {
  data: () => ({}),

  mounted() {
    this.$nextTick(function() {
      var _this = this;
      MP(_this.ak).then(BMap => {
        var map = new BMap.Map("allmap"); // 创建地图实例
        var point = new BMap.Point(110.309, 21.155317132405017); // 创建点坐标
        map.centerAndZoom(point, 16); // 初始化地图，设置中心点坐标和地图级别
      });
    });
  },
deactivated () {
    this.$destroy()
}
};
</script>

<style lang="less">
@import "../assets/style/theme.less";
header {
  background-color: @accentColor;
  .index_top {
    width: @clientWidth;
    margin: 0 auto;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    .top_left {
      font-style: italic;
      font-size: 30px;
      padding-left: 20px;
      & a {
        color: white;
      }
    }
    .top_right {
      color: white;
      padding-right: 20px;
      span {
        width: 20px;
        padding: 0 5px;
        color: white;
        a {
          color: white;
        }
      }
      & span:nth-child(2) {
        width: 5px;
        height: 5px;
        color: white;
      }
    }
  }
}
.index_content {
  // 外边 水平居中
  text-align: center;
  p {
    font-size: 20px;
    padding-bottom: 25px;
  }
  img {
    margin-top: 164px;
    width: 400px;
  }
  .index_content_word {
    margin: 60px;
    font-size: 30px;
    color: @textColor;
  }
}
#allmap {
  width: 40vh;
  height: 40vh;
  margin: 30px auto;
}
@media (max-width: 1200px) {
  header {
    .index_top {
      width: @arrowWidth;
      display: block;
      height: 50px;
      line-height: 50px;
      padding-left: 0px;
      .top_right {
        display: none;
      }
      .top_left {
        text-align: center;

      }
    }
  }
  .index_content {
    img {
      margin-top: 104px;
      width: 300px;
    }
    p {
      padding-bottom: 80px;
    }
  }
}
@media (max-width: 960px) {
  header {
    .index_top {
      width: @mobileWidth;
    }
  }
  .index_content {
    img {
      margin-top: 104px;
      width: 250px;
    }
    .index_content_word {
      font-size: 20px;
    }
    p {
      padding-bottom: 80px;
    }
  }
}
@media (max-width: 640px) {
  header {
    .index_top {
      width: @320Width;
    }
  }
}
</style>
