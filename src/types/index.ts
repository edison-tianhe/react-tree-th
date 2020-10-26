export interface CustomTreeProps {
  data: any;
  lineColor?: string;
  lineBoxWidth?: string;
  itemRender?: any;
  onChange?: any;
  showLine?: boolean;
}

export interface LevelsType {
  key: string;
  value: number;
}

export interface CustomTreeDataType {
  id?: string;
  value: string;
  expand?: boolean;
  sub?: CustomTreeDataType[];
  [k: string]: any;
}