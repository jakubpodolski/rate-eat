const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  watch: true,
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
      filename: 'bundle.js',
      publicPath: '/',
      path: path.resolve(__dirname, 'dist')
  },
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    port: 3000
  },
  resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./public/index.html",
      filename: "index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'ts-loader'
        },
        exclude: /node_modules/,
      },
      {
        enforce: "pre",
        test: /\.(ts|tsx|js|jsx)$/,
        loader: "source-map-loader"
      },
      {
        test: /\.html/,
        use: ['html-loader']
      },
    ],
  },
};
