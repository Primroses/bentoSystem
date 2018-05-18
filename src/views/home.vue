<template>
  <div class="home">
    <head-nav :username="username"></head-nav>
    <!-- 中间 -->
    <div class="home_content">

      <!-- 分类 -->
      <div class="home_classfy">
        <div @click="getlist">
          商品分类
        </div>
        <div>
          <span id="1" @click="getType">早餐</span>
          <span id="2" @click="getType">夜宵</span>
          <span id="3" @click="getType">糕点</span>
          <span id="4" @click="getType">饮品</span>
        </div>
      </div>
      <!-- 列表 -->
      <div class="home_list">
        <div v-for="(item,index) in datalist" :key="item.key" class="home_list_detail" @click.stop="addgood($event,index)" :id="item.id" :name="item.productName" :price="item.price" :isTrue="'false'" ref="list">
          <div>
            <img :src="item.imgae">
          </div>
          <div class="detail_word">
            <p>{{ item.productName }}</p>
            <p>{{ item.description }}</p>
            <p>价格￥{{ item.price }}</p>
            <p>还剩{{ item.count }}</p>
          </div>
        </div>
      </div>

      
    </div>

    <!-- 购物车 -->
    <div class="shopping_car" :class="{shopping_car_animate : actived}">
      <div class="clearfix shopping_left">
        <!-- <span class="number">{{ number }}</span> -->
        <span class="info" v-if="goods.length"><img src="../assets/images/info.png"></span>
        <p @click="shopping"><span><img src="../assets/images/shopping_car.png"></span>购物车</p>
      </div>
      <div class="shopping_right">
        <p>购物车</p>
        <p>只能买一种</p>
        <div v-if="goods.length===0" class="order_img">
          <img src="../assets/images/no_order.png">
          <p>订单空空如也</p>
        </div>
        <div v-else class="shopping_order" v-for="(item,key,index) in goods" :key="index">
          <div>{{ item.name }}</div>
          <div>
            <span @click="short(item,index)">-</span>
            <span>{{ item.number }}</span>
            <span @click="add(item,index)">+</span>
          </div>
          <div>{{  item.price*item.number }}</div>
          <div class="confirm_order" @click="confirm(goods)" :id="item.id">
            确认订单<span>￥{{ totalPrice }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 尾部 -->
    <foot></foot>
  </div>
</template>

<script>
import fetchData from "../util/fetch";
import ajax from "../util/ajax";
export default {
  data: () => ({
    username: "",
    datalist: "",
    actived: false,
    goods: [],
    number: 1,
    totalPrice: 0
  }),
  mounted() {
    this.username = sessionStorage.getItem("username");
    this.getlist();
    console.log(this.datalist);
  },
  methods: {
    logout() {
      var _this = this;
      fetchData("DELETE", "user/systemLogout")
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            _this.$notify({
              title: "用户" + sessionStorage.getItem("username"),
              message: "欢迎再次使用",
              position: "top-right",
              offset: 300
            });
            _this.$router.push({ path: "/" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    shopping() {
      if (this.actived === true) {
        this.actived = false;
      } else {
        this.actived = true;
      }
    },
    addgood(e, index) {
      console.log(e.currentTarget.getAttribute("isTrue"));
      if (e.currentTarget.getAttribute("isTrue") === "false") {
        this.goods.push({
          name: e.currentTarget.getAttribute("name"),
          price: e.currentTarget.getAttribute("price"),
          number: 1,
          id: index
        });
        e.currentTarget.setAttribute("isTrue", true);
      } else {
      }
    },
    short(item, index) {
      if (item.number > 1) {
        item.number -= 1;
        this.totalPrice -= item.price;
        if (this.totalPrice < 0) {
          this.totalPrice = 0;
        }
      } else if (item.number == 1) {
        this.goods.splice(index, 1);
        this.$refs.list[item.id].setAttribute("istrue", false);
      }
    },
    add(item, index) {
      item.number += 1;
    },
    confirm(goods) {
      var _this = this;
      console.log(goods)
      ajax.postJSON(
        `http://120.79.197.130:8080/admin/order/insertOrder?product.id=${
          goods[0].id
        }&user.id=${sessionStorage.getItem("userid")}&count=${goods[0].number}&status=1`
      )
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            _this.$notify({
              title: "操作成功",
              message: "已成功下单",
              position: "top-right",
              offset: 300
            });
          } else {
            _this.$notify({
              title: "操作失败",
              message: "系统错误",
              position: "top-right",
              offset: 300
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getType(e) {
      var _this = this;
      ajax
        .getJSON(
          `http://120.79.197.130:8080/admin/product/selectProductByType/${
            e.currentTarget.id
          }`
        )
        .then(res => {
          if (res.code === 200) {
            _this.datalist = res.data;
          } else if (res.code === 400) {
            _this.$notify({
              title: "很抱歉",
              message: "暂时没有你所寻找的分类",
              position: "top-right",
              offset: 300
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getlist() {
      var _this = this;
      ajax
        .getJSON("http://120.79.197.130:8080/admin/product/getAllProducts")
        .then(res => {
          _this.datalist = res.data.reverse();
          console.log(res.data.users)
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    // 深层次的观察 观察数组对象的变化
    goods: {
      handler(newValue, oldValue) {
        let price = 0;
        for (let i = 0; i < newValue.length; i++) {
          price += newValue[i].number * newValue[i].price;
        }
        this.totalPrice = price;
        // console.log(price)
      },
      deep: true
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

  .home_content {
    height: 864px;
    width: @clientWidth;
    margin: 0 auto;
    margin-top: 50px;
    .home_classfy {
      border: 1px #e6e6e6 solid;
      padding: 20px;
      display: flex;
      justify-content: flex-start;
      height: 30px;
      line-height: 30px;
      background-color: white;
      & div:nth-child(1) {
        color: @accentColor;
        flex-grow: 1;
        text-align: center;
        cursor: pointer;
      }
      & div:nth-child(2) {
        flex-grow: 4;
        display: flex;
        justify-content: center;
        & span {
          flex-grow: 1;
          text-align: center;
          cursor: pointer;
        }
        & span:hover {
          color: @accentColor;
        }
      }
    }
  }

  .home_list {
    margin: 20px 0;
    display: flex;
    justify-content: flex-start;
    flex-wrap:wrap;
    border: 1px #e6e6e6 solid;
    background-color: white;
    .home_list_detail {
      // flex-grow: 1;
      cursor: pointer;
      display: flex;
      justify-content: flex-start;
      width: 20%;
      padding: 2.5%;

      img {
        width: 90px;
        height: 90px;
      }
      .detail_word {
        margin-left: 30px;
        & p:nth-child(1) {
          color: #333;
          font-weight: bold;
        }
        & p:nth-child(2) {
          color: #999;
          width: 100%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
        & p:nth-child(3) {
          color: #f74342;
        }
      }
    }
    & div:hover {
      background-color: #efefef;
    }
  }

  .shopping_car {
    position: fixed;
    top: 0;
    right: 0;
    width: 400px;
    transform: translateX(370px);
    height: 70%;
    background-color: white;
    margin-top: 8%;
    z-index: 10;
    text-align: center;
    transition: all 0.3s linear;
    // overflow: hidden;
    & .shopping_left {
      position: relative;
      width: 5px;
      & p {
        position: absolute;
        top: 0;
        left: 50%;
        margin-top: 300px;
        margin-left: 2px;
        width: 20px;
        cursor: pointer;
        font-size: 20px;
        // justify-content: center;
        color: @textColor;
      }
      & .info {
        position: absolute;
        top: 0;
        left: 50%;
        margin-top: 250px;
        margin-left: -5px;
      }
      & .number {
        color: black;
        position: absolute;
        top: 0;
        margin-top: 250px;
        left: 10px;
        font-size: 20px;
      }
    }
    & .shopping_right {
      width: 400px;
      // margin-left: 35px;
      text-align: center;
      font-size: 20px;
      p {
        margin-bottom: 20px;
      }
      & .order_img {
        height: 500px;
        img {
          margin-top: 200px;
        }
      }
      & .shopping_order {
        display: flex;
        justify-content: space-around;
        padding: 10px 0;
        text-align: center;
        & div:nth-child(1) {
          color: #ccc;
        }
        & div:nth-child(3) {
          color: #f74342;
        }
        & div:nth-child(2) {
          display: flex;
          justify-content: space-around;
          & span {
            display: block;
            width: 50px;
          }
          & span:nth-child(1),
          & span:nth-child(3) {
            border: 1px solid black;
            cursor: pointer;
          }
        }
      }
      & .confirm_order {
        position: absolute;
        bottom: 0;
        left: 35px;
        display: block;
        width: 300px;
        height: 42px;
        border-radius: 4px;
        background-color: @accentColor;
        color: #ffffff;
        cursor: pointer;
        text-align: center;
        font-size: 16px;
        line-height: 42px;
        margin: 30px auto;
        span {
          margin-left: 30px;
        }
      }
    }
  }
  .shopping_car_animate {
    transform: translateX(0);
    transition: all 0.3s linear;
  }
}
</style>
