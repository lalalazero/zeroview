<template>
  <z-view-layout id="example" :has-sider="false">
    <template v-slot:header>
      <Header />
    </template>
    <template v-slot:content>
      <z-view-layout>
        <template v-slot:sider>
          <z-view-menu
            direction="vertical"
            class="nav-menu"
            :selected="selected"
          >
            <z-view-menu-item
              v-for="(item, index) in routes"
              :key="index"
              :name="item.path"
            >
                    <a @click="click(item)">
                      {{ item.meta.text }}
                    </a>
            </z-view-menu-item>
          </z-view-menu>
        </template>
        <template v-slot:content>
          <router-view></router-view>
        </template>
      </z-view-layout>
    </template>
  </z-view-layout>
</template>
<script>
import "highlight.js/styles/github.css";
import { routes } from "./routes.js";
import Header from "./layout-header.vue";
export default {
  components: { Header },
  watch: {
    // $route(to, from) {
    //   if (to.path === "/") {
    //     this.selected = "intro";
    //   } else {
    //     this.$nextTick(() => {
    //       this.selected = to.path.substr(1);
    //     });
    //   }
    // },
  },
  data() {
    return {
      selected: "",
      routes,
    };
  },
  methods: {
    click(item) {
      this.selected = item.path
      this.$router.push({ path: item.path })
    }
  },
  mounted() {
    // this.click({ path: '/intro' })
  },
};
</script>
<style lang="scss">
@import "./style-reset.scss";
#example {
  margin: 0 auto;
  width: 90%;
  min-height: 100vh;
}

#content {
  padding: 0;
}
.z-view-sider {
  width: 200px;
  a {
    color: inherit;
  }
  .nav-menu {
    padding-top: 20px;
    height: 100%;
    a {
      text-decoration: none;
    }
  }

  .z-view-menu-item > a {
    padding: 5px 10px;
    display: block;
    &:hover {
      color: $active-color;
    }
  }
}
.z-view-content {
  code {
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
    font-size: 85%;
    margin: 0;
    padding: 0.2em 0.4em;
  }
  pre {
    background-color: #f6f8fa;
    border-radius: 3px;
    font-size: 85%;
    line-height: 1.45;
    overflow: auto;
    padding: 16px;
  }
  pre code {
    background-color: transparent;
    border: 0;
    display: inline;
    line-height: inherit;
    margin: 0;
    max-width: auto;
    overflow: visible;
    padding: 0;
    word-wrap: normal;
  }

  padding: 20px 40px;
  .component-doc {
    > h2,
    > h3,
    > h4,
    > h5 {
      font-weight: 400;
      color: #1f2f3d;
    }
    > h3 {
      font-size: 22px;
      margin: 20px 0 10px;
    }
    > h4 {
      margin: 10px 0;
    }
    > p {
      margin: 14px 0;
      font-size: 14px;
      color: #5e6d82;
      line-height: 1.5em;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      background-color: #fff;
      font-size: 14px;
      // margin: 20px 0;
      // margin-bottom: 45px;
      line-height: 1.5em;
      th:first-child {
        padding-left: 10px;
      }
      th {
        text-align: left;
        white-space: nowrap;
        color: #909399;
        font-weight: 400;
      }
      td {
        color: #606266;
      }
      th,
      td {
        border-bottom: 1px solid #dcdfe6;
        padding: 15px;
        max-width: 250px;
      }
    }
  }
}
</style>
