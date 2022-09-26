export type TMedidas = 'Pesos' | 'Dólar' | 'Porcentaje';

export type TCodigo =
  | 'uf'
  | 'ivp'
  | 'dolar'
  | 'dolar_intercambio'
  | 'euro'
  | 'ipc'
  | 'utm'
  | 'imacec'
  | 'tpm'
  | 'libra_cobre'
  | 'tasa_desempleo'
  | 'bitcoin';

export interface ISerie {
  fecha: string;
  valor: number;
}

export interface IEcoIndicator {
  codigo: string;
  nombre: string;
  unidad_medida: TMedidas;
  fecha: string;
  valor: number;
}

export interface IAllEcoIndicators {
  [index: string]: IEcoIndicator;
}

export interface IEcoIndicatorDetail {
  codigo: TCodigo;
  nombre: string;
  unidad_medida: TMedidas;
  serie: ISerie[];
}
