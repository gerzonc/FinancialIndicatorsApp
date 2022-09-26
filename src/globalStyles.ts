import { StyleSheet } from 'react-native';
import { theme } from './theme';

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
