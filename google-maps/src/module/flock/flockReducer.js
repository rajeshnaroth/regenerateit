const RELOAD_FLOCK_LIST = 'RELOAD_FLOCK_LIST';

const initialState = [];
const flockReducer = (state = initialState, action) => {
  switch (action.type) {
    case RELOAD_FLOCK_LIST:
      return action.result;

    default:
      return state;
  }
};

export default flockReducer;
