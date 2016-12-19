const webpack = require( 'webpack' );
const path = require( 'path' );

module.exports = {
  devtool: 'eval',
  entry: {
    'app': [
      'babel-polyfill',
      // 'webpack-dev-server/client?http://localhost:3000',
      // 'webpack/hot/only-dev-server',
      './app.js',
    ],
    'todo-app': [
      // 'babel-polyfill', // to prevent 'Uncaught Error: only one instance of babel-polyfill is allowed'
      // 'webpack-dev-server/client?http://localhost:3000',
      // 'webpack/hot/only-dev-server',
      './todo/todo-app.js',
    ],
  },
  output: {
    path: path.join( __dirname, 'dist' ),
    filename: '[name].js',
    publicPath: '/dist',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join( __dirname ),
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
