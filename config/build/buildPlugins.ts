import { Configuration } from 'webpack';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export const buildPlugins = ({ mode, paths, analyzer }: BuildOptions): Configuration['plugins'] => {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins: Configuration['plugins'] = [new ESLintWebpackPlugin(), new WebpackManifestPlugin({})];

  if (isDev) {
    plugins.push(
      new Dotenv({
        path: '.env.development',
      }),
      new HtmlWebpackPlugin({
        template: paths.html,
      }),
    );
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[contenthash:10].css',
        chunkFilename: 'css/[contenthash:10].css',
      }),
      new Dotenv({
        path: '.env.production',
      }),
      new HtmlWebpackPlugin({
        template: paths.html,
        publicPath: '/',
      }),
    );
  }

  if (analyzer) {
    // use npm run start analyzer=true
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};
