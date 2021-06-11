import React, {
  useEffect,
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  ReactNode,
  useCallback,
  useRef,
} from 'react';
import { FixedSizeList as List } from 'react-window';
import classnames from 'classnames';

import { FormatData, ITreeDataBase, ITreeRef, ITreeProps } from '../types/type';
import '../styles/index.less';

import formatData from './Format';
import renderLine from './Line';
import { getSource } from './utils';

const InternalTree: ForwardRefRenderFunction<ITreeRef, ITreeProps> = (
  {
    className,
    style,
    data,
    expandedKeys = false,
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
  }: ITreeProps,
  ref,
) => {
  const domRef = useRef<HTMLDivElement>(null);
  const keys = useRef<string[]>([]);
  const [viewData, setViewData] = useState<FormatData[]>([]);

  const subRenderClass = classnames({
    ['rtt-tr']: true,
    ['rtt-cursor']: hoverBgColor && hoverBlock === 'block',
  });

  const subRenderSpanClass = classnames({
    ['rtt-td']: true,
    ['rtt-cursor']: hoverBgColor && hoverBlock === 'inline',
  });

  const TreeClass = classnames({
    ['rtt']: true,
    [className as string]: !!className,
  });

  useImperativeHandle(ref, () => ({
    update: () => {
      // *强制更新组件
      setViewData(
        formatData(viewData, { defaultExpand, expandedKeys: keys.current }),
      );
      setTimeout(() => {
        onChange && onChange(getSource(viewData));
      });
    },
    change: () => {
      // *组件数据向上传递
      onChange && onChange(getSource(viewData));
    },
  }));

  useEffect(() => {
    // *初始化组件参数 因为是直接绑定到dom元素上的 所以需要监听viewData变化
    if (domRef.current) {
      domRef.current.style.setProperty('--rtt-lineColor', lineColor);
      domRef.current.style.setProperty('--rtt-expand-color', expandColor);
      domRef.current.style.setProperty('--rtt-lineBox-width', lineBoxWidth);
      domRef.current.style.setProperty(
        '--rtt-hover-bgColor',
        hoverBgColor as string,
      );
    }
  }, [viewData.length]);

  useEffect(() => {
    // *初始化组件数据
    setViewData(formatData(data, { defaultExpand }));
  }, [data]);

  useEffect(() => {
    // *初始化组件数据
    if (expandedKeys) {
      keys.current = expandedKeys;
      setViewData(
        formatData(data, { defaultExpand, expandedKeys: keys.current }),
      );
    }
  }, [expandedKeys]);

  // *点击
  const handleClick = useCallback((data: ITreeDataBase) => {
    onClick && onClick(data);
  }, []);

  const getExpand = (data: FormatData) => {
    let result: string[] = [];
    if (data.expand) {
      result = [...keys.current, data.id as string];
      keys.current = result;
    } else {
      const delIndex = keys.current.indexOf(data.id as string);
      keys.current.splice(delIndex, 1);
      result = [...keys.current];
      keys.current = result;
    }

    onExpand && onExpand(result);
  };

  // *折叠
  const handleExpand = useCallback(
    (data: FormatData) => {
      const { isLeaf, expand, _source, levels } = data;
      if (loadData && isLeaf) {
        data.isLoading = true;
        loadData(_source)
          .then(res => {
            data.isLoading = false;
            data.isLeaf = false;
            data.expand = true;
            data.sub = formatData(
              res,
              { defaultExpand: false, expandedKeys: keys.current },
              levels,
            );
            setViewData([...viewData]);
            getExpand(data);
          })
          .catch(() => {
            data.isLoading = false;
            setViewData([...viewData]);
          });
      } else {
        data.expand = !expand;
        getExpand(data);
      }
      setViewData([...viewData]);
    },
    [viewData],
  );

  const subRender = (data: FormatData[]): ReactNode[] =>
    data.map((item: FormatData, index: number) => {
      const { id, sub, expand, isLeaf, _source, levels } = item;
      // *是否展示子节点
      const showSub = expand && !isLeaf && sub?.length;

      return [
        <div key={id} className={subRenderClass}>
          {/* 单元格连接线 */}
          {renderLine(item, {
            showLine,
            showExpand,
            handleExpand,
            expandStyle,
          })}
          {/* 单元格 */}
          <span
            className={subRenderSpanClass}
            style={itemStyle}
            onClick={() => handleClick(_source)}
          >
            {itemRender
              ? itemRender(_source, index, getSource(data), levels.length)
              : _source.value}
          </span>
        </div>,
        showSub ? subRender(sub as FormatData[]) : null,
      ];
    });

  if (viewData.length) {
    const getFlatNodeList = subRender(viewData)
      .flat(Infinity)
      .filter((i: any) => i);
    return (
      <div className={TreeClass} style={style} ref={domRef}>
        {height ? (
          <List
            height={height as number | string}
            itemCount={getFlatNodeList.length}
            itemSize={itemSize}
            width="auto"
          >
            {({ index, style }) => (
              <div data-index={index} style={style}>
                {getFlatNodeList[index]}
              </div>
            )}
          </List>
        ) : (
          getFlatNodeList
        )}
      </div>
    );
  }
  return null;
};

export default forwardRef<ITreeRef, ITreeProps>(InternalTree);
