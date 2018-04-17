<template lang="html">
  <div class="app-wrap">
    <div class="app-header">
      <div class="app-header-content">
        <router-link to="/"><img src="@/assets/logo.png" alt=""></router-link>
        <ul>
          <template v-if="!loginStatus.logged">
            <li @click="popup('login')">登录</li>
            <li>|</li>
            <li @click="popup('signup')">注册</li>
          </template>
          <template v-else>
            <li>{{loginStatus.username}}</li>
            <li>|</li>
            <li @click="logout">注销</li>
          </template>
          <li>|</li>
          <li @click="popup('about')">关于</li>
        </ul>
      </div>
    </div>
    <div class="app-content">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <div class="app-footer">
      <p>© 2016 fishenal MIT</p>
    </div>
    <popups
    v-if="showPopups.login"
    @closePopups="closePopups">
      <popups-login @loginValidate="loginValidate">
      </popups-login>
    </popups>
    <popups v-if="showPopups.signup" @closePopups="closePopups">
      <h2>功能开发中。。。</h2>
    </popups>
    <popups v-if="showPopups.about" @closePopups="closePopups">
      <h2>公司介绍—关于我们</h2>
      <div class="">
        <p>亿邦动力网为亿商联动国际电子商务股份有限公司旗下网站，是国内权威电子商务资讯平台，通过“线上内容+线下互动+第三方研究”三个经典媒体产品的组合，聚焦传统产业转型电子商务，在线上零售、传统零售、跨境零售、B2B、C2C、O2O、电商服务业、电商政策、电商资本等领域开展信息与研究服务，在电子商务行业拥有巨大影响力。</p>
        <p>亿商联动自 2007 年成立以来，一直致力于建设电子商务专业信息资讯平台，并通过该平台为客户提供新媒体营销、电子商务信息及咨询服务，获取营业收入。公司以旗下亿邦动力网、思路网两大平台为主，提供电子商务专业信息资讯和电商服务交易，用户包括电子商务相关企业、政府机构、电子商务从业者及经理人。2016年4月，亿商联动挂牌新三板（股票代码：836568）。截至 2016 年 06 月 30 日，当月月度独立访问用户达到 1700 万（UV，月度不重复访问用户）；思路网入驻服务品类超过 4700 种，拥有超过 2100 家主流电子商务服务提供商，旗下“思路通”付费信息产品上线运营。</p>
      </div>
    </popups>
  </div>
</template>

<script>
// import indexPage from '@/pages/indexPage'
// import popups from '@/components/Popups'
// import popupsLogin from '@/components/PopupsLogin'
export default {
  name: "Layout",
  data() {
    return {
      showPopups: {
        login: false,
        signup: false,
        about: false
      },
      loginStatus: {
        logged: false,
        username: ""
      }
    };
  },
  components: {
    // indexPage,
    //lazy loading for the following components
    popups: () => import("@/components/Popups"),
    popupsLogin: () => import("@/components/PopupsLogin")
  },
  methods: {
    popup(type) {
      switch (type) {
        case "login":
          this.showPopups.login = true;
          break;
        case "signup":
          this.showPopups.signup = true;
          break;
        case "about":
          this.showPopups.about = true;
          break;
        default:
      }
    },
    closePopups() {
      for (var key in this.showPopups) {
        if (this.showPopups.hasOwnProperty(key)) {
          this.showPopups[key] = false;
        }
      }
    },
    loginValidate(result) {
      if (result.success) {
        this.loginStatus.logged = true;
        this.loginStatus.username = result.username;
        // alert('登录成功！！！');
        this.closePopups();
      } else {
        this.loginStatus.logged = false;
        alert("用户名或密码错误！！！");
      }
    },
    logout() {
      this.$http("/logout").then(result => {
        console.log(result);
        this.loginStatus.logged = false;
        this.loginStatus.username = "";
      });
      document.body.style["overflcow-y"] = "auto";
    }
  },
  beforeCreate() {
    //initial carouselPics
    setTimeout(() => {
      this.$store.commit({
        type: "home/initData",
        initWhat: "carouselPics",
        data: [
          {
            title: "日本SQUARE发行的角色扮演类电视游戏系列",
            url: "../../static/images/carousel-1.jpg"
          },
          {
            title: "由日本Falcom公司开发制作并发行的一款角色扮演类游戏",
            url: "../../static/images/carousel-2.jpg"
          },
          {
            title:
              "2017年度终极剧情版本“青龙换世”震撼来袭,全新神兵甲子录静候探索",
            url: "../../static/images/carousel-3.jpg"
          },
          {
            title:
              "“这虽然是游戏，但可不是闹着玩的。”——“刀剑神域（Sword Art Online）”设计者茅场晶彦",
            url: "../../static/images/carousel-4.png"
          }
        ]
      });
    }, 1800);
  },
  created() {
    // console.log(this.$route);
    // console.log(this.$router);
    let params = new URLSearchParams();
    this.$http
      .post("/login", params)
      .then(result => {
        if (result.data) this.loginValidate(result.data);
      })
      .catch(err => {
        console.log("created: ", err);
        return false;
      });
  }
};
</script>

<style lang="less" >
html {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
html::-webkit-scrollbar {
  width: 0;
}
body,
h1,
h2,
h3,
h4,
h5,
html,
li,
p,
ul {
  padding: 0;
  margin: 0;
}
li,
ul {
  list-style-type: none;
}
a {
  color: #000;
  text-decoration: none;
}
body {
  background-color: #f0f2f5;
}
.app-wrap {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  .app-header {
    width: 100%;
    height: 90px;
    background-color: #363636;
    color: #b2b2b2;
    display: flex;
    align-items: center;
    .app-header-content {
      width: 65%;
      height: 85%;
      margin: 0 auto;
      position: relative;
      img {
        height: 100%;
        // position: absolute;
        // top: 50%;
        // transform: translateY(-50%);
      }
      ul {
        float: right;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        li {
          padding: 0 5px;
          font-size: 18px;
          &:nth-of-type(2n + 1) {
            cursor: pointer;
          }
        }
      }
    }
  }
  .app-content {
    overflow: hidden;
  }
  .app-footer {
    width: 100%;
    height: 80px;
    background-color: #e3e4e8;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.6s linear;
  }
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>
