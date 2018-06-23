'use strict';

const Place = require('./inerState/place/place.js');

const Player = require('../../creatures/player.js');
const Enemy = require('../../creatures/enemy.js');

const Coor = require('../../structOfDate/coordinate.js');

module.exports = class State {
	constructor (config) {

		this._place = new Place(config);
		this._place.addRoom();

		this._creature = [];

		this._pointWatch = {};
		this._startPointWatch = {x:0, y:0};
		this._bias = null;

		this._weaponDiv = null;
		this._worldDiv = null;
		this._worldObject = null;

		this._sizeWorld = {
			firstFindSize: true,
			sizeG: null
		};
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

	setPlayer(id = 0 , val) {
		this._creature[id] = new Player(id, this, val.watcher, val.coor, val.type);
		this._place[val.coor.x][val.coor.y] = this._creature[id];
		return true;
	}

	setEnemy(id = 0 , val) {
		this._creature[id] = new Enemy(id, this, val.coor, val.type);
		this._place.setCell(val.coor.x, val.coor.y, this._creature[id]);
		return true;
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

	changePointWatch(bais) {
		switch(bais) {
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

	changeStartPointWatch(bais) {
		switch(bais) {
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

	setWeaponDiv(weaponDiv) {
		this._weaponDiv = weaponDiv;
		return true;
	}

	setWorldDiv(worldDiv) {
		this._worldDiv = worldDiv;
		return true;
	}

	getWorldDiv() {
		return this._worldDiv;
	}

	getWeaponDiv() {
		return this._weaponDiv;
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