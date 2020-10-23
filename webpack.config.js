const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  let devtool = 'inline-source-map';
  let entry = path.join(__dirname, './example/index.tsx');
  let HtmlWebpackPluginProps = {
    template: path.join(__dirname, './example/index.html'),
  }
  if (process.env.NODE_ENV === 'production') {
    devtool = false;
    entry = path.join(__dirname, './src/index.tsx');
    HtmlWebpackPluginProps = {
      title: 'Tree',
    }
  }

  return {
    mode: process.env.NODE_ENV,
    devtool,
    devServer: {
      port: 9527,
      open: true,
    },
    watch: true,
    watchOptions: {
      ignored: /node_modules/
    },
    entry,
    output: {
      filename: 'assets/js/bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
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
                name: 'assets/images/[name].[contenthash].[ext]',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin(HtmlWebpackPluginProps),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[contenthash].css',
        chunkFilename: 'assets/css/[id].[contenthash].css',
      }),
    ]
  }
}