import { IEcoIndicator } from '../definitions/rest';
import { theme as AppTheme } from '../theme';

type TAppTheme = typeof AppTheme;

interface IDimensions {
  width: number;
  height: number;
}

interface IBreakpointForScreensize {
  theme: TAppTheme;
  dimensions: IDimensions;
}

interface IResponsiveValue {
  value: number;
  dimensions: IDimensions;
  theme: TAppTheme;
}

/**
 * @param {TAppTheme} theme App theme (colors, spacing and device breakpoints)
 * @param {IDimensions} dimensions Device's width and height
 * @returns Breakpoint depending on device dimensions and app registered device breakpoints
 */
export const getBreakpointForScreenSize = ({
  theme,
  dimensions,
}: IBreakpointForScreensize) => {
  const sortedBreakpoints = Object.entries(theme.breakpoints).sort(
    (valA, valB) => {
      return valA[1] - valB[1];
    }
  );

  return sortedBreakpoints.reduce(
    (acc: string | null, [breakpoint, minWidth]) => {
      if (dimensions.width >= minWidth) {
        return breakpoint;
      }
      return acc;
    },
    null
  ) as string;
};

/**
 *
 * @param {string | number} value Value to assign to our styling properties
 * @param {IDimensions} dimensions Device's width and height
 * @param {TAppTheme} theme App theme (colors, spacing and device breakpoints)
 * @returns A value proportional to our device dimensions
 */
export const getResponsiveValue = ({
  value,
  dimensions,
  theme,
}: IResponsiveValue) => {
  if (typeof value === 'object') {
    return value[getBreakpointForScreenSize({ theme, dimensions })];
  }
  return value;
};

/**
 *
 * @param {string | IEcoIndicator} attribute Attribute from server object
 * @returns True if is an economic indicator, false if is not
 */
export const isEconomicIndicator = (
  attribute: string | IEcoIndicator
): attribute is IEcoIndicator => {
  if ((attribute as IEcoIndicator).nombre) {
    return true;
  }

  return false;
};
