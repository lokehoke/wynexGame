'use strict';

const Creature = require('./creature');
const GLOBAL_SETTING = (require('../setting/globalSetting.js'));

module.exports = class Enemy extends Creature {
	constructor (id, state, coor) {
		super(id, state, coor);
		this.type = 'enemy';
		this.classNameCSS = 'slimeEnemy';
		this.watcher = false;
		this.pursuitRange = GLOBAL_SETTING.standartEnemy.pursuitRange;
	}
}