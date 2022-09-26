import { Alert } from 'react-native';
import { AxiosResponse } from 'axios';

import fetcher from './fetcher';
import {
  IAllEcoIndicators,
  IEcoIndicator,
  IEcoIndicatorDetail,
} from '../definitions/rest';
import { isEconomicIndicator } from '../helpers';

/**
 * @returns {IEcoIndicator[]} All economic indicators from API
 */
export const getAllEconomicIndicators = (): Promise<void | IEcoIndicator[]> =>
  fetcher
    .get('/')
    .then((response: AxiosResponse<IAllEcoIndicators>) => {
      const formatData = Object.values(response.data).filter(value =>
        isEconomicIndicator(value)
      );

      return formatData;
    })
    .catch(error => Alert.alert('Error', `Ha ocurrido un error: ${error}`));

/**
 * @param {string} indicator Code from the selected economic indicator
 * @returns {IEcoIndicator[]} Detail from specified economic indicator
 */
export const getEconomicIndicator = (
  indicator: string
): Promise<void | IEcoIndicatorDetail> =>
  fetcher
    .get(`/${indicator}`)
    .then((response: AxiosResponse<IEcoIndicatorDetail>) => response.data)
    .catch(error => Alert.alert('Error', `Ha ocurrido un error: ${error} `));
