import React from 'react';

import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
} from 'reactstrap';
import { Link } from 'react-router-dom';

function NavigationMenu() {
  return (
    <div style={{ padding: '1em', width: '30em' }}>
      <ListGroup>
        <ListGroupItemHeading>List group item heading</ListGroupItemHeading>

        <ListGroupItem>
          <Link to="/farm">Farm</Link>
        </ListGroupItem>
        <ListGroupItem>
          <Link to="/flock">Flock</Link>
        </ListGroupItem>
        <ListGroupItem>
          <Link to="/bio">Bio Monitoring</Link>
        </ListGroupItem>
        <ListGroupItem>
          <Link to="/grazingplan">Grazing Plan</Link>
        </ListGroupItem>
        <ListGroupItem>
          <Link to="/businessplan">Business Plan</Link>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}

NavigationMenu.propTypes = {
};

export default NavigationMenu;
