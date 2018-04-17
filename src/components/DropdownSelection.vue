<template lang="html">
  <div class="selection">
    <span class="current-select" @click="dropDown=!dropDown">
      {{selections[currentIndex]}}
    </span>
    <!-- <transition-group tag="ul" name="drop-down-list"
    class="drop-down-list"
    v-if="dropDown"> -->
    <transition name="drop-down-list">
      <ul class="drop-down-list" v-if="dropDown">
        <li v-for="(select,index) in selections"
        @click="currentIndex = index;dropDown=false"
         :key="index">{{select}}</li>
      </ul>
    </transition>
    <!-- </transition-group> -->
  </div>
</template>

<script>
export default {
  props: {
    selections: {
      type: Array,
      default: function() {
        return ['出版业', '媒体', '金融', '互联网', '游戏'];
      }
    },
    dataName: {
      type: String,
      default: 'dropdownSelection'
    }
  },
  data() {
    return {
      currentIndex: 0,
      dropDown: false
    }
  },
  watch:{
    currentIndex(newValue,oldValue){
      this.$emit('receiveData', this.selections[newValue], this.dataName);
    }
  }
}
</script>

<style lang="less" scoped>
.drop-down-list-enter,
.drop-down-list-leave-to {
    opacity: 0;
    transform-origin: center top;
    transform: translateY(-10%);
    // transform-style: preserve-3d;
    // transform: rotateX(-80deg);
}
.drop-down-list-enter-active,
.drop-down-list-leave-active {
    transition: all 0.5s cubic-bezier(0.04, 0.41, 0.49, 1.48);
    z-index: -99;
}
.drop-down-list-enter-to,
.drop-down-list-leave {
    opacity: 1;
    transform-origin: center top;
    transform: translateY(0);
    // transform-style: preserve-3d;
    // transform: rotateX(10deg);
}
.selection {
    user-select: none;
    cursor: pointer;
    margin: 0 20px;
    text-align: center;
    width: 100px;
    // overflow: hidden;
    position: relative;
    height: 25px;
    .current-select {
        background-color: white;
        z-index: 2;
        border: 2px solid #f1efed;
        border-radius: 5px;
        box-sizing: border-box;
        display: inline-block;
        width: 100%;
        height: 100%;
        font-size: 15px;
        &::after {
            content: '';
            display: inline-block;
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-25%);
            border: 5px solid transparent;
            border-top: 5px solid #f1efed;
        }
    }
    ul.drop-down-list {
        z-index: 1;
        position: absolute;
        width: 100%;
        left: 0;
        top: 23px;
        border: 2px solid #f1efed;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        box-sizing: border-box;
        background-color: white;
        li {
            padding: 3px 0;
            transition: all 1s;
        }
    }
}
</style>
