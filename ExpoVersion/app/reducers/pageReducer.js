import { createReducer } from 'redux-act';
import * as actions from '../actions';
import _ from 'lodash';

const changePage = (node, page) => {
		const currentPage = Math.max(0, Math.min(node.pageCount - 1, page));
		return { ...node, currentPage, offset: currentPage * node.limit };
	},
	changeImageCount = (node, imageCount) => {
		const pageCount = Math.ceil(imageCount / node.limit);
		return changePage({ 
			...node, imageCount, pageCount,
			pageList: _.range(pageCount).map(page => ({
	            imageList: _.range(page * node.limit, (page + 1) * node.limit)
	        }))
		}, 0);
	},
	initialState = changeImageCount({ limit: 10 }, 0),
	
	reducer = createReducer({
		[actions.imageCountSuccess]: (state, imageCount) => changeImageCount(state, imageCount),

		[actions.goFirst]: state => changePage(state, 0),
		[actions.goPrevious]: state => changePage(state, state.currentPage - 1),
		[actions.goPage]: (state, current) => changePage(state, current),
		[actions.goNext]: state => changePage(state, state.currentPage + 1),
		[actions.goLast]: state => changePage(state, state.pageCount - 1),
	}, initialState);

export default reducer;