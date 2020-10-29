import React, { ReactNode } from 'react';
import {
  CustomTreeDataType,
  LevelsType,
  RenderLineProps
} from '@/types';

import CircleLoad from '@/loading';

import styles from '@/styles/index.less';

interface TreeDataType extends CustomTreeDataType {
  levels?: LevelsType[];
  expand?: boolean;
}

const renderLine = (
  data: TreeDataType,
  {
    showLine,
    showExpand,
    handleExpand,
    expandStyle,
  }: RenderLineProps
): ReactNode[] => {
  const { levels, expand, isLoading } = data;
  
  let expandRender: ReactNode;
  if (isLoading) {
    expandRender = <CircleLoad />;
  } else {
    expandRender = (
      <div
        className={`
          ${styles['rtt-td-expand-box']}
          ${styles[`rtt-td-expand-${expandStyle}`]}
          ${expand ? styles[`rtt-td-expand-${expandStyle}-active`] : ''}
        `}
        onClick={() => handleExpand(data)}
      />
    );
  }

  return levels.map((level: LevelsType) => {
    // ?默认不展示连接线，只展示一个收缩器
    if (!showLine && showExpand) {
      if (level.value === 0) {
        return <td key={level.key} className={styles['rtt-td-expand']}>{expandRender}</td>
      } else {
        return <td key={level.key} className={styles['rtt-td-expand']} />;
      }
    }

    // ?不展示连接线，不展示收缩器
    if (!showLine) {
      return <td key={level.key} className={styles['rtt-td-expand']} />;
    }

    // ?生成连接线及收缩器
    switch (level.value) {
      case -1: // *啥都么有
        return <td key={level.key} className={styles['rtt-td-expand']} />;
      case 0: // *收缩器
        return <td key={level.key} className={styles['rtt-td-expand']}>{expandRender}</td>;
      case 1: // *竖线
        return <td key={level.key} className={styles['rtt-td-expand-line']} />;
      case 2: // *横线
        return <td key={level.key} className={styles['rtt-td-expand-line-middle']} />;
      case 3: // *转折线
        return <td key={level.key} className={styles['rtt-td-expand-line-turn']} />;
      case 4: // *交叉线
        return <td key={level.key} className={styles['rtt-td-expand-line-fork']} />;
      default:
        break;
    }
  });
}

export default renderLine;