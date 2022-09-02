module.exports = {
  displayName: 'vue-lk',
  preset: '../../jest.preset.js',
  transform: {
    '^.+.vue$': 'vue3-jest',
    '.+.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'vue', 'js', 'json'],
  coverageDirectory: '../../coverage/apps/vue-lk',
  snapshotSerializers: ['jest-serializer-vue'],
  globals: {
    'ts-jest': {
      tsconfig: 'apps/vue-lk/tsconfig.spec.json',
      babelConfig: 'apps/vue-lk/babel.config.js',
    },
    'vue-jest': {
      tsConfig: 'apps/vue-lk/tsconfig.spec.json',
      babelConfig: 'apps/vue-lk/babel.config.js',
    },
  },
};
