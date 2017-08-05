import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link } from 'react-router-dom';

import {
  Container,
  Jumbotron,
  Form,
  Button,
} from 'reactstrap';

import FlockList from './FlockList.jsx';
import FlockForm from './FlockForm.jsx';

class Flock extends React.Component {
  constructor(props) {
    super(props);
    props.reloadFlockList();
    this.state = {
    };
  }

  render() {
    function getFlockEditForm(componentProps, routeProps) {
      return (<FlockForm
        reloadFlockList={componentProps.reloadFlockList}
        loadFlock={componentProps.loadFlock}
        upsertFlock={componentProps.upsertFlock}
        flockId={routeProps.match.params.id}
        routeBackToListing={() => routeProps.history.push('/flock/list')}
      />);
    }

    function getFlockList(componentProps) {
      return (
        <div>
          <Form>
            <Link to="/flock/edit">
              <Button color="primary">
                Add New Flock
              </Button>
            </Link>
          </Form>
          <FlockList flockList={componentProps.flockList} />
        </div>
      );
    }

    return (
      <Jumbotron>
        <Container>
          <h2>Flock</h2>
          <Switch>
            <Route path="/flock/edit/:id" render={(routeProps) => getFlockEditForm(this.props, routeProps)} />
            <Route path="/flock/edit" render={(routeProps) => getFlockEditForm(this.props, routeProps)} />

            <Route path="/flock" render={() => getFlockList(this.props)} />
            <Route path="/flock/list" render={() => getFlockList(this.props)} />
          </Switch>

        </Container>
      </Jumbotron>
    );
  }
}

Flock.propTypes = {
  reloadFlockList: PropTypes.func.isRequired,
  /* eslint-disable react/no-unused-prop-types */
  // These props are references inside functions and will show false positives if not disabled
  deleteFlock: PropTypes.func.isRequired,
  flockList: PropTypes.array.isRequired,
  upsertFlock: PropTypes.func.isRequired,
  /* eslint-disable react/no-unused-prop-types */
};

Flock.defaultProps = {
};

export default Flock;
