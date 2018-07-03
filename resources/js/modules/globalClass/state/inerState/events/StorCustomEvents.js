'use strict';

module.exports = class StorCustomEvents {
	constructor() {
		this._eventBias = new CustomEvent('bias', {
			detail: {
				direction: null
			}
		});
	}

	getEventBias() {
		return this._eventBias;
	}
}