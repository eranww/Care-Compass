// App.js
import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme'; // Make sure the path matches where your theme file is located
import MainPage from './components/MainPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MainPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
