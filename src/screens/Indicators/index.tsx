import React, { memo, useEffect, useState } from 'react';
import { Pressable, Alert, FlatList, ListRenderItemInfo } from 'react-native';
import {
  Navigation,
  NavigationFunctionComponent,
} from 'react-native-navigation';
import { Divider, List } from 'react-native-paper';
import { useNetInfo } from '@react-native-community/netinfo';

import { theme } from '../../theme';
import { storage } from '../../storage';
import { IEcoIndicator } from '../../definitions/rest';
import { getAllEconomicIndicators } from '../../api/endpoints';
import NoData from '../../components/NoData';
import { Loading } from '../../components';
import globalStyles from '../../globalStyles';

type TScreenName = 'IndicatorDetail' | 'PriceDetail' | 'Indicators';

interface INavigateTo {
  componentId: string;
  screenName: TScreenName;
  indicatorName: string;
  code: string;
}

const navigateTo = ({
  componentId,
  screenName,
  indicatorName,
  code,
}: INavigateTo) =>
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
  const { isConnected } = useNetInfo();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IEcoIndicator[]>([]);

  const getData = async () => {
    setLoading(true);
    await getAllEconomicIndicators()
      .then(response => {
        storage.set('ALL_INDICATORS', JSON.stringify(response));
        setData(response as IEcoIndicator[]);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('Error', `Ha ocurrido un error: ${error}`);
      });
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<IEcoIndicator>) => {
    return (
      <Pressable
        key={index}
        onPress={() =>
          navigateTo({
            componentId,
            screenName: 'PriceDetail',
            indicatorName: item.nombre,
            code: item.codigo,
          })
        }>
        <List.Item
          title={item.nombre}
          titleNumberOfLines={1}
          description={item.unidad_medida}
          descriptionStyle={globalStyles.description}
          right={props => (
            <Pressable
              onPress={() =>
                navigateTo({
                  componentId,
                  screenName: 'IndicatorDetail',
                  indicatorName: item.nombre,
                  code: item.codigo,
                })
              }>
              <List.Icon
                {...props}
                icon="information-outline"
                color={theme.colors.info}
              />
            </Pressable>
          )}
        />
      </Pressable>
    );
  };

  useEffect(() => {
    if (!isConnected) {
      const storedData = storage.getString('ALL_INDICATORS');
      if (storedData) {
        const storedDataObj = JSON.parse(storedData);
        setData(storedDataObj);
      }
      setLoading(false);
    } else {
      getData();
    }
  }, []);

  if (loading) {
    return <Loading loading={loading} />;
  }

  return !data.length ? (
    <NoData onPress={getData} />
  ) : (
    <FlatList
      bounces={false}
      data={data}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
});

Indicators.displayName = 'Indicadores';

export default Indicators;

Indicators.options = {
  topBar: {
    title: {
      text: 'Indicadores',
    },
  },
};
