import { combineReducers } from 'redux';
import pageReducer from './pageReducer';
import imageReducer from './imageReducer';

export default combineReducers({
	pages: pageReducer,
	images: imageReducer
});