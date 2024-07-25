import '@material-ui/core/styles';

import { Color } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypeColor extends Color {
    main: string;
    '20'?: string;
  }

  interface TypeBackground {
    primary: string;
    secondary: string;
    disabled: string;
    error: string;
  }

  interface TypeText {
    body: string;
    description: string;
    placeholder: string;
    onfill: string;
    link: string;
    error: string;
    disabled: string;
  }

  interface TypeBorder {
    field: string;
    input: string;
    divider: string;
    warning: string;
    selected: string;
    alert: string;
    disabled: string;
    error: string;
  }

  interface TypeIcon {
    default: string;
    primary: string;
    secondary: string;
    onfill: string;
    active: string;
    error: string;
    success: string;
    disabled: string;
  }

  interface TypeStatus {
    error: string;
    success: string;
    warning: string;
  }

  interface Theme {}

  interface ThemeOptions {
    boxShadows?: {
      xs?: string;
      sm?: string;
      md?: string;
      lg?: string;
      xl?: string;
      xxl?: string;
    };
  }

  interface Palette {
    blue: TypeColor;
    yellow: TypeColor;
    gray: TypeColor;
    blueGreen: TypeColor;
    limeGreen: TypeColor;
    pink: TypeColor;
    red: TypeColor;
    purple: TypeColor;
    gabaGreen: TypeColor;
    background: Palette['background'];
    text: Palette['text'];
    border: TypeBorder;
    icon: TypeIcon;
    status: TypeStatus;
  }

  interface PaletteOptions {
    blue?: Partial<TypeColor>;
    yellow?: Partial<TypeColor>;
    gray?: Partial<TypeColor>;
    blueGreen?: Partial<TypeColor>;
    limeGreen?: Partial<TypeColor>;
    pink?: Partial<TypeColor>;
    red?: Partial<TypeColor>;
    purple?: Partial<TypeColor>;
    gabaGreen?: Partial<TypeColor>;
    background?: PaletteOptions['background'];
    text?: PaletteOptions['text'];
    border?: Partial<TypeBorder>;
    icon?: Partial<TypeIcon>;
    status?: Partial<TypeStatus>;
  }

  interface TypographyVariants {
    'subtitle1-bold': React.CSSProperties;
    'subtitle2-bold': React.CSSProperties;
    'body1-bold': React.CSSProperties;
    'body2-bold': React.CSSProperties;
    'caption-bold': React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    'subtitle1-bold'?: React.CSSProperties;
    'subtitle2-bold'?: React.CSSProperties;
    'body1-bold'?: React.CSSProperties;
    'body2-bold'?: React.CSSProperties;
    'caption-bold'?: React.CSSProperties;
  }

  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    laptop: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'subtitle1-bold': true;
    'subtitle2-bold': true;
    'body1-bold': true;
    'body2-bold': true;
    'caption-bold': true;
    'work-sans': true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    pink: true;
    gray: true;
    yellow: true;
  }
}
