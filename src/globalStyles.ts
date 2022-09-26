import { Dimensions, StyleSheet } from 'react-native';
import { theme } from './theme';

export const dimensions = Dimensions.get('window');

const globalStyles = StyleSheet.create({
  description: {
    color: theme.colors.info,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default globalStyles;
