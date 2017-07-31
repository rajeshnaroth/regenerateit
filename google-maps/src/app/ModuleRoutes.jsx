import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Home from '../module/home/Home.jsx';
import Farm from '../module/farm/Farm.jsx';
import Flock from '../module/flock/Flock.jsx';
import Bio from '../module/bio/Bio.jsx';
import BusinessPlan from '../module/businessplan/BusinessPlan.jsx';
import GrazingPlan from '../module/grazingplan/GrazingPlan.jsx';

export default function ModuleRoutes(props) {
  return (
    <div>
      <Route exact path="/" store={props.store} component={Home} />
      <Route path="/farm" store={props.store} component={Farm} />
      <Route path="/flock" store={props.store} component={Flock} />
      <Route path="/bio" store={props.store} component={Bio} />
      <Route path="/businessplan" store={props.store} component={BusinessPlan} />
      <Route path="/grazingplan" store={props.store} component={GrazingPlan} />
    </div>
  );
}

ModuleRoutes.propTypes = {
  store: PropTypes.object.isRequired,
};
