<template>
  <div class="login">
    <div class="close" @click="$router.go(-1)">+</div>
    <div class="logo">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-wangyiyun"></use>
      </svg>
    </div>

    <div class="logbtn">
      <div class="phoneLogin" @click="datas.showLoginPanel = true">
        手机号登录
      </div>
      <div class="cancel">立即体验</div>
    </div>

    <div class="otherLogin">
      <div class="wechat">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weixin"></use>
        </svg>
      </div>
      <div class="qq">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-QQ1"></use>
        </svg>
      </div>
      <div class="weibo">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shejiaotubiao-42"></use>
        </svg>
      </div>
    </div>
    <div class="agrement">
      <input type="checkbox" />
      同意<a href="#">《用户协议》</a>和<a href="#">《隐私政策》</a>
    </div>
    <van-popup
      v-model:show="datas.showLoginPanel"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <div class="header">手机号登录</div>
      <div class="from">
        <h4>登录体验更多精彩</h4>
        <div class="account">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-cl-icon-Personal"></use>
          </svg>
          <input type="text" name="" id="phone" v-model="datas.phone" />
        </div>
        <div class="password">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon-lock"></use>
          </svg>
          <input
            type="password"
            name=""
            id="password"
            v-model="datas.password"
          />
        </div>
        <div class="remberForgetPassword">
          <span class="remember"
            ><input type="checkbox" name="" id="" /> 记住密码</span
          >
          <span class="forget">忘记密码</span>
        </div>
        <div class="login_btn" @click="doLogin">登录</div>
        <div class="register">
          <a href="#">注册账号</a>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
import { Notify } from 'vant';
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
let datas = reactive({
  showLoginPanel: false,
  phone: "",
  password: "",
});

function isMobile(mobile) {
  return /^1[3-9]\d{9}$/.test(mobile);
}
function doLogin() {
  if (!isMobile(datas.phone) || datas.password.trim() == "") {
    console.log(" 格式不正确！");
    Notify({
      type: "warning",
      message: "手机号或者密码格式不正确！",
      duration: 1000,
    });
  } else {
    store
      .dispatch("getLogin", {
        phone: datas.phone,
        password: datas.password,
      })
      .then((res) => {
        console.log(res);
        if (res.code == 200) {
          Notify({
            type: "success",
            message: "登录成功！",
            duration: 1000,
          });
          store.commit("updateIsLogin", true);
          store.commit("updateToken", "1111");
          router.push("/userInfo");
        } else {
          Notify({
            type: "warning",
            message: "手机号或者密码格式不正确！!!!!!!!",
            duration: 1000,
          });
          store.commit("updateIsLogin", true);
          store.commit("updateToken", "1111");
          router.push("/userInfo");
        }
      });

    // if (loginResult.status == 200) {
    //   store.state.isLogin = true
    //   console.log(loginResult)
    // }else{
    //    Notify({
    //   type: "warning",
    //   message: loginResult.data.message,
    //   duration: 2000,
    // });
    //   store.state.isLogin = true
    //   router.go('/')
    // }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: #d8402f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  z-index: 6;
  padding-bottom: 2rem;

  .van-popup {
    .van-popup__close-icon {
      color: #fff;
    }
    .header {
      width: 100%;
      height: 1rem;
      text-align: center;
      background-color: #ce3726;
      line-height: 1rem;
      color: #fff;
    }
    .from {
      padding: 0.4rem 0.4rem;
      width: 80%;
      text-align: center;
      margin: 0 auto;
      h4 {
        font-weight: 400;
        font-size: 0.5rem;
        margin-top: 2rem;
      }
      .register {
        font-size: 0.2rem;
        margin-top: 0.5rem;
        a {
          color: rgb(54, 54, 186);
        }
      }
      .account,
      .password {
        width: 100%;
        margin: 0.2rem auto;
        display: flex;
        align-items: center;
        padding: 0.2rem 0;
        border-bottom: 1px solid #d6d6d6;
        input {
          width: 80%;
          height: 0.5rem;
          border: none;
          outline: none;
          padding-left: 0.1rem;
        }
      }
      .remberForgetPassword {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .remember,
        .forget {
          display: flex;
          color: #d64130;
          justify-content: center;
          align-items: center;
          position: relative;
          font-size: 0.2rem;
          input {
            // appearance: none;
            width: 0.2rem;
            height: 0.2rem;
            margin-right: 0.1rem;
          }
          input[type="checkbox"]::after {
            position: absolute;
            top: 1px;
            left: 0;
            background-color: white;
            color: #000;
            width: 0.23rem;
            height: 0.23rem;
            display: inline-block;
            visibility: visible;
            padding-left: 0px;
            text-align: center;
            content: " ";
            box-sizing: border-box;
            border: 1px solid #d64130;
          }
          input[type="checkbox"]:checked::after {
            content: "✓";
            font-size: 0.2rem;
            font-weight: bold;
            color: #d64130;
          }
        }
      }

      .login_btn {
        width: 100%;
        height: 0.7rem;
        background: #d64130;
        text-align: center;
        line-height: 0.7rem;
        color: #fff;
        border-radius: 0.4rem;
        margin-top: 1rem;
      }
    }
  }

  .close {
    position: absolute;
    top: 0.3rem;
    left: 0.4rem;
    font-size: 0.6rem;
    color: #fff;
    transform: rotate(45deg);
  }
  .logo {
    width: 1.5rem;
    height: 1.5rem;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 100%;
      height: 100%;
      fill: #e93e2b;
      scale: (1.3);
    }
    margin-top: 3rem;
  }
  .logbtn {
    width: 80%;
    .phoneLogin,
    .cancel {
      width: 100%;
      height: 1rem;
      border-radius: 0.6rem;
      text-align: center;
      line-height: 1rem;
      font-size: 0.4rem;
      margin-bottom: 0.3rem;
    }
    .phoneLogin {
      background-color: #fff;
      color: #d8402f;
      box-shadow: 4px 4px 10px rgba(11, 11, 11, 0.4);
    }
    .cancel {
      border: 1px solid rgba(247, 247, 247, 0.5);
      color: #fff;
    }
  }
  .otherLogin {
    width: 60%;
    display: flex;
    justify-content: space-around;
    svg {
      width: 1rem;
      height: 1rem;
      fill: rgba(248, 248, 248, 0.8);
    }
  }
  .agrement {
    input {
      outline: none;
      border: none;
      background-color: none;
    }
    color: rgb(234, 220, 220);
    font-weight: 300;
    a {
      text-decoration: none;
      color: rgb(230, 213, 213);
    }
  }
}
</style>