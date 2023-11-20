import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const getNodeModulesRegExp = (deps: string[]) => new RegExp(`[\\\\/]node_modules[\\\\/](${deps.join('|')})`);
const excludeNodeModulesRegExp = (deps: string[]) =>
  new RegExp(`[\\\\/]node_modules[\\\\/](?!(${deps.length ? deps.join('|') : 'no module'})).*`);

const deps: Record<string, string[]> = { react: ['react', 'react-dom', 'react-router-dom'] };
const allDeps = Object.keys(deps).reduce((acc: string[], key: string) => acc.concat(deps[key]), []);

const getCacheGroup = (name: string, exclude?: boolean) => ({
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
      template: path.resolve(__dirname, '..', 'src', 'template', 'index.html'),
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
