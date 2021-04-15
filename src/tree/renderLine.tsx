import React, { ReactNode } from 'react';
import {
  ITreeData,
  ILevels,
  IRenderLineProps
} from '@/type';

import CircleLoad from '@/loading';

import styles from '@/styles/index.less';

interface TreeDataType extends ITreeData {
  levels?: ILevels[];
  expand?: boolean;
}

const renderLine = (
  data: TreeDataType,
  {
    showLine,
    showExpand,
    handleExpand,
    expandStyle,
  }: IRenderLineProps
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

  return levels.map((level: ILevels) => {
    // ?默认不展示连接线，只展示一个收缩器
    if (!showLine && showExpand) {
      if (level.value === 0) {
        return <span key={level.key} className={styles['rtt-td-expand']}>{expandRender}</span>
      } else {
        return <span key={level.key} className={styles['rtt-td-expand']} />;
      }
    }

    // ?不展示连接线，不展示收缩器
    if (!showLine) {
      return <span key={level.key} className={styles['rtt-td-expand']} />;
    }

    // ?生成连接线及收缩器
    switch (level.value) {
      case -1: // *啥都么有
        return <span key={level.key} className={styles['rtt-td-expand']} />;
      case 0: // *收缩器
        return <span key={level.key} className={styles['rtt-td-expand']}>{expandRender}</span>;
      case 1: // *竖线
        return <span key={level.key} className={styles['rtt-td-expand-line']} />;
      case 2: // *横线
        return <span key={level.key} className={styles['rtt-td-expand-line-middle']} />;
      case 3: // *转折线
        return <span key={level.key} className={styles['rtt-td-expand-line-turn']} />;
      case 4: // *交叉线
        return <span key={level.key} className={styles['rtt-td-expand-line-fork']} />;
      default:
        break;
    }
  });
}

export default renderLine;