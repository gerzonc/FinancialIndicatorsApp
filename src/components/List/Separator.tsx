import React from 'react';
import { View, StyleSheet } from 'react-native';

const Separator = () => {
  return <View style={styles.container} />;
};

Separator.displayName = 'List.Separator';

export default Separator;

const styles = StyleSheet.create({
  container: {
    height: 1,
    width: StyleSheet.hairlineWidth,
  },
});
