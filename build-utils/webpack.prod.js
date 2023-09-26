const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  target: 'browserslist',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[contenthash:10].css',
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
    splitChunks: {
      cacheGroups: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        /*
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
          name: 'vendor-react',
          chunks: 'all',
        },
         */
      },
    },
  },
};
