import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { Provider } from 'react-native-paper';

import IndicatorDetail from './src/screens/IndicatorDetail';
import Indicators from './src/screens/Indicators';
import PriceDetail from './src/screens/PriceDetail';

Navigation.registerComponent(
  'Indicators',
  () => (props: NavigationComponentProps) =>
    (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider theme={{ version: 3 }}>
          <Indicators {...props} />
        </Provider>
      </GestureHandlerRootView>
    ),
  () => Indicators
);

Navigation.registerComponent(
  'PriceDetail',
  () => (props: NavigationComponentProps) =>
    (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider theme={{ version: 3 }}>
          <PriceDetail {...props} />
        </Provider>
      </GestureHandlerRootView>
    ),
  () => PriceDetail
);

Navigation.registerComponent(
  'IndicatorDetail',
  () => (props: NavigationComponentProps) =>
    (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider theme={{ version: 3 }}>
          <IndicatorDetail {...props} />
        </Provider>
      </GestureHandlerRootView>
    ),
  () => IndicatorDetail
);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Indicators',
            },
          },
        ],
      },
    },
  });
});
