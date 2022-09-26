import {
  View,
  Pressable,
  ActivityIndicator,
  Alert,
  StyleSheet,
  FlatList,
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
import { Divider, List } from 'react-native-paper';

const navigateTo = (
  componentId: string,
  screenName: 'IndicatorDetail' | 'PriceDetail' | 'Indicators',
  indicatorName: string,
  code: string
) =>
  Navigation.push(componentId, {
    component: {
      name: screenName,
      options: {
        topBar: {
          title: {
            text: indicatorName,
          },
        },
      },
      passProps: {
        code,
      },
    },
  });

const Indicators: NavigationFunctionComponent = memo(({ componentId }) => {
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const { isConnected } = useNetInfo();
  const [data, setData] = useState<IEcoIndicator[]>([]);

  const getData = async () => {
    setIsDataAvailable(true);
    await getAllEconomicIndicators()
      .then(response => {
        storage.set('ALL_INDICATORS', JSON.stringify(response));
        setData(response as IEcoIndicator[]);
      })
      .catch(error => {
        Alert.alert('Error', `Ha ocurrido un error: ${error}`);
      });
  };

  useEffect(() => {
    if (!isConnected) {
      const storedData = storage.getString('ALL_INDICATORS');
      const json = storedData ? JSON.parse(storedData) : null;
      if (json) {
        setIsDataAvailable(true);
        setData(json);
      }
    } else {
      getData();
    }
  }, []);

  return !data.length ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator animating={!isDataAvailable} size={20} color="red" />
    </View>
  ) : (
    <FlatList
      bounces={false}
      data={data}
      ItemSeparatorComponent={Divider}
      renderItem={({ item, index }) => {
        return (
          <Pressable key={index} onPress={() => console.log(item)}>
            <List.Item
              title={item.nombre}
              description={item.unidad_medida}
              right={props => (
                <Pressable
                  onPress={() =>
                    navigateTo(
                      componentId,
                      'IndicatorDetail',
                      item.nombre,
                      item.codigo
                    )
                  }>
                  <List.Icon
                    {...props}
                    icon="information-outline"
                    color="blue"
                  />
                </Pressable>
              )}
            />
          </Pressable>
        );
      }}
    />
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

Indicators.options = {
  topBar: {
    title: {
      text: 'Indicadores',
    },
  },
};
