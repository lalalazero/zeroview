<template>
  <div class="z-view-toast-wrapper" :class="toastClasses">
    <div class="z-view-toast" ref="toast" >
      <div class="message">
        <slot v-if="!enableHTML"></slot>
        <div v-else class="content" v-html="$slots.default[0]"></div>
      </div>
      <div class="line" ref="line" v-if="closeButton"></div>
      <span class="close" v-if="closeButton" @click="onClickClose">{{closeButton.text}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "zViewToast",
  props: {
    enableHTML: {
      type: Boolean,
      default: false
    },
    autoClose: {
      type: [Boolean, Number],
      default: 2,
      validator(value){
        return value === false || typeof value === 'number'
      }
    },
    // autoCloseDelay: {
    //   type: Number,
    //   default: 5
    // },
    closeButton: {
      type: Object,
      // default() {
      //   return {
      //     text: "close",
      //     callback: undefined
      //   };
      // }
    },
    position: {
      type: String,
      default: 'top',
      validator(value){
        // console.log('11',value)
        return ['bottom','middle','top'].indexOf(value) >= 0
      }
    }
  },
  computed:{
    toastClasses(){
      return [`position-${this.position}`]
    }
  },
  methods: {
    setAutoClose() {
      if (this.autoClose) {
        window.setTimeout(() => {
          this.close();
        }, this.autoClose * 1000);
      }
    },
    updateStyles() {
      this.$nextTick(() => {
        if(this.$refs.toast){
          let height = this.$refs.toast.getBoundingClientRect().height;
          if(this.$refs.line){
            this.$refs.line.style.height = `${height}px`;
          }
        }

      });
    },
    close() {
      this.$el.remove();
      this.$emit('close');
      this.$destroy();
    },
    onClickClose() {
      this.close();
      const { closeButton } = this;
      const { callback } = closeButton;
      if (closeButton && callback && typeof callback === "function") {
        this.closeButton.callback(this);
      }
    }
  },
  mounted() {
    this.updateStyles();
    this.setAutoClose();
  }
};
</script>
<style lang="scss" scoped>

  @keyframes slide-up {
    0% { opacity: 0; transform: translateY(100%);}
    100% { opacity: 1; transform: translateY(0%);}
  }
  @keyframes slide-down {
    0% { opacity: 0; transform: translateY(-100%);}
    100% { opacity: 1; transform: translateY(0%);}
  }
  @keyframes fade-in {
    0% { opacity: 0;}
    100% { opacity: 1;}
  }
  // 外层做定位
.z-view-toast-wrapper {
  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  // .toast {
  //   animation: fade-in 1s;
  // }

  &.position-top {
    // bottom: 0;
    // top: unset;
    .toast {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      animation: slide-down $animation-duration;
    }
  }

  &.position-bottom {
    bottom: 0;
    top: unset;
    .toast {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      animation: slide-up $animation-duration;
    }
  }
  &.position-middle {
    top: 50%;
    bottom: unset;
    transform: translateX(-50%) translateY(-50%);
    .toast {
      animation: fade-in $animation-duration;
    }
  }
}
// toast做动画
.z-view-toast {
  // animation: slide-up 1s;
  padding: 0 16px;
  color: white;
  background: $toast-bg;
  min-height: $toast-height;
  font-size: $font-size;
  line-height: 1.8;
  border-radius: $border-radius;
  display: flex;
  align-items: center;
  .message {
    padding: 8px 0;
  }
  .close {
    flex-shrink: 0;
  }
  .line {
    height: 100%;
    border: 1px solid $bg-white;
    margin: 0 16px;
  }
}
</style>
