module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      "module-resolver",
      {
        "alias": {
          "@images": "./src/assets/images",
          "@lotties": "./src/assets/lotties",
          "@commom": "./src/component/commom",
          "@reuse": "./src/component/reuse",
          "@hooks": "./src/hooks",
          "@interface": "./src/interface",
          "@method": "./src/method",
          "@navigation": "./src/navigation",
          "@asyncThunk": "./src/redux/asyncThunk",
          "@selector": "./src/redux/selector",
          "@slice": "./src/redux/slice",
          "@screen": "./src/screen",
          "@service": "./src/service",
          "@theme": "./src/theme",
          "@util": "./src/util",
        }
      }
    ]
  ],
};
