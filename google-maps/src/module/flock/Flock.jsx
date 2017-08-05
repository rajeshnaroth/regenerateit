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
import FlockInfo from './FlockInfo.jsx';
import FlockDelete from './FlockDelete.jsx';

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
        flockId={routeProps.match.params.id}
        loadFlock={componentProps.loadFlock}
        upsertFlock={componentProps.upsertFlock}
        routeBackToListing={() => routeProps.history.push('/flock/list')}
      />);
    }

    function getFlockDeleteForm(componentProps, routeProps) {
      return (<FlockDelete
        flockId={routeProps.match.params.id}
        loadFlock={componentProps.loadFlock}
        deleteFlock={componentProps.deleteFlock}
        routeBackToListing={() => routeProps.history.push('/flock/list')}
      />);
    }

    function getFlockInfo(componentProps, routeProps) {
      return (<FlockInfo
        flockId={routeProps.match.params.id}
        loadFlock={componentProps.loadFlock}
      />);
    }

    function getFlockList(componentProps, routeProps) {
      return (
        <div>
          <Form>
            <Link to="/flock/edit">
              <Button color="primary">
                Add New Flock
              </Button>
            </Link>
          </Form>
          <FlockList
            flockList={componentProps.flockList}
            routeToInfo={(id) => routeProps.history.push(`/flock/info/${id}`)}
          />
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
            <Route path="/flock/info/:id" render={(routeProps) => getFlockInfo(this.props, routeProps)} />
            <Route path="/flock/delete/:id" render={(routeProps) => getFlockDeleteForm(this.props, routeProps)} />
            <Route path="/flock" render={(routeProps) => getFlockList(this.props, routeProps)} />
            <Route path="/flock/list" render={(routeProps) => getFlockList(this.props, routeProps)} />
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
