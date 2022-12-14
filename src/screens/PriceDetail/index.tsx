import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { Divider, List, Text } from 'react-native-paper';

import { storage } from '../../storage';
import { getEconomicIndicator } from '../../api/endpoints';
import { IEcoIndicatorDetail, ISerie } from '../../definitions/rest';
import { Loading, NoData } from '../../components';
import { getResponsiveValue } from '../../helpers';
import { theme } from '../../theme';
import globalStyles, { dimensions } from '../../globalStyles';
import Animated, { SlideInRight } from 'react-native-reanimated';

interface Props {
  code?: string;
}

const PriceDetail: NavigationFunctionComponent<Props> = ({ code }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IEcoIndicatorDetail>(
    {} as IEcoIndicatorDetail
  );

  const getData = async () => {
    setLoading(true);
    await getEconomicIndicator(code as string)
      .then(response => {
        if (response) {
          storage.set(
            `ECONOMIC_INDICATOR_${code}_PRICE`,
            JSON.stringify(response)
          );
          setData(response);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('Error', `Ha ocurrido un error: ${error}`);
      });
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<ISerie>) => (
    <Animated.View entering={SlideInRight}>
      <List.Item
        key={index}
        title=""
        right={() => (
          <Text variant="bodyLarge" style={globalStyles.description}>
            {new Date(item.fecha).toLocaleDateString()}
          </Text>
        )}
        left={() => <Text variant="bodyLarge">${item.valor}</Text>}
      />
    </Animated.View>
  );

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <Loading loading={loading} />;
  }

  return !data ? (
    <NoData onPress={getData} />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={data?.serie}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </View>
  );
};

export default PriceDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getResponsiveValue({ value: 16, dimensions, theme }),
  },
});
