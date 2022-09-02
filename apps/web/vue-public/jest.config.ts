module.exports = {
  displayName: 'vue-public',
  preset: '../../jest.preset.js',
  transform: {
    '^.+.vue$': 'vue3-jest',
    '.+.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'vue', 'js', 'json'],
  coverageDirectory: '../../coverage/apps/vue-public',
  snapshotSerializers: ['jest-serializer-vue'],
  globals: {
    'ts-jest': {
      tsconfig: 'apps/vue-public/tsconfig.spec.json',
      babelConfig: 'apps/vue-public/babel.config.js',
    },
    'vue-jest': {
      tsConfig: 'apps/vue-public/tsconfig.spec.json',
      babelConfig: 'apps/vue-public/babel.config.js',
    },
  },
};
