'use strict';

const Creature = require('./creature.js');

module.exports = class Player extends Creature {
	constructor (id, state, watcher, coor, profession) {
		super(id, state, coor);

		this.type = 'player';

		this.maxHP = this._settings.standartPlayer.maxHP;
		this.HP = this._settings.standartPlayer.maxHP;

		this.attackDamage = this._settings.standartPlayer.attackDamage;
		this.attackRange = this._settings.standartPlayer.attackRange;

		if (watcher === true){
			this.watcher = true;

			state.setPointWatch(coor, this);
			this.visable = {
				was: true,
				now: true
			};
		} else {
			this.watcher = false;
		}

		switch(profession) {
			case 'mage':
				this.classNameCSS = 'magePlayer';
				break;
		}
	}

	getDemage(creature) {
		let damage = super.getDemage(creature);
		let event = this.state.getEventMainGetDamage();

		event.detail.fromO = creature;
		event.detail.num = damage;
		event.detail.max = this.maxHP;
		event.detail.cur = this.HP;
		event.detail.type = 'hp';

		document.dispatchEvent(event);

		return damage;
	}
}