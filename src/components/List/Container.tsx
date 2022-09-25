import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <ScrollView bounces={false} style={styles.container}>
      {children}
    </ScrollView>
  );
};

export default Container;

Container.displayName = 'List.Container';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
