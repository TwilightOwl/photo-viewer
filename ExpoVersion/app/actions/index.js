import { createAction } from 'redux-act';
import _ from 'lodash';
import * as requests from '../services/requests';

export const imageCountLoading = createAction('IMAGE_COUNT_LOADING');
export const imageCountSuccess = createAction('IMAGE_COUNT_SUCCESS');
export const imageCountError = createAction('IMAGE_COUNT_ERROR');
export const receiveImageCount = () =>
	dispatch => {
		dispatch(imageCountLoading());
		return requests.receiveImageCount()
			.then(result => dispatch(imageCountSuccess(result)))
			.catch(error => dispatch(imageCountError(error)));
	};

export const imageLoading = createAction('IMAGE_LOADING');
export const imageSuccess = createAction('IMAGE_SUCCESS');
export const imageError = createAction('IMAGE_ERROR');
export const receiveImagesAsync = (offset, limit) =>
	dispatch => {
		return Promise.all(
			_.range(offset, offset + limit).map(ID => {
				dispatch(imageLoading(ID));		
				return requests.receiveImageByID(ID)
					.then(result => dispatch(imageSuccess({ result, ID })))
					.catch(error => dispatch(imageError({ error, ID })));
			})
		)
	};

export const goFirst = createAction('GO_FIRST');
export const goPrevious = createAction('GO_PREVIOUS');
export const goPage = createAction('GO_PAGE');
export const goNext = createAction('GO_NEXT');
export const goLast = createAction('GO_LAST');

export const showImageByID = createAction('SHOW_IMAGE_BY_ID');
export const closeCurrentImage = createAction('CLOSE_CURRENT_IMAGE');