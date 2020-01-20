## Table 表格

用来展示大量数据。

#### 基础表格
:::demo 基础表格
```html
<z-view-table :data-source="dataSource" :columns="columns"></z-view-table>
<script>
export default {
    data() {
    return {
      columns: [
        {
          index: "name",
          text: "姓名"
        },
        {
          index: "score",
          text: "分数"
        }
      ],
      dataSource: [
        {
          id: 1,
          name: "张三",
          score: 85
        },
        {
          id: 2,
          name: "李四",
          score: 99
        },
        {
          id: 3,
          name: "王麻子",
          score: 100
        },
        {
          id: 4,
          name: "狗蛋",
          score: 72
        },
        {
          id: 5,
          name: "翠花",
          score: 88
        },
        {
          id: 6,
          name: "丫丫",
          score: 60
        }
      ]
    };
  },
}
</script>
```
:::


#### 紧凑型表格
:::demo 紧凑型表格
```html
<z-view-table :data-source="dataSource" :columns="columns" compact></z-view-table>
<script>
export default {
    data() {
    return {
      columns: [
        {
          index: "name",
          text: "姓名"
        },
        {
          index: "score",
          text: "分数"
        }
      ],
      dataSource: [
        {
          id: 1,
          name: "张三",
          score: 85
        },
        {
          id: 2,
          name: "李四",
          score: 99
        },
        {
          id: 3,
          name: "王麻子",
          score: 100
        },
        {
          id: 4,
          name: "狗蛋",
          score: 72
        },
        {
          id: 5,
          name: "翠花",
          score: 88
        },
        {
          id: 6,
          name: "丫丫",
          score: 60
        }
      ]
    };
  },
}
</script>
```
:::

#### 带斑马纹表格
:::demo 带斑马纹表格
```html
<z-view-table :data-source="dataSource" :columns="columns" strip></z-view-table>
<script>
export default {
    data() {
    return {
      columns: [
        {
          index: "name",
          text: "姓名"
        },
        {
          index: "score",
          text: "分数"
        }
      ],
      dataSource: [
        {
          id: 1,
          name: "张三",
          score: 85
        },
        {
          id: 2,
          name: "李四",
          score: 99
        },
        {
          id: 3,
          name: "王麻子",
          score: 100
        },
        {
          id: 4,
          name: "狗蛋",
          score: 72
        },
        {
          id: 5,
          name: "翠花",
          score: 88
        },
        {
          id: 6,
          name: "丫丫",
          score: 60
        }
      ]
    };
  },
}
</script>
```
:::

#### 带边框表格
:::demo 带边框表格
```html
<z-view-table :data-source="dataSource" :columns="columns" bordered></z-view-table>
<script>
export default {
    data() {
    return {
      columns: [
        {
          index: "name",
          text: "姓名"
        },
        {
          index: "score",
          text: "分数"
        }
      ],
      dataSource: [
        {
          id: 1,
          name: "张三",
          score: 85
        },
        {
          id: 2,
          name: "李四",
          score: 99
        },
        {
          id: 3,
          name: "王麻子",
          score: 100
        },
        {
          id: 4,
          name: "狗蛋",
          score: 72
        },
        {
          id: 5,
          name: "翠花",
          score: 88
        },
        {
          id: 6,
          name: "丫丫",
          score: 60
        }
      ]
    };
  },
}
</script>
```
:::

#### 带选择和排序的表格 
:::demo selectable 配合 selectedItems 属性可以实现选择。在 columns 的对象中指定 sorter 属性即可实现排序, sortDirection 用来指定初始排序方向（升序或者降序）。 
```html
<z-view-table :data-source="dataSource" :columns="columns" selectable :selected-items.sync="selectedItems" @update:selectedItems="onSelectChange"></z-view-table>
<script>
export default {
    data() {
    return {
      columns: [
        {
          index: "name",
          text: "姓名"
        },
        {
          index: "score",
          text: "分数",
          sorter: (a , b) => a.score - b.score
        }
      ],
      dataSource: [
        {
          id: 1,
          name: "张三",
          score: 85
        },
        {
          id: 2,
          name: "李四",
          score: 99
        },
        {
          id: 3,
          name: "王麻子",
          score: 100
        },
        {
          id: 4,
          name: "狗蛋",
          score: 72
        },
        {
          id: 5,
          name: "翠花",
          score: 88
        },
        {
          id: 6,
          name: "丫丫",
          score: 60
        }
      ],
      selectedItems:[]
    };
  },
  methods: {
    onSelectChange(selectedItems){
      console.log('selectChange...')
      console.log(selectedItems)
    }
  }
}
</script>
```
:::


### 属性 API

| 参数      | 说明    | 类型      | 可选值       | 默认值   | 是否必填 |
|---------- |-------- |---------- |-------------  |-------- |-------- |
| columns | 表头数据，形如 {index:'name',text:'姓名'} | array | - | [] | - |
| dataSource | 表格数据，比如包含 id 属性 | array | - | [] | - |
| compact | 紧凑型表格 | boolean | - | false | - |
| strip | 带斑马纹的表格 | boolean | - | false | - |
| bordered | 带边框的表格 | boolean | - | false | - |
| sorter | 排序方法，需要指定在 columns 的对象里。形如 [ {index: 'age', sorter: (a,b) => a.age - b.age }]。只有指定了 sorter 属性才会开启排序。 | function(a,b){}，a,b是回传的dataSource里的对象 | - | - | - |
| sortDirection | 初始排序方向，需要指定在 columns 的对象里。形如 [ {index: 'age', sortDirection: 'asc' }] | string | - | - | - |
| selectable | 是否开启选择 | boolean | - | false | - |
| selectedItems | 被选中的对象，需要 .sync 语法否则不起作用 | array | - | [] | - | 