import { connect } from 'react-redux';

import { loadFlocks, addFlock } from './flockActions';
import Flock from '../Flock.jsx';

const mapStateToProps = (state) => ({
  flockList: state.flock.flockList,
});

const mapDispatchToProps = (dispatch) => ({
  reloadFlockList: () => dispatch(loadFlocks()),
  addFlock: (flock) => dispatch(addFlock(flock)),
});

const FlockContainer = connect(mapStateToProps, mapDispatchToProps)(Flock);
export default FlockContainer;
