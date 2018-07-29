'use strict';

const GLOBAL_SETTING = require('../../setting/globalSetting.js');

const Place = require('./inerState/place/place.js');
const StackTempClassName = require('./inerState/stackTemp/stackTempClassName.js');
const StorCustomEvents = require('./inerState/events/StorCustomEvents.js')

const Player = require('../../inerObjects/creatures/player.js');
const Enemy = require('../../inerObjects/creatures/enemy.js');
const Weapon = require('../../inerObjects/weapons/weapon.js');

const Coor = require('../../structOfDate/coordinate.js');

const AllItems = require('../../inerObjects/items/allItems.js');

module.exports = class State {
	constructor () {
		this._settings = GLOBAL_SETTING;

		this._activeGame = true;

		this._numInerBlock = 0; // for id creature, weapon
		this._numItems = 0; // for id item

		this._place = new Place(this._settings.numBlocks);
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

		this._allItems = new AllItems();
		this._stepOnItem = [];
	}

	getSetting() {
		return this._settings;
	}

	createItem(id, coor) {
		return this._allItems.getItem(this._numItems++, this, coor, id);
	}

	dropItems(creature) {
		let items = creature.giveItems();
		this._place[creature.coor.x][creature.coor.y]._items = this._place[creature.coor.x][creature.coor.y]._items.concat(items);
		return true;
	}

	endGame() {
		document.dispatchEvent(this._events.getEventEndGame());
		this._activeGame = false;
		return true;
	}

	getEventMainGetHP() {
		return this._events.getEventMainGetHP();
	}

	getEventMainGetDamage() {
		return this._events.getEventMainGetDamage();
	}

	getEventDyeCreature() {
		return this._events.getEventDyeCreature();
	}

	gameIsActive() {
		return this._activeGame;
	}

	getEventBias() {
		return this._events.getEventBias();
	}

	getEventEndGame() {
		return this._events.getEventEndGame();
	}

	getSizeWorld() {
		return this._sizeWorld;
	}

	setFirstFindSize(sizeWorld) {
		this._sizeWorld = sizeWorld;
	}

	deleteWeapon(id = 0) {
		let weapon = this._weapons[id];
		this._place[weapon.coor.x][weapon.coor.y].removeWeapon();
		delete this._weapons[id];
	}

	deleteCreature(id = 0) {
		let creature = this._creature[id];
		this._place[creature.coor.x][creature.coor.y].removeVisiter();
		delete this._creature[id];
	}

	setCoorPlayer(coor, num = 0) {
		this._creature[num] = {};
		this._creature[num].coor = coor;
		return true;
	}

	setPlayer(val) {
		this._creature[this._numInerBlock] = new Player(this._numInerBlock, this, val.watcher, val.coor, val.type);

		try {
			this._place[val.coor.x][val.coor.y].addVisiter(this._creature[this._numInerBlock++]);
			return true;
		} catch (e){
			console.log(e);
			delete this._creature[this._numInerBlock - 1];
			return false;
		}
	}

	setEnemy(val) {
		this._creature[this._numInerBlock] = new Enemy(this._numInerBlock, this, val.coor, val.type);

		try {
			this._place[val.coor.x][val.coor.y].addVisiter(this._creature[this._numInerBlock++]);
			return true;
		} catch (e) {
			console.log(e);
			delete this._creature[this._numInerBlock - 1];
			return false;
		}
	}

	setWeapon(val) {
		let position = this._place[val.coor.x][val.coor.y];

		let weapon = new Weapon(this._numInerBlock, this, val.owner, val.coor);
		this._weapons[this._numInerBlock++] = weapon;
		position.addWeapon(weapon);

		return weapon;
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

	changeCoordinateCreature(creature, coor) {
		this._place[coor.x][coor.y].removeVisiter();
		this._place[coor.newX][coor.newY].addVisiter(creature);

		creature.coor.x = coor.newX;
		creature.coor.y = coor.newY;

		if (creature.watcher) {
			let event = this._events.getEventMainStepOn();

			if (this._place[coor.newX][coor.newY]._items[0] && creature.watcher) {
				event.detail.withItems = true;
				event.detail.items = this._place[coor.newX][coor.newY]._items;
			} else if (creature.watcher) {
				event.detail.withItems = false;
				event.detail.items = [];
			}

			this._stepOnItem = event.detail.items;

			document.dispatchEvent(event);
		}
		return true;
	}

	getStepOnItem() {
		return this._stepOnItem;
	}

	changeCoordinateWeapon(weapon, coor) {
		this._place[coor.x][coor.y].removeWeapon();
		this._place[coor.newX][coor.newY].addWeapon(weapon);

		weapon.coor.x = coor.newX;
		weapon.coor.y = coor.newY;

		return true;
	}

	setCellPlace(coor, val) {
		if (val.isCreature === true) {
			throw "legacy pursues!!!!!";
		}

		this._place.setCell(coor.x, coor.y, val);
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