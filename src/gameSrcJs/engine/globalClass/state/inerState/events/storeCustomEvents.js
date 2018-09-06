'use strict';

const ChangeStatistic = require('./../../../../structOfDate/changeStatistic.js');

module.exports = class StorCustomEvents {
	constructor() {
		this._eventBias = new CustomEvent('bias', {
			detail: {
				direction: null
			}
		});

		this._eventEndGame = new CustomEvent('endGame');

		this._eventDyeCreature = new CustomEvent('dyeCreature', {
			detail: {
				from: null,
				who: null
			}
		});
	}

	getEventBias() {
		return this._eventBias;
	}

	getEventEndGame() {
		return this._eventEndGame;
	}

	getEventDyeCreature() {
		return this._eventDyeCreature;
	}
}
