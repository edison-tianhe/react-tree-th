import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import CustomTree from '../src';
import data from './data';

const ExampleIndexHtml: React.FC<{}> = (props: any) => {
  const ref = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      ref.current.update();
    }, 3000);
  }, [])
  
  return (
    <div>
      <p>默认状态</p>
      <div style={{ width: '500px' }}>
        <CustomTree
          data={data}
          ref={ref}
          onChange={(data) => console.log(data)}
        />
      </div>
    </div>
  )
}

ReactDOM.render(<ExampleIndexHtml />, document.querySelector('#custom-tree'));
