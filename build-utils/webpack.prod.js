const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  target: "browserslist",
  devtool: "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[hash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /.s?[a|c]ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
};
