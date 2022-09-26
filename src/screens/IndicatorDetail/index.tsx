import React, { useEffect, useState } from 'react';
import { ActivityIndicator, List, Text } from 'react-native-paper';
import { View, Alert, StyleSheet, Dimensions } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { theme } from '../../theme';
import { storage } from '../../storage';
import { ISerie } from '../../definitions/rest';
import { getResponsiveValue } from '../../helpers';
import { getEconomicIndicator } from '../../api/endpoints';

interface Props {
  code: string;
}

interface IData {
  name: string;
  measureUnit: string;
  lastDate: string;
  lastValue: number;
  serie: ISerie[];
}

const dimensions = Dimensions.get('window');

const IndicatorDetail: NavigationFunctionComponent<Props> = ({ code }) => {
  const [data, setData] = useState<IData>({} as IData);

  const getData = async () => {
    await getEconomicIndicator(code)
      .then(response => {
        if (response) {
          const formattedResponse = {
            name: response.nombre,
            measureUnit: response.unidad_medida,
            lastDate: new Date(response.serie[0].fecha).toLocaleDateString(
              'en-US'
            ),
            lastValue: response.serie[0].valor,
            serie: response.serie.slice(0, 9),
          };
          storage.set(
            `ECONOMIC_INDICATOR_${code}`,
            JSON.stringify(formattedResponse)
          );
          setData(formattedResponse);
        }
      })
      .catch(error => {
        Alert.alert('Error', `Ha ocurrido un error: ${error}`);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return !data ? (
    <View style={styles.noDataContainer}>
      <ActivityIndicator color={theme.colors.info} />
    </View>
  ) : (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.header}>
        ${data?.lastValue}
      </Text>
      <List.Section>
        <List.Subheader>Información básica</List.Subheader>
        <List.Item
          title="Nombre"
          description={data?.name}
          descriptionStyle={styles.description}
        />
        <List.Item
          title="Fecha"
          description={data?.lastDate}
          descriptionStyle={styles.description}
        />
        <List.Item
          title="Unidad de medida"
          description={data?.measureUnit}
          descriptionStyle={styles.description}
        />
      </List.Section>
    </View>
  );
};

IndicatorDetail.displayName = 'Indicator';

export default IndicatorDetail;

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
  header: {
    color: theme.colors.info,
    fontWeight: 'bold',
  },
  description: {
    color: theme.colors.info,
  },
});
