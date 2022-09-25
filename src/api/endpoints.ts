import { Alert } from 'react-native';
import { AxiosResponse } from 'axios';

import fetcher from './fetcher';
import { IAllEcoIndicators, IEcoIndicator } from '../definitions/rest';

export const getAllEconomicIndicators: () => Promise<
  void | IEcoIndicator[]
> = () =>
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
        imanec,
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
        { ...imanec },
        { ...tpm },
        { ...libra_cobre },
        { ...tasa_desempleo },
        { ...bitcoin },
      ];
    })
    .catch(error => Alert.alert('Error', `Ha ocurrido un error: ${error}`));

export const getEconomicIndicator = (indicator: string) => {
  fetcher
    .get(`/${indicator}`)
    .then(response => response.data)
    .catch(error => Alert.alert('Error', `Ha ocurrido un error: ${error} `));
};
