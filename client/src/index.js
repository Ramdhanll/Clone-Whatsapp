import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

import axios from 'axios'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:9000/api/v1';
} else {
  axios.defaults.baseURL = `${process.env.APP_URI}/api/v1`
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CSSReset />
      <App/>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
