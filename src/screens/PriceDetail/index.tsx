import { View, StyleSheet, Alert, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { FlatList } from 'react-native-gesture-handler';
import { Divider, List, Text } from 'react-native-paper';

import { storage } from '../../storage';
import { getEconomicIndicator } from '../../api/endpoints';
import { IEcoIndicatorDetail } from '../../definitions/rest';
import { Loading, NoData } from '../../components';
import { getResponsiveValue } from '../../helpers';
import { theme } from '../../theme';

interface Props {
  code?: string;
}

const dimensions = Dimensions.get('window');

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
        bounces={false}
        data={data?.serie}
        ItemSeparatorComponent={Divider}
        renderItem={({ item, index }) => (
          <List.Item
            key={index}
            title=""
            right={props => (
              <Text variant="bodyLarge" style={styles.date}>
                {new Date(item.fecha).toLocaleDateString()}
              </Text>
            )}
            left={props => <Text variant="bodyLarge">${item.valor}</Text>}
          />
        )}
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
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    color: theme.colors.info,
  },
});
