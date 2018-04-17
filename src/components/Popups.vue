<template lang="html">
  <div class="popups">
    <div class="popups-mask" @click="closePopups"></div>
    <transition name='slide-down' >
      <div class="popups-content" v-if="slid">
          <slot></slot>
      </div>
  </transition>
  </div>
</template>

<script>
console.log('popups.vue has been loaded.');
export default {
  name: 'Popups',
  data() {
    return {
      slid: false
    }
  },
  methods: {
    closePopups() {
      this.slid = false;
      setTimeout(() => {
        this.$emit('closePopups');
      }, 600);
      document.body.style['overflow-y'] = 'auto';
    }
  },
  mounted() {
    this.slid = true;
    document.body.style['overflow-y'] = 'hidden';
  }
}
</script>

<style lang="less" scoped>
.popups {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    .popups-mask {
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.3;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
    }
    .popups-content {
        min-width: 500px;
        width: 30%;
        height: 35%;
        background-color: white;
        box-shadow: 0 0 20px white;
        border-radius: ~"5% / 10%";
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-y: auto;
        /deep/ h2 {
            border-right: 1px solid black;
            padding-right: 10px;
            margin: 10px;
        }
        /deep/ div {
            padding-right: 10px;
            p {
                text-indent: 2em;

            }
        }
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%,-50%);
    }
}
.slide-down-enter,
.slide-down-leave-to {
    transform: translateY(-200%);
}
.slide-down-enter-active {
    transition: transform 0.7s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}
.slide-down-leave-active {
    transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
.slide-down-enter-to,
.slide-down-leave {
    transform: translateY(0);
}
</style>
