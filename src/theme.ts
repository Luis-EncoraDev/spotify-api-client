import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#32a88d',
      light: '#80d6c3',
      dark: '#1a5f4b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3123cf',
      light: '#7a75f0',
      dark: '#17136d',
      contrastText: '#ffffff',
    },
    background: {
      default: '#000000',
      paper: '#141414',
    },
    text: {
      primary: '#ffffff',
      secondary: '#c2c2c2',
      disabled: '#666666',
    },
  },
  typography: {
    fontFamily: '"Circular", "Helvetica", "Arial", sans-serif', // Spotify-like font
  },
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         borderRadius: 20,
  //         textTransform: 'none',
  //         padding: '8px 22px',
  //       },
  //     },
  //   },
  // },
});
