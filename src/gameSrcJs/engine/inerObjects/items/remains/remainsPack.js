'use strict';

const Slime = require('./slime/itemSlime.js');

module.exports = class RemainsPack {
	constructor() {
		this._slime = Slime;
	}

	getItem(id, state, coor, idOwn) {
		if (idOwn === 1) {
			return new Slime(id, state, coor);
		}
	}

	getSlimeClass() {
		return this._slime;
	}
}