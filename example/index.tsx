import React from 'react';
import ReactDOM from 'react-dom';
import CustomTree from '../src';
import data from './data';

const ExampleIndexHtml: React.FC<{}> = (props: any) => {
  return (
    <div>
      <p>默认状态</p>
      <div style={{ width: '500px' }}>
        <CustomTree
          showLine
          data={data}
        />
      </div>
    </div>
  )
}

ReactDOM.render(<ExampleIndexHtml />, document.querySelector('#custom-tree'));
