import 'dotenv/config';

export default {
  expo: {
    scheme: 'frankbertelottailoringapp',
    name: 'frankbertelottailoringapp',
    slug: 'frankbertelottailoringapp',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/frankbertelotlogo.jpg',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/frankbertelotlogo.jpg',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      infoPlist: {
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: ['frankbertelottailoringapp'],
          },
        ],
      },
    },
    "android": {
      "scheme": "frankbertelottailoringapp",
      "intentFilters": [
        {
          "action": "VIEW",
          "data": [
            {
              "scheme": "frankbertelottailoringapp",
              "host": "home"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    },
    
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    },
  },
};
