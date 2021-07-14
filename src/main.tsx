import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from 'style/GlobalStyles';
import { theme } from 'style/theme';
import { ThemeProvider } from 'styled-components';
import App from './App';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);
