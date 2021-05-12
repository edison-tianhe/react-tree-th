import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
// import CustomTree, { ITreeDataBase, ITreeRef } from '../dist';
import CustomTree, { ITreeDataBase, ITreeRef } from '../src';

// const data = [
//   {
//     value: '1级标题',
//     isLeaf: true,
//   },
// ];

const data = new Array(10)
  .fill(true)
  .map((_, index) => ({
    id: `0-${index}`,
    value: `${index}级标题${index}级标题${index}级标题${index}级标题${index}级标题`,
    sub: new Array(2)
      .fill(true)
      .map((_, i) => ({
        id: `${index}1-${i}`,
        value: `${i}级标题${i}级标题${i}级标题${i}级标题${i}级标题`,
        isLeaf: true,
      }))
  }));

const ExampleIndexHtml: React.FC<{}> = (props: any) => {
  const ref = useRef<ITreeRef>();

  useEffect(() => {
    setTimeout(() => {
      // ref.current.update();
    }, 3000);
  }, [])

  function onLoadData(data: ITreeDataBase) {
    return new Promise<ITreeDataBase[]>((resolve) => {
      setTimeout(() => {
        resolve(
          new Array(1000)
            .fill(true)
            .map((_, index) => ({
              id: `${3}-1-${index}`,
              value: `3-${index}级标题`,
              isLeaf: true,
            }))
        );
      }, 3000);
    });
  }

  return (
    <div>
      <p>默认状态</p>
      <div style={{ width: '1000px' }}>
        <CustomTree
          height={300}
          expandedKeys={['0-1', '0-2']}
          lineBoxWidth="20px"
          expandStyle="triangle"
          data={data}
          defaultExpand={false}
          ref={ref}
          onExpand={(keys) => console.log(keys)}
          loadData={onLoadData}
          onChange={(data) => console.log(data)}
        />
      </div>
    </div>
  )
}

ReactDOM.render(<ExampleIndexHtml />, document.querySelector('#custom-tree'));
