import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import {
  Navigation,
  NavigationFunctionComponent,
} from 'react-native-navigation';
import { useNetInfo } from '@react-native-community/netinfo';

import { getAllEconomicIndicators } from '../../api/endpoints';
import { storage } from '../../storage';
import { IEcoIndicator } from '../../definitions/rest';

const Indicators: NavigationFunctionComponent = memo(({ componentId }) => {
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const { isConnected } = useNetInfo();
  const [data, setData] = useState<void | IEcoIndicator[]>([]);

  const getData = async () => {
    setIsDataAvailable(true);
    await getAllEconomicIndicators()
      .then(response => {
        storage.set('STORED_DATA', JSON.stringify(response));
        setData(response);
      })
      .catch(error => {
        Alert.alert('Error', `Ha ocurrido un error: ${error}`);
      });
  };

  useEffect(() => {
    if (!isConnected) {
      const storedData = storage.getString('STORED_DATA');
      const json = storedData ? JSON.parse(storedData) : null;
      if (json) {
        setIsDataAvailable(true);
        setData(json);
      }
    } else {
      getData();
    }
  }, []);

  return !isDataAvailable ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator animating={!isDataAvailable} size={20} color="red" />
    </View>
  ) : (
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
    </View>
  );
});

Indicators.displayName = 'Indicadores';

export default Indicators;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
