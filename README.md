# 一款基于react的tree组件

#### 这是一款轻量的tree组件,可以异步加载,可以自定义节点,支持巨量数据渲染等等功能

[Tree Demo](https://codesandbox.io/s/react-tree-th-demo-xe7zx "Tree Demo")

## Props

|  参数 |  说明   |  类型   |  默认值   |
| ------------ | ------------ | ------------ | ------------ |
| data | 数据源 | `array<{id, value, [sub, expand, isLeaf]}>` | - |
| showLine        |   是否展示连接线   |   `boolean`   |   false     |
| showExpand        |   是否展示收缩器按钮   |   `boolean`   |   true     |
| expandStyle        |   收缩器按钮类型   |   `string`   |   plus     |
| expandColor        |   收缩器按钮颜色   |   `string`   |   rgba(0, 0, 0, 0.4)     |
| lineColor        |   连接线颜色   |   `string`   |   rgba(0, 0, 0, 0.4)     |
| hoverBgColor        |   鼠标移入颜色(传入false则无效果)   |   `string`   |   #e1e1fa     |
| hoverBlock        |   触发鼠标移入的区域   |   `string`   |   inline     |
| lineBoxWidth        |    连接区域宽度    |  `string`  |   30px     |
| itemRender        |    自定义渲染节点    |  `({nodeData, index, parentData}) => ReactNode`  |    -    |
| itemStyle        |   节点样式   |   `CSSProperties`   |   { padding: '4px' }     |
| defaultExpand    |    默认是否展开    |  `boolean`  |    true  |
| height    |    开启虚拟滚动    |  `boolean | number | string`  |    false  |
| itemSize    |    单行高度    |  `number`  |    24  |
| loadData    |    异步加载数据(节点必须有isLeaf属性才可以触发)    |  `(nodeData) => Promise`  |    -  |
| onClick    |    点击事件    |  `function(nodeData)`  |    -  |
| onChange        |    组件数据变化时触发    |  `function(nodeData)`  |     -  |

## Ref

|  参数 |  说明   |  类型   |  默认值   |
| ------------ | ------------ | ------------ | ------------ |
| update | 在某些特殊情况下(eg: 自定义渲染节点并且操作节点数据)，需要手动更新组件数据 | `() => void` | - |
| change | 在某些特殊情况下(eg: 自定义渲染节点并且操作节点数据)，需要手动向上传递组件数据 | `() => void` | - |


### Data Props

```javascript
[
  {
    id: '1-1', // key(非必须,在生成树时如果没有会自动生成)
    value: '一级标题', // 展示文案
    expand: true, // 是否展开(非必须 & 同时设置defaultExpand的情况下，此处位置优先级最高)
    isLeaf: true, // 设置为叶子节点(非必须)
    sub: [ // 子节点(非必须)
      {
        id: '2-1',
        value: '二级标题',
        sub: [
          {
            id: '3-1',
            value: '三级标题'
          }
        ]
      }
    ]
  }
]
```


### ExpandStyle Props

- [x] plus
- [x] triangle

### HoverBlock Props

- [x] inline
- [x] block

