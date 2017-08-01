import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Jumbotron,
} from 'reactstrap';

import FlockList from './FlockList.jsx';
import FlockForm from './FlockForm.jsx';

class Flock extends React.Component {
  constructor(props) {
    super(props);
    props.reloadFlockList();
  }
  render() {
    return (
      <Jumbotron>
        <Container>
          <h2>Flock</h2>
          <FlockList {...this.props} />
          <FlockForm {...this.props} />
        </Container>
      </Jumbotron>
    );
  }
}

Flock.propTypes = {
  reloadFlockList: PropTypes.func.isRequired,
};

export default Flock;
