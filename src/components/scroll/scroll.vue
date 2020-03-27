<template>
  <div class="z-view-scroll-wrapper" ref="parent" @wheel="onWheel" @mouseleave="onMouseLeave">
    <div class="z-view-scroll" ref="child">
      <slot></slot>
    </div>
    <div class="z-view-scroll-track" ref="track">
      <div
        class="z-view-scroll-bar"
        ref="bar"
        @mousedown="onMouseDownAtScrollBar"
        @selectstart="onSelectStart"
      >
        <div class="z-view-scroll-bar-inner"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "zViewScroll",
  data() {
    return {
      canScroll: true,
      contentTranslateY: 0,
      contentMaxScrollHeight: 0,
      parentHeight: 0,
      childHeight: 0,
      isScrolling: false,
      startPosition: [0, 0],
      endPosition: [0, 0],
      maxScrollBarMovingHeight: 0,
      scrollBarTranslateY: 0
    };
  },
  beforeDestroy() {
    this.removeDocumentLisenter();
  },
  mounted() {
    this.initHeight();
    this.initScrollBarHeight();
    this.addDocumentLisenter();
  },
  methods: {
    initScrollBarHeight() {
      if (!this.canScroll) return;
      // 高度占比应相等
      // scrollBarHeight 除以 parentHeight === parentHeight 除以 childHeight
      let { contentTranslateY, parentHeight, childHeight } = this;
      let scrollBarHeight = Math.round(
        (parentHeight * parentHeight) / childHeight
      );
      this.$refs.bar.style.height = `${scrollBarHeight}px`;

      // 计算滚动条最大滑动高度
      this.maxScrollBarMovingHeight = this.parentHeight - scrollBarHeight;
    },
    translateScrollBar() {
      // 滑动比例应相等
      // y 除以 parentHeight === contentTranslateY 除以 childHeight
      let { parentHeight, childHeight, contentTranslateY } = this;
      this.scrollBarTranslateY = Math.round(
        (parentHeight * contentTranslateY) / childHeight
      );
      this.$refs.bar.style.transform = `translateY(${this.scrollBarTranslateY}px)`;
    },
    onWheel(e) {
      if (!this.canScroll) return;
      let { contentTranslateY, contentMaxScrollHeight } = this;
      let { deltaY } = e;
      contentTranslateY += deltaY;
      if (contentTranslateY < 0) {
        // console.log('滑动到顶部了')
        contentTranslateY = 0;
      } else if (
        contentTranslateY > contentMaxScrollHeight &&
        contentMaxScrollHeight > 0
      ) {
        // console.log('滑动到底部了')
        contentTranslateY = contentMaxScrollHeight;
      } else {
        e.preventDefault();
      }
      this.contentTranslateY = contentTranslateY;
      this.$refs.child.style.transform = `translateY(${-contentTranslateY}px)`;
      this.translateScrollBar();
    },
    initHeight() {
      this.childHeight = this.$refs.child.getBoundingClientRect().height;
      this.parentHeight = this.$refs.parent.getBoundingClientRect().height;
      this.calculateContentMaxScrollHeight();
    },
    calculateContentMaxScrollHeight() {
      let {
        borderTopWidth,
        borderBottomWidth,
        paddingTop,
        paddingBottom
      } = window.getComputedStyle(this.$refs.parent);
      borderTopWidth = parseInt(borderTopWidth);
      borderBottomWidth = parseInt(borderBottomWidth);
      paddingTop = parseInt(paddingTop);
      paddingBottom = parseInt(paddingBottom);
      let contentMaxScrollHeight = Math.round(
        this.childHeight -
          this.parentHeight +
          (borderTopWidth + borderBottomWidth + paddingTop + paddingBottom)
      );
      if (contentMaxScrollHeight <= 0) {
        // console.log('不需要滚动')
        this.canScroll = false;
      }
      this.contentMaxScrollHeight = contentMaxScrollHeight;
    },
    onMouseDownAtScrollBar(e) {
      if (!this.canScroll) return;
      let { screenX, screenY } = e;
      this.isScrolling = true;
      this.startPosition = [screenX, screenY];
      this.endPosition = [screenX, screenY];
    },
    addDocumentLisenter() {
      document.addEventListener("mousemove", this.onScrollBarMoving);
      document.addEventListener("mouseup", this.stopScrollBarMove);
    },
    removeDocumentLisenter() {
      document.removeEventListener("mousemove", this.onScrollBarMoving);
      document.removeEventListener("mouseup", this.stopScrollBarMove);
    },
    onScrollBarMoving(e) {
      let {
        isScrolling,
        startPosition,
        endPosition,
        maxScrollBarMovingHeight
      } = this;
      if (isScrolling) {
        let { screenX, screenY } = e;
        this.endPosition = [screenX, screenY];
        let deltaX = endPosition[0] - startPosition[0];
        let deltaY = endPosition[1] - startPosition[1];
        this.startPosition = endPosition;
        this.scrollBarTranslateY += deltaY;
        if (this.scrollBarTranslateY < 0) {
          this.scrollBarTranslateY = 0;
        } else if (this.scrollBarTranslateY > maxScrollBarMovingHeight) {
          this.scrollBarTranslateY = maxScrollBarMovingHeight;
        }
        this.$refs.bar.style.transform = `translateY(${this.scrollBarTranslateY}px)`;
        this.scrollContentTogether();
      }
    },
    scrollContentTogether() {
      // 等比关系
      // scrollBarTranslateY 除以 parentHeight = contentTranslateY 除以 childHeight
      let { scrollBarTranslateY, parentHeight, childHeight } = this;
      this.contentTranslateY = Math.round(
        (childHeight * scrollBarTranslateY) / parentHeight
      );
      this.$refs.child.style.transform = `translateY(${-this
        .contentTranslateY}px)`;
    },
    stopScrollBarMove(e) {
      this.isScrolling = false;
    },
    onSelectStart(e) {
      e.preventDefault();
    },
    onMouseLeave(e) {
      this.isScrolling = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.z-view-scroll {
  transition: transform 0.05s ease;
  &-wrapper {
    position: relative;
    // border: 1px solid red;
    overflow: hidden;
  }
  &-track {
    position: absolute;
    height: 100%;
    width: 14px;
    top: 0;
    right: 0;
    border-left: 1px solid #e8e7e8;
    border-right: 1px solid #e8e7e8;
    background: #fafafa;
    opacity: 0.9;
  }
  &-bar {
    position: absolute;
    height: 40px;
    width: 12px;
    &-inner {
      height: 100%;
      border-radius: 4px;
      background: #c2c2c2;
      &:hover {
        background: #7d7d7d;
      }
    }
  }
}
</style>
