
import React from 'react';
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
} from 'reactstrap';
import { FormattedMessage } from 'react-intl';

const Farm = () => (
  <div>
    <Jumbotron>
      <Container>
        <Row>
          <Col>
            <h1> <FormattedMessage id="app.name" defaultMessage={'RegenerateIT'} /> </h1>
            <h4> <FormattedMessage id="app.tagline" defaultMessage={''} /> </h4>
            <h6> <FormattedMessage id="app.description" defaultMessage={''} /> </h6>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <h6> Your profile is not fully setup. </h6>
            <Button color="primary">Lets Go</Button>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  </div>
);

export default Farm;
