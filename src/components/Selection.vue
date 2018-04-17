<template lang="html">
  <div class="selection">
    <span v-for="(option,index) in options"
     @click="selectToggle(index)"
      class="option"
      :class="{optionSelected:isSelected[index]}">
      {{option}}</span>
  </div>
</template>

<script>
export default {
  name: 'selection',
  props: {
    options: {
      type: Array,
      default: () => ['初级版', '中级版', '高级版', '专家版']
    },
    multiple: {
      type: Boolean,
      default: true
    },
    dataName: {
      type: String,
      default: 'selection'
    }
  },
  created() {
    this.options.forEach(() => {
      this.isSelected.push(false);
    })
      this.isSelected[0] = true;
  },
  data() {
    return {
      isSelected: [],
      selectedOptions: []
    }
  },
  methods: {
    selectToggle(selectedindex) {

      if (this.multiple) {
        let currentState = this.isSelected[selectedindex];
        this.isSelected.splice(selectedindex, 1, !currentState);
        this.selectedOptions.splice(0);
        this.isSelected.forEach((selected, index) => {
          if (selected) {
            this.selectedOptions.push(this.options[index])
          }
        })
      } else {
        this.isSelected.forEach((value, index) => {
          this.isSelected.splice(index, 1, false);
        });
        this.isSelected.splice(selectedindex, 1, true);
        this.selectedOptions.splice(0);
        this.selectedOptions.push(this.options[selectedindex]);
      }
    }
  },
  watch: {
    selectedOptions(n,o) {
      this.$emit('receiveData', this.selectedOptions, this.dataName);
    }
  }
}
</script>

<style lang="less" scoped>
.selection {
    user-select: none;
    cursor: pointer;
    margin: 0 20px;
    text-align: center;
    position: relative;
    height: 25px;
    .option {
        cursor: pointer;
        display: inline-block;
        padding: 3px 10px;
        border: 2px solid #f1efed;
        margin-right: 5px;
        border-radius: 5px;
        &.optionSelected {
            background-color: #4fc08d;
            border: 2px solid #4fc08d;
            color: white;
        }
        &:active {
            box-shadow: 0 0 5px #4fc08d;
        }
    }
}
</style>
