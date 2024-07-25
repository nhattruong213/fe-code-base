import { Palette } from '@mui/material/styles/createPalette';
import { TypographyOptions, TypographyStyleOptions } from '@mui/material/styles/createTypography';

const subtitle1: TypographyStyleOptions = {
  fontSize: 18,
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: '0.72px',
};

const subtitle2: TypographyStyleOptions = {
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: '0.64px',
};

const body1: TypographyStyleOptions = {
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: '0.64px',
};

const body2: TypographyStyleOptions = {
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: '0.56px',
};

const caption: TypographyStyleOptions = {
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: '0.48px',
};

const workSans: TypographyStyleOptions = {
  fontFamily: 'var(--font-work-sans)',
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 1.2,
  letterSpacing: '4%',
};

export const typography: (palette: Palette) => TypographyOptions = (palette) => ({
  fontFamily: 'var(--font-noto-sans-jp)',
  fontSize: 14,
  color: palette.text.body,
  h1: {
    fontSize: 40,
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '1.6px',
  },
  h2: {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '1.28px',
  },
  h3: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '0.96px',
  },
  h4: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '0.8px',
  },
  h5: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '0.72px',
  },
  h6: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '0.64px',
  },
  subtitle1,
  'subtitle1-bold': {
    ...subtitle1,
    fontWeight: 700,
  },
  subtitle2,
  'subtitle2-bold': {
    ...subtitle2,
    fontWeight: 700,
  },
  body1,
  'body1-bold': {
    ...body1,
    fontWeight: 700,
  },
  body2,
  'body2-bold': {
    ...body2,
    fontWeight: 700,
  },
  button: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: '0.64px',
    textTransform: 'capitalize',
  },
  button2: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: '0.64px',
    textTransform: 'capitalize',
  },
  caption,
  'caption-bold': {
    ...caption,
    fontWeight: 700,
  },
  'work-sans': workSans,
});
