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
