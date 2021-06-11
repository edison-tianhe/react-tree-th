---
title: 快速上手
sidemenu: true
toc: 'content'
order: 1
---

## 快速上手

### 环境依赖

- `React >=16.8.0`
- `React-dom >=16.8.0`

### 安装

Parent 项目

```sh
yarn add react-tree-th
```

### 默认风格

```tsx
import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import ReactTree from 'react-tree-th';

const dataLine = [
  {
    value: '一级标题',
    sub: [
      {
        value: '二级标题',
        sub: [
          {
            value: '三级标题',
          },
        ],
      },
      {
        value: '二级标题',
        sub: [
          {
            value: '三级标题',
          },
        ],
      },
    ],
  },
];

export default () => <ReactTree data={dataLine} lineBoxWidth="20px" />;
```

### 线条风格

```tsx
import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import ReactTree from 'react-tree-th';

const dataLine = [
  {
    value: '一级标题',
    sub: [
      {
        value: '二级标题',
        sub: [
          {
            value: '三级标题',
          },
        ],
      },
      {
        value: '二级标题',
        sub: [
          {
            value: '三级标题',
          },
        ],
      },
    ],
  },
];

export default () => <ReactTree showLine data={dataLine} lineBoxWidth="20px" />;
```

### 异步加载

```tsx
import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import ReactTree from 'react-tree-th';

const dataAsync = [
  {
    value: '一级标题',
    isLeaf: true,
  },
];

const onLoadData = () => {
  return new Promise<any>(resolve => {
    setTimeout(() => {
      resolve([
        {
          value: '二级标题',
        },
      ]);
    }, 3000);
  });
};

export default () => (
  <ReactTree
    showLine
    data={dataAsync}
    loadData={onLoadData}
    lineBoxWidth="20px"
  />
);
```

### 异步加载

```tsx
import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import ReactTree from 'react-tree-th';

const bigData = new Array(1000).fill(true).map((_, index) => ({
  value: `${index}级标题`,
  isLeaf: true,
}));

const onLoadData = () => {
  return new Promise<any>(resolve => {
    setTimeout(() => {
      resolve([
        {
          value: '二级标题',
        },
      ]);
    }, 3000);
  });
};

export default () => (
  <ReactTree
    data={bigData}
    lineBoxWidth="20px"
    height={100}
    loadData={onLoadData}
  />
);
```
