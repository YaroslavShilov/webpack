const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getNodeModulesRegExp = (deps) => new RegExp(`[\\\\/]node_modules[\\\\/](${deps.join('|')})`);
const excludeNodeModulesRegExp = (deps) =>
  new RegExp(`[\\\\/]node_modules[\\\\/](?!(${deps.length ? deps.join('|') : 'no module'})).*`);

const deps = { react: ['react', 'react-dom', 'react-router-dom'] };
const allDeps = Object.keys(deps).reduce((acc, key) => acc.concat(deps[key]), []);

const getCacheGroup = (name, exclude) => ({
  test: exclude ? excludeNodeModulesRegExp(allDeps) : getNodeModulesRegExp(deps[name]),
  name,
  chunks: 'all',
});

module.exports = {
  mode: 'production',
  target: 'browserslist',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/template/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[contenthash:10].css',
    }),
    new Dotenv({
      path: '.env.production',
    }),
  ],
  module: {
    rules: [
      {
        test: /.s?[a|c]ss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    runtimeChunk: { name: 'runtime' },
    splitChunks: {
      cacheGroups: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        react: getCacheGroup('react'),
        vendor: getCacheGroup('vendor', true),
        /*defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },*/
      },
    },
  },
  performance: {
    hints: 'error',
  },
};
