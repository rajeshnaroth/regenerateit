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

class FlockDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = formFieldInit();
    this.props.loadFlock(this.props.flockId).then((actionResult) => {
      this.setState(formFieldInit(actionResult.flock));
    });
  }

  deleteFlock(id) {
    this.props.deleteFlock(id).then((actionResult) => {
      console.log(actionResult);
      this.props.routeBackToListing();
    });
  }

  render() {
    return (
      <div>
        <FlockCard flock={this.state} />
        <h3>Are you sure you want to delete this Flock?</h3>
        <Form>
          <FormGroup>
            <Button onClick={() => { this.deleteFlock(this.props.flockId); }}>
              Yes. Delete this Flock
            </Button>
            <Button>
              <Link to={'/flock/list'}>Cancel</Link>
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

FlockDelete.propTypes = {
  loadFlock: PropTypes.func.isRequired,
  deleteFlock: PropTypes.func.isRequired,
  routeBackToListing: PropTypes.func.isRequired,
  flockId: PropTypes.string.isRequired,
};
export default FlockDelete;
