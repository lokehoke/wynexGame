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

		this._fastItem = [{numItems: 1, item: state.createItem(1, {x: 0, y: 0})} ];
		this._items = [];

		for (let i = 0; i < 32; i++) {
			if (i < 6) {
				this._fastItem.push({
					numItem: 0,
					item: null
				});
			}

			this._items.push({
				numItem: 0,
				item: null
			});
		}

		switch(profession) {
			case 'mage':
				this.classNameCSS = 'magePlayer';
				break;
		}
	}

	getDemage(creature) {
		let damage = super.getDemage(creature);
		this.state.dispatchMAinGetDamage(this);
		return damage;
	}

	getFastItems() {
		return this._fastItem;
	}
}
