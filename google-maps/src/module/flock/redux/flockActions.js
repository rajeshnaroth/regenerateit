import { loadFlocks as loadFlocksApi, addFlock as addFlockApi } from '../api/flockApi';
import { RELOAD_FLOCK_LIST } from './flockTypes';

const loadFlocks = () => (dispatch) => dispatch({
  type: RELOAD_FLOCK_LIST,
  flockList: loadFlocksApi(),
});

const addFlock = (flock) => (dispatch) => {
  addFlockApi(flock);
  dispatch({
    type: RELOAD_FLOCK_LIST,
    flockList: loadFlocksApi(),
  });
};

export { loadFlocks, addFlock };
