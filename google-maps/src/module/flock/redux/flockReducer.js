import { RELOAD_FLOCK_LIST } from './flockTypes';

const initialState = {
  flockList: [],
};

const flock = (state = initialState, action) => {
  switch (action.type) {
    case RELOAD_FLOCK_LIST: {
      // simple refresh, No reduction
      if (!action.flockList) {
        return initialState;
      }
      return {
        flockList: action.flockList,
      };
    }

    default:
      return state;
  }
};

export default flock;
