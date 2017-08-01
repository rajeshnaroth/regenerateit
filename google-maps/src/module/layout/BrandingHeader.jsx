import React from 'react';
import PropTypes from 'prop-types';

import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
} from 'reactstrap';
import { FormattedMessage } from 'react-intl';
// import NavigationMenu from './NavigationMenu.jsx';

export default function BrandingHeader(props) {
  return (
    <div>
      <Navbar color="inverse" inverse>
        <NavbarToggler left onClick={props.toggler} />
        <NavbarBrand href="/" style={{ marginLeft: '3em' }}>
          <FormattedMessage id="app.name" defaultMessage={'Logo/Title'} />
        </NavbarBrand>
      </Navbar>
    </div>
  );
}

BrandingHeader.propTypes = {
  toggler: PropTypes.func.isRequired,
};
