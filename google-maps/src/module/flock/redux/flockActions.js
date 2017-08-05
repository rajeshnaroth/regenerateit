import {
  loadFlock as loadFlockApi,
  loadFlocks as loadFlocksApi,
  upsertFlock as upsertFlockApi,
  deleteFlock as deleteFlockApi,
} from '../api/flockApi';
import { RELOAD_FLOCK_LIST, LOAD_FLOCK } from './flockTypes';

const loadFlocks = () => (dispatch) => loadFlocksApi().then(
  (flockList) => dispatch({
    type: RELOAD_FLOCK_LIST,
    flockList,
  }),
);

const loadFlock = (id) => (dispatch) => loadFlockApi(id).then(
  (flock) => dispatch({
    type: LOAD_FLOCK,
    flock,
  }),
);

const upsertFlock = (flock) => (dispatch) => upsertFlockApi(flock).then(
  (flockList) => dispatch({
    type: RELOAD_FLOCK_LIST,
    flockList,
  }),
);

const deleteFlock = (flock) => (dispatch) => deleteFlockApi(flock).then(
  (flockList) => dispatch({
    type: RELOAD_FLOCK_LIST,
    flockList,
  }),
);

export { loadFlock, loadFlocks, upsertFlock, deleteFlock };
