<template>
  <div class="login">
    <can></can>
    <div class="login_container">
        <!-- 图片 -->
      <img src="../assets/images/logo.png">
      <!-- 选择是登录还是注册 -->
        <div class="login_content">
          <!-- 中间选择栏 -->
            <div class="login_content_top">
              <div class="register" @click="login=false" :class="{loginColor:!login}">
                注册
              </div>
              <div class="login"  @click="login=true" :class="{loginColor:login}">
                登录
              </div>
            </div>
          <!-- 登录的内容 -->
          <div class="login_cont" v-if="login">
              <div>
                <input type="text" v-model="username" placeholder="用户名"/>
              </div>
              <div>
                <input type="password" v-model="password" placeholder="密码"/>
              </div>
              <!-- 如果角色是用户 还有验证码 -->
              <div  v-if="role==='user'">
                <img alt="验证码" onclick="this.src='http://120.79.197.130:8080/Kaptcha/defaultKaptcha?d='+new Date()*1" src="http://120.79.197.130:8080/Kaptcha/defaultKaptcha"/>
                <input type="text" placeholder="请输入验证码" class="captcha" v-model="captcha"/>
              </div>
              <!-- 修改了radio的样式 -->
              <div class="input_type">
                <div class="input_radio">
                  <input type="radio" id="manager" name="role" class="regular-radio" v-model="role" value="manager"/>  
                  <label for="manager"></label>  
                  <label class="inputlabel" for="manager">管理员</label> 
                </div>
                <div class="input_radio">
                  <input type="radio" id="user" name="role" class="regular-radio" v-model="role" value="user"> 
                  <label for="user"></label>  
                  <label class="inputlabel" for="user" >用户</label> 
                </div>
              </div>
            <div class="btn" @click="loging">
                确认登录
            </div>
          </div>

          <!-- 注册的内容 -->
          <div class="register_cont" v-else>
              <div>
                <input type="text" v-model="username" placeholder="用户名"/>
              </div>
              <div>
                <input type="password" v-model="password" placeholder="密码"/>
              </div>
              <div>
                <input type="text" v-model="address" placeholder="地址"/>
              </div>
              <div class="btn" @click="register">
                  确认注册
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
export default {
  data: () => ({
    login: true,
    username: "",
    password: "",
    role: "user",
    captcha: "",
    address:""
  }),
  mounted() {
    //路由传值 获得 login的真假
    console.log(this.$route.query.login);
    this.login = this.$route.query.login;
  },
  methods: {
    // 登录逻辑
    loging() {
      var _this = this;
      if (this.role === "user") {
        fetchData("GET", "Kaptcha/imgvrifyControllerDefaultKaptcha", {
          tryCode: _this.captcha
        })
          .then(res => {
            console.log(res);
            if (res.code === 200) {
              fetchData(
                "POST",
                `user/userLogin/${_this.username}/${_this.password}`
              )
                .then(res => {
                  console.log(res);
                  if (res.code === 200) {
                    _this.$notify({
                      title: "用户" + res.data.userName,
                      message: "欢迎你",
                      position: "top-right",
                      offset: 300
                    });
                    _this.$router.push({ path: "/home" });
                    sessionStorage.setItem("username", res.data.userName);
                    sessionStorage.setItem("userid", res.data.id);
                  } else {
                    _this.$notify({
                      title: "输入错误",
                      message: "请检查输入的用户名和密码",
                      position: "top-right",
                      offset: 300
                    });
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              _this.$notify({
                title: "输入错误",
                message: "验证码输入错误",
                position: "top-right",
                offset: 300
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log("manager");
        fetchData("POST", `user/adminLogin/${_this.username}/${_this.password}`)
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              _this.$notify({
                title: "管理员",
                message: "欢迎你",
                position: "top-right",
                offset: 300
              });
              _this.$router.push({ path: "/manager" });
            } else {
              _this.$notify({
                title: "输入错误",
                message: "请重新检查你输入的账号或密码",
                position: "top-right",
                offset: 300
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 注册逻辑
    register() {
      console.log("resgister");
      var _this = this;
      fetchData("POST", `/user/userRegisterWithAddress/${_this.username}/${_this.password}/${_this.address}`)
        .then(res => {
          console.log(res);
          _this.$notify({
            title: "用户你好",
            message: "注册成功",
            position: "top-right",
            offset: 300
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less">
@import "../assets/style/config.less";
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .login_container {
    flex: 1 1 auto;
    text-align: center;
    width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    .login_content {
      .login_content_top {
        font-size: 20px;
        display: flex;
        flex-direction: row;
        .register,
        .login {
          color: @textColor;
          cursor: pointer;
          width: 30%;
          margin: 50px 20%;
          padding-bottom: 10px;
        }
        .loginColor {
          color: @accentColor;
          border-bottom: 2px solid @accentColor;
        }
      }
      .login_cont {
        & div {
          margin: 20px 0;
          input[type="text"],
          input[type="password"] {
            width: 300px;
            height: 40px;
            left: 0;
            padding-left: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            color: #333;
            -webkit-appearance: none;
            outline-color: @accentColor;
          }
        }
        .captcha {
          margin-top: 20px;
        }
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
        .btn {
          display: block;
          width: 300px;
          height: 42px;
          border-radius: 4px;
          background: @accentColor;
          color: #ffffff;
          cursor: pointer;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          margin: 30px auto;
        }
      }
    }
    .register_cont {
      & div {
        margin: 20px 0;
        input[type="text"],
        input[type="password"] {
          width: 300px;
          height: 40px;
          left: 0;
          padding-left: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          color: #333;
          -webkit-appearance: none;
          outline-color: @accentColor;
        }
      }
      .btn {
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
      }
    }
  }
}
</style>
