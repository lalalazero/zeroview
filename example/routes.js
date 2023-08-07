export const routes = [
  {
    path: "/",
    component: () => import("./docs/intro.md"),
    meta: {
      text: "介绍",
    },
  },
  {
    path: "/install",
    component: () => import("./docs/install.md"),
    meta: {
      text: "安装",
    },
  },
  {
    path: "/quickstart",
    component: () => import("./docs/quickstart.md"),
    meta: {
      text: "快速上手",
    },
  },
  {
    path: "/button",
    component: () => import("./docs/button.md"),
    meta: {
      group: "common",
      groupName: "通用组件",
      text: "Button",
    },
  },
  {
    path: "/icon",
    component: () => import("./docs/icon.md"),
    meta: {
      group: "common",
      groupName: "通用组件",
      text: "Icon",
    },
  },
  {
    path: "/input",
    component: () => import("./docs/input.md"),
    meta: {
      group: "input",
      groupName: "输入组件",
      text: "Input",
    },
  },
  {
    path: "/tag",
    component: () => import("./docs/tag.md"),
    meta: {
      group: "display",
      groupName: "展示组件",
      text: "Tag",
    },
  },
  {
    path: "/popover",
    component: () => import("./docs/popover.md"),
    meta: {
      group: "display",
      groupName: "展示组件",
      text: "Popover",
    },
  },
  {
    path: "/collapse",
    component: () => import("./docs/collapse.md"),
    meta: {
      group: "layout",
      groupName: "布局组件",
      text: "Collapse",
    },
  },
  {
    path: "/toast",
    component: () => import("./docs/toast.md"),
    meta: {
      group: "notice",
      groupName: "通知组件",
      text: "Toast",
    },
  },
  {
    path: "/tab",
    component: () => import("./docs/tab.md"),
    meta: {
      group: "layout",
      groupName: "布局组件",
      text: "Tab",
    },
  },
  {
    path: "/grid",
    component: () => import("./docs/grid.md"),
    meta: {
      group: "layout",
      groupName: "布局组件",
      text: "Grid",
    },
  },
  {
    path: "/layout",
    component: () => import("./docs/layout.md"),
    meta: {
      group: "layout",
      groupName: "布局组件",
      text: "Layout",
    },
  },
  {
    path: "/menu",
    component: () => import("./docs/menu.md"),
    meta: {
      group: "common",
      groupName: "通用组件",
      text: "Menu",
    },
  },
  {
    path: "/cascader",
    component: () => import("./docs/cascader.md"),
    meta: {
      group: "common",
      groupName: "通用组件",
      text: "Cascader",
    },
  },
  {
    path: "/carousel",
    component: () => import("./docs/carousel.md"),
    meta: {
      group: "display",
      groupName: "展示组件",
      text: "Carousel",
    },
  },
  {
    path: "/pagination",
    component: () => import("./docs/pagination.md"),
    meta: {
      group: "common",
      groupName: "通用组件",
      text: "Pagination",
    },
  },
  {
    path: "/table",
    component: () => import("./docs/table.md"),
    meta: {
      group: "display",
      groupName: "展示组件",
      text: "Table",
    },
  },
  {
    path: "/upload",
    component: () => import("./docs/upload.md"),
    meta: {
      group: "input",
      groupName: "录入组件",
      text: "Upload",
    },
  },
  {
    path: "/sticky",
    component: () => import("./docs/sticky.md"),
    meta: {
      group: "display",
      groupName: "展示组件",
      text: "Sticky",
    },
  },
  {
    path: "/datepicker",
    component: () => import("./docs/datepicker.md"),
    meta: {
      group: "input",
      groupName: "录入组件",
      text: "Datepicker",
    },
  },
  {
    path: "/scroll",
    component: () => import("./docs/scroll.md"),
    meta: {
      group: "common",
      groupName: "通用组件",
      text: "Scroll",
    },
  },
];
