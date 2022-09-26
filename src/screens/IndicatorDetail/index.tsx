import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useNetInfo } from '@react-native-community/netinfo';
import { getEconomicIndicator } from '../../api/endpoints';
import { storage } from '../../storage';
import { IEcoIndicatorDetail } from '../../definitions/rest';

interface Props {
  code: string;
}

const IndicatorDetail: NavigationFunctionComponent<Props> = ({ code }) => {
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const { isConnected } = useNetInfo();
  const [data, setData] = useState<IEcoIndicatorDetail>({});

  const getData = async () => {
    setIsDataAvailable(true);
    await getEconomicIndicator(code)
      .then(response => {
        storage.set(
          `ECONOMIC_INDICATOR_${code.toUpperCase()}`,
          JSON.stringify(response)
        );
        setData(response as IEcoIndicatorDetail);
      })
      .catch(error => {
        Alert.alert('Error', `Ha ocurrido un error: ${error}`);
      });
  };

  useEffect(() => {
    if (!isConnected) {
      const storedData = storage.getString(
        `ECONOMIC_INDICATOR_${code.toUpperCase()}`
      );
      const json = storedData ? JSON.parse(storedData) : null;
      if (json) {
        setIsDataAvailable(true);
        setData(json);
      }
    } else {
      getData();
    }
  }, []);
  return (
    <View>
      <Text>IndicatorDetailScreen</Text>
    </View>
  );
};

IndicatorDetail.displayName = 'Indicator';

export default IndicatorDetail;
