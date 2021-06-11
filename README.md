# 一款基于 react 的 tree 组件

#### 这是一款轻量的 tree 组件,可以异步加载,可以自定义节点,支持巨量数据渲染等等功能

[Tree Demo](https://codesandbox.io/s/react-tree-th-demo-xe7zx 'Tree Demo')

## Props

| 参数          | 说明                                           | 类型                                             | 默认值                                   |
| ------------- | ---------------------------------------------- | ------------------------------------------------ | ---------------------------------------- |
| className     | 节点类名                                       | `string`                                         | -                                        |
| style         | 节点样式                                       | `CSSProperties`                                  | -                                        |
| data          | 数据源                                         | `array<{id, value, [sub, expand, isLeaf]}>`      | []                                       |
| expandedKeys  | 展开指定的树节点                               | `string[]`                                       | -                                        |
| showLine      | 是否展示连接线                                 | `boolean`                                        | false                                    |
| showExpand    | 是否展示收缩器按钮                             | `boolean`                                        | true                                     |
| expandStyle   | 收缩器按钮类型                                 | `string`                                         | plus                                     |
| expandColor   | 收缩器按钮颜色                                 | `string`                                         | rgba(0, 0, 0, 0.4)                       |
| lineColor     | 连接线颜色                                     | `string`                                         | rgba(0, 0, 0, 0.4)                       |
| hoverBgColor  | 鼠标移入颜色(传入 false 则无效果)              | `string`                                         | #e1e1fa                                  |
| hoverBlock    | 触发鼠标移入的区域                             | `string`                                         | inline                                   |
| lineBoxWidth  | 连接区域宽度                                   | `string`                                         | 30px                                     |
| itemRender    | 自定义渲染节点                                 | `(nodeData, index, parentData) => ReactNode`     | -                                        |
| itemStyle     | 节点样式                                       | `CSSProperties`                                  | { padding: '4px', whiteSpace: 'nowrap' } |
| defaultExpand | 默认是否展开                                   | `boolean`                                        | true                                     |
| height        | 开启虚拟滚动                                   | `boolean | number`                               | false                                    |
| itemSize      | 单行高度                                       | `number`                                         | 24                                       |
| loadData      | 异步加载数据(节点必须有 isLeaf 属性才可以触发) | `(nodeData) => Promise`                          | -                                        |
| onExpand      | 展开/收起节点时触发                            | `function(expandedKeys, {expanded: bool, node})` | -                                        |
| onClick       | 点击事件                                       | `function(nodeData)`                             | -                                        |
| onChange      | 组件数据变化时触发                             | `function(nodeData)`                             | -                                        |

## Ref

| 参数   | 说明                                                                           | 类型         | 默认值 |
| ------ | ------------------------------------------------------------------------------ | ------------ | ------ |
| update | 在某些特殊情况下(eg: 自定义渲染节点并且操作节点数据)，需要手动更新组件数据     | `() => void` | -      |
| change | 在某些特殊情况下(eg: 自定义渲染节点并且操作节点数据)，需要手动向上传递组件数据 | `() => void` | -      |

### Data Props

```javascript
[
  {
    id: '1-1', // key
    value: '一级标题', // 展示文案
    expand: true, // 是否展开
    isLeaf: true, // 设置为叶子节点(设置了 loadData 时有效)。为 false 时会强制将其作为父节点
    sub: [
      // 子节点(非必须)
      {
        id: '2-1',
        value: '二级标题',
        sub: [
          {
            id: '3-1',
            value: '三级标题',
          },
        ],
      },
    ],
  },
];
```

### ExpandStyle Props

- [x] plus
- [x] triangle

### HoverBlock Props

- [x] inline
- [x] block
