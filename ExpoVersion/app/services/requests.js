import mockRESTServer from './mockRESTServer';

const receiveImageByID = ID => mockRESTServer.receiveImageByID(ID),
	receiveImages = (offset, limit) => mockRESTServer.receiveImages(offset, limit),
	receiveImageCount = () => mockRESTServer.receiveImageCount();

export { receiveImageByID, receiveImages, receiveImageCount };