/* global document, window */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

window.initMap = function initMap() {
  // console.log('initMap');

  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
};
