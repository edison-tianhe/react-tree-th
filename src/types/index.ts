import { ReactNode } from "react";

export interface LevelsType {
  key: string;
  value: number;
};

export interface CustomTreeDataType {
  id?: string;
  value: string;
  expand?: boolean;
  sub?: CustomTreeDataType[];
  isLeaf?: boolean;
  isLoading?: boolean;
  [k: string]: any;
};

export type ExpandStyleType = 'plus' | 'triangle';

export interface RenderLineProps {
  showLine: boolean;
  showExpand: boolean;
  handleExpand: (data: CustomTreeDataType) => void;
  expandStyle: ExpandStyleType
};

export interface CustomTreeProps {
  data: CustomTreeDataType[];
  lineColor?: string;
  lineBoxWidth?: string;
  itemRender?: (data: CustomTreeDataType, index: number, parentData: CustomTreeDataType[]) => ReactNode;
  showLine?: boolean;
  showExpand?: boolean;
  hoverBgColor?: string;
  defaultExpand?: boolean;
  expandStyle?: ExpandStyleType;
  loadData?: (data: CustomTreeDataType) => Promise<CustomTreeDataType[]>;
  onChange?: (data: CustomTreeDataType[]) => void;
  onClick?: (data: CustomTreeDataType) => void;
};