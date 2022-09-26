import { Dimensions, StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, ButtonProps, Text } from 'react-native-paper';
import { getResponsiveValue } from '../helpers';
import { theme } from '../theme';

const dimensions = Dimensions.get('window');

const NoData: React.FC<ButtonProps> = ({ onPress }) => {
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
    marginBottom: getResponsiveValue({ value: 8, dimensions, theme }),
  },
});
