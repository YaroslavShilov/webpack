const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'web',
  devtool: 'eval-source-map',
  devServer: {
    static: path.resolve(__dirname, '..', 'dist'),
    port: 3000,
    hot: true,
    // open: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        secure: false,
      },
    },
  },
  plugins: [
    new Dotenv({
      path: '.env.development',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src', 'template', 'index.html'),
      publicPath: '/',
    }),
  ],
};
