import { View, Text } from 'react-native';
import React from 'react';
import { NavigationFunctionComponent } from 'react-native-navigation';

const IndicatorDetail: NavigationFunctionComponent = () => {
  return (
    <View>
      <Text>IndicatorDetailScreen</Text>
    </View>
  );
};

IndicatorDetail.displayName = 'Indicator';

export default IndicatorDetail;
