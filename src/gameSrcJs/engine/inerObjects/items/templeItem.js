'use strict';

const TempleInerObj = require('../templeInerObj.js');

module.exports = class TempleItem extends TempleInerObj {
	constructor(id, state, coor) {
		super(id, state, coor);

		this._idItem = 0;
	}
}