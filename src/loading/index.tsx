import React, {
  FunctionComponent
} from 'react';

import styles from './index.less';

const CircleLoad: FunctionComponent<{}> = () => {
  return (
    <div className={styles.loader}>
    </div>
  )
};

export default CircleLoad;
