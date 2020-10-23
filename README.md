# 一款基于react的tree组件

----

### Props

| 参数        | 说明   |  类型  |  默认值  |

| --------   | -----:  | :----:  |

| data      | 数据源   |   array<{id, name, [sub, expand]}>     |   -    |

| showLine        |   是否连接线   |   boolean   |   false     |

| lineColor        |   连接线颜色   |   string   |   rgba(0, 0, 0, 0.4)     |

| lineBoxWidth        |    连接区域宽度    |  string  |   30px     |

| itemRender        |    自定义渲染节点    |  (nodeData) => ReactNode  |    -    |

| onChange        |    组件数据变化时触发    |  function(nodeData)  |     -  |

