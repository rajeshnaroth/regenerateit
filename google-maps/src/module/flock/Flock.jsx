import React from 'react';
import {
  Container,
  Jumbotron,
} from 'reactstrap';

import FlockList from './FlockList.jsx';
import FlockForm from './FlockForm.jsx';
// import FlockForm from './FlockForm.jsx';

const Flock = () => (
  <Jumbotron>
    <Container>
      <h2>Flock</h2>
      <FlockList />
      <FlockForm />
    </Container>
  </Jumbotron>
);

export default Flock;
