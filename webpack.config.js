const path = require('path');
const webpack = require('webpack');
//const htmlWebpack = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  mode: process.env.NODE_ENV,
  // output: {
  //   path: path.resolve(__dirname, 'src/index.js'),
  //   filename: 'bundle.js',
  // },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  resolve: { extensions: ['*', '.js', '.jsx']},

  devServer: {
    //contentBase: path.join(__dirname, '/build/'),
    publicPath: '/',
    proxy: {
      context: () => true,
      target: 'http://localhost:3000',
    }, 
    port: 8080,
    hot: true,
  },

  plugins: [
    // new htmlWebpack({
    //   template: './src/index.html',
    // }),
    new webpack.HotModuleReplacementPlugin()],

};
