'use strict';

const RemainsPack = require('./remains/remainsPack.js');

module.exports = class AllItems {
	constructor() {
		this._remainsPack = new RemainsPack();
	}

	getItem(id, state, coor, idOwn) {
		return this._remainsPack.getItem(id, state, coor, idOwn);
	}
}