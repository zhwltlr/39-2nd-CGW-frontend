import React from 'react';
import ReactDOM from 'react-dom/client';
// import { ThemeProvider } from 'styled-components';
import Router from './Router';
import GlobalStyle from './styles/GlobalStyle';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <ThemeProvider>
  <>
    <GlobalStyle />
    <Router />
  </>
  // </ThemeProvider>
);
