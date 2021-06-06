import React from 'react'
import ReactDOM from 'react-dom'
import GlobalStyles from 'style/GlobalStyles';
import { theme } from 'style/theme';
import { ThemeProvider } from 'styled-components';
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
