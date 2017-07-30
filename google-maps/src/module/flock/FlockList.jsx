import React from 'react';
import { Collapse, Table, Card, CardTitle, CardText } from 'reactstrap';

import { loadFlocks } from './flockApi';

class FlockList extends React.Component {
  constructor() {
    super();
    this.state = {
      flocks: loadFlocks(),
    };
  }
  render() {
    return (
      <div>
        <Collapse isOpen={this.state.flocks.length === 0}>
          <Card block>
            <CardTitle>No Flocks</CardTitle>
            <CardText>To get started you need to add one or more flocks.</CardText>
          </Card>
        </Collapse>
        <Collapse isOpen={this.state.flocks.length > 0}>
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
                this.state.flocks.map((flock, index) => (
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{flock.flockName}</td>
                    <td>{flock.flockVertical}</td>
                    <td>{flock.flockSize}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Collapse>
      </div>
    );
  }
}

export default FlockList;
