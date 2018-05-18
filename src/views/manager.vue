<template>
  <div class="manager">
      <!-- 头部 -->
      <headNav :manager="'root'"></headNav>
      <!-- 中间 -->
      <div class="manager_content">
          <div class="manager_left">
              <div @click="showOrder">订单操作</div>
              <div @click="showProduct">商品操作</div>
          </div>
          <div class="manager_right">
              <!-- 订单的操作 -->
            <div v-if="showInfo==='order'" class="manager_right_order">
                  <div class="order_head">
                      订单操作
                  </div>
            <div class="order_detail" v-if="showInfo=='order'">
                <div class="order_content_head">
                  <div>接单时间</div>
                  <div>订单内容</div>
                  <div>应收金额</div>
                  <div>订单状态</div>
                  <div>订单操作</div>
              </div>
              <div class="order_content_content" v-for="item in datalist" :key="item.id">
                  <div>{{ item.date | times}}</div>
                  <div>
                    <div class="order_img"><img :src=item.product.imgae></div>
                    <p>{{ item.product.productName }} </p>
                    <p>{{ item.count }}份</p>
                    <p>用户{{ item.user.userName }}下单</p>
                  </div>
                  <div>￥{{ item.count*item.product.price }}</div>
                  <div>{{ item.status | getStatus}}</div>
                  <div v-if="item.status===1" class="cancel_order" ><span @click="confirm" :id="item.id">确认订单</span><span @click="showOrderDetail" :id="item.id">查看订单</span></div>
                  <div v-else><span @click="showOrderDetail" :id="item.id">查看订单</span></div>
              </div>

              <!-- 面具侠 -->
              <div class="mask" @click.self="closeMask" v-if="mask">
                <div class="mask_content">
                  <div class="mask_content_left">
                    <img :src="maskdata.product.imgae" v-if="maskdata">
                    <img v-else src="http://itaem.oss-cn-shenzhen.aliyuncs.com/20180509024624.jpg?Expires=4679448385&OSSAccessKeyId=LTAIATBJKsu6vu4R&Signature=ltV%2FrQMZp1OI3DgmNU5pPPsGjHE%3D" >
                  </div>
                  <div class="mask_content_right">
                    <p>{{ maskdata.productName }}</p>
                    <p>订单号：{{ maskdata.id }}</p>
                    <p>{{ maskdata.date|times }}</p>
                    <p>购买数量:{{ maskdata.count }}</p>
                    <p>用户:{{ maskdata.user.userName }}</p>
                    <p>地址:{{ maskdata.user.address }}</p>
                    <div v-if="maskdata.status===1" class="confirm_order" @click="confirm" :id="maskdata.id">
                      确认订单
                    </div>
                  </div>
                </div>
              </div>
              <div class="page clearfix">
                <div id="up" @click="changePage">上一页</div>
                <div>第{{ page }}页</div>
                <div id="down" @click="changePage">下一页</div>
                <div>共{{ pageTotal }}页</div>
              </div>
            </div>
              </div>
              <!-- 商品的操作 -->
             <div v-else-if="showInfo==='product'" class="manager_right_product">
                  <div class="order_head">
                       商品操作
                  </div>
                  <div class="product_content_head">
                      <div>商品图片</div>
                      <div>商品名字</div>
                      <div>商品描述</div>
                      <div>商品库存</div>
                      <div>商品单价</div>
                      <div>商品操作</div>
                  </div>
              <div class="product_content_content" v-for="item in datalist" :key="item.id">
                  <div class="product_img"><img :src=item.imgae></div>
                  <div>{{ item.productName }}</div>
                  <div>{{ item.description }}</div>
                  <div>{{ item.count }}</div>
                  <div>{{ item.price }}</div>
                  <div @click="updateProduct" :id="item.id"  class="opera">修改商品</div>
              <div class="mask" @click.self="closeMask" v-if="maskProduct">
                <div class="mask_content">
                  <div class="maskProduct_left">
                    <img :src=item.imgae>
                    <div class="deletePro" @click="deletePro">删除商品</div>
                  </div>
                  <div class="maskProduct_right clearfix">
                    <!-- <div class="mask_head">修改商品</div> -->
                    <div class="updateProduct clearfix">
                      <input type="text" v-model="product_name">
                      <div><span>修改过后的名字:</span>{{ product_name }}</div>
                    </div>
                    <div class="updateProduct clearfix">
                      <input type="text" v-model="product_count">
                      <div><span>修改过后的库存:</span>{{ product_count }}</div>
                    </div>
                    <div class="updateProduct clearfix">
                      <input type="text" v-model="product_dec">
                      <div><span>修改过后的描述:</span>{{ product_dec }}</div>
                    </div>
                    <div class="confirm_order product_order" :id="item.id" @click="update">
                      确认修改
                    </div>

                  </div>
                </div>
              </div>
              </div>
              <div class="confirm_order addProduct"  @click="addProduct">
                增加商品
              </div>
              <div class="mask" v-if="addProductMask" @click.self="closeMask">
                <div class="mask_content addProductMask">
                  <div class="addProduct_container">
                  <div class="addProduct_content">
                    <input type="text" placeholder="请输入商品的名字" v-model="addPro.name">
                  </div>
                  <div class="addProduct_content">
                    <input type="text" placeholder="请输入商品的描述" v-model="addPro.dec">
                  </div>
                  <div class="addProduct_content">
                    <input type="text" placeholder="请输入商品的库存" v-model="addPro.count">
                  </div>
                  <div class="addProduct_content">
                    <input type="text" placeholder="请输入商品的单价" v-model="addPro.price">
                  </div>
                  <div class="addProduct_content">
                <div class="input_type">
                <div class="input_radio">
                  <input type="radio" id="zaocan" name="type" class="regular-radio" v-model="type" value="1"/>  
                  <label for="zaocan"></label>  
                  <label class="inputlabel" for="zaocan">早餐</label> 
                </div>
                <div class="input_radio">
                  <input type="radio" id="yexiao" name="type" class="regular-radio" v-model="type" value="2"/>  
                  <label for="yexiao"></label>  
                  <label class="inputlabel" for="yexiao">夜宵</label> 
                </div>
                  <div class="input_radio">
                  <input type="radio" id="gaodian" name="type" class="regular-radio" v-model="type" value="3"/>  
                  <label for="gaodian"></label>  
                  <label class="inputlabel" for="gaodian">糕点</label> 
                </div>
                <div class="input_radio">
                  <input type="radio" id="yinpin" name="type" class="regular-radio" v-model="type" value="4"> 
                  <label for="yinpin"></label>  
                  <label class="inputlabel" for="yinpin" >饮品</label> 
                </div>
              </div>
                  </div>
                  <div class="addProduct_content">
                    <input type="file" multiple="multiple" v-on:change="uploadFile($event)"  ref="file">上传
                  </div>
                  <div class="confirm_order confirm_addProduct" @click="upload">
                    确认添加
                  </div>
                  </div>
                </div>
              </div>
              <!-- 分页 -->
              <div class="page clearfix">
                <div id="up" @click="changeProduct">上一页</div>
                <div>第{{ page }}页</div>
                <div id="down" @click="changeProduct">下一页</div>
                <div>共{{ pageTotal }}页</div>
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
  data() {
    return {
      showInfo: "order",
      datalist: [],
      mask: false,
      page: 1,
      pageTotal: 0,
      date: 1526308569000,
      maskdata: [],
      maskProduct: false,
      product_name: "玉米",
      product_number: 0,
      product_count: 0,
      product_dec: "",
      productId: "",
      addProductMask: false,
      addPro: [],
      files: "",
      type: ""
    };
  },
  mounted() {
    var _this = this;
    this.showOrder();
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
  methods: {
    confirm(e) {
      var _this = this;
      console.log(e.currentTarget.id);
      fetchData(
        "PUT",
        `admin/order/updateOrder?id=${e.currentTarget.id}&status=2`
      )
        .then(res => {
          if (res.code === 200) {
            _this.$notify({
              title: "操作成功",
              message: "已确认",
              position: "top-right",
              offset: 300
            });
            ajax
              .getJSON(
                "http://120.79.197.130:8080/admin/order/getAllOrdersByPages/1/5"
              )
              .then(res => {
                console.log(res);
                _this.datalist = res.data.users;
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    showOrder() {
      this.showInfo = "order";
      var _this = this;
      ajax
        .getJSON(
          "http://120.79.197.130:8080/admin/order/getAllOrdersByPages/1/5"
        )
        .then(res => {
          console.log(res);
          _this.datalist = res.data.users;
          _this.pageTotal =
            res.data.count % 5 === 0
              ? res.data.count / 5
              : parseInt(res.data.count / 5) + 1;
        })
        .catch(err => {
          console.log(err);
        });
    },
    showProduct() {
      this.showInfo = "product";
      var _this = this;
      ajax
        .getJSON(
          "http://120.79.197.130:8080/admin/product/getAllProductsByPages/1/4"
        )
        .then(res => {
          console.log(res);
          _this.datalist = res.data.users;
          _this.pageTotal =
            res.data.count % 4 === 0
              ? parseInt(res.data.count / 4)
              : parseInt(res.data.count / 4) + 1;
        })
        .catch(err => {
          console.log(err);
        });
    },
    showOrderDetail(e) {
      this.mask = true;
      var _this = this;
      ajax
        .getJSON(
          `http://120.79.197.130:8080/admin/order/getOrderById/${
            e.currentTarget.id
          }`
        )
        .then(res => {
          console.log(res);
          _this.maskdata = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    closeMask() {
      this.mask = false;
      this.maskProduct = false;
      this.addProductMask = false;
    },
    changePage(e) {
      var _this = this;
      if (e.currentTarget.id === "up") {
        if (this.page === 1) {
          this.$notify({
            title: "无法操作",
            message: "已经是第一页了",
            position: "top-right",
            offset: 300
          });
        } else {
          this.page--;
          ajax
            .getJSON(
              `http://120.79.197.130:8080/admin/order/getAllOrdersByPages/${
                this.page
              }/5`
            )
            .then(res => {
              _this.datalist = res.data.users;
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        if (this.page === this.pageTotal) {
          this.$notify({
            title: "无法操作",
            message: "已经是最后一页了",
            position: "top-right",
            offset: 300
          });
        } else {
          _this.page++;
          ajax
            .getJSON(
              `http://120.79.197.130:8080/admin/order/getAllOrdersByPages/${
                this.page
              }/5`
            )
            .then(res => {
              _this.datalist = res.data.users;
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    updateProduct(e) {
      var _this = this;
      console.log(e.currentTarget.id);
      this.maskProduct = true;
      ajax
        .getJSON(
          `http://120.79.197.130:8080/admin/product/getProductById/${
            e.currentTarget.id
          }`
        )
        .then(res => {
          console.log(res);
          _this.product_name = res.data.productName;
          _this.product_count = res.data.count;
          _this.product_dec = res.data.description;
          _this.productId = res.data.id;
        })
        .catch(err => {
          console.log(err);
        });
    },
    update() {
      console.log(this.productId);
      var _this = this;
      console.log(_this.product_name);
      console.log(_this.product_count);
      console.log(_this.product_dec);
      ajax
        .putJSON(
          `http://120.79.197.130:8080/admin/product/updateProduct?id=${
            _this.productId
          }&productName=${_this.product_name}&description=${_this.product_dec}`
        )
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            _this.$notify({
              title: "操作成功",
              message: "已修改商品信息",
              position: "top-right",
              offset: 300
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeProduct(e) {
      var _this = this;
      if (e.currentTarget.id === "up") {
        if (this.page === 1) {
          this.$notify({
            title: "无法操作",
            message: "已经是第一页了",
            position: "top-right",
            offset: 300
          });
        } else {
          this.page--;
          ajax
            .getJSON(
              `http://120.79.197.130:8080/admin/product/getAllProductsByPages/${
                this.page
              }/4`
            )
            .then(res => {
              _this.datalist = res.data.users;
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        if (this.page === this.pageTotal) {
          this.$notify({
            title: "无法操作",
            message: "已经是最后一页了",
            position: "top-right",
            offset: 300
          });
        } else {
          _this.page++;
          ajax
            .getJSON(
              `http://120.79.197.130:8080/admin/product/getAllProductsByPages/${
                this.page
              }/4`
            )
            .then(res => {
              _this.datalist = res.data.users;
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    addProduct() {
      this.addProductMask = true;
    },
    uploadFile(e) {
      var files = e.target.files;
      this.files = files;
      console.log(this.files);
    },
    upload() {
      let file = this.$refs.file.files[0];
      var _this = this;
      ajax.UpladFile(file,_this.addPro.name,_this.addPro.dec,_this.addPro.price,_this.addPro.count,_this.type).then(res=>{
        console.log(res)
        if(res.code==200){
          _this.$notify({
              title: "操作成功",
              message: "已经增加该商品",
              position: "top-right",
              offset: 300
            });
          _this.showProduct()
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    deletePro() {
      console.log(this.productId);
      var _this = this;
      fetchData("DELETE", `admin/product/deleteProductById/${_this.productId}`)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            _this.$notify({
              title: "操作成功",
              message: "已经删除该商品",
              position: "top-right",
              offset: 300
            });
          }
          _this.showProduct();
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
.manager {
  width: 100%;
  background-color: #f7f7f7;
  .manager_content {
    display: flex;
    height: 40px;
    width: @clientWidth;
    margin: 47px auto;
    height: 800px;
    .manager_left {
      flex: 1;
      & div {
        height: 50px;
        font-size: 20px;
        font-weight: bolder;
        line-height: 50px;
        text-align: center;
      }
      & div:hover {
        color: @accentColor;
        cursor: pointer;
      }
    }
    .manager_right {
      position: relative;
      flex: 4;
      padding: 30px;
      width: 100%;
      background-color: white;
      .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 1;
        .mask_content {
          width: 50%;
          height: 50%;
          padding: 1%;
          background-color: white;
          position: absolute;
          top: 20%;
          left: 50%;
          margin-left: -25%;
          transition: all 0.3s linear;
          display: flex;
          .mask_content_left,
          .mask_content_right {
            flex-grow: 1;
          }
          .mask_content_left {
            img {
              width: 240px;
              height: 240px;
            }
          }
          .mask_content_right {
            p {
              padding: 10px;
              font-weight: bolder;
              font-size: 20px;
            }
          }
          .product_order {
            bottom: -15px;
            width: 200px;
            left: 53%;
          }

          .maskProduct_left,
          .maskProduct_right {
            flex-grow: 1;
          }
          .maskProduct_left {
            img {
              width: 120px;
              height: 120px;
            }
            .deletePro {
              .confirm_order;
              bottom: -18px;
              width: 200px;
              left: 8%;
            }
          }
          .addProduct_container {
            width: 100%;
            height: 100%;
            // margin : 0 auto;
            text-align: center;
            .addProduct_content {
              margin: 20px 0;
              input[type="text"] {
                width: 300px;
                height: 40px;
                padding-left: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 20px;
                color: #333;
                -webkit-appearance: none;
                outline-color: @accentColor;
                margin: 20px 0;
              }
            }
            .confirm_addProduct {
              bottom: -3%;
              width: 200px;
              left: 40%;
            }
          }
        }
        .addProductMask {
          height: 60%;
          .input_type {
            display: flex;
            justify-content: center;
          }
          .input_radio {
            margin: 0 50px;
          }
          .regular-radio {
            display: none;
          }

          .regular-radio + label {
            -webkit-appearance: none;
            background-color: RGB(248, 248, 249);
            padding: 7px;
            border-radius: 50px;
            display: inline-block;
            position: relative;
          }

          .regular-radio:checked + label:after {
            content: " ";
            width: 12px;
            height: 12px;
            border-radius: 50px;
            position: absolute;
            top: 3px;
            background: @accentColor;
            text-shadow: 0px;
            left: 3px;
            font-size: 32px;
          }

          .regular-radio:checked + label {
            background-color: white;
          }
        }
      }
      .manager_right_order {
        .order_head {
          font-size: 20px;
          font-weight: 800;
          padding-bottom: 20px;
          border-bottom: 3px solid #ccc;
        }
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
            height: 80px;
            line-height: 60px;
            span {
              width: 70px;
              height: 50px;
            }
            & div:nth-child(3) {
              font-weight: bolder;
            }
            & .cancel_order {
              display: flex;
              flex-direction: column;
              text-align: center;
              align-items: center;
            }
            & span:hover {
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
              p:nth-child(4) {
                font-weight: bolder;
                font-size: 20px;
              }
            }
          }
        }
      }
      .manager_right_product {
        .addProduct {
          bottom: 10%;
          left: 40%;
        }
        .order_head {
          font-size: 20px;
          font-weight: bolder;
          padding-bottom: 20px;
          border-bottom: 3px solid #ccc;
        }
        .product_content_head,
        & .product_content_content {
          margin-top: 30px;
          display: flex;
          justify-content: flex-start;
          font-size: 20px;
          // text-align: center;
          color: @accentColor;
          & div {
            flex-basis: 12.5%;
            text-align: center;
          }
          & div:nth-child(2) {
            flex-basis: 50%;
            // text-align: left;
            margin-left: 20px;
          }
          .product_img {
            border-radius: 10px;
            overflow: hidden;
            img {
              width: 70px;
              height: 70px;
            }
          }
          .maskProduct_right {
            .mask_head {
              font-size: 20px;
              font-weight: bolder;
            }
            .updateProduct {
              input[type="text"] {
                width: 300px;
                height: 40px;
                padding-left: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 20px;
                color: #333;
                -webkit-appearance: none;
                outline-color: @accentColor;
                margin: 20px 0;
              }
              span {
                color: @accentColor;
                font-size: 20px;
                margin-right: 50px;
              }
            }
          }
        }
        & .product_content_content {
          color: @textColor;
          & div.opera:hover {
            color: @accentColor;
            cursor: pointer;
          }
          & .product_order:hover {
            color: white;
          }
        }
      }
      .page {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        // width:200px;
        & div {
          width: 50px;
          height: 50px;
          line-height: 50px;
          padding: 20px;
          justify-content: space-around;
        }
        #up:hover,
        #down:hover {
          color: @accentColor;
          cursor: pointer;
        }
      }
    }
  }
}
.confirm_order {
  position: absolute;
  bottom: 30%;
  left: 50%;
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
</style>
