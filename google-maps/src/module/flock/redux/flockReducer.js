import { RELOAD_FLOCK_LIST } from './flockTypes';

const initialState = {
  flockList: [],
};

const flock = (state = initialState, action) => {
  switch (action.type) {
    case RELOAD_FLOCK_LIST: {
      // console.log('RELOAD_FLOCK_LIST');
      if (!action.flockList) {
        return initialState;
      }
      return {
        flockList: action.flockList,
      };
    }

    default:
      // console.log('default');
      return state;
  }
};

export default flock;
