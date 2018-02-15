import { createReducer } from 'redux-act';
import * as actions from '../actions';

const initialState = {
		status: {
			isLoading: false,
			error: false
		},
		currentImage: null,
		loadedImages: {}
	},


	reducer = createReducer({

		[actions.imageCountLoading]: state => 
			({ ...state, status: { isLoading: true, error: false } }),
		[actions.imageCountSuccess]: (state, imageCount) => 
			({ ...state, status: { isLoading: false, error: false } }),
		[actions.imageCountError]: state => ({ ...state, status: { isLoading: false, error: true } }),

		[actions.imageLoading]: (state, ID) => ({ ...state, 
			loadedImages: { ...state.loadedImages, 
				[ID]: {
					image: null,
					...state.loadedImages[ID],
					status: { isLoading: true, error: false }
				}
			} 
		}),
		[actions.imageSuccess]: (state, { result, ID }) => ({ ...state, 
			loadedImages: { ...state.loadedImages, 
				[ID]: {
					status: { isLoading: false, error: false },
					image: result
				}
			} 
		}),
		[actions.imageError]: (state, { error, ID }) => ({ ...state, 
			loadedImages: { ...state.loadedImages, 
				[ID]: {
					status: { isLoading: false, error: true },
					image: null
				}
			} 
		}),
		[actions.showImageByID]: (state, currentImage) => ({ ...state, currentImage }),
		[actions.closeCurrentImage]: state => ({ ...state, currentImage: null })

	}, initialState);

export default reducer;