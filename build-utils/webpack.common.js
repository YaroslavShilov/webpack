const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../src/template/index.tsx'),

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[hash].js',
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/template/index.html'),
    }),
    new ESLintWebpackPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /.s?[a|c]ss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx'],
  },

  devServer: {
    static: path.resolve(__dirname, '../dist'),
    port: 3000,
    hot: true,
    // open: true,
  },
};
