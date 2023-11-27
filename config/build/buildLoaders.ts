import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types';

export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
  const isDev = options.mode === 'development';

  const jsLoader = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: ['ts-loader'],
  };

  const sassLoader = {
    test: /.s?[a|c]ss$/,
    exclude: /node_modules/,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: isDev ? '[name]__[local]--[hash:base64:5]' : '[hash:base64]',
          },
        },
      },
      'postcss-loader',
      'sass-loader',
    ],
  };

  const fontsLoader = {
    test: /\.(woff(2)?|ttf|eot|)$/,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[contenthash:10][ext]',
    },
  };

  const imageLoader = {
    test: /\.(jpe?g|png|svg|webp)$/,
    generator: {
      filename: 'img/[contenthash:10][ext]',
    },
    use: [
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75,
          },
        },
      },
    ],
    type: 'asset/resource',
  };

  return [jsLoader, tsLoader, sassLoader, fontsLoader, imageLoader];
};
