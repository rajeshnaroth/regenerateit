import React from 'react';
import { Button, Col, Collapse, Form, FormGroup, Label, Input } from 'reactstrap';

import { addFlock } from './flockApi';

function getFormInputs(state) {
  const { flockName, flockDescription, flockVertical, flockSize } = state;
  return { flockName, flockDescription, flockVertical, flockSize };
}

class FlockForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      flockName: 'My Herd',
      flockDescription: '',
      flockVertical: 'Grassfed Beef',
      flockSize: 1,
    };
    this.addNewFlock = this.addNewFlock.bind(this);
  }

  handleChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  addNewFlock() {
    addFlock(getFormInputs(this.state));
  }

  render() {
    return (
      <div>
        <Collapse isOpen={!this.state.isEditMode}>
          <Form>
            <Button color="primary" onClick={() => { this.setState({ isEditMode: true }); }}>Add New Flock</Button>
          </Form>
        </Collapse>
        <Collapse isOpen={this.state.isEditMode}>
          <Form>
            <FormGroup>
              <Label for="flockName">Flock Name</Label>
              <Input
                name="flockName"
                id="flockName"
                placeholder="Flock Name..."
                value={this.state.flockName}
                onChange={event => this.handleChange('flockName', event.target.value)}
              />
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>Flock Type</Label>
              <Col sm={4}>
                <Input
                  type="select"
                  value={this.state.flockVertical}
                  onChange={event => this.handleChange('flockVertical', event.target.value)}
                >
                  <option>Grassfed Beef</option>
                  <option>Poultry</option>
                </Input>
              </Col>
              <Label sm={3}>Number of animals</Label>
              <Col sm={2}>
                <Input
                  type="number"
                  name="number"
                  id="exampleNumber"
                  value={this.state.flockSize}
                  onChange={event => this.handleChange('flockSize', event.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Label for="flockDescription">Description</Label>
              <Input type="textarea" name="flockDescription" id="flockDescription" placeholder="Flock Description..." />
            </FormGroup>
            <FormGroup>
              <Button
                color="primary"
                onClick={this.addNewFlock}
              >Add New Flock</Button>
              <Button onClick={() => { this.setState({ isEditMode: false }); }}>Cancel</Button>
            </FormGroup>
          </Form>
        </Collapse>
      </div>
    );
  }
}

export default FlockForm;
