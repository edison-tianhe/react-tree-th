/* eslint-disable no-plusplus */
import React, { Fragment, useEffect, useState, forwardRef, ForwardRefRenderFunction, useImperativeHandle, ReactNode } from 'react';
import formatData from './formatData';
import { CustomTreeProps, CustomTreeDataType, LevelsType } from './data.d';

import styles from './styles/index.less';

const CustomTree: ForwardRefRenderFunction<unknown, CustomTreeProps> = (props: CustomTreeProps, ref) => {
  const [viewData, setViewData] = useState<CustomTreeDataType[]>([]);

  useImperativeHandle(ref, () => ({
    $update: () => { // *强制更新组件
      setViewData(formatData(viewData));
      props.onChange(viewData);
    },
  }));

  useEffect(() => {
    if (props.lineColor) {
      document.querySelector('body').style.setProperty('--rtt-lineColor', props.lineColor);
    }
    if (props.lineBoxWidth) {
      document.querySelector('body').style.setProperty('--rtt-lineBox-width', props.lineBoxWidth);
    }
  }, []);

  useEffect(() => {
    setViewData(formatData(props.data));
  }, [props.data]);

  // *折叠
  const onJsonDataExpand = (data: CustomTreeDataType) => {
    // eslint-disable-next-line no-param-reassign
    data.expand = !data.expand;
    setViewData([...viewData]);
  };

  // *点击
  const itemHandleClick = (data: CustomTreeDataType) => {
    console.log(data);
  }

  const subRender = (data: CustomTreeDataType[]): ReactNode => (
    data.map((item: CustomTreeDataType, index: number) => {
      const { id, value, sub, expand, levels } = item;
      const expandRender: ReactNode[] = [];
      
      (levels as []).forEach((level: LevelsType) => {
        // ?默认不展示连接线，只能一个占位符
        if (!props.showLine) {
          expandRender.push(<td key={level.key} className={styles['rtt-td-expand']} />);
          return;
        }
        // ?生成连接线
        switch (level.value) {
          case -1: // *啥都么有
            expandRender.push(<td key={level.key} className={styles['rtt-td-expand']} />);
            break;
          case 0: // *收缩器
            expandRender.push(<td key={level.key} className={styles['rtt-td-expand']}>
              <div className={`${styles['rtt-td-expand-box']} ${expand ? styles['rtt-td-expand-box-active']: ''}`} onClick={() => onJsonDataExpand(item)} /></td>);
            break;
          case 1: // *竖线
            expandRender.push(<td key={level.key} className={styles['rtt-td-expand-line']} />);
            break;
          case 2: // *横线
            expandRender.push(<td key={level.key} className={styles['rtt-td-expand-line-middle']} />);
            break;
          case 3: // *转折线
            expandRender.push(<td key={level.key} className={styles['rtt-td-expand-line-turn']} />);
            break;
          case 4: // *交叉线
            expandRender.push(<td key={level.key} className={styles['rtt-td-expand-line-fork']} />);
            break;
          default:
            break;
        }
      });

      return (
        <Fragment key={id}>
          <tr className={styles['rtt-tr']}>
            { /* 单元格连接线 */}
            {expandRender}
            { /* 单元格 */}
            <td className={styles['rtt-td']} onClick={() => itemHandleClick(item)}>
              {props.itemRender ? props.itemRender(item, index, data) : value}
            </td>
          </tr>
          {expand && sub?.length ? subRender(sub) : null}
        </Fragment>
      )
    })
  );

  if (viewData.length) {
    return (
      <table className={styles['rtt']}>
        <tbody>
          {subRender(viewData)}
        </tbody>
      </table>
    )
  }
  return null;
};

export default forwardRef(CustomTree);
