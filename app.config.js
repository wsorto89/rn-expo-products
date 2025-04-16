const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.wsorto89.productlistapp.dev';
  }

  if (IS_PREVIEW) {
    return 'com.wsorto89.productlistapp.preview';
  }

  return 'com.wsorto89.productlistapp';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'ProductList (Dev)';
  }

  if (IS_PREVIEW) {
    return 'ProductList (Preview)';
  }

  return 'ProductList';
};

export default ({ config }) => ({
  ...config,
  name: getAppName(),
  ios: {
    ...config.ios,
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    ...config.android,
    package: getUniqueIdentifier(),
  },
});
