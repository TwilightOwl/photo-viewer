import { createReducer } from 'redux-act';
import * as actions from '../actions';

const 
	changePage = (node, page) => {
		const currentPage = Math.max(0, Math.min(node.pageCount - 1, page));
		return { ...node, currentPage, offset: currentPage * node.limit };
	},
	changeImageCount = (node, imageCount) => changePage({ 
		...node, imageCount,
		pageCount: Math.ceil(imageCount / node.limit)
	}, 0),
	initialState = {
		page: changeImageCount({ limit: 10 }, 0)
	};


const reducer = createReducer({
	[actions.imageCountSuccess]: (state, imageCount) => changeImageCount(state.page, imageCount),

	[actions.goFirst]: state => changePage(state, 0),
	[actions.goPrevious]: state => changePage(state, state.currentPage - 1),
	[actions.goPage]: (state, current) => changePage(state, current),
	[actions.goNext]: state => changePage(state, state.currentPage + 1),
	[actions.goLast]: state => changePage(state, state.pageCount - 1),

}, initialState);

export default reducer;