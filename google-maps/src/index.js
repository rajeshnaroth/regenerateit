/* global document, window */

import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import 'bootstrap/dist/css/bootstrap.css';

import getLocaleTransition from './utils/getLocaleTranslatons';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

window.initMap = function initMap() {
  // console.log('initMap');

  getLocaleTransition((messages, languageWithoutRegionCode) => {
    ReactDOM.render(
      <IntlProvider locale={languageWithoutRegionCode} messages={messages}>
        <App />
      </IntlProvider>, document.getElementById('root'));
    registerServiceWorker();
  });
  // ReactDOM.render(<App />, document.getElementById('root'));
};
