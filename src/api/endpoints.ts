import { Alert } from 'react-native';
import { AxiosResponse } from 'axios';

import fetcher from './fetcher';
import {
  IAllEcoIndicators,
  IEcoIndicator,
  IEcoIndicatorDetail,
} from '../definitions/rest';

/**
 * @returns {IEcoIndicator[]} All economic indicators from API
 */
export const getAllEconomicIndicators = (): Promise<void | IEcoIndicator[]> =>
  fetcher
    .get('/')
    .then((response: AxiosResponse<IAllEcoIndicators>) => {
      const {
        uf,
        ivp,
        dolar,
        dolar_intercambio,
        euro,
        ipc,
        utm,
        imacec,
        tpm,
        libra_cobre,
        tasa_desempleo,
        bitcoin,
      } = response.data;

      return [
        { ...uf },
        { ...ivp },
        { ...dolar },
        { ...dolar_intercambio },
        { ...euro },
        { ...ipc },
        { ...utm },
        { ...imacec },
        { ...tpm },
        { ...libra_cobre },
        { ...tasa_desempleo },
        { ...bitcoin },
      ];
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
