import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';


import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Branding from './Branding.jsx';
import ModuleRoutes from './ModuleRoutes.jsx';

export default function App(props) {
  return (
    <div style={{ height: 600, position: 'relative' }}>
      <Provider store={props.store}>
        <Router>
          <div className="App">
            <Branding />
            <ModuleRoutes store={props.store} />
          </div>
        </Router>
      </Provider>
    </div>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};
