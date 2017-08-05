import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Collapse, Table, Card, CardTitle, CardText, Button } from 'reactstrap';

const FlockList = (props) => (
  <div>
    <Collapse isOpen={props.flockList.length === 0}>
      <Card block>
        <CardTitle>No Flocks</CardTitle>
        <CardText>To get started you need to add one or more flocks.</CardText>
      </Card>
    </Collapse>
    <Collapse isOpen={props.flockList.length > 0}>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Flock Name</th>
            <th>Animal</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {
            props.flockList.map((flock, index) => (
              <tr key={flock.id}>
                <th scope="row">{index}</th>
                <td>{flock.flockName}</td>
                <td>{flock.flockVertical}</td>
                <td>{flock.flockSize}</td>
                <td>
                  <Link to={`/flock/edit/${flock.id}`}>
                    <Button> Edit </Button>
                  </Link>
                  <Link to={`/flock/delete/${flock.id}`}>
                    <Button> Delete </Button>
                  </Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Collapse>
  </div>
);

FlockList.propTypes = {
  flockList: PropTypes.array.isRequired,
};

export default FlockList;
