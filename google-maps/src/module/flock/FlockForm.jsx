import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';

function getFormInputs(state) {
  const { id, flockName, flockDescription, flockVertical, flockSize } = state;
  return { id, flockName, flockDescription, flockVertical, flockSize };
}

function formFieldInit(flock = {
  id: 0,
  flockName: 'My Herd',
  flockDescription: '',
  flockVertical: 'Grassfed Beef',
  flockSize: 1,
}) {
  return flock;
}

class FlockForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = formFieldInit();
    this.props.loadFlock(this.props.flockId).then((actionResult) => {
      this.setState(formFieldInit(actionResult.flock));
    });
  }

  handleInputChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  saveFormData() {
    this.props.upsertFlock(getFormInputs(this.state)).then(() => {
      this.props.routeBackToListing();
    });
  }

  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <Label for="flockName">Flock Name</Label>
            <Input
              name="flockName"
              id="flockName"
              placeholder="Flock Name..."
              value={this.state.flockName}
              onChange={(event) => this.handleInputChange('flockName', event.target.value)}
            />
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Flock Type</Label>
            <Col sm={4}>
              <Input
                type="select"
                value={this.state.flockVertical}
                onChange={(event) => this.handleInputChange('flockVertical', event.target.value)}
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
                onChange={(event) => this.handleInputChange('flockSize', event.target.value)}
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
              onClick={() => { this.saveFormData(); }}
            >{this.props.flockId ? 'Update Flock' : 'Add New Flock'}</Button>
            <Button>
              <Link to={'/flock/list'}>Cancel</Link>
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

FlockForm.propTypes = {
  loadFlock: PropTypes.func.isRequired,
  upsertFlock: PropTypes.func.isRequired,
  routeBackToListing: PropTypes.func.isRequired,
  flockId: PropTypes.string.isRequired,
};

FlockForm.defaultProps = {
};

export default FlockForm;
