const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: "development",
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    module: {
      rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: { 
                        importLoaders: 1 
                    }
                },
                'postcss-loader'
            ]
        },
        {
            test: /\.(ts|tsx)$/,
            enforce: 'pre',
            use: [
              {
                options: {
                  eslintPath: require.resolve('eslint'),
        
                },
                loader: require.resolve('eslint-loader'),
              },
            ],
            exclude: /node_modules/,
        },
        {
            test: /\.tsx?$/,
            use: ['ts-loader']
        },
        {
            test: /\.html/,
            use: ['html-loader']
        },
      ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
      ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 3000
    }
  };