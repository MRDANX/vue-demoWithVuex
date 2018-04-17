<template lang="html">
  <div class="index-page">
    <div class="index-left">
      <div class="index-left-panel all-products">
        <h4>全部产品</h4>
        <ul v-for="category in categories">
          <li>
            <h5>{{category.name}}</h5>
          </li>
          <li>
            <ul class="product-list">
              <li v-for="product in category.productList">
                <router-link :to="product.url">{{product.name}}</router-link>
              </li>
            </ul>
          </li>
          <li v-if="!category.lastCategory">
            <hr>
          </li>
        </ul>
      </div>
      <div class="index-left-panel news">
        <h4>最新消息</h4>
        <ul class="news-list">
          <li v-for="news in newsList">
            <a :href="news.url">{{news.title}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="index-right">
      <transition name="fade" appear mode="out-in">
        <carousel :carouselPics="carouselPics" :key="carouselPics[0].title" :interval="interval"></carousel>
      </transition>
      <ul class="board-list">
        <li v-for="board in boardList">
          <img :src="board.imgUrl" alt="">
          <div>
            <h3>{{board.title}}</h3>
            <p>{{board.desc}}</p>
            <router-link :to="board.url">立即购买</router-link>
            <!-- <a :href="board.url">立即购买</a> -->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import carousel from "@/components/Carousel";
import { mapState } from "vuex";
export default {
  name: "indexPage",
  data() {
    return {
      interval: 3500
    };
  },
  computed: mapState("home", [
    "categories",
    "newsList",
    "boardList",
    "carouselPics"
  ]),
  components: {
    carousel
  }
};
</script>

<style lang="less" scoped>
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

.index-page {
  width: 65%;
  height: auto;
  overflow: hidden;
  margin: 15px auto;
  .index-left {
    width: 25%;
    height: auto;
    float: left;
    .index-left-panel {
      width: 100%;
      background-color: white;
      box-shadow: 0 0 3px white;
      padding-bottom: 10px;
      margin-bottom: 15px;
      h4 {
        background-color: #4fc08d;
        color: white;
        padding: 8px 15px;
        font-weight: normal;
      }
      > ul {
        h5 {
          font-size: 16px;
          font-weight: 600;
          margin: 15px 0;
        }
        > li {
          text-indent: 1em;
          ul {
            li {
              margin-bottom: 5px;
              text-indent: 1.8em;
              a {
                color: #3d3d3d;
              }
            }
          }
          hr {
            border: none;
            border-bottom: 1px solid lightgray;
            margin-top: 15px;
          }
        }
      }
    }
    .index-left-panel.news {
      min-height: 500px;
      ul {
        padding: 20px 0;
        li {
          margin: 10px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-indent: 0;
          padding: 0 10px;
          a:hover {
            color: red;
          }
        }
      }
    }
  }
  .index-right {
    width: 73%;
    height: 1000px;
    float: right;
    .board-list {
      width: 100%;
      height: 400px;
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-between;
      li {
        width: 49%;
        height: 48%;
        background-color: white;
        box-shadow: 0 0 3px #ccc;
        display: flex;
        align-items: center;
        justify-content: space-around;
        div {
          width: 63%;
          p {
            font-size: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin: 15px 0 20px;
          }
          a {
            display: inline-block;
            padding: 8px 20px;
            color: white;
            background-color: #4fc08d;
          }
        }
        img {
          width: 30%;
        }
      }
    }
  }
}
</style>
