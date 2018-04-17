<template lang="html">
  <div class="detail-page">
    <div class="detail-nav">
        <img :src="imgMap[this.$route.path]" alt="">
        <!-- <router-link v-for="product in products" tag="li" :to="product.url" >
          <a @click="currentImg = product.imgUrl">{{product.name}}</a>
        </router-link> -->
        <transition-group name="flip" tag="ul">
        <!-- <li v-bind:key="item" -->
        <!-- @click="currentImg = product.imgUrl" :key="index"> -->
          <router-link
            :to="product.url"
            v-for="(product,index) in products"
            :key="index"
            tag="li" replace>
          {{product.name}}
        </router-link>
        <!-- </li> -->
      </transition-group>
    </div>
    <div class="detail-content">
      <transition name='slide-up' mode='out-in'>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailPage",
  data() {
    return {
      products: [],
      imgMap: {}
    };
  },
  created() {
    this.products = [
      {
        name: "数据统计",
        url: "/detail/statistics",
        imgUrl: "./static/images/board-open.png"
      },
      {
        name: "数据预测",
        url: "/detail/forecast",
        imgUrl: "./static/images/board-broadcast.png"
      },
      {
        name: "流量分析",
        url: "/detail/analysis",
        imgUrl: "./static/images/board-duty.png"
      },
      {
        name: "广告发布",
        url: "/detail/publish",
        imgUrl: "./static/images/board-climb.png"
      }
    ];
    this.products.forEach(product => {
          // this.imgMap[product.url] = product.imgUrl;
          this.$set(this.imgMap, product.url, product.imgUrl);
        });
  }
};
</script>

<style lang="less" scoped>
.flip-move {
  transition: all 0.5s ease;
}
.detail-page {
  width: 65%;
  margin: 15px auto;
  display: flex;
  justify-content: space-between;
  .detail-nav {
    width: 20%;
    height: 430px;
    background-color: white;
    box-shadow: 0 0 5px white;
    img {
      width: 50%;
      object-fit: cover;
      display: block;
      margin: 15px auto 20px;
    }
    ul {
      li {
        text-align: center;
        font-size: 23px;
        padding: 12px 0;
        transition: transform 0.4s cubic-bezier(0.43, -0.09, 0.27, 1.55);
        user-select: none;
        &:hover {
          cursor: pointer;
          background-color: #4fc08d;
          color: white;
        }
        &.router-link-active {
          background-color: #4fc08d;
          transform: scale(1.1);
          color: white;
        }
      }
    }
  }
  .detail-content {
    width: 78%;
    /deep/ .content-wrap {
      width: 100%;
      .purchase-detail {
        width: 100%;
        background-color: white;
        margin-bottom: 20px;
        > h2 {
          font-weight: normal;
          padding: 20px;
        }
        > p {
          font-size: 14px;
          padding: 15px;
          background-color: #f7fcff;
          line-height: 1.6;
          color: #999;
        }
        ul.detail-info {
          padding-left: 20px;
          padding-bottom: 10px;
          > li {
            margin: 20px 0;
            display: flex;
            align-items: center;
            > span {
              display: inline-block;
              width: 80px;
            }
          }
        }
      }
      .production-state {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        background-color: white;
        h2 {
          font-weight: normal;
        }
        p {
          margin: 20px 0;
          font-size: 15px;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
        }
        table {
          width: 100%;
          text-align: center;
          border-collapse: collapse;
          td {
            border: 1px solid #f0f2f5;
            padding: 15px;
          }
        }
      }
    }
    // height: 1000px;
    // background-color : green;
  }
}
.slide-up-enter,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.7s cubic-bezier(0.63, -0.17, 0.4, 1.22);
  //cubic-bezier(0.18, 0.89, 0.32, 1.28);
}
.slide-up-enter-to,
.slide-up-leave {
  opacity: 1;
  transform: translateY(0);
}
</style>
