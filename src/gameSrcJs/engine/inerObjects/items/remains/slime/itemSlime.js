'use strict';

const Temple = require('../../templeItem.js');

module.exports = class ItemSlime extends Temple {
	constructor (id, state, coor) {
		super(id, state, coor);

		this._idItem = 1;
		this.classNameCSS = 'itemSlime';
	}

	getIdItem() {
		return this._idItem;
	}
}