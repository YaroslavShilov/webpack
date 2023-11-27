import TerserPlugin from 'terser-webpack-plugin';

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
