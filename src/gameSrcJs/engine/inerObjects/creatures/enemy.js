'use strict';

const Creature = require('./creature.js');

module.exports = class Enemy extends Creature {
	constructor (id, state, coor) {
		super(id, state, coor);
		this.type = 'enemy';
		this.classNameCSS = 'slimeEnemy';
		this.watcher = false;
		this.pursuitRange = this._settings.standartEnemy.pursuitRange;

		this._items.push({
			item: state.createItem(1, coor),
			num: 1
		});
	}
}