<template lang="html">
  <div class="carousel" @mouseenter="stopPlay" @mouseleave="autoPlay">
    <transition :name="slideDirection + 1"  >
      <img id="carousel_img"
      :src="carouselPics[currentIndex].url"
      v-if = "isShow"
      key="first">
    </transition>
    <transition :name="slideDirection + 2" >
      <img id="carousel_img"
      :src="carouselPics[currentIndex].url"
      v-if = "!isShow"
      key="second">
    </transition>
    <div class="carousel-bottom">
      <span>{{carouselPics[currentIndex].title}}</span>
      <ul class="carousel-controller">
        <li @click="goto(preIndex)">&lt;</li>
        <li v-for="(item,index) in carouselPics"
          @click="goto(index)"
          :class="{ 'currentIndex': index == currentIndex}" >
            {{ index + 1 }}</li>
        <li @click="goto(nextIndex)">&gt;</li>
      </ul>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Carousel',
  props: {
    carouselPics: {
      type: Array,
      default: () => []
    },
    interval: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      currentIndex: 0,
      intervalId: 0,
      isShow: true,
      slideDirection: 'slide-left-'
    }
  },
  methods: {
    goto: _.debounce(function(index) {
      if (index >= this.carouselPics.length || index == this.currentIndex) return;
      if (index > this.currentIndex) {
        this.slideDirection = 'slide-left-';
      } else {
        this.slideDirection = 'slide-right-';
      }
      this.isShow = false;
      setTimeout(() => {
        this.currentIndex = index;
        this.isShow = !this.isShow;
      }, 10);
    }, 250),
    autoPlay() {
      this.intervalId = setInterval(() => {
        this.goto(this.nextIndex);
      }, this.interval);
    },
    stopPlay() {
      clearInterval(this.intervalId);
    }
  },
  computed: {
    preIndex() {
      return (this.currentIndex + this.carouselPics.length - 1) % this.carouselPics.length;
    },
    nextIndex() {
      return (this.currentIndex + 1) % this.carouselPics.length;
    }
  },

  mounted() {
    this.autoPlay();
    let url=this.carouselPics[0].url
    // setInterval(()=> {
    //   console.log(this.carouselPics);
    // }, 1000);
  }
}
</script>

<style lang="less" scoped>
.slide-left-1-enter {
    transform: translateX(100%);
}
.slide-left-1-enter-active,
.slide-left-2-leave-active,
.slide-right-1-enter-active,
.slide-right-2-leave-active {
    transition: transform 0.8s ease;
}
.slide-left-2-leave-to,
.slide-right-1-enter {
    transform: translateX(-100%);
}
.slide-right-2-leave-to {
    transform: translateX(100%);
}
.carousel {
    width: 100%;
    height: 450px;
    position: relative;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 2;
        position: absolute;
        top: 0;
        left: 0;
    }
    .carousel-bottom {
        width: 100%;
        height: 40px;
        padding: 0 10px;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(0,0,0,0.7);
        color: white;
        span{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        ul {
            display: flex;
            justify-content: space-between;
            user-select: none;
            li {
                margin: 0 10px;
                cursor: pointer;
            }
            li.currentIndex {
                text-decoration: underline;
            }
        }
    }
}
</style>
