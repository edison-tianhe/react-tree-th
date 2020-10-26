const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {

  const base = {
    mode: process.env.NODE_ENV,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.less$/,
          use: [
            { loader: MiniCssExtractPlugin.loader, },
            {
              loader: 'css-loader', options: {
                modules: true
              }
            },
            { loader: 'less-loader' },
          ]
        },
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader, },
            { loader: 'css-loader' },
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
      extensions: ['.tsx', '.ts', '.js', '.json'],
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
      watch: true,
      watchOptions: {
        ignored: /node_modules/
      },
      entry: path.join(__dirname, './example/index.tsx'),
      output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
      
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: path.join(__dirname, './example/index.html'),
        }),
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash].css',
          chunkFilename: 'css/[id].[contenthash].css',
        }),
      ]
    }
  }

  return {
    ...base,
    devtool: false,
    entry: path.join(__dirname, './src/index.tsx'),
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
      }),
    ]
  }
}