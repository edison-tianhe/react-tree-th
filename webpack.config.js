const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = () => {

  const base = {
    mode: process.env.NODE_ENV,
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          use: [
            'babel-loader',
            'ts-loader'
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.less$/,
          use: [
            { loader: 'style-loader', },
            {
              loader: 'css-loader', options: {
                modules: true
              }
            },
            { loader: 'postcss-loader' },
            { loader: 'less-loader' },
          ]
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader', },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'images/[name].[contenthash].[ext]',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json', '.less'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }

  if (process.env.NODE_ENV === 'development') {
    return {
      ...base,
      devtool: 'inline-source-map',
      devServer: {
        port: 9527,
        open: true,
      },
      watchOptions: {
        ignored: /node_modules/
      },
      entry: path.resolve(__dirname, './example/index.tsx'),
      output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, './dist'),
      },

      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './example/index.html'),
        })
      ]
    }
  }

  return {
    ...base,
    devtool: false,
    entry: path.resolve(__dirname, './src/index.ts'),
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, './dist'),
      library: 'reactTreeTh',
      libraryTarget: 'umd',
    },
    externals: {
      'react': 'react',
      'react-dom': 'react-dom',
      'react-window': 'react-window',
    },
    plugins: [
      new CleanWebpackPlugin()
    ]
  }
}