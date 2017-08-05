import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Form, FormGroup, Button } from 'reactstrap';
import FlockCard from './FlockCard.jsx';

function formFieldInit(flock = {
  id: 0,
  flockName: '',
  flockDescription: '',
  flockVertical: '',
  flockSize: 0,
}) {
  return flock;
}

class FlockInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = formFieldInit();
    this.props.loadFlock(this.props.flockId).then((actionResult) => {
      this.setState(formFieldInit(actionResult.flock));
    });
  }

  render() {
    return (
      <div>
        <FlockCard flock={this.state} />
        <Form>
          <FormGroup className="buttonHolder">
            <Link className="buttonSpacer" to={`/flock/edit/${this.state.id}`}>
              <Button color="primary">Edit</Button>
            </Link>
            <Link className="buttonSpacer" to={`/flock/edit/${this.state.id}`}>
              <Button color="primary">Grazing Plan</Button>
            </Link>
            <Link className="buttonSpacer" to={`/flock/delete/${this.state.id}`}>
              <Button color="primary">Delete</Button>
            </Link>
            <Link className="buttonSpacer" to={'/flock/list'}>
              <Button>Back to Listing</Button>
            </Link>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

FlockInfo.propTypes = {
  loadFlock: PropTypes.func.isRequired,
  flockId: PropTypes.string.isRequired,
};
export default FlockInfo;
