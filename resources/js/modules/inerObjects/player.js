'use strict';

const Creature = require('./creature');

module.exports = class Player extends Creature {
	constructor (id, state, watcher, coor, profession) {
		super(id, state, coor);
		this.type = 'player';

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
}