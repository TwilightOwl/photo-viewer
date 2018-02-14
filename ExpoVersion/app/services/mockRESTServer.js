import _ from 'lodash';

class MockRESTServer {
	constructor() {
		this.API_URL = 'https://jsonplaceholder.typicode.com/photos';
		this.MAX_PHOTO_COUNT = 5000;
		this.FAKE_DELAY_MLSEC = 50;
	}

	_getRandomFakeDelayMlsec() {
		return Math.floor(Math.random() * this.FAKE_DELAY_MLSEC);
	}

	_isValidInteger(value) {
		return Number.isInteger(value) && value >= 0;
	}

	_fetchData(URL) {
		const request = () => fetch(URL)
			.then(result => result.json())
			.then(parsed => (parsed.url ? { ID: parsed.id, URL: parsed.url, title: parsed.title } : {}))
			.catch(error => error);
		return request();
		//return new Promise((resolve, reject) => setTimeout(() => resolve(request()), this._getRandomFakeDelayMlsec()));
	}

	receiveImageCount() {
		return Promise.resolve(this.MAX_PHOTO_COUNT);
	}

	receiveImageByID(ID) {
		if (!this._isValidInteger(ID)) throw 'Bad parameter';
		return this._fetchData(this.API_URL + '/' + String(ID));
	}

	receiveImages(offset, limit) {
		if (!this._isValidInteger(offset) || !this._isValidInteger(limit)) throw 'Bad parameter';
		return Promise.all(
			_.range(offset, offset + limit).map(ID => this.receiveImageByID(ID))
		);
	}
}

export default new MockRESTServer();