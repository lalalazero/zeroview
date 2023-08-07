<template>
  <div class="demo-block">
    <div class="demo-content">
      <div class="source">
        <slot name="source"></slot>
      </div>

      <div class="html">
        <div class="code-toggle" @click="codeVisible = !codeVisible" @mouseenter="onMouseEnter"
          @mouseleave="onMouseLeave">
              <z-view-icon name="down" ></z-view-icon>
            <span v-if="spanVisible && !codeVisible">查看代码</span>
            <span v-if="codeVisible">隐藏代码</span>
          </div>
          <div class="demo-script" v-show="codeVisible">
            <div class="description">
              <slot name="description"></slot>
            </div>
            <slot name="highlight"></slot>
          </div>
        </div>
      </div>
    </div
>
</template>
<script>
export default {
  name: "DemoBlock",
  data() {
    return {
      codeVisible: false,
      spanVisible: false,
    };
  },
  methods: {
    onMouseEnter() {
      this.spanVisible = true
    },
    onMouseLeave() {
      this.spanVisible = false
    }
  },
  mounted() { }
};
</script>
<style lang="scss" scoped>

.demo-block {
  border: 1px solid $border-color-ant-design;
  border-bottom: none;
  margin: 10px 0;

  code {
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
  }

  .description {
    >p {
      margin: 14px 20px;
      font-size: 14px;
      color: #5e6d82;
      line-height: 1.5em;
    }
  }

  .demo-content {
    border-radius: 3px;
  }

  .source {
    padding: 20px;
    border-bottom: 1px solid $border-color-ant-design;
  }

  .html {
    .code-toggle {
      border-bottom: 1px solid $border-color-ant-design;
      padding: 10px 0;
      text-align: center;
      font-size: 15px;
      color: $bg-gray-light;

      .z-view-icon {
        transition: all 300ms;
      }

      &:hover {
        .z-view-icon {
          transform: rotate(180deg);
          fill: $active-color;
        }

        span {
          transition: all 300ms;
          color: $active-color;
        }
      }

      .z-view-icon {
        margin-right: 10px;
        fill: $bg-gray-light;

      }
    }

    .demo-script {
      background: #fafafa;
      padding: 5px;
    }
  }
}
</style>
