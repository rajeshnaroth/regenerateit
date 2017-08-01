import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Home from '../home/Home.jsx';
import Farm from '../farm/Farm.jsx';
import FlockContainer from '../flock/redux/flockContainer';
import Bio from '../bio/Bio.jsx';
import BusinessPlan from '../businessplan/BusinessPlan.jsx';
import GrazingPlan from '../grazingplan/GrazingPlan.jsx';

export default function ModuleRoutes(props) {
  return (
    <div>
      <Route exact path="/" store={props.store} component={Home} />
      <Route path="/farm" store={props.store} component={Farm} />
      <Route path="/flock" store={props.store} component={FlockContainer} />
      <Route path="/bio" store={props.store} component={Bio} />
      <Route path="/businessplan" store={props.store} component={BusinessPlan} />
      <Route path="/grazingplan" store={props.store} component={GrazingPlan} />
    </div>
  );
}

ModuleRoutes.propTypes = {
  store: PropTypes.object.isRequired,
};
