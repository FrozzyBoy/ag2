var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = {
  entry: './src/app.ts',
  output: {
    path: __dirname + '/build',
    filename: 'build.js',
    libraryTarget: 'var',
    library: 'EntryPoint'
  },
  devtool: 'eval',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.d.ts']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Weather app',
    inject: 'body',
    template: 'src/index-template.html'
  })]
};

module.exports = webpackConfig;