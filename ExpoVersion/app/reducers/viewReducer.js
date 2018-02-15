import { createReducer } from 'redux-act';
import * as actions from '../actions';

const initialState = 'PAGE_VIEW',

	reducer = createReducer({
		[actions.closeCurrentImage]: state => 'PAGE_VIEW',
		[actions.showImageByID]: state => 'IMAGE_VIEW'
	}, initialState);

export default reducer;