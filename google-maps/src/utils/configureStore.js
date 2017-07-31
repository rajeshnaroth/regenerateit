import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../app/reducers';

const configureStore = () => createStore(reducer, applyMiddleware(thunk));

export default configureStore;
