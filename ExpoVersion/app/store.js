import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const configureStore = initialState => 
	createStore(reducer, initialState, applyMiddleware(thunk));

export default configureStore;