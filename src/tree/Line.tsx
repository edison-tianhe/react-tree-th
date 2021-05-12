import React, { ReactNode } from 'react';
import classnames from 'classnames';

import { FormatData, IRenderLineProps, ILevels } from '../types/type';
import CircleLoad from '../loading';

const renderLine = (
  data: FormatData,
  {
    showLine,
    showExpand,
    handleExpand,
    expandStyle,
  }: IRenderLineProps
): ReactNode[] => {
  const { levels, expand, isLoading, } = data;

  const expandRenderClass = classnames({
    ['rtt-td-expand-box']: true,
    [`rtt-td-expand-${expandStyle}`]: true,
    [`rtt-td-expand-${expandStyle}-active`]: !!expand,
  })

  let expandRender: ReactNode;
  if (isLoading) {
    expandRender = <CircleLoad />;
  } else {
    expandRender = (
      <div
        className={expandRenderClass}
        onClick={() => handleExpand(data)}
      />
    );
  }

  return (levels as ILevels[]).map((level) => {
    // ?默认不展示连接线，只展示一个收缩器
    if (!showLine && showExpand) {
      if (level.value === 0) {
        return <span key={level.key} className="rtt-td-expand">{expandRender}</span>
      }
      return <span key={level.key} className="rtt-td-expand" />;
    }

    // ?不展示连接线，不展示收缩器
    if (!showLine) {
      return <span key={level.key} className="rtt-td-expand" />;
    }

    // ?生成连接线及收缩器
    switch (level.value) {
      case -1: // *啥都么有
        return <span key={level.key} className="rtt-td-expand" />;
      case 0: // *收缩器
        return <span key={level.key} className="rtt-td-expand">{expandRender}</span>;
      case 1: // *竖线
        return <span key={level.key} className="rtt-td-expand-line" />;
      case 2: // *横线
        return <span key={level.key} className="rtt-td-expand-line-middle" />;
      case 3: // *转折线
        return <span key={level.key} className="rtt-td-expand-line-turn" />;
      case 4: // *交叉线
        return <span key={level.key} className="rtt-td-expand-line-fork" />;
      default:
        return <span key={level.key} />;
    }
  });
}

export default renderLine;