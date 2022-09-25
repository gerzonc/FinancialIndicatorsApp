import { View, Text, Pressable } from 'react-native';
import React from 'react';
import {
  Navigation,
  NavigationFunctionComponent,
} from 'react-native-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';
const MyButton = () => (
  <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={() => {}}>
    Login with Facebook
  </Icon.Button>
);

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
      <MyButton />
    </View>
  );
};

Indicators.displayName = 'Indicadores';

export default Indicators;
