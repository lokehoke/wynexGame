'use strict';

module.exports = class Block {
	constructor() {
		this.nesting = false;
		this.isCreature = false;

		this._items = [];

		this._visiter = null;
		this._weapon = null;
	}

	addVisiter(creature) {
		if (this._visiter) {
			throw "two visiter in 1 place";
		} else if (!this.patency) {
			throw "cant set creature, patency!";
		} else {
			this._visiter = creature;
		}

		return true;
	}

	removeVisiter() {
		if (this._visiter === null) {
			throw "empty, visiter not found!";
		} else {
			this._visiter = null;
			return true;
		}
	}

	getVisiter() {
		return this._visiter;
	}

	addWeapon(weapon) {
		this._weapon = weapon;
		return true;
	}

	removeWeapon() {
		this._weapon = null;
		return true;
	}

	getShowObj() {
		if (this._visiter) {
			return this._visiter;
		} else if (this._weapon) {
			return this._weapon;
		} else if (this._items.length > 1) {
			console.log(1);
			// return ;
		} else if (this._items.length) {
			return this._items[0].item;
		} else {
			return null;
		}
	}
}