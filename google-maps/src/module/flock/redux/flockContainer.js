import { connect } from 'react-redux';

import { loadFlocks, loadFlock, upsertFlock, deleteFlock } from './flockActions';
import Flock from '../Flock.jsx';

const mapStateToProps = (state) => ({
  flockList: state.flock.flockList,
});

const mapDispatchToProps = (dispatch) => ({
  reloadFlockList: () => dispatch(loadFlocks()),
  loadFlock: (id) => dispatch(loadFlock(id)),
  upsertFlock: (flock) => dispatch(upsertFlock(flock)),
  deleteFlock: (flock) => dispatch(deleteFlock(flock)),
});

const FlockContainer = connect(mapStateToProps, mapDispatchToProps)(Flock);
export default FlockContainer;
