<template lang="html">
  <transition name="fade-slide-up">
    <form class="user-login" action="/login" method="post">
      <div class="">
        <label>用户名</label>
        <input type="text" name="username" v-model="username" placeholder="请输入用户名">
      </div>
      <div class="">
        <label>密　码</label>
        <input type="password" name="password" v-model="password"  placeholder="请输入密码">
      </div>
      <div class="">
        <button type="button" @click="loggin">登录</button>
        <!-- <label>注　册</label> -->
        <!-- <label>登　录</label> -->
        <button type="button" >注册</button>
      </div>
    </form>
  </transition>
</template>

<script>
export default {
  name: 'PopupsLogin',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    loggin() {
      let params = new URLSearchParams();
      params.append('username', this.username);
      params.append('password', this.password);
      this.$http({
        method: 'post',
        url: '/login',
        data: params
      }).then(result => {
        console.log(result);
        this.$emit('loginValidate',result.data)
      }).catch(err => {
        // console.log(err);
        this.$emit('loginValidate',err.response.data)
        console.log('用户名或密码错误！！！');
      });
    }
  }
}
</script>

<style lang="less" scoped>
.user-login {
    width: 85%;
    height: 80%;
    // background-color: red;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: center;
    border: 3px solid #f1efed;
    border-radius: ~"5%/10%";
    div {
        display: flex;
        flex-flow: row nowrap;
        font-size: 25px;
        label {
            background-color: #f1efed; //#f4f3f0;
            border: 3px solid #f1efed;
            padding: 5px;
            // border-top-left-radius: 20% 30%;
            // border-bottom-left-radius: 10% 20%;
        }
        input {
            font-size: 25px;
            flex: 1;
            outline: none;
            text-indent: 1em;
            border: 3px solid #f1efed;
            // border-top-right-radius: 5% 20%;
            // border-bottom-right-radius: 6% 30%;
        }
        button {
            font-size: 25px;
            background-color: #f1efed; //#f4f3f0;
            border: 3px solid #f1efed;
            padding: 5px;
            margin: 0 20px;
            cursor: pointer;
        }
        // &:nth-child(2){
        //   label {
        //       border-top-left-radius: unset;
        //       border-bottom-left-radius: 10% 20%;
        //   }
        //   input{
        //     border-top-right-radius: unset;
        //     border-bottom-right-radius: 5% 20%;
        //   }
        // }
    }

}
.fase-slide-up-enter {}
</style>
