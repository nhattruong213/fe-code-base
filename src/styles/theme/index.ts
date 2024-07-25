import { createTheme } from '@mui/material';

import { breakpoints } from './breakpoints';
import { palette } from './palette';
import { typography } from './typography';

export const theme = createTheme({
  palette,
  typography,
  spacing: 8, // theme.spacing(2) => (8 * 2)px = 16px,
  breakpoints,
  shape: { borderRadius: 6 },
  components: {
    MuiCssBaseline: {
      styleOverrides: ({ palette }) => ({
        body: {
          background: palette.background.primary,
        },
      }),
    },
    MuiInputBase: {
      styleOverrides: {
        root: () => ({
          height: 56,
          '&.MuiInputBase-sizeSmall': {
            height: 40,
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme: { palette } }) => ({
          color: palette.text.body,
          ':hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: palette.border.selected,
              borderWidth: 2,
            },
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.border.selected,
            borderWidth: 2,
          },
          '&.Mui-disabled': {
            background: palette.background.disabled,
            color: palette.text.disabled,
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 1,
              borderColor: palette.border.disabled,
            },
          },
          '&.Mui-error': {
            background: palette.background.error,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: palette.border.error,
            },
          },
          '&.MuiInput-multiline .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.border.error,
          },
          '& .MuiInputAdornment-root': {
            marginLeft: -3,
            '& .MuiIconButton-root': {
              marginRight: -4,
            },
            '& .MuiSvgIcon-root': {
              color: palette.text.body,
            },
          },
        }),
        input: ({ theme: { palette } }) => ({
          padding: 16,
          '::placeholder': {
            color: palette.text.placeholder,
            opacity: 1,
          },
          '&.MuiInputBase-inputSizeSmall': {
            padding: '8px 16px',
          },
        }),
        multiline: () => ({
          padding: 0,
        }),
        notchedOutline: ({ theme: { palette } }) => ({
          top: 0,
          borderColor: palette.border.input,
          legend: {
            display: 'none',
          },
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: ({ theme: { palette } }) => ({
          color: palette.text.body,
          paddingRight: '48px !important',
        }),
        icon: ({ theme: { palette } }) => ({
          right: 16,
          color: palette.text.body,
        }),
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: ({ theme: { palette } }) => ({
          margin: 0,
          marginTop: 3,
          fontSize: 14,
          color: palette.text.description,
          '&.Mui-disabled': {
            color: palette.text.description,
          },
          '&.Mui-error': {
            color: palette.text.error,
          },
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle1: 'h5',
          subtitle2: 'h6',
          'subtitle1-bold': 'h5',
          'subtitle2-bold': 'h6',
          body1: 'p',
          body2: 'p',
          'body1-bold': 'p',
          'body2-bold': 'p',
        },
      },
    },
  },
});
