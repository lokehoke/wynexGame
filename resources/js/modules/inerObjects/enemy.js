'use strict';

const Creature = require('./creature');

module.exports = class Enemy extends Creature {
	constructor (id, state, coor) {
		super(id, state, coor);
		this.type = 'enemy';
		this.classNameCSS = 'slimeEnemy';
		this.watcher = false;
	}
}