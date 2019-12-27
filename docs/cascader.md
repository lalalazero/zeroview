## Cascader 级联选择

常用于省市区，公司层级的关联选择。

:::demo 基础的省市区级联，支持不限层数
```html
<z-view-cascader :options="options" :selected.sync="selected"></z-view-cascader>

<script>
export default {
  data(){
    return {
      options: [
        {
          id: '1',
          label: '四川',
          children: [
            {
              id: '1-1',
              label: '成都市',
              children: [
                {
                  id: '1-1-1',
                  label: '高新区'
                },
                {
                  id: '1-1-2',
                  label: '锦江区'
                },
                {
                  id: '1-1-3',
                  label: '金牛区'
                },
              ]
            },
            {
              id: '1-2',
              label: '泸州市',
              children: [
                {
                  id: '1-2-1',
                  label: '纳西区'
                },
                {
                  id: '1-2-2',
                  label: '江阳区'
                },
                {
                  id: '1-3-3',
                  label: '龙马谭区'
                },
              ]
            },
          ]
        },
        {
          id: '2',
          label: '重庆市',
          children: [
            {
              id: '2-1',
              label: '渝中区'
            },
            {
              id: '2-2',
              label: '北培区'
            }
          ]
        }
      ],
      selected: []
    }
  }
}
</script>
```
:::


:::demo 动态加载选项，指定节点 isLeaf 为 false，同时传入 loadData 加载数据的方法。需要自己去实现更新 options 的方法以及更新 loading 。
```html
<z-view-cascader :options="options" :load-data="loadData" :selected.sync="selected" :loading="loading"></z-view-cascader>
<script>
let dynamicData = [
  {
    parentId: '1',
    data: [
      {
        id: '1-1',
        label: '成都市',
        isLeaf: false
      },
      {
        id: '1-2',
        label: '泸州市',
      }
    ]
  },
  {
    parentId: '2',
    data: [
      {
        id: '2-1',
        label: '渝中区',
      },
      {
        id: '2-2',
        label: '北培区',
      }
    ]
  },
  {
    parentId: '1-1',
    data: [
      {
        id: '1-1-1',
        label: '高新区'
      },
      {
        id: '1-1-2',
        label: '天府新区'
      }
    ]
  }
]
export default {
  data(){
    return {
      options: [
        {
          id:'1',
          label: '四川省',
          isLeaf: false
        },
        {
          id:'2',
          label: '重庆市',
          isLeaf: false
        }
      ],
      selected: [],
      loading: [],
      found: false
    }
  },
  methods: {
    loadData(selectedOptions){
      let targetOption = selectedOptions[selectedOptions.length - 1]
      this.loading.push(targetOption.id)
      setTimeout(()=>{
        this.loading = this.loading.filter(id => id !== targetOption.id)
        let data = dynamicData.find(d => d.parentId === targetOption.id)
        if(data){
          this.resolve(targetOption.id, data.data)
        }
      },500)
      
    },
    resolve(selectId,data){
      this.found = false
      let target = this.options.find(option => option.id === selectId)
      if(target){
        this.found = true
        target.children = data
      }else if(!this.found){
        this.options.forEach(option => {
          if(!this.found){
            this.resolveChildren(selectId, data, option.children)
          }
        })
      }
      this.options = JSON.parse(JSON.stringify(this.options))
    },
    resolveChildren(selectId, data, children){
      if(children && children.length > 0){
        let target = children.find(option => option.id === selectId)
        if(target){
          this.found = true
          target.children = data
        }
      }
    }
  }
}
</script>
```
:::

### 属性 API

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| options | 可选项，数据格式为 { id:'id', label: 'label', children:[] } <br> id不可重复, label 用于展示, children 为子节点 | array | - | [] |
| selected | 被选中的节点 | array | - | [] | 
| load-data | 动态加载数据的方法，该方法会传递 selectedOptions 参数，表示用户当前选择的节点。<br>当需要动态加载时，options 里面的节点需要指定 isLeaf=false 属性<br> | function | - | - |
| loading | 指定哪些节点处于 loading 状态 | array | - | - |