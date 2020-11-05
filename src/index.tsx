import React, {
  Fragment,
  useEffect,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  ReactNode,
  useCallback,
  useRef
} from 'react';
import {
  CustomTreeProps,
  CustomTreeDataType,
} from './types/index';

import init from '@/tree/init';
import renderLine from '@/tree/renderLine';

import styles from '@/styles/index.less';

const CustomTree: ForwardRefRenderFunction<unknown, CustomTreeProps> = ({
  data,
  lineColor = 'rgba(0, 0, 0, 0.4)',
  expandColor = 'rgba(0, 0, 0, 0.4)',
  lineBoxWidth = '20px',
  hoverBgColor = '#e1e1fa',
  itemStyle = { padding: '4px' },
  hoverBlock = 'inline',
  itemRender,
  showLine = false,
  showExpand = true,
  defaultExpand = true,
  expandStyle = 'plus',
  loadData,
  onChange,
  onClick,
}: CustomTreeProps, ref) => {
  const domRef = useRef<any>();
  const [viewData, setViewData] = useState<CustomTreeDataType[]>([]);

  useImperativeHandle(ref, () => ({
    update: () => { // *强制更新组件
      setViewData(init(viewData, { defaultExpand }));
      onChange && onChange(viewData);
    },
  }));

  useEffect(() => { // *初始化组件参数
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
  const handleClick = useCallback((data: CustomTreeDataType) => {
    onClick && onClick(data);
  }, []);

  // *折叠
  const handleExpand = useCallback((data: CustomTreeDataType) => {
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

  const subRender = (data: CustomTreeDataType[]): ReactNode => (
    data.map((item: CustomTreeDataType, index: number) => {
      const { id, value, sub, expand, isLeaf } = item;
      // *是否展示子节点
      const showSub = expand && !isLeaf && sub?.length;

      return (
        <Fragment key={id}>
          <tr className={`${styles['rtt-tr']} ${hoverBgColor && hoverBlock === 'block' ? styles['rtt-cursor'] : ''}`}>
            { /* 单元格连接线 */}
            {renderLine(item, { showLine, showExpand, handleExpand, expandStyle })}
            { /* 单元格 */}
            <td
              className={`${styles['rtt-td']} ${hoverBgColor && hoverBlock === 'inline' ? styles['rtt-cursor'] : ''}`}
              style={itemStyle}
              onClick={() => handleClick(item)}
            >
              {itemRender ? itemRender(item, index, data) : value}
            </td>
          </tr>
          {showSub ? subRender(sub) : null}
        </Fragment>
      )
    })
  );

  if (viewData.length) {
    return (
      <table className={styles['rtt']} ref={domRef}>
        <tbody>
          {subRender(viewData)}
        </tbody>
      </table>
    )
  }
  return null;
};

export default forwardRef(CustomTree);
