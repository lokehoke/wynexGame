'use strict';

const Place = require('./inerState/place/place.js');
const StackTempClassName = require('./inerState/stackTemp/stackTempClassName.js');
const StorCustomEvents = require('./inerState/events/StorCustomEvents.js')

const Player = require('../../inerObjects/player.js');
const Enemy = require('../../inerObjects/enemy.js');
const Weapon = require('../../inerObjects/weapon.js');

const Coor = require('../../structOfDate/coordinate.js');

module.exports = class State {
	constructor (config) {
		this._numInerBlock = 0;

		this._place = new Place(config);
		this._place.addRoom();

		this._creature = [];
		this._weapons = {};

		this._pointWatch = {};
		this._startPointWatch = new Coor(0, 0);
		this._bias = null;

		this._worldDiv = null;
		this._worldObject = null;

		this._sizeWorld = {
			firstFindSize: true,
			sizeG: null
		};

		this._stackTempClassName = new StackTempClassName();

		this._events = new StorCustomEvents();
	}

	deleteWeapon(id = 0) {
		let weapon = this._weapons[id];
		this._place[weapon.coor.x][weapon.coor.y] = this._place.createNewBlock(weapon.idBackBlock);
		delete this._weapons[id];
	}

	deleteCreature(id = 0) {
		let creature = this._creature[id];
		this._place[creature.coor.x][creature.coor.y] = this._place.createNewBlock(creature.idBackBlock);
		delete this._creature[id];
	}

	getEventBias() {
		return this._events.getEventBias();
	}

	getSizeWorld() {
		return this._sizeWorld;
	}

	setFirstFindSize(sizeWorld) {
		this._sizeWorld = sizeWorld;
	}

	setCoorPlayer(coor, num = 0) {
		this._creature[num] = {};
		this._creature[num].coor = coor;
		return true;
	}

	setPlayer(val) {
		this._creature[this._numInerBlock] = new Player(this._numInerBlock, this, val.watcher, val.coor, val.type);
		this._place[val.coor.x][val.coor.y] = this._creature[this._numInerBlock++];
		return true;
	}

	setEnemy(val) {
		this._creature[this._numInerBlock] = new Enemy(this._numInerBlock, this, val.coor, val.type);
		this._place.setCell(val.coor.x, val.coor.y, this._creature[this._numInerBlock++]);
		return true;
	}

	setWeapon(val) {
		let position = this._place[val.coor.x][val.coor.y];


		if (position.patency) {
			let weapon = new Weapon(this._numInerBlock, this, val.owner, val.coor);
			this._weapons[this._numInerBlock++] = weapon;
			this._place[val.coor.x][val.coor.y] = weapon;
			return weapon;
		} else if (position.health) {
			position.getDemage(val.owner);
		} else {
			return null;
		}
	}

	getCreature(id = 0) {
		if (typeof +id !== 'number') {
			return false;
		} else {
			return this._creature[id];
		}
	}

	getAllCreature() {
		return this._creature;
	}

	getAllPlace() {
		return this._place.getAllPlace();
	}

	getCellPlace(coor) {
		return this._place.getCell(coor.x, coor.y);
	}

	setCellPlace(coor, val) {
		if (val.isCreature === true) {
			val.idBackBlock = this._place.getCell(coor.x, coor.y).idBlock;
			val.classNameBackBlock = this._place.getCell(coor.x, coor.y).classNameCSS;
		}

		this._place.setCell(coor.x, coor.y, val);
		return true;
	}

	changeCoorPlayer(coor, id = 0) {
		this._creature[id].coor.x = coor.x;
		this._creature[id].coor.y = coor.y;
		return true;
	}

	changeCoorWeapon(coor, id = 0) {
		this._weapons[id].coor.x = coor.x;
		this._weapons[id].coor.y = coor.y;
		return true;
	}

	setBias(direction) {
		this._bias = direction;
		return true;
	}

	getBias(remove) {
		if (this._bias !== undefined) {
			let OldValue = this._bias;
			if (remove === true) {
				this._bias = null;
			}
			return OldValue;
		} else {
			return null;
		}
	}

	setPointWatch(coor, watcher) {
		this._pointWatch.x = coor.x;
		this._pointWatch.y = coor.y;
		this._pointWatch.watcher = watcher;
		return true;
	}

	changePointWatch(bias) {
		switch(bias) {
			case 'right':
				this._pointWatch.y++;
				break;
			case 'left':
				this._pointWatch.y--;
				break;
			case 'up':
				this._pointWatch.x--;
				break;
			case 'down':
				this._pointWatch.x++;
				break;
		}

		return true;
	}

	getPiointWatch() {
		return this._pointWatch;
	}

	setStartPointWatch(coor) {
		this._startPointWatch.x = coor.x;
		this._startPointWatch.y = coor.y;
		return true;
	}

	getStartPiointWatch() {
		return this._startPointWatch;
	}

	changeStartPointWatch(bias) {
		switch(bias) {
			case 'right':
				this._startPointWatch.y++;
				break;
			case 'left':
				this._startPointWatch.y--;
				break;
			case 'up':
				this._startPointWatch.x--;
				break;
			case 'down':
				this._startPointWatch.x++;
				break;
		}

		return true;
	}

	setWorldDiv(worldDiv) {
		this._worldDiv = worldDiv;
		return true;
	}

	getWorldDiv() {
		return this._worldDiv;
	}

	setWorldObject(obj) {
		this._worldObject = obj;
		return true;
	}

	getWorldObject() {
		return this._worldObject;
	}

	getWatcher() {
		if (this._pointWatch.watcher) {
			return this._pointWatch.watcher;
		} else {
			return null;
		}
	}
}