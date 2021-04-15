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
  data,
  lineColor = 'rgba(0, 0, 0, 0.4)',
  expandColor = 'rgba(0, 0, 0, 0.4)',
  lineBoxWidth = '30px',
  hoverBgColor = '#e1e1fa',
  itemStyle = { padding: '4px' },
  hoverBlock = 'inline',
  itemRender,
  showLine = false,
  showExpand = true,
  defaultExpand = true,
  expandStyle = 'plus',
  height = false,
  itemSize = 24,
  loadData,
  onChange,
  onClick,
}: ITreeProps, ref) => {
  const domRef = useRef<any>();
  const [viewData, setViewData] = useState<ITreeData[]>([]);

  useImperativeHandle(ref, () => ({
    update: () => { // *强制更新组件
      setViewData(init(viewData, { defaultExpand }));
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
    setViewData(init(data, { defaultExpand }));
  }, [data]);

  // *点击
  const handleClick = useCallback((data: ITreeData) => {
    onClick && onClick(data);
  }, []);

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
          setViewData(init(viewData, { defaultExpand: false }));
        })
        .catch(() => {
          data.isLoading = false;
          setViewData(init(viewData, { defaultExpand: false }));
        })
    } else {
      data.expand = !expand;
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
      <div className={styles['rtt']} ref={domRef}>
        {height ? (
          <List
            height={height as number | string}
            itemCount={getFlatNodeList.length}
            itemSize={itemSize}
            width="100%"
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
