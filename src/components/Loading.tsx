import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { theme } from '../theme';

interface Props {
  loading: boolean;
}

const Loading: React.FC<Props> = ({ loading }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={loading}
        size={20}
        color={theme.colors.primary}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
