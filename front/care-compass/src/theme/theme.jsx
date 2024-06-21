// theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',  // Primary color for your app
    },
    secondary: {
      main: '#19857b',  // Secondary color for your app
    },
    error: {
      main: '#ff1744',  // Color for errors
    },
    background: {
      default: '#ffe900',  // Background color for the app
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      fontSize: '2.2rem',
    },
    h2: {
      fontSize: '1.8rem',
    },
    // Add more customization as needed
  },
  // Add additional customizations such as overrides or additional properties
});

export default theme;
