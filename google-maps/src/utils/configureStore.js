import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../module/app/redux/reducers';

const configureStore = () => createStore(reducer, applyMiddleware(thunk));

export default configureStore;
