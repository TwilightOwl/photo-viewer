import { combineReducers } from 'redux';
//import reducer from './reducer';
import pageReducer from './pageReducer';
import imageReducer from './imageReducer';

export default combineReducers({
  //root: reducer,
  pages: pageReducer,
  images: imageReducer
});