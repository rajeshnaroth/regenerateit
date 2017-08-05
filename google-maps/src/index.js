/* global document, window */

import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/scss/bootstrap-reboot.scss';
// import 'bootstrap/scss/bootstrap-grid.scss';
// import 'bootstrap/scss/bootstrap.scss';

import configureStore from './utils/configureStore';
import getLocaleTransition from './utils/getLocaleTranslatons';
import registerServiceWorker from './utils/registerServiceWorker';
import App from './module/app/App.jsx';
import './index.css';

const store = configureStore();

function startReact() {
  getLocaleTransition((messages, languageWithoutRegionCode) => {
    ReactDOM.render(
      <IntlProvider locale={languageWithoutRegionCode} messages={messages}>
        <App store={store} />
      </IntlProvider>, document.getElementById('root'));
    registerServiceWorker();
  });
}

window.initMap = function initMap() {
  // console.log('initMap');
  // startReact();
};

startReact();
