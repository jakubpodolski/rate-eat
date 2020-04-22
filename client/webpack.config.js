const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

module.exports = (env, argv) => {
  const isDev = argv.mode !== "production";
  console.log(argv.mode, isDev);
  return {
    watch: isDev,
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    target: 'web',
    output: {
      path: path.resolve(__dirname, '../server/src/build'),
      publicPath: '/',
      filename: '[name].js'
    },
    mode: argv.mode,
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
      new webpack.DefinePlugin(GLOBALS),
      new HtmlWebpackPlugin({
        inject: false,
        hash: true,
        template: "./public/index.html",
        filename: "index.html"
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
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
        {
          test: /\.(png|jpe?g|svg)$/,
          loader: 'file-loader',
          options: {
              name: 'static/images/[name].[ext]',
          }
        }
      ],
    },
  }
};
