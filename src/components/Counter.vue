<template lang="html">
  <div class="counter">
    <button type="button" name="minus"
    @mousedown="operateHandle"
    @mouseup="operateHandle"
    @click="minus">-</button>

    <input type="text" name=""
    @keypress="onkeypress"
    v-model.number="counter">

    <button type="button" name="add"
    @mousedown="operateHandle"
    @mouseup="operateHandle"
    @click="add" >+</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    maximum: {
      type: Number,
      default: 99
    },
    minimum: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      counter: 1,
      intervalId: 　0
    }
  },
  methods: {
    add() {
      if (this.counter + 1 > this.maximum) return;
      this.counter++;
    },
    minus() {
      if (this.counter - 1 < this.minimum) return;
      this.counter--;
    },
    onkeypress(e) {
      if (!(e.keyCode >= 48 && e.keyCode <= 57))
        e.preventDefault();
      if (parseInt(this.counter + e.key) > this.maximum)
        e.preventDefault();
    },
    operateHandle(e) {
      if (e.type == 'mousedown') {
        if (e.target.name == 'add') {
          this.intervalId = setInterval(() => {
            this.add();
          }, 180);
        } else if (e.target.name == 'minus') {
          this.intervalId = setInterval(() => {
            this.minus();
          }, 180);
        }
      } else if (e.type == 'mouseup') {
        clearInterval(this.intervalId);
      }
    }
  },
  watch: {
    counter(newValue, oldValue) {
      if (this.counter === '') {
        this.counter = oldValue;
      }
      this.$emit('receiveData', this.counter, 'counter')
    }
  },
  mounted() {
    document.addEventListener('mouseup', () => clearInterval(this.intervalId));
    // console.log('attr: ',this.$attrs);
    // console.log('props: ',this.$props);
    // console.log('el: ',this.$el);
    // console.log('options: ',this.$options);
    // console.log('parent: ',this.$parent);
    // console.log('root: ',this.$root);
  }
}
</script>

<style lang="less" scoped>
.counter {
    user-select: none;
    display: flex;
    margin: 0 20px;
    width: 100px;
    height: 25px;
    input {
        width: 30px;
        border: 2px solid #f1efed;
        outline: none;
        text-align: center;
        flex: 3 30px;
    }
    button {
        background-color: #f1efed;
        border: 2px solid #f1efed;
        outline: none;
        cursor: pointer;
        flex: 1 20px;
        &:hover {
            background-color: #4fc08d;
            border: 2px solid #4fc08d;
        }
        &:active {
            background-color: #4fa08d;
            border: 2px solid #4fa08d;
        }
    }
}
</style>
