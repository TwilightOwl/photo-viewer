import { createAction } from 'redux-act';
import _ from 'lodash';
import * as requests from '../services/requests';

export const add = createAction('ADD');
export const increment = createAction('INC');
export const decrement = createAction('DEC');
export const receive = () => 
	dispatch => {
		dispatch(increment());
		return requests.receiveImageByID(5)
			.then(result => {
				dispatch(increment());
				return result;
			})
			.catch(error => error);
	};


export const goFirst = createAction('GO_FIRST');
export const goPrevious = createAction('GO_PREVIOUS');
export const goPage = createAction('GO_PAGE');
export const goNext = createAction('GO_NEXT');
export const goLast = createAction('GO_LAST');


//receiveImageByID, receiveImages, receiveImageCount
export const showImageByID = createAction('SHOW_IMAGE_BY_ID');
export const closeCurrentImage = createAction('CLOSE_CURRENT_IMAGE');

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

/*export const imageLoading = createAction('IMAGE_LOADING');
export const imageSuccess = createAction('IMAGE_SUCCESS');
export const imageError = createAction('IMAGE_ERROR');
export const receiveImageByID = ID =>
	dispatch => {
		dispatch(imageLoading());
		return requests.receiveImageByID(ID)
			.then(result => {
				//console.log(result);
				return dispatch(imageSuccess(result))
			})
			.catch(error => dispatch(imageError(error)));
	};

export const imagesLoading = createAction('IMAGES_LOADING');
export const imagesSuccess = createAction('IMAGES_SUCCESS');
export const imagesError = createAction('IMAGES_ERROR');
export const receiveImages = (offset, limit) =>
	dispatch => {
		dispatch(imagesLoading());
		return requests.receiveImages(offset, limit)
			.then(result => {
				return dispatch(imagesSuccess(result))
			})
			.catch(error => dispatch(imagesError(error)));
	};*/

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


// export default {
// 	add: createAction('ADD'),
// 	increment: createAction('INC'),
// 	decrement: createAction('DEC'),

// 	receive:
// }

/*export const receive = (add) => {
	console.log('AAAAAAAAAAAAAAAAAAA')
	add();
	return receiveImageByID(5)
		.then(result => {
			add();
			return result;
		})
		.catch(error => error);
};*/






/*
function fetch() {
  // state: { running: false, result: false }
  start();
  // state: { running: true, result: false }
  return new Promise(resolve => {
    // Here, you should probably do a real async call,
    // like, you know, XMLHttpRequest or Global.fetch stuff
    setTimeout(() =>
      resolve(1)
    , 5);
  }).then(result=>
    success(result)
    // state: { running: false, result: 1 }
  );
}

fetch().then(() => {
  // state: { running: false, result: 1 }
});*/