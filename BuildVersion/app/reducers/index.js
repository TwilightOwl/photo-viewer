import { combineReducers } from 'redux';
import pageReducer from './pageReducer';
import imageReducer from './imageReducer';
import viewReducer from './viewReducer';

export default combineReducers({
	pages: pageReducer,
	images: imageReducer,
	view: viewReducer
});