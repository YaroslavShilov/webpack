import { merge } from 'webpack-merge';
import { commonConfig } from './build-utils/webpack.common';

type Mode = 'prod' | 'dev';

interface Env {
  mode: Mode;
}

export default (env: Env) => {
  const envConfig = require(`./build-utils/webpack.${env.mode}.ts`);

  return merge(commonConfig, envConfig);
};
