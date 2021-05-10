import React, {
  useEffect,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  ReactNode,
  useCallback,
  useRef
} from 'react';
import { FixedSizeList as List } from 'react-window';
import {
  ITreeProps,
  ITreeData,
  ITreeRef,
} from '@/type';

import init from '@/tree/init';
import renderLine from '@/tree/renderLine';

import styles from '@/styles/index.less';

const CustomTree: ForwardRefRenderFunction<ITreeRef, ITreeProps> = ({
  className,
  style,
  data,
  expandedKeys = [],
  lineColor = 'rgba(0, 0, 0, 0.4)',
  expandColor = 'rgba(0, 0, 0, 0.4)',
  lineBoxWidth = '30px',
  hoverBgColor = '#e1e1fa',
  itemStyle = { padding: '4px', whiteSpace: 'nowrap' },
  hoverBlock = 'inline',
  itemRender,
  showLine = false,
  showExpand = true,
  defaultExpand = true,
  expandStyle = 'plus',
  height = false,
  itemSize = 24,
  loadData,
  onExpand,
  onChange,
  onClick,
}: ITreeProps, ref) => {
  const domRef = useRef<any>();
  const keys = useRef<string[]>(expandedKeys);
  const [viewData, setViewData] = useState<ITreeData[]>([]);

  useImperativeHandle(ref, () => ({
    update: () => { // *强制更新组件
      setViewData(init(viewData, { defaultExpand, expandedKeys }));
      onChange && onChange(viewData);
    },
    change: () => { // *组件数据向上传递
      onChange && onChange(viewData);
    },
  }));

  useEffect(() => { // *初始化组件参数 因为是直接绑定到dom元素上的 所以需要监听viewData变化
    if (domRef.current) {
      domRef.current.style.setProperty('--rtt-lineColor', lineColor);
      domRef.current.style.setProperty('--rtt-expand-color', expandColor);
      domRef.current.style.setProperty('--rtt-lineBox-width', lineBoxWidth);
      domRef.current.style.setProperty('--rtt-hover-bgColor', hoverBgColor);
    }
  }, [viewData.length]);

  useEffect(() => { // *初始化组件数据
    setViewData(init(data, { defaultExpand, expandedKeys }));
  }, [data, expandedKeys]);

  useEffect(() => { // *初始化组件数据
    keys.current = expandedKeys;
  }, [expandedKeys]);

  // *点击
  const handleClick = useCallback((data: ITreeData) => {
    onClick && onClick(data);
  }, []);

  const getExpand = (data: ITreeData) => {
    let result: string[] = [];
    if (data.expand) {
      result = [...keys.current, data.id];
      keys.current = result;
    } else {
      const delIndex = keys.current.indexOf(data.id);
      keys.current.splice(delIndex, 1);
      result = [...keys.current];
      keys.current = result;
    }

    onExpand && onExpand(result);
  };

  // *折叠
  const handleExpand = useCallback((data: ITreeData) => {
    const { isLeaf, expand } = data;
    if (loadData && isLeaf) {
      data.isLoading = true;
      loadData(data)
        .then((res) => {
          data.isLoading = false;
          data.isLeaf = false;
          data.expand = true;
          data.sub = res;
          setViewData(init(viewData, { defaultExpand: false, expandedKeys }));
          getExpand(data);
        })
        .catch(() => {
          data.isLoading = false;
          setViewData(init(viewData, { defaultExpand: false, expandedKeys }));
        })
    } else {
      data.expand = !expand;
      getExpand(data);
    }
    setViewData([...viewData]);
  }, [viewData]);

  const subRender = (data: ITreeData[]): ReactNode[] => (
    data.map((item: ITreeData, index: number) => {
      const { id, value, sub, expand, isLeaf } = item;
      // *是否展示子节点
      const showSub = expand && !isLeaf && sub?.length;

      return [
        <div key={id} className={`${styles['rtt-tr']} ${hoverBgColor && hoverBlock === 'block' ? styles['rtt-cursor'] : ''}`}>
          { /* 单元格连接线 */}
          {renderLine(item, { showLine, showExpand, handleExpand, expandStyle })}
          { /* 单元格 */}
          <span
            className={`${styles['rtt-td']} ${hoverBgColor && hoverBlock === 'inline' ? styles['rtt-cursor'] : ''}`}
            style={itemStyle}
            onClick={() => handleClick(item)}
          >
            {itemRender ? itemRender(item, index, data) : value}
          </span>
        </div>,
        showSub ? subRender(sub) : null
      ]
    })
  );

  if (viewData.length) {
    const getFlatNodeList = subRender(viewData).flat(Infinity).filter((i: any) => i);
    return (
      <div className={`${styles['rtt']} ${className}`} style={style} ref={domRef}>
        {height ? (
          <List
            height={height as number | string}
            itemCount={getFlatNodeList.length}
            itemSize={itemSize}
            width="auto"
          >
            {({ index, style }) => <div data-index={index} style={style}>{getFlatNodeList[index]}</div>}
          </List>
        ) : getFlatNodeList}
      </div>
    )
  }
  return null;
};

export default forwardRef(CustomTree);
