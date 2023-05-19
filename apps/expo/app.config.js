module.exports = {
  expo: {
    name: 'events-app',
    slug: 'events-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: 'https://u.expo.dev/50c62d7b-3de5-42f7-b6de-e05c450992f8',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.informatyzacja.eventsapp',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.informatyzacja.eventsapp',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: '50c62d7b-3de5-42f7-b6de-e05c450992f8',
      },
      apiUrl: process.env.NEXTAUTH_URL ?? 'http://localhost:3000',
    },
    owner: 'informatyzacja',
    runtimeVersion: {
      policy: 'sdkVersion',
    },
  },
};
