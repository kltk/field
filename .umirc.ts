import { defineConfig } from 'dumi';
import pkg from './package.json';

export default defineConfig({
  title: pkg.name,
  description: pkg.description,
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mfsu: {
    development: {
      output: './node_modules/.cache/.mfsu-dev',
    },
  },
  // more config: https://d.umijs.org/config
});
