import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, Text } from 'react-native-paper';
import { getResponsiveValue } from '../helpers';
import { theme } from '../theme';
import { dimensions } from '../globalStyles';

// Not required, but ButtonProps from react-native-paper
// enforces the component to receive a children component as mandatory
interface Props {
  onPress: () => void;
}

const NoData: React.FC<Props> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emptyStateText} variant="headlineSmall">
        No se adquirieron datos
      </Text>
      <Button mode="contained" onPress={onPress}>
        Reintentar
      </Button>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    marginBottom: getResponsiveValue({
      value: 8,
      dimensions,
      theme,
    }),
  },
});
