const fs = require('fs');
const path = require('path');
const { version } = require('./package');

function fileExistsCaseInsensitive(filepath) {
  const dir = path.dirname(filepath);
  const fileNameLower = path.basename(filepath).toLowerCase();
  const files = fs.readdirSync(dir);
  const found = files.find((file) => file.toLowerCase() === fileNameLower);
  return found && path.join(dir, found);
}

function getExampleFilename(componentPath) {
  const { base, ...file } = path.parse(componentPath);

  const readme = path.join(file.dir, 'Readme.md');
  const dirDoc = `${file.dir}.md`;
  const componentDoc = path.format({ ...file, ext: '.md' });

  const files = file.name === 'index' ? [readme, dirDoc] : [componentDoc];

  return files.find(fileExistsCaseInsensitive);
}

const parserOptions = {
  savePropValueAsString: true,
};

module.exports = {
  version,
  pagePerSection: true,
  skipComponentsWithoutExample: true,
  getExampleFilename,
  sections: [
    { name: 'DEMO', content: 'src/demo.md' },
    {
      name: '组件',
      components: 'src/**/*.tsx',
      sectionDepth: 1,
    },
  ],
  ignore: [
    '**/__tests__/**',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts',
  ],
  propsParser: require('react-docgen-typescript').withDefaultConfig([
    parserOptions,
  ]).parse,

  dangerouslyUpdateWebpackConfig(config) {
    if (!config.devServer) {
      config.devServer = {};
    }
    config.devServer.host = '0.0.0.0';
    config.devServer.disableHostCheck = true;
    return config;
  },
};
