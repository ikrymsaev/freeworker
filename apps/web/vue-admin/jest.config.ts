module.exports = {
  displayName: 'vue-admin',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+.vue$': 'vue3-jest',
    '.+.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'vue', 'js', 'json'],
  coverageDirectory: '../../coverage/apps/web/vue-admin',
  snapshotSerializers: ['jest-serializer-vue'],
  globals: {
    'ts-jest': {
      tsconfig: 'apps/web/vue-admin/tsconfig.spec.json',
      babelConfig: 'apps/web/vue-admin/babel.config.js',
    },
    'vue-jest': {
      tsConfig: 'apps/web/vue-admin/tsconfig.spec.json',
      babelConfig: 'apps/web/vue-admin/babel.config.js',
    },
  },
};
