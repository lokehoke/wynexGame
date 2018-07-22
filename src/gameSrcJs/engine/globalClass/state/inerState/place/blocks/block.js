'use strict';

module.exports = class Block {
	constructor() {
		this.nesting = false;
		this.isCreature = false;

		this.items = [];

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
}