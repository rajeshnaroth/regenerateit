import React from 'react';
import { Collapse } from 'reactstrap';

import BrandingHeader from '../layout/BrandingHeader.jsx';
import NavigationMenu from '../layout/NavigationMenu.jsx';

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
      <div>
        <BrandingHeader toggler={this.toggleNavBar} />
        <Collapse isOpen={this.state.navigationMenuIsOpen} navbar>
          <NavigationMenu />
        </Collapse>
      </div>
    );
  }
}
