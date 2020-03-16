## Table 表格

用来展示大量数据。

#### 基础表格
:::demo 基础表格
```html
<z-view-table :data-source="dataSource">
  <z-view-table-column index="name" text="姓名"></z-view-table-column>
  <z-view-table-column index="score" text="分数"></z-view-table-column>
</z-view-table>
<script>
export default {
    data() {
    return {
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
<z-view-table :data-source="dataSource" compact>
  <z-view-table-column index="name" text="姓名"></z-view-table-column>
  <z-view-table-column index="score" text="分数"></z-view-table-column>
</z-view-table>
<script>
export default {
    data() {
    return {
      
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
<z-view-table :data-source="dataSource"  strip>
  <z-view-table-column index="name" text="姓名"></z-view-table-column>
  <z-view-table-column index="score" text="分数"></z-view-table-column>
</z-view-table>
<script>
export default {
    data() {
    return {
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

#### 带边框和加载状态表格
:::demo 带边框表格
```html
<z-view-button type="primary" @click="onClick">点我切换</z-view-button>
<z-view-table :data-source="dataSource" bordered :loading="loading">
  <z-view-table-column index="name" text="姓名"></z-view-table-column>
  <z-view-table-column index="score" text="分数"></z-view-table-column>
</z-view-table>
<script>
export default {
    methods: {
      onClick(){
        this.loading = !this.loading
      }
    },
    data() {
    return {
      loading: true,
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
:::demo selectable 配合 selectedItems 属性可以实现选择。指定 sorter 属性即可实现排序, sortDirection 用来指定初始排序方向（升序或者降序）。 
```html
<z-view-table :data-source="dataSource" selectable :selected-items.sync="selectedItems" @update:selectedItems="onSelectChange">

  <z-view-table-column index="name" text="姓名"></z-view-table-column>
  <z-view-table-column index="score" text="分数" :sorter="(a , b) => a.score - b.score"></z-view-table-column>
</z-view-table>
<script>
export default {
    data() {
    return {
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

#### 固定表头
:::demo 指定 fixedHeader 属性为 true，同时传入列的 width，否则可能出现对不齐的情况。建议留最后一行自适应宽度。 
```html
<z-view-table :height="300" :data-source="dataSource" fixedHeader>
  <z-view-table-column index="name" text="姓名" :width="200"></z-view-table-column>
  <z-view-table-column index="score" text="分数"></z-view-table-column>
</z-view-table>
<script>
export default {
    data() {
    return {
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
        },
        {
          id: 7,
          name: "翠花",
          score: 88
        },
        {
          id: 8,
          name: "翠花",
          score: 88
        },
        {
          id: 9,
          name: "翠花",
          score: 88
        },
        {
          id: 10,
          name: "翠花",
          score: 88
        },
        {
          id: 11,
          name: "翠花",
          score: 88
        },
        {
          id: 12,
          name: "翠花",
          score: 88
        },
        {
          id: 13,
          name: "翠花",
          score: 88
        },
        {
          id: 14,
          name: "翠花",
          score: 88
        },
        {
          id: 15,
          name: "翠花",
          score: 88
        },
        {
          id: 16,
          name: "翠花",
          score: 88
        },
        {
          id: 17,
          name: "翠花",
          score: 88
        },
        {
          id: 18,
          name: "翠花",
          score: 88
        },
        {
          id: 19,
          name: "翠花",
          score: 88
        },
        {
          id: 20,
          name: "翠花",
          score: 88
        }
      ],
    };
  }
  
}
</script>
```
:::


#### 可展开的行
:::demo 指定 expandKey 属性为展开的信息 
```html
<z-view-table :data-source="dataSource" expandKey="desc">
  <z-view-table-column index="name" text="姓名"></z-view-table-column>
  <z-view-table-column index="score" text="分数"></z-view-table-column>
</z-view-table>
<script>
export default {
  data() {
    return {
      dataSource: [
        {
          id: 1,
          name: "张三",
          score: 85,
          desc: "张三是个男孩子"
        },
        {
          id: 2,
          name: "李四",
          score: 99,
          desc: "李四体育成绩好"
        },
        {
          id: 3,
          name: "王麻子",
          score: 100,
        },
        {
          id: 4,
          name: "狗蛋",
          score: 72,
          desc: "狗蛋喜欢写诗歌"
        },
        {
          id: 5,
          name: "翠花",
          score: 88,
          desc: "翠花是文艺委员"
        }
      ]
    }
  }
}
</script>
```
:::


#### 可操作列
:::demo 通过 column 定制操作按钮 
```html
<z-view-table :data-source="dataSource" >
  <z-view-table-column index="name" text="姓名"></z-view-table-column>
  <z-view-table-column index="score" text="分数"></z-view-table-column>
  <z-view-table-column index="addr" text="地址"></z-view-table-column>

  <z-view-table-column index="action" text="操作">
    <template slot-scope="props">
     <div>
       <button @click="edit(props)">edit</button>
       <button @click="view(props)">view</button>
     </div> 
    </template>
  </z-view-table-column>
 
</z-view-table>
<script>
export default {
  methods: {
    edit(item) {
      alert(`编辑了id=${item.id}`);
    },
    view(item) {
      alert(`查看了id=${item.id}`);
    }
  },
  data() {
    return {
      item: undefined,
      dataSource: [
        {
          id: 1,
          name: "张三",
          score: 85,
          addr: "中国四川成都市天府新区麓山大道"
        },
        {
          id: 2,
          name: "李四",
          score: 99,
          addr: "中国四川成都市天府新区麓山大道"
        },
        {
          id: 3,
          name: "王麻子",
          score: 100,
          addr: "中国四川成都市天府新区麓山大道"
        },
        {
          id: 4,
          name: "狗蛋",
          score: 72,
          addr: "中国四川成都市天府新区麓山大道"
        },
        {
          id: 5,
          name: "翠花",
          score: 88,
          addr: "中国四川成都市天府新区麓山大道"
        },
        
      ],
      selectedItems: []
    };
  }
}
</script>

```
:::


### 属性 API

#### Table

| 参数      | 说明    | 类型      | 可选值       | 默认值   | 是否必填 |
|---------- |-------- |---------- |-------------  |-------- |-------- |
| dataSource | 表格数据，比如包含 id 属性 | array | - | [] | - |
| compact | 紧凑型表格 | boolean | - | false | - |
| strip | 带斑马纹的表格 | boolean | - | false | - |
| bordered | 带边框的表格 | boolean | - | false | - |
| selectable | 是否开启选择 | boolean | - | false | - |
| selectedItems | 被选中的对象，需要 .sync 语法否则不起作用 | array | - | [] | - | 
| loading | 表格加载状态 | boolean | - | false | - |
| height | 表格高度,固定表头时需要 | number | - | - | - |
| fixedHeader | 是否固定表头，如果固定，需要指定column的 width 属性，否则可能表头会对不齐 | boolean | - | false | - |
| expandKey | 展开行的信息，值为列名 | string | - | - | - |

#### TableColumn
| 参数      | 说明    | 类型      | 可选值       | 默认值   | 是否必填 |
|---------- |-------- |---------- |-------------  |-------- |-------- |
| index | data的key | string  | - | - | 是 |
| text | 列名 | string | - | - | 是 |
| width | 列的宽度 | number | - | - | - |
| sorter | 排序方法 | function(a,b) | - | - | - |
| sortDirection | 初始排序方向  | string | 'desc','asc' | - | - |
