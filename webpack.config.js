var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = {
  entry: './src/app.ts',
  output: {
    filename: 'build.js',
    path: __dirname + '/build'
  },
  devtool: 'eval',
  plugins: [new HtmlWebpackPlugin({
    title: 'Weather app',
    inject: 'body'
  })]
};