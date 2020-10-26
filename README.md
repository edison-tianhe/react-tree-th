# 一款基于react的tree组件

#### 一款什么都可以改的组件

## Props

|  参数 |  说明   |  类型   |  默认值   |
| ------------ | ------------ | ------------ | ------------ |
| data | 数据源 | `array<{id, value, [sub, expand]}>` | - |
| showLine        |   是否展示连接线   |   `boolean`   |   false     |
| showExpand        |   是否展示收缩器按钮   |   `boolean`   |   true     |
| expandStyle        |   收缩器按钮类型   |   `string`   |   plus     |
| lineColor        |   连接线颜色   |   `string`   |   rgba(0, 0, 0, 0.4)     |
| lineBoxWidth        |    连接区域宽度    |  `string`  |   30px     |
| itemRender        |    自定义渲染节点    |  `({nodeData, index, parentData}) => ReactNode`  |    -    |
| defaultExpand    |    默认是否展开    |  `boolean`  |    true  |
| onClick    |    点击事件    |  `function(nodeData)`  |    -  |
| onChange        |    组件数据变化时触发    |  `function(nodeData)`  |     -  |

## Ref

|  参数 |  说明   |  类型   |  默认值   |
| ------------ | ------------ | ------------ | ------------ |
| update | 在某些特殊情况下，需要手动更新组件数据 | `() => void` | - |


### Data Props

```javascript
[
  {
    id: '1-1', // key
    value: '一级标题', // 展示文案
    expand: true, // 是否展开(非必须 & 同时设置defaultExpand的情况下，此处位置优先级最高)
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

