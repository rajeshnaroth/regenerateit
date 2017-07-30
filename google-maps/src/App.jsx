import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Collapse } from 'reactstrap';
// import logo from './logo.svg';
import './App.css';
import BrandingHeader from './layout/BrandingHeader.jsx';
import NavigationMenu from './layout/NavigationMenu.jsx';
import ModuleRoutes from './config/ModuleRoutes.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNavBar = this.toggleNavBar.bind(this);
    this.state = {
      navigationMenuIsOpen: false,
    };
  }

  toggleNavBar() {
    this.setState({ navigationMenuIsOpen: !this.state.navigationMenuIsOpen });
  }

  render() {
    return (
      <div style={{ height: 600, position: 'relative' }}>
        <Router>
          <div className="App">
            <BrandingHeader toggler={this.toggleNavBar} />
            <Collapse isOpen={this.state.navigationMenuIsOpen} navbar>
              <NavigationMenu />
            </Collapse>
            <ModuleRoutes />
          </div>
        </Router>
      </div>
    );
  }
}
