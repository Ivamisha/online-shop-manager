import { createTheme } from '@mui/material/styles'

const fonts = "'Rubik', sans-serif"

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      blue: React.CSSProperties['color']
      darkBlue: React.CSSProperties['color']
      pink: React.CSSProperties['color']
      red: React.CSSProperties['color']
      danger: React.CSSProperties['color']
      lightBlue: React.CSSProperties['color']
      lightGreen: React.CSSProperties['color']
      gray: React.CSSProperties['color']
    }
  }
  interface PaletteColor {
    darker?: string
    blue?: string
    darkBlue?: string
    pink?: string
    red?: string
    danger?: string
    lightBlue?: string
    lightGreen?: string
    gray?: string
  }
}

export const palet = {
  white: '#fff',
  blue: '#9bf4f0',
  darkBlue: '#31336a',
  pink: '#DBD1ED',
  red: '#fc1202',
  black: '#181516',
  lightBlue: '#9bf4f0',
  lightGreen: '#e4f49b',
  gray: '#ebebeb',
}

declare module '@mui/material/styles' {
  interface Palette {
    custom: Palette['primary']
  }

  interface PaletteOptions {
    custom?: PaletteOptions['primary']
  }
}

export let theme = createTheme()
theme = createTheme(theme, {
  palette: {
    primary: {
      main: palet.white,
      blue: palet.blue,
      darkBlue: palet.darkBlue,
      pink: palet.pink,
      red: palet.red,
      lightGreen: palet.lightGreen,
    },
    secondary: {
      main: palet.black,
      gray: palet.gray,
      lightBLue: palet.lightBlue,
    },
  },
  typography: {
    fontFamily: ['Rubik', 'sans-serif'].join(','),
    [theme.breakpoints.up('xl')]: {
      fontSize: 20,
    },
    fontSize: 10,
  },
  shape: {
    borderRadius: 10,
  },

  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          background: palet.white,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: palet.white,
          borderRadius: '0.7rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: palet.black,
          borderRadius: '0.7rem',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: palet.black,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: palet.black,
        },
      },
    },
  },
})
