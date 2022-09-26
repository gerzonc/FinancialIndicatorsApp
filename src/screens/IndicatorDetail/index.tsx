import React, { useEffect, useState } from 'react';
import { ActivityIndicator, List, Text } from 'react-native-paper';
import { View, Alert, StyleSheet, Dimensions } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';

import { theme } from '../../theme';
import { storage } from '../../storage';
import { getResponsiveValue } from '../../helpers';
import { getEconomicIndicator } from '../../api/endpoints';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { Loading } from '../../components';

interface Props {
  code?: string;
}

interface IData {
  name: string;
  measureUnit: string;
  lastDate: string;
  lastValue: number;
  labels: string[];
  dataValues: number[];
}

const dimensions = Dimensions.get('window');

const chartConfig: AbstractChartConfig = {
  propsForBackgroundLines: {
    color: theme.colors.foreground,
  },
  backgroundGradientFrom: theme.colors.background,
  backgroundGradientTo: theme.colors.background,
  fillShadowGradientFrom: theme.colors.foreground,
  color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
  labelColor: () => theme.colors.foreground,
  style: {
    borderRadius: 16,
  },
  useShadowColorFromDataset: true,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: theme.colors.background,
    fill: theme.colors.info,
  },
};

const IndicatorDetail: NavigationFunctionComponent<Props> = ({ code }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IData>({} as IData);

  const getData = async () => {
    setLoading(true);
    await getEconomicIndicator(code as string)
      .then(response => {
        if (response) {
          const formattedResponse = {
            name: response.nombre,
            measureUnit: response.unidad_medida,
            lastDate: new Date(response.serie[0].fecha).toLocaleDateString(
              'en-US'
            ),
            lastValue: response.serie[0].valor,
            labels: response.serie
              .slice(0, 10)
              .reverse()
              .map(value => {
                const oldDate = new Date(value.fecha);
                const today = new Date();
                const result = Math.round(
                  Math.abs(oldDate.valueOf() - today.valueOf()) / 1000 / 8400
                );
                return `${result}Día(s)`;
              }),
            dataValues: response.serie
              .slice(0, 10)
              .reverse()
              .map(value => value.valor),
          };
          storage.set(
            `ECONOMIC_INDICATOR_${code}`,
            JSON.stringify(formattedResponse)
          );
          setData(formattedResponse);
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
    <View style={styles.noDataContainer}>
      <ActivityIndicator color={theme.colors.info} />
    </View>
  ) : (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.header}>
        ${data?.lastValue}
      </Text>
      <List.Section>
        <List.Subheader>Última actualización</List.Subheader>
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
      <LineChart
        data={{
          labels: data?.labels,
          datasets: [
            {
              data: data?.dataValues,
              color: () => theme.colors.info,
              strokeWidth: 2,
            },
          ],
          legend: [`${data.name} en las últimas 10 fechas`],
        }}
        width={dimensions.width}
        height={getResponsiveValue({ value: 286, dimensions, theme })}
        verticalLabelRotation={30}
        withInnerLines
        withOuterLines
        chartConfig={chartConfig}
        style={styles.graph}
        bezier
      />
    </View>
  );
};

IndicatorDetail.displayName = 'Indicator';

export default IndicatorDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getResponsiveValue({ value: 8, dimensions, theme }),
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
  graph: {
    alignSelf: 'center',
  },
});
