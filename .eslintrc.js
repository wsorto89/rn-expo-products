// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'plugin:jest/recommended'],
  ignorePatterns: ['/dist/*'],
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
  settings: {
    'import/resolver': {
      alias: {
        '@': './',
      },
    },
  },
};
