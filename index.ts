import { Navigation } from 'react-native-navigation';

import IndicatorDetail from './src/screens/IndicatorDetail';
import Indicators from './src/screens/Indicators';
import PriceDetail from './src/screens/PriceDetail';

Navigation.registerComponent('Indicators', () => Indicators);
Navigation.registerComponent('PriceDetail', () => PriceDetail);
Navigation.registerComponent('IndicatorDetail', () => IndicatorDetail);

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
