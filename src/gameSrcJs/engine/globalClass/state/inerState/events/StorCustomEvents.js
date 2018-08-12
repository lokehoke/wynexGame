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

		this._eventMainGetDamage = new CustomEvent('mainGetDamage', this._getObjChangeStatistic() );

		this._eventDyeCreature = new CustomEvent('dyeCreature', {
			detail: {
				from: null,
				who: null
			}
		});

		this._eventMainGetHP = new CustomEvent('mainGetHP', this._getObjChangeStatistic() );

		this._eventMainStepOnItem = new CustomEvent('mainStepOn', {
			detail: {
				withItems: false,
				items: []
			}
		})
	}

	getEventMainStepOn() {
		return this._eventMainStepOnItem;
	}

	getEventBias() {
		return this._eventBias;
	}

	getEventEndGame() {
		return this._eventEndGame;
	}

	getEventMainGetDamage() {
		return this._eventMainGetDamage;
	}

	getEventDyeCreature() {
		return this._eventDyeCreature;
	}

	getEventMainGetHP() {
		return this._eventMainGetHP;
	}

	_getObjChangeStatistic() {
		let obj = {};
		obj.detail = new ChangeStatistic()
		return obj;
	}
}