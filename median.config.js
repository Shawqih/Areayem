module.exports = {
  name: 'حاسبة المساحات والتحويلات',
  slug: 'area-converter',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#0f1724'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.area.converter'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#0f1724'
    },
    package: 'com.area.converter'
  },
  web: {
    favicon: './assets/favicon.png'
  }
};