<h1 align="center">Financial Indicators</h6>
<p align="center">A financial indicators app made with React Native!</p>


### Table of Contents
  * [Pre-requisites](#prerequisites)
  * [Installation and usage](#installation)
  * [Features](#features)
  * [Libraries](#libraries)

## <a name="prerequisites"></a> Pre-requisites

Ensure you have followed the installation process for [React Native](https://reactnative.dev/docs/environment-setup)

## <a name="installation"></a> Installation and usage

Before hand, be sure you have an Android emulator with Google Play Services or an iOS simulator with at least iOS 12.

For installing this project on your machine just clone the project and run in the console: 
```console
$ yarn install
// or
$ npm install
// For iOS only
$ cd ios && npx pod-install
```

Once you've done all the process explained above, run:
```console
$ npx react-native run-android
```
or
```console
$ npx react-native run-ios
```

## <a name="features"></a> Features

1. List all economic indicators available through the provided API
2. Display specific economic indicator data and graph
3. List price detail for specific economic indicator

## <a name="libraries"></a> Libraries used
```json
    "@react-native-community/netinfo": "^9.3.1",
    "axios": "^0.27.2",
    "react": "18.1.0",
    "react-native": "0.70.1",
    "react-native-chart-kit": "^6.12.0",
    "react-native-gesture-handler": "^2.6.2",
    "react-native-mmkv": "^2.4.3",
    "react-native-navigation": "7.29.0",
    "react-native-paper": "5.0.0-rc.6",
    "react-native-reanimated": "2.9.1",
    "react-native-svg": "^13.2.0",
    "react-native-vector-icons": "^9.2.0"
```

