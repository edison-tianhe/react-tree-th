import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
// import CustomTree, { ITreeData, ITreeRef } from '../dist';
import CustomTree, { ITreeData, ITreeRef } from '../src';

// const data = [
//   {
//     value: '1级标题',
//     isLeaf: true,
//   },
// ];

const data = new Array(1000)
  .fill(true)
  .map((_, index) => ({
    value: `${index}级标题`,
    isLeaf: true,
  }));

const ExampleIndexHtml: React.FC<{}> = (props: any) => {
  const ref = useRef<ITreeRef>();

  useEffect(() => {
    setTimeout(() => {
      // ref.current.update();
    }, 3000);
  }, [])

  function onLoadData(data: ITreeData) {
    return new Promise<ITreeData[]>((resolve) => {
      setTimeout(() => {
        resolve(new Array(1000)
          .fill(true)
          .map((_, index) => ({
            value: `1-${index}级标题`,
            isLeaf: true,
          })));
      }, 3000);
    });
  }

  return (
    <div>
      <p>默认状态</p>
      <div style={{ width: '500px' }}>
        <CustomTree
          lineBoxWidth="20px"
          height={200}
          expandStyle="triangle"
          data={data}
          ref={ref}
          loadData={onLoadData}
          onChange={(data) => console.log(data)}
        />
      </div>
    </div>
  )
}

ReactDOM.render(<ExampleIndexHtml />, document.querySelector('#custom-tree'));
