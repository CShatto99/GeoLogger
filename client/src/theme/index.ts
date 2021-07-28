export interface IThemeType {
  colors: {
    primary: string;
    darkPrimary: string;
    secondary: string;
    white: string;
    black: string;
    light: string;
    dark: string;
    success: string;
    successLight: string;
    danger: string;
    dangerLight: string;
    border: string;
    input: string;
  };
  fontSizes: {
    largest: string;
    large: string;
    medium: string;
    small: string;
    smallest: string;
  };
  fontWeights: {
    bold: number;
    semiBold: number;
    medium: number;
    regular: number;
    light: number;
  };
  mediaQueries: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

const theme = {
  light: {
    colors: {
      primary: '#2b6cb0',
      darkPrimary: '#2c5282',
      secondary: '#E73D8E',
      white: '#fff',
      black: '#0c0f11',
      light: '#D9DFDD',
      dark: '#89989B',
      success: '#4caf50',
      successLight: '#EDF7ED',
      danger: '#f44336',
      dangerLight: '#FDECEA',
      border: 'rgba(0, 0, 0, 0.3);',
      input: '#F7F7F7',
    },
    fontSizes: {
      largest: '24px',
      large: '20px',
      medium: '18px',
      small: '16px',
      smallest: '14px',
    },
    fontWeights: {
      bold: 800,
      semiBold: 700,
      medium: 600,
      regular: 500,
      light: 400,
    },
    mediaQueries: {
      xs: 'only screen and (max-width: 576px)',
      sm: 'only screen and (max-width: 768px)',
      md: 'only screen and (max-width: 992px)',
      lg: 'only screen and (max-width: 1200px)',
      xl: 'only screen and (max-width: 1400px)',
    },
  },
  dark: {
    colors: {
      primary: '#2b6cb0',
      darkPrimary: '#2c5282',
      secondary: '#E73D8E',
      white: '#0c0f11',
      black: '#fff',
      light: '#D9DFDD',
      dark: '#89989B',
      success: '#4caf50',
      successLight: '#EDF7ED',
      danger: '#f44336',
      dangerLight: '#FDECEA',
      border: 'rgba(0, 0, 0, 0.3);',
      input: '#F7F7F7',
    },
    fontSizes: {
      largest: '24px',
      large: '20px',
      medium: '18px',
      small: '16px',
      smallest: '14px',
    },
    fontWeights: {
      bold: 800,
      semiBold: 700,
      medium: 600,
      regular: 500,
      light: 400,
    },
    mediaQueries: {
      xs: 'only screen and (max-width: 576px)',
      sm: 'only screen and (max-width: 768px)',
      md: 'only screen and (max-width: 992px)',
      lg: 'only screen and (max-width: 1200px)',
      xl: 'only screen and (max-width: 1400px)',
    },
  },
};

export default theme;
