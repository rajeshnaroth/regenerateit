import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
} from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import NavigationMenu from './NavigationMenu.jsx';

export default class BrandingHeader extends React.Component {
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
        <Navbar color="inverse" inverse>
          <NavbarToggler left onClick={this.toggleNavBar} />
          <NavbarBrand href="/" style={{ marginLeft: '3em' }}>
            <FormattedMessage id="app.name" defaultMessage={'Logo/Title'} />
          </NavbarBrand>
        </Navbar>
        <Collapse isOpen={this.state.navigationMenuIsOpen} navbar>
          <NavigationMenu />
        </Collapse>
      </div>
    );
  }
}
