import { Configuration, DefinePlugin } from 'webpack';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

export const buildPlugins = ({ mode, paths, analyzer, platform }: BuildOptions): Configuration['plugins'] => {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins: Configuration['plugins'] = [
    new ESLintWebpackPlugin(),
    new WebpackManifestPlugin({}),
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.ico'),
    }),
  ];

  if (isDev) {
    plugins.push(
      new Dotenv({
        path: '.env.development',
      }),
      new DefinePlugin({
        PLATFORM: JSON.stringify(platform),
      }),
      new ForkTsCheckerWebpackPlugin(),
      new ReactRefreshWebpackPlugin(),
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
      new CopyPlugin({
        patterns: [{ from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') }],
      }),
    );
  }

  if (analyzer) {
    // use npm run start analyzer=true
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};
