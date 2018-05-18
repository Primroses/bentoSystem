<template>
  <div class="order">
      <!-- 头部 -->
      <head-nav :username="username"></head-nav>
      <!-- 中间 -->
      <div class="order_container">
          <div class="order_left">
              <div @click="showInfo='order'">
                  我的订单
              </div>
              <div @click="showInfo='info'">
                  我的信息
              </div>
          </div>
          <!-- 订单 -->
          <div class="order_right">
            <div class="order_detail" v-if="showInfo=='order'">
              <div class="order_title">
                  <p>我的订单</p>
                </div>
                <div class="order_content_head">
                  <div>下单时间</div>
                  <div>订单内容</div>
                  <div>支付金额</div>
                  <div>订单状态</div>
                  <div>订单操作</div>
              </div>
              <div class="order_content_content" v-for="item in datalist" :key="item.id">
                  <div>{{ item.date | times}}</div>
                  <div>
                    <div class="order_img"><img :src=item.product.imgae></div>
                    <p>{{ item.product.productName }} </p>
                    <p>{{ item.count }}份</p>
                  </div>
                  <div>￥{{ item.count*item.product.price }}</div>

                  <div>{{ item.status | getStatus}}</div>

                  <div v-if="item.status===1" class="cancel_order" @click="cancel" :id="item.id">取消订单</div>
                  <div v-else>欢迎光临</div>
              </div>
            </div>
            <!-- 我的信息 -->
            <div class="order_detail" v-if="showInfo=='info'">
              <div class="order_title">
                <p>我的信息</p>
              </div>
              <div class="person_info">
                <div class="person_img"><img src="https://shadow.elemecdn.com/faas/desktop/media/img/default-avatar.38e40d.png?imageMogr2/format/webp/quality/85"></div>
                <div class="person_detail">
                  <span>用户</span>
                  <span>{{ username }}</span>
                </div>
                <div class="person_detail">                  
                  <span>收货地址</span>
                  <span>{{ address }}</span>
                  </div>
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
import times from "../util/times";
export default {
  data: () => ({
    username: "",
    datalist: [],
    showInfo: "order",
    address: ""
  }),
  methods: {
    cancel(e) {
      var _this = this;
      fetchData(
        "PUT",
        `admin/order/updateOrder?id=${e.currentTarget.id}&status=3`
      )
        .then(res => {
          if (res.code === 200) {
            _this.$notify({
              title: "操作成功",
              message: "已取消下单",
              position: "top-right",
              offset: 300
            });
            ajax
              .getJSON(
                `http://120.79.197.130:8080/admin/user/getOrdersByUserId/${sessionStorage.getItem(
                  "userid"
                )}`
              )
              .then(res => {
                console.log(res);
                _this.datalist = res.data;
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  filters: {
    getStatus(val) {
      if (val === 1) {
        return (val = "早餐");
      } else if (val === 2) {
        return (val = "夜宵");
      } else if (val === 3) {
        return (val = "糕点");
      } else if (val === 4) {
        return (val = "饮品");
      }
    },
    times(str) {
      return times(str);
    },
    getStatus(status) {
      if (status === 1) {
        return (status = "下单成功");
      } else if (status === 2) {
        return (status = "订单完成");
      } else if (status === 3) {
        return (status = "订单取消");
      }
    }
  },
  mounted() {
    var _this = this;
    // 获取个人信息
    ajax
      .getJSON(
        `http://120.79.197.130:8080/admin/user/getUserById/${sessionStorage.getItem(
          "userid"
        )}`
      )
      .then(res => {
        console.log(res);
        _this.username = res.data.userName;
        _this.address = res.data.address;
      })
      .catch(err => {
        console.log(err);
      });

    // 获取订单详情
    ajax
      .getJSON(
        `http://120.79.197.130:8080/admin/user/getOrdersByUserId/${sessionStorage.getItem(
          "userid"
        )}`
      )
      .then(res => {
        console.log(res);
        _this.datalist = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less">
@import "../assets/style/theme.less";
.order {
  width: 100%;
  background-color: #f7f7f7;
  .order_container {
    width: @clientWidth;
    display: flex;
    justify-content: space-between;
    height: 800px;
    margin: 50px auto 64px;
    .order_left {
      flex: 1;
      div {
        margin-bottom: 8px;
        font-weight: 700;
        font-size: 18px;
        padding: 20px;
        text-align: center;
        cursor: pointer;
      }
      div:hover {
        color: @accentColor;
      }
    }
    .order_right {
      flex: 4;
      border: 1px solid #eee;
      background-color: white;
      padding: 30px;
      .order_detail {
        & .order_title {
          width: 100%;
          font-size: 20px;
          font-weight: bolder;
          padding-bottom: 20px;
          border-bottom: 3px solid #eee;
        }
        & .order_content_head,
        & .order_content_content {
          margin-top: 30px;
          display: flex;
          justify-content: space-around;
          font-size: 20px;
          // text-align: center;
          color: @accentColor;
          & div {
            flex-basis: 12.5%;
            text-align: center;
          }
          & div:nth-child(2) {
            flex-basis: 50%;
            text-align: left;
          }
        }
        & .order_content_content {
          color: @textColor;
          font-size: 16px;
          height: 60px;
          line-height: 60px;
          & div:nth-child(3) {
            font-weight: bolder;
          }
          & .cancel_order:hover {
            color: @accentColor;
            cursor: pointer;
          }
          & div:nth-child(2) {
            display: flex;
            .order_img {
              border-radius: 10px;
              overflow: hidden;
              img {
                width: 70px;
                height: 70px;
              }
            }
            p {
              margin-left: 20px;
            }
          }
        }
        & .person_info {
          margin-top: 20px;
          display: flex;
          & div {
            flex-grow: 1;
          }
          & .person_img {
            overflow: hidden;
            width: 160px;
            height: 160px;
            border-radius:50px; 
            text-align: center;
            img {
              width: 160px;
              height: 160px;
            }
          }
          .person_detail{
            span{
              display: block;
              height: 50px;
              width: 90%;
              line-height: 50px;
              margin:0 5%;
            }
            span:nth-child(1){
              font-weight: bolder;
              text-align: center;
              color:@accentColor;
            }
            span:nth-child(2):hover{
              background-color: @accentColor;
              color:white;
            }
          }
        }
      }
    }
  }
}
</style>
