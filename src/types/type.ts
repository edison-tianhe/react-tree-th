import { ReactNode } from "react";

export type ExpandStyleType = 'plus' | 'triangle';
export type HoverBlockType = 'inline' | 'block';

export interface ILevels {
  key: string;
  value: number;
};

export interface ITreeDataBase {
  value: string;
  [k: string]: any;
}

export type TreeData = Required<{
  id: string;
  expand: boolean | undefined | null;
  sub: FormatData[];
  isLeaf: boolean;
  isLoading: boolean;
  levels: ILevels[];
}>;

export type FormatData = TreeData & {
  _source: ITreeDataBase
}

export interface ITreeRef {
  /** 在某些特殊情况下(eg: 自定义渲染节点并且操作节点数据) ，需要手动更新组件数据 */
  update: () => void;
  /** 在某些特殊情况下(eg: 自定义渲染节点并且操作节点数据)，需要手动向上传递组件数据 */
  change: () => void;
};

export interface IRenderLineProps {
  showLine: boolean;
  showExpand: boolean;
  handleExpand: (data: FormatData) => void;
  expandStyle: ExpandStyleType
};

export interface ITreeProps {
  /** 节点类名(非必填) */
  className?: string,
  /** 节点样式(非必填) */
  style?: React.CSSProperties,
  /** 数据源 */
  data: ITreeDataBase[];
  /** 展开指定的树节点(非必填) */
  expandedKeys?: string[] | false;
  /** 连接线颜色(非必填) */
  lineColor?: string;
  /** 连接区域宽度(非必填) */
  lineBoxWidth?: string;
  /** 鼠标移入颜色(传入false则无效果)(非必填) */
  hoverBgColor?: string | boolean;
  /** 收缩器按钮颜色(非必填) */
  expandColor?: string;
  /** 节点样式(非必填) */
  itemStyle?: React.CSSProperties;
  /** 触发鼠标移入的区域(非必填) */
  hoverBlock?: HoverBlockType;
  /** 自定义渲染节点(非必填) */
  itemRender?: (data: ITreeDataBase, index: number, parentData: ITreeDataBase[], level: number) => ReactNode;
  /** 是否展示连接线(非必填) */
  showLine?: boolean;
  /** 是否展示收缩器按钮(非必填) */
  showExpand?: boolean;
  /** 默认是否展开(非必填) */
  defaultExpand?: boolean;
  /** 收缩器按钮类型(非必填) */
  expandStyle?: ExpandStyleType;
  /** 开启虚拟滚动(传number代表开启) */
  height?: boolean | number;
  /** 单行高度(虚拟滚动所需参数) */
  itemSize?: number;
  /** 异步加载数据(节点必须有isLeaf属性才可以触发) */
  loadData?: (data: ITreeDataBase) => Promise<ITreeDataBase[]>;
  /** 展开/收起节点时触发 */
  onExpand?: (data: string[]) => void;
  /** 组件数据变化时触发 */
  onChange?: (data: ITreeDataBase[]) => void;
  /** 点击事件 */
  onClick?: (data: ITreeDataBase) => void;
};