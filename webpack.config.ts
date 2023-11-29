import { BuildMode, BuildPlatform } from './config/build/types';
import { buildWebpack } from './config/build/buildWebpack';
import path from 'path';

interface Env {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform;
}

export default ({ port, mode, analyzer, platform }: Env) =>
  buildWebpack({
    port: port || 3000,
    mode: mode || 'development',
    paths: {
      output: path.resolve(__dirname, 'build'),
      entry: path.resolve(__dirname, 'src', 'index.tsx'),
      html: path.resolve(__dirname, 'public', 'index.html'),
      public: path.resolve(__dirname, 'public'),
      src: path.resolve(__dirname, 'src'),
    },
    analyzer,
    platform: platform || 'desktop',
  });
