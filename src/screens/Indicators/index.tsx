import { View, Text, Pressable } from 'react-native';
import React from 'react';
import {
  Navigation,
  NavigationFunctionComponent,
} from 'react-native-navigation';

const Indicators: NavigationFunctionComponent = ({ componentId }) => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Pressable
        onPress={() =>
          Navigation.push(componentId, {
            component: {
              name: 'IndicatorDetail',
              options: {
                topBar: {
                  title: {
                    text: 'Indicator',
                  },
                },
              },
            },
          })
        }>
        <Text>Navigate to Settings</Text>
      </Pressable>
    </View>
  );
};

Indicators.displayName = 'Indicadores';

export default Indicators;
