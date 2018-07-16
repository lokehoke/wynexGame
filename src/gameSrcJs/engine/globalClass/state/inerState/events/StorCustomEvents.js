'use strict';

module.exports = class StorCustomEvents {
	constructor() {
		this._eventBias = new CustomEvent('bias', {
			detail: {
				direction: null
			}
		});

		this._eventEndGame = new CustomEvent('endGame');
	}

	getEventBias() {
		return this._eventBias;
	}

	getEventEndGame() {
		return this._eventEndGame;
	}
}