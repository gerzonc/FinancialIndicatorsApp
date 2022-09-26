import { View } from 'react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { theme } from '../theme';
import globalStyles from '../globalStyles';

interface Props {
  loading: boolean;
}

const Loading: React.FC<Props> = ({ loading }) => {
  return (
    <View style={globalStyles.container}>
      <ActivityIndicator
        animating={loading}
        size={20}
        color={theme.colors.info}
      />
    </View>
  );
};

export default Loading;
