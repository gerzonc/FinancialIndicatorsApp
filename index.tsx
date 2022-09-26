import React from 'react';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { Provider } from 'react-native-paper';

import IndicatorDetail from './src/screens/IndicatorDetail';
import Indicators from './src/screens/Indicators';
import PriceDetail from './src/screens/PriceDetail';

Navigation.registerComponent(
  'Indicators',
  () => (props: NavigationComponentProps) =>
    (
      <Provider theme={{ version: 3 }}>
        <Indicators {...props} />
      </Provider>
    ),
  () => Indicators
);

Navigation.registerComponent(
  'PriceDetail',
  () => (props: NavigationComponentProps) =>
    (
      <Provider theme={{ version: 3 }}>
        <PriceDetail {...props} />
      </Provider>
    ),
  () => PriceDetail
);

Navigation.registerComponent(
  'IndicatorDetail',
  () => (props: NavigationComponentProps) =>
    (
      <Provider theme={{ version: 3 }}>
        <IndicatorDetail {...props} />
      </Provider>
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
