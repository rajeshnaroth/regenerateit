import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import BrandingHeader from './layout/BrandingHeader.jsx';
import Home from './module/home/Home.jsx';
import Farm from './module/farm/Farm.jsx';
import Flock from './module/flock/Flock.jsx';
import Bio from './module/bio/Bio.jsx';
import BusinessPlan from './module/businessplan/BusinessPlan.jsx';
import GrazingPlan from './module/grazingplan/GrazingPlan.jsx';


function App() {
  return (
    <div style={{ height: 600, position: 'relative' }}>
      <Router>
        <div className="App">
          <BrandingHeader />
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/farm" component={Farm} />
            <Route path="/flock" component={Flock} />
            <Route path="/bio" component={Bio} />
            <Route path="/businessplan" component={BusinessPlan} />
            <Route path="/grazingplan" component={GrazingPlan} />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
