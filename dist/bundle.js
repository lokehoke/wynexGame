/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/js/modules/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/modules/globalClass/game.js":
/*!**************************************************!*\
  !*** ./resources/js/modules/globalClass/game.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const State = __webpack_require__(/*! ./state/state.js */ "./resources/js/modules/globalClass/state/state.js");
const World = __webpack_require__(/*! ./world.js */ "./resources/js/modules/globalClass/world.js");
const GLOBAL_SETTING_CLASS = __webpack_require__(/*! ../setting/globalSetting.js */ "./resources/js/modules/setting/globalSetting.js");
const GLOBAL_SETTING = new GLOBAL_SETTING_CLASS();

module.exports = class ControllerGame {
	constructor (players = null, enemy = []) {
		this.state = new State(GLOBAL_SETTING.numBlocks);
		this._setPlayers(players, this.state);

		this._definedAndSetStartPointWatch(players);

		enemy = enemy.concat(World.makeAroayWihtEnemy(GLOBAL_SETTING.numEnemy, this.state));
		this._setEnemys(enemy, this.state);

		this.world = new World(this.state);
		const worldDiv = this.world.renderWorld(true);

		this.state.setWorldDiv(worldDiv);
		this.state.setWorldObject(this.world);
	}

	_definedAndSetStartPointWatch(players) {
		const startPoint = this._getStartPiointWatch(players, this.state);

		if (startPoint === false) {
			throw "2 or more main player or null";
		} else {
			this.state.setStartPointWatch(startPoint);
		}
	}

	_setPlayers(players, state) {
		if (players !== null) {
			players.forEach((val) => {
				state.setPlayer(val);
			});
			return true;
		} else {
			return false;
		}
	}

	_setEnemys(enemys, state) {
		if (enemys !== null) {
			enemys.forEach((val) => {
				state.setEnemy(val);
			});
			return true;
		} else {
			return false;
		}
	}

	_getStartPiointWatch(players, state) {
		let watcher = players.filter(player => {
			return player.watcher;
		});

		if (watcher.length !== 1) {
			return false;
		} else {
			watcher = watcher[0];
		}

		const size = World.getSize(state);

		let x = watcher.coor.x;
		let y = watcher.coor.y;
		let startPointWatch = {};

		startPointWatch.x = findX(x, size);
		startPointWatch.y = findY(y, size);

		return startPointWatch;

		function findX (x, size) {
			let newX = 0;

			if (x < Math.floor(size.heightBlocks / 2)) {
				newX = 0;
			} else if (x >= (GLOBAL_SETTING.numBlocks.height - Math.floor(size.heightBlocks / 2))) {
				newX = GLOBAL_SETTING.numBlocks.height - Math.floor(size.heightBlocks / 2);
			} else {
				newX = x - Math.floor(size.heightBlocks / 2) + 1;
			}

			return newX;
		}

		function findY (y, size) {
			let newY = 0;

			if (y < Math.floor(size.widthBlocks / 2)) {
				newY = 0;
			} else if (y >= (GLOBAL_SETTING.numBlocks.width - Math.floor(size.widthBlocks / 2))) {
				newY = GLOBAL_SETTING.numBlocks.width - Math.floor(size.widthBlocks / 2);
			} else {
				newY = y - Math.floor(size.widthBlocks / 2) + 1;
			}

			return newY;
		}
	}

	getState() {
		return this.state;
	}

	async tactOfGame(onlyRender = false) {
		if (!this.state.gameIsActive()) {
			throw "game is end";
		}

		this.world.renderWorld();

		if (!onlyRender) {
			this.state._creature.forEach((item) => {
				if (item.watcher !== true) {
					moveEnemy(item);
				}
			});
		}

		return true;

		async function moveEnemy(item) {
			await item.movePerformance('rand');
			return true;
		}
	}
}

/***/ }),

/***/ "./resources/js/modules/globalClass/state/inerState/events/StorCustomEvents.js":
/*!*************************************************************************************!*\
  !*** ./resources/js/modules/globalClass/state/inerState/events/StorCustomEvents.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = class StorCustomEvents {
	constructor() {
		this._eventBias = new CustomEvent('bias', {
			detail: {
				direction: null
			}
		});

		this._eventEndGame = new CustomEvent('endGame');
	}

	getEventBias() {
		return this._eventBias;
	}

	getEventEndGame() {
		return this._eventEndGame;
	}
}

/***/ }),

/***/ "./resources/js/modules/globalClass/state/inerState/place/blocks/block.js":
/*!********************************************************************************!*\
  !*** ./resources/js/modules/globalClass/state/inerState/place/blocks/block.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = class Block {
	constructor() {
		this.nesting = false;
		this.isCreature = false;
	}
}

/***/ }),

/***/ "./resources/js/modules/globalClass/state/inerState/place/blocks/borderblock.js":
/*!**************************************************************************************!*\
  !*** ./resources/js/modules/globalClass/state/inerState/place/blocks/borderblock.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Block = __webpack_require__(/*! ./block.js */ "./resources/js/modules/globalClass/state/inerState/place/blocks/block.js");

module.exports = class BorderBlock extends Block {
	constructor() {
		super();
		this.type = 'border';
		this.idBlock = 2;
		this.patency = false;
		this.classNameCSS = 'border';
	}
}

/***/ }),

/***/ "./resources/js/modules/globalClass/state/inerState/place/blocks/controllerBlock.js":
/*!******************************************************************************************!*\
  !*** ./resources/js/modules/globalClass/state/inerState/place/blocks/controllerBlock.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const BorderBlock = __webpack_require__(/*! ./borderblock.js */ "./resources/js/modules/globalClass/state/inerState/place/blocks/borderblock.js");
const DirtBlock = __webpack_require__(/*! ./dirtblock.js */ "./resources/js/modules/globalClass/state/inerState/place/blocks/dirtblock.js");

module.exports = class BlockController {
	constructor (){}

	static getBlockObject(id) {
		switch(id) {
			case 1:
				return new DirtBlock();
			case 2:
				return new BorderBlock();
		}
	}
}

/***/ }),

/***/ "./resources/js/modules/globalClass/state/inerState/place/blocks/dirtblock.js":
/*!************************************************************************************!*\
  !*** ./resources/js/modules/globalClass/state/inerState/place/blocks/dirtblock.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Block = __webpack_require__(/*! ./block.js */ "./resources/js/modules/globalClass/state/inerState/place/blocks/block.js");

module.exports = class DirtBlock extends Block {
	constructor() {
		super();
		this.type = 'dirt';
		this.idBlock = 1;
		this.patency = true;
		this.classNameCSS = 'dirt';
	}
}

/***/ }),

/***/ "./resources/js/modules/globalClass/state/inerState/place/place.js":
/*!*************************************************************************!*\
  !*** ./resources/js/modules/globalClass/state/inerState/place/place.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const ControllerBlock = __webpack_require__(/*! ./blocks/controllerBlock.js */ "./resources/js/modules/globalClass/state/inerState/place/blocks/controllerBlock.js");

module.exports = class Place {
	constructor (config) {
		const N = config.height;
		const M = config.width;
		this.height = N;
		this.width = M;

		for (let i = 0; i < N; i++) {
			this[i] = [];
			for (let j = 0; j < M; j++) {
				if (i === 0 || i + 1 === N || j === 0 || j + 1 === M){
					this[i][j] = ControllerBlock.getBlockObject(2);
				} else {
					this[i][j] = ControllerBlock.getBlockObject(1);
				}
			}
		}
	}

	addRoom () {
		const N = this.height;
		const M = this.width;

		for (let i = 0; i < N; i+= 8) {
			for (let j = 0; j < M; j++) {
				const randDigit = Math.floor(Math.random() * 400);
				if (randDigit > 9 && randDigit < 25) {
					for (let k = j; k < j+randDigit && k < M; k++) {
						if (k === j) {
							for (let n = i; n < i+randDigit+1 && n < N; n++) {
								this[n][k] = ControllerBlock.getBlockObject(2);
							}
						} else {
							this[i][k] = ControllerBlock.getBlockObject(2);
							this[(i+randDigit >= N ? i : i+randDigit)][k] = ControllerBlock.getBlockObject(2);
						}
					}
					j+= 8;
				}
			}
		}
	}

	getCell(x, y) {
		return this[x][y];
	}

	setCell(x, y, val) {
		if (typeof val === 'object') {
			this[x][y] = val;
			return true;
		} else {
			return false;
		}
	}

	getAllPlace() {
		return this;
	}

	createNewBlock(id = 0) {
		return ControllerBlock.getBlockObject(id);
	}
}

/***/ }),

/***/ "./resources/js/modules/globalClass/state/inerState/stackTemp/stackTempClassName.js":
/*!******************************************************************************************!*\
  !*** ./resources/js/modules/globalClass/state/inerState/stackTemp/stackTempClassName.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = class stackTempClassName {
	constructor() {
		this._stack = [];
	}

	addTemp() {

	}

	removeTemp() {

	}
}

/***/ }),

/***/ "./resources/js/modules/globalClass/state/state.js":
/*!*********************************************************!*\
  !*** ./resources/js/modules/globalClass/state/state.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Place = __webpack_require__(/*! ./inerState/place/place.js */ "./resources/js/modules/globalClass/state/inerState/place/place.js");
const StackTempClassName = __webpack_require__(/*! ./inerState/stackTemp/stackTempClassName.js */ "./resources/js/modules/globalClass/state/inerState/stackTemp/stackTempClassName.js");
const StorCustomEvents = __webpack_require__(/*! ./inerState/events/StorCustomEvents.js */ "./resources/js/modules/globalClass/state/inerState/events/StorCustomEvents.js")

const Player = __webpack_require__(/*! ../../inerObjects/player.js */ "./resources/js/modules/inerObjects/player.js");
const Enemy = __webpack_require__(/*! ../../inerObjects/enemy.js */ "./resources/js/modules/inerObjects/enemy.js");
const Weapon = __webpack_require__(/*! ../../inerObjects/weapon.js */ "./resources/js/modules/inerObjects/weapon.js");

const Coor = __webpack_require__(/*! ../../structOfDate/coordinate.js */ "./resources/js/modules/structOfDate/coordinate.js");

module.exports = class State {
	constructor (config) {
		this._activeGame = true;

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

	endGame() {
		document.dispatchEvent(this._events.getEventEndGame());
		this._activeGame = false;
		return true;
	}

	gameIsActive() {
		return this._activeGame;
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

	getEventEndGame() {
		return this._events.getEventEndGame();
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
			if (this.getCellPlace(val.owner.coor) !== val.owner) {
				this.setCellPlace(val.owner.coor, val.owner);
			}

			position.getDemage(val.owner);

			return null;
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

/***/ }),

/***/ "./resources/js/modules/globalClass/world.js":
/*!***************************************************!*\
  !*** ./resources/js/modules/globalClass/world.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const GLOBAL_SETTING = new (__webpack_require__(/*! ../setting/globalSetting.js */ "./resources/js/modules/setting/globalSetting.js"))();

const Coor = __webpack_require__(/*! ../structOfDate/coordinate.js */ "./resources/js/modules/structOfDate/coordinate.js");

module.exports = class World {
	constructor(state) {
		this.state = state;
		this.size = World.getSize(state);

		this.eventBias = state.getEventBias();
	}

	static getSize(state) {
		let firstFindSize = state.getSizeWorld().firstFindSize;

		if (firstFindSize === true){

			const widthBlocks = Math.floor(window.innerWidth / GLOBAL_SETTING.sizeBlock.width);
			const heightBlocks = Math.floor(window.innerHeight / GLOBAL_SETTING.sizeBlock.height);

			let sizeG = {
				widthBlocks: (widthBlocks < GLOBAL_SETTING.numBlocks.width ? widthBlocks : GLOBAL_SETTING.numBlocks.width),
				heightBlocks: (heightBlocks < GLOBAL_SETTING.numBlocks.height ? heightBlocks : GLOBAL_SETTING.numBlocks.height)
			};

			state.setFirstFindSize({
				firstFindSize: true,
				sizeG: sizeG
			});

			return sizeG;
		} else {
			return state.getSizeWorld().sizeG;
		}
	}

	static makeAroayWihtEnemy(num, state) {
		const size = World.getSize(state);

		let creatures = [];
		for (let i = 0; i < num; i++) {
			let newCreature = {};
			newCreature.coor = new Coor();
			newCreature.type = 'slime';
			newCreature.coor.x = Math.floor(Math.random() * (GLOBAL_SETTING.numBlocks.height - 2)) + 1;
			newCreature.coor.y = Math.floor(Math.random() * (GLOBAL_SETTING.numBlocks.width - 2)) + 1;
			creatures[i] = newCreature;
		}
		return creatures;
	}

	renderWorld(startRender) {
		const state = this.state;
		const size = this.size;
		const bias = state.getBias(true);
		const eventBias = this.eventBias;

		if (bias === null && startRender === true) {
			let world = getEmptyWorld();

			rendersBlocks(world, state, size);
			deliteOldWorld();
			pushNewWorld(world);

			return world;
		} else if (canIBias(size, state, bias) === true && bias !== null) {

			despetchBiasEvent(bias, state);

			biasRender(this, bias);
			state.changeStartPointWatch(bias);

		}

		return true;

		function canIBias(size, state, bias) {
			const startPointWatch = state.getStartPiointWatch();
			const pointWotch = state.getPiointWatch();

			if (
			(((startPointWatch.x === 0
					||
			startPointWatch.x === GLOBAL_SETTING.numBlocks.height - size.heightBlocks)
				&&
			(pointWotch.x < Math.floor(size.heightBlocks / 2)
					||
			pointWotch.x >= (GLOBAL_SETTING.numBlocks.height - Math.floor(size.heightBlocks / 2)))
				&&
			(bias === 'up'
					||
			bias === 'down'))
			||
			((startPointWatch.y === 0
					||
			startPointWatch.y === GLOBAL_SETTING.numBlocks.width - size.widthBlocks)
				&&
			(pointWotch.y < Math.floor(size.widthBlocks / 2)
					||
			pointWotch.y >= (GLOBAL_SETTING.numBlocks.width - Math.floor(size.widthBlocks / 2)))
				&&
			(bias === 'left'
					||
			bias === 'right')))
			){
				return false;
			}

			return true;
		}

		function getEmptyWorld() {
			let world = document.createElement('div');
			world.className = 'world';
			return world;
		}

		function deliteOldWorld() {
			let world = state.getWorldDiv();
			if (world !== null) {
				world.remove();
				state.setWorldDiv = null;
			}
			return true;
		}

		function pushNewWorld(world) {
			document.querySelector('.wrapper').appendChild(world);
			return true;
		}

		function rendersBlocks(world, state, size) {
			const x = state.getStartPiointWatch().x;
			const y = state.getStartPiointWatch().y;
			const place = state.getAllPlace();

			for (let i = x; i < x + size.heightBlocks; i++) {
				let row = document.createElement('div');
				row.className = 'row';
				for (let j = y; j < y + size.widthBlocks; j++) {
					let block = getBlock(place[i][j], {newX:i,newY:j});
					row.appendChild(block);
				}
				world.appendChild(row);
			}

			return true;
		}

		function biasRender(world, bias) {
			const state = world.state;
			const size = world.size;
			const place = state.getAllPlace();
			const oldWorld = state.getWorldDiv();
			const startPointWatch = state.getStartPiointWatch();

			if (bias === 'right' || bias === 'left') {
				leftRightBias();
			} else if (bias === 'up' || bias === 'down') {
				upDownBias();
			} else {
				return false;
			}

			state.changePointWatch(bias);
			return true;

			function leftRightBias() {
				const x = state.getStartPiointWatch().x;

				for (let i = x; i < x + size.heightBlocks; i++) {

					let y = 0;
					let newY = 0;

					if (bias === 'right') {
						y = state.getStartPiointWatch().y + size.widthBlocks;
						newY = y - size.widthBlocks;
					} else if (bias === 'left') {
						y = state.getStartPiointWatch().y - 1;
						newY = y + size.widthBlocks;
					}


					if (place[i][newY].isCreature === true) {
						visableHideCreature(place[i][newY]);
					}

					let block = null;
					let line = oldWorld.children[i-x];
					let idBlockForRemove = (bias === 'right' ? 0 : line.children.length - 1);

					block = getBlock(place[i][y], {newX:i,newY:y}, true, line.children[idBlockForRemove]);

					if (bias === 'right') {
						line.appendChild(block);
					} else if (bias === 'left') {
						line.insertBefore(block, oldWorld.children[i-x].children[0]);
					}

				}

				return true;
			}

			function upDownBias() {
				const y = state.getStartPiointWatch().y;

				let row = null;

				if (bias === 'up') {
					row = oldWorld.children[oldWorld.children.length-1];
				} else if (bias === 'down') {
					row = oldWorld.children[0];
				}

				for (let i = y; i < y + size.widthBlocks; i++) {
					let x = 0;
					let newX = 0;

					if (bias === 'up') {
						x = state.getStartPiointWatch().x - 1;
						newX = x + size.heightBlocks;
					} else {
						x = state.getStartPiointWatch().x + size.heightBlocks;
						newX = x - size.heightBlocks;
					}

					let block = getBlock(place[x][i], {newX:x,newY:i}, true, row.children[i-y]);

					if (place[newX][i].isCreature === true) {
						visableHideCreature(place[newX][i]);
					}
				}

				if (bias === 'up') {
					oldWorld.insertBefore(row, oldWorld.children[0]);
				} else if (bias === 'down') {
					oldWorld.appendChild(row);
				}


				return true;
			}
		}

		function getBlock(blockObject, coor, bias, lastBlock = null) {
			let block = null;

			if (lastBlock === null) {
				block = document.createElement('div');
			} else {
				block = lastBlock;

				if (block.children[0]) {
					block.children[0].remove();
				}
			}

			if (blockObject.nesting === true) {
				block.className = 'standartPlace ' + blockObject.classNameBackBlock;

				if (blockObject.isCreature === true) {
					getCreature(block, blockObject, coor);
					blockObject.DOMObject = block;
				}

				changeVisableCreature();
			} else {
				block.className = 'standartPlace ' + blockObject.classNameCSS;
			}

			return block;

			function getCreature(block, creature, coor) {
				let div = document.createElement('div');
				div.className = creature.classNameCSS;
				block.appendChild(div);

				if (bias === true) {
					creature.visable.was = false;
					creature.visable.now = true;
				}

				return true;
			}

			function changeVisableCreature() {
				blockObject.visable = {
					was: blockObject.visable.now,
					now: true
				}

				return true;
			}
		}

		function visableHideCreature(creature) {
			creature.visable.was = true;
			creature.visable.now = false;
		}

		function despetchBiasEvent(bias, state) {
			eventBias.detail.direction = bias;
			document.dispatchEvent(eventBias);
			eventBias.detail.direction = null;

			return true;
		}
	}
}

/***/ }),

/***/ "./resources/js/modules/index.js":
/*!***************************************!*\
  !*** ./resources/js/modules/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function startGame() {
	const GLOBAL_SETTING = new (__webpack_require__(/*! ./setting/globalSetting.js */ "./resources/js/modules/setting/globalSetting.js"))();
	const ControllerGame = __webpack_require__(/*! ./globalClass/game.js */ "./resources/js/modules/globalClass/game.js");

	const game = new ControllerGame([{
		coor: {
			x: 1,
			y: 1
		},
		type: 'mage',
		watcher: true
	}]);

	const state = game.getState();
	const player = state.getCreature(0);

	let timer = false;

	document.onkeydown = function (e) {
		if (timer) {
			return 0;
		} else {
			timer = true;
			setTimeout(() => {
				timer = false;
			}, GLOBAL_SETTING.timeOfTactPlayer);
		}

		if (e.keyCode === 68) {
			player.movePerformance('right');
		} else if (e.keyCode === 83) {
			player.movePerformance('down');
		} else if (e.keyCode === 87) {
			player.movePerformance('up');
		} else if (e.keyCode === 65) {
			player.movePerformance('left');
		} else if (e.keyCode === 39) {
			player.doAttack('right');
		} else if (e.keyCode === 40) {
			player.doAttack('down');
		} else if (e.keyCode === 38) {
			player.doAttack('up');
		} else if (e.keyCode === 37) {
			player.doAttack('left');
		}
		game.tactOfGame(true);
	}

	setInterval(() => {
		game.tactOfGame();
	}, GLOBAL_SETTING.timeOfTactOther);

	console.log(state);
}


startGame();

/***/ }),

/***/ "./resources/js/modules/inerObjects/creature.js":
/*!******************************************************!*\
  !*** ./resources/js/modules/inerObjects/creature.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const InnerObject = __webpack_require__(/*! ./innerObject.js */ "./resources/js/modules/inerObjects/innerObject.js");
const Weapon = __webpack_require__(/*! ./weapon.js */ "./resources/js/modules/inerObjects/weapon.js");

const GLOBAL_SETTING = new (__webpack_require__(/*! ../setting/globalSetting.js */ "./resources/js/modules/setting/globalSetting.js"))();

const Coor = __webpack_require__(/*! ../structOfDate/coordinate.js */ "./resources/js/modules/structOfDate/coordinate.js");
const ExCoor = __webpack_require__(/*! ../structOfDate/ExCoordinate.js */ "./resources/js/modules/structOfDate/ExCoordinate.js");

const ControllerBlock = __webpack_require__(/*! ../globalClass/state/inerState/place/blocks/controllerBlock.js */ "./resources/js/modules/globalClass/state/inerState/place/blocks/controllerBlock.js");

const World = __webpack_require__(/*! ../globalClass/world.js */ "./resources/js/modules/globalClass/world.js");

module.exports = class Creature extends InnerObject {
	constructor (id, state, coor) {
		super(id, state, coor);
		this.isCreature = true;

		this.live = true;

		this.health = 100;
		this.attackDamage = 20;
		this.attackRange = 10;
		this.pursuitRange = 50;

		state.setCoorPlayer(coor, id);
	}

	movePerformance(direction) {
		if (!this.live) {
			throw "zombi moving!";
		}

		if (direction === 'rand') {
			const state = this.state;
			const watcher = state.getWatcher();
			const watcherX = watcher.coor.x;
			const watcherY = watcher.coor.y;
			const x = this.coor.x;
			const y = this.coor.y;
			const range = this.pursuitRange;
			if (
				watcherX > x - range
			&&
				watcherX < x + range
			&&
				watcherY < y + range
			&&
				watcherY > y -range
			){
				this._approximatingToWatcher();
			} else {
				this._randMove();
			}
		} else {
			this._move(direction);
		}
	}

	doAttack(direction) {
		if (!this.live) {
			throw "zombi atack!";
		}

		const creature = this;
		const state = this.state;
		const world = state.getWorldObject();

		let coor = new ExCoor(this.coor.x, this.coor.y, this.coor.x, this.coor.y);

		renderWeapon(direction, coor);

		async function renderWeapon(direction, coor) {
			let nextBlock = true;
			let weapon = null;

			coor = defineCoor(direction, coor);

			weapon = state.setWeapon({
				coor: {
					x: coor.newX,
					y: coor.newY
				},
				owner: creature
			});

			if (weapon === null) {
				return false;
			} else {
				weapon.coor.x = coor.x;
				weapon.coor.y = coor.y;

				let range = creature.attackRange - 1;

				weapon.movePerformance(direction);

				if (creature.state.getCellPlace(creature.coor) !== creature) {
					creature.state.setCellPlace(creature.coor, creature);
				}

				do {
					nextBlock = await biasWeapon(weapon, direction);
				} while ((nextBlock.patency || nextBlock === true) && range--);


				if (nextBlock.isCreature) {
					nextBlock.getDemage(creature);
				}

				weapon.die();
			}
		}

		async function biasWeapon(weapon, direction) {
			await smallTime();
			return weapon.movePerformance(direction);
		}

		function smallTime() {
			return new Promise(resolve => {
				setTimeout(() => {
					resolve('resolved');
				}, 20);
			});
		}

		function defineCoor(direction, coor) {
			coor.x = coor.newX;
			coor.y = coor.newY;

			switch(direction) {
				case 'left':
					coor.newY--;
					break;
				case 'right':
					coor.newY++	;
					break;
				case 'up':
					coor.newX--;
					break;
				case 'down':
					coor.newX++;
					break;
			}

			return coor;
		}
	}

	_randMove() {
		let digit = Math.floor(Math.random() * 4) + 1;
		let direction = '';
		switch(digit) {
			case 1:
				direction = 'left';
				break;
			case 2:
				direction = 'right';
				break;
			case 3:
				direction = 'up';
				break;
			case 4:
				direction = 'down';
				break;
		}
		this._move(direction);
		return true;
	}

	_approximatingToWatcher() {
		const creature = this;
		const range = creature.pursuitRange;
		const side = (((range * 2) + 1) + 2); // (+1) - creature, (+2) - border
		const state = creature.state;
		const place = state.getAllPlace();
		const startX = creature.coor.x - range;
		const startY = creature.coor.y - range;
		const watcher = state.getWatcher();

		let canIattack = false;

		let localPlace = getLocalPlace();
		let direction = wave(localPlace);


		if (direction === false) {
			creature._randMove();
		} else if (!canIattack) {
			creature._move(direction);
		} else {
			creature.doAttack(direction);
		}

		function getLocalPlace() {
			let localPlace = [];

			let cell = null;

			for (let i = 0; i < side; i++) {
				localPlace[i] = [];

				for (let j = 0; j < side; j++) {
					if (i === 0 || i === side - 1 || j === 0 || j === side - 1) {
						localPlace[i][j] = -1;
					} else {
						if (place[startX + i] !== undefined && place[startX + i][startY + j] !== undefined){
							cell = place[startX + i][startY + j];
							if (cell === creature) {
								localPlace[i][j] = 0;
								localPlace.own = {
									i: i,
									j: j
								}
							} else if (cell === watcher) {
								localPlace[i][j] = -2;
							} else if (cell.patency === true) {
								localPlace[i][j] = Infinity;
							} else {
								localPlace[i][j] = -1;
							}
						} else {
							localPlace[i][j] = -1;
						}
					}
				}
			}

			return localPlace;
		}

		function wave(localPlace) {
			const ownX = localPlace.own.i;
			const ownY = localPlace.own.j;

			let cur = 0;
			let wayExist = false;
			let findWatcher = false;
			let coorWatcher = new Coor();
			let locCoor = new Coor();

			do {
				wayExist = false;

				for (let i = 0; i < side; i++) {
					if (findWatcher) {
						break;
					}

					for (let j = 0; j < side; j++) {
						if (localPlace[i][j] === cur) {
							if (localPlace[i + 1][j] > cur + 1) {
								localPlace[i + 1][j] = cur + 1;
								wayExist = true;
							}
							if (localPlace[i - 1][j] > cur + 1) {
								localPlace[i - 1][j] = cur + 1;
								wayExist = true;
							}
							if (localPlace[i][j + 1] > cur + 1) {
								localPlace[i][j + 1] = cur + 1;
								wayExist = true;
							}
							if (localPlace[i][j - 1] > cur + 1) {
								localPlace[i][j - 1] = cur + 1;
								wayExist = true;
							}
							if (localPlace[locCoor.x = i - 1][locCoor.y = j] === -2
							||  localPlace[locCoor.x = i + 1][locCoor.y = j] === -2
							||  localPlace[locCoor.x = i][locCoor.y = j + 1] === -2
							||  localPlace[locCoor.x = i][locCoor.y = j - 1] === -2
							){
								findWatcher = true;
								coorWatcher.x = locCoor.x;
								coorWatcher.y = locCoor.y;
								break;
							}
						}
					}
				}

				cur++;
			} while (wayExist && !findWatcher);

			if (cur === 1) {
				canIattack = true;
			}

			if (findWatcher) {
				for (let i = cur; i >= 0; i--) {
					if (localPlace[coorWatcher.x + 1][coorWatcher.y] === i - 1) {
						coorWatcher.x++;
						if (i === 1) {
							return 'up';
						}
					}
					if (localPlace[coorWatcher.x - 1][coorWatcher.y] === i - 1) {
						coorWatcher.x--;
						if (i === 1) {
							return 'down';
						}
					}
					if (localPlace[coorWatcher.x][coorWatcher.y + 1] === i - 1) {
						coorWatcher.y++;
						if (i === 1) {
							return 'left';
						}
					}
					if (localPlace[coorWatcher.x][coorWatcher.y - 1] === i - 1) {
						coorWatcher.y--;
						if (i === 1) {
							return 'right';
						}
					}
				}
			} else {
				return false;
			}
		}
	}

	getDemage(creature) {
		if (this.health > 0) {
			this.health -= creature.attackDamage;

			if (this.health <= 0) {
				this.live = false;
				this.die();
			}
		} else {
			throw "zombie";
		}
	}
}

/***/ }),

/***/ "./resources/js/modules/inerObjects/enemy.js":
/*!***************************************************!*\
  !*** ./resources/js/modules/inerObjects/enemy.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Creature = __webpack_require__(/*! ./creature */ "./resources/js/modules/inerObjects/creature.js");

module.exports = class Enemy extends Creature {
	constructor (id, state, coor) {
		super(id, state, coor);
		this.type = 'enemy';
		this.classNameCSS = 'slimeEnemy';
		this.watcher = false;
	}
}

/***/ }),

/***/ "./resources/js/modules/inerObjects/innerObject.js":
/*!*********************************************************!*\
  !*** ./resources/js/modules/inerObjects/innerObject.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const GLOBAL_SETTING = new (__webpack_require__(/*! ../setting/globalSetting.js */ "./resources/js/modules/setting/globalSetting.js"))();

const Coor = __webpack_require__(/*! ../structOfDate/coordinate.js */ "./resources/js/modules/structOfDate/coordinate.js");
const ExCoor = __webpack_require__(/*! ../structOfDate/ExCoordinate.js */ "./resources/js/modules/structOfDate/ExCoordinate.js");

const ControllerBlock = __webpack_require__(/*! ../globalClass/state/inerState/place/blocks/controllerBlock.js */ "./resources/js/modules/globalClass/state/inerState/place/blocks/controllerBlock.js");

const World = __webpack_require__(/*! ../globalClass/world.js */ "./resources/js/modules/globalClass/world.js");

module.exports = class InnerObject {
	constructor (id, state, coor) {
		this.nesting = true;
		this.patency = false;
		this.state = state;
		this.coor = coor;
		this.id = id;

		this.visable = {};
		this.visable.was = false;
		this.visable.now = false;
		this.visable = this._identifyVisable({newX: coor.x, newY: coor.y}, state);

		this.classNameCSS = '';
		this.classNameBackBlock = 'dirt';
		this.idBackBlock = 1;
		this.DOMObject = null;
	}

	movePerformance(direction) {
		return this._move(direction);
	}

	_identifyVisable(coor, state) {
		const visable = {};
		if (this.watcher === true) {
			visable.now = true;
			visable.was = true;
		} else {
			const startPointWatch = this.state.getStartPiointWatch();
			const size = World.getSize(state);
			visable.was = this.visable.now;
			if (coor.newX - startPointWatch.x < size.heightBlocks
			&&
				coor.newY - startPointWatch.y < size.widthBlocks
			&&
				coor.newX - startPointWatch.x >= 0
			&&
				coor.newY - startPointWatch.y >= 0
			) {
				visable.now = true;
			} else {
				visable.now = false;
			}
		}

		if (this.type === 'weapon' && this.born) {
			this.born = false;
			visable.was = false;
		}

		return visable;
	}

	_move(direction) {
		const id = this.id;
		const ownObject = this;
		const state = this.state;


		let x = this.coor.x;
		let y = this.coor.y;

		let curCoor = new ExCoor(x, y, x, y);

		let newPosition = null;

		switch(direction) {
			case 'right':
				if (GLOBAL_SETTING.numBlocks.width <= curCoor.y+1) {
					return false;
				} else {
					curCoor.newY++;
					newPosition = state.getCellPlace({x:curCoor.x, y:(curCoor.y+1)});
				}
				break;
			case 'left':
				if (0 > curCoor.y - 1) {
					return false;
				} else {
					curCoor.newY--;
					newPosition = state.getCellPlace({x:curCoor.x, y:(curCoor.y-1)});
				}
				break;
			case 'up':
				if (0 > curCoor.x-1) {
					return false;
				} else {
					curCoor.newX--;
					newPosition = state.getCellPlace({x:(curCoor.x-1), y:curCoor.y});
				}
				break;
			case 'down':
				if (GLOBAL_SETTING.numBlocks.height <= curCoor.x+1) {
					return false;
				} else {
					curCoor.newX++;
					newPosition = state.getCellPlace({x:(curCoor.x+1), y:curCoor.y});
				}
				break;
			default:
				throw 'empty direction on move creature: ' + this.id;
		}

		if (newPosition.patency || this.born) {
			return moving(curCoor, this);
		} else {
			return newPosition;
		}

		function moving(coor, creature) {
			if (creature.watcher === true) {
				movingPointAndBais(coor, creature, direction);
			}

			const state = creature.state;

			creature.visable = creature._identifyVisable(coor, state);
			creature._movingVisableSwapingIcon(coor, state);
			changeCoordinate(creature, coor);
			return true;

			function changeCoordinate(player, coor) {
				player.state.setCellPlace({
					x: player.coor.x,
					y: player.coor.y
				}, ControllerBlock.getBlockObject(player.idBackBlock));

				if (player.isCreature) {
					player.state.changeCoorPlayer({
						x: coor.newX,
						y: coor.newY
					}, id);
				} else {
					player.state.changeCoorWeapon({
						x: coor.newX,
						y: coor.newY
					}, id);
				}

				player.state.setCellPlace({
					x: coor.newX,
					y: coor.newY
				}, player);

				player.coor.x = coor.newX;
				player.coor.y = coor.newY;
			}

			function movingPointAndBais(coor, creature, direction) {
				creature.state.setBias(direction);
				creature.state.setPointWatch({x:coor.newX, y:coor.newY}, creature);
			}
		}
	}

	_movingVisableSwapingIcon(coor, state) {
		const startPointWatch = this.state.getStartPiointWatch();
		const world = this.state.getWorldDiv();
		const size = World.getSize(state);

		let div = getBlockWithCreature(this);

		if (this.visable.was === true) {
			this.DOMObject.children[0].remove();
			this.DOMObject = null;
		}

		if (this.visable.now === true) {
			world.children[coor.newX - startPointWatch.x].children[coor.newY - startPointWatch.y].appendChild(div);
			this.DOMObject = div.parentNode;
		}

		return true;

		function getBlockWithCreature(creature) {
			let div = document.createElement('div');
			div.className = creature.classNameCSS;
			return div;
		}
	}

	die() {
		if (this.watcher) {
			this.state.endGame();
		}

		if (this.DOMObject.children[0]) {
			this.DOMObject.children[0].remove();
		}

		this.state.deleteCreature(this.id);
	}
}

/***/ }),

/***/ "./resources/js/modules/inerObjects/player.js":
/*!****************************************************!*\
  !*** ./resources/js/modules/inerObjects/player.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Creature = __webpack_require__(/*! ./creature */ "./resources/js/modules/inerObjects/creature.js");

module.exports = class Player extends Creature {
	constructor (id, state, watcher, coor, profession) {
		super(id, state, coor);
		this.type = 'player';
		this.health = 10000;

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

/***/ }),

/***/ "./resources/js/modules/inerObjects/weapon.js":
/*!****************************************************!*\
  !*** ./resources/js/modules/inerObjects/weapon.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const InnerObject = __webpack_require__(/*! ./innerObject.js */ "./resources/js/modules/inerObjects/innerObject.js");

const GLOBAL_SETTING = new (__webpack_require__(/*! ../setting/globalSetting.js */ "./resources/js/modules/setting/globalSetting.js"))();

const Coor = __webpack_require__(/*! ../structOfDate/coordinate.js */ "./resources/js/modules/structOfDate/coordinate.js");
const ExCoor = __webpack_require__(/*! ../structOfDate/ExCoordinate.js */ "./resources/js/modules/structOfDate/ExCoordinate.js");

const ControllerBlock = __webpack_require__(/*! ../globalClass/state/inerState/place/blocks/controllerBlock.js */ "./resources/js/modules/globalClass/state/inerState/place/blocks/controllerBlock.js");

const World = __webpack_require__(/*! ../globalClass/world.js */ "./resources/js/modules/globalClass/world.js");


module.exports = class Weapon extends InnerObject {
	constructor (id, state, owner, coor) {
		super(id, state, coor);
		this.isCreature = false;
		this.owner = owner;

		this.type = 'weapon';
		this.born = true;

		this.classNameCSS = 'weapon';
	}

	die() {
		if (this.DOMObject.children[0]) {
			this.DOMObject.children[0].remove();
		}
		this.state.deleteWeapon(this.id);
	}
}

/***/ }),

/***/ "./resources/js/modules/setting/globalSetting.js":
/*!*******************************************************!*\
  !*** ./resources/js/modules/setting/globalSetting.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Size = __webpack_require__(/*! ../structOfDate/size.js */ "./resources/js/modules/structOfDate/size.js");

module.exports = class GLOBAL_SETTING {
	constructor() {
		this.sizeBlock = new Size(30, 30);
		this.numBlocks = new Size(2 ** 4, 2 ** 4);

		this.numEnemy = 5;

		this.timeOfTactPlayer = 50;
		this.timeOfTactOther = 200;
	}
}

/***/ }),

/***/ "./resources/js/modules/structOfDate/ExCoordinate.js":
/*!***********************************************************!*\
  !*** ./resources/js/modules/structOfDate/ExCoordinate.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Coor = __webpack_require__(/*! ./coordinate.js */ "./resources/js/modules/structOfDate/coordinate.js");

module.exports = class ExCoor extends Coor {
	constructor (x = 0, y = 0, newX = 0, newY = 0) {
		super(x, y);
		this.newX = newX;
		this.newY = newY;
	}
}

/***/ }),

/***/ "./resources/js/modules/structOfDate/coordinate.js":
/*!*********************************************************!*\
  !*** ./resources/js/modules/structOfDate/coordinate.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = class Coor {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
}

/***/ }),

/***/ "./resources/js/modules/structOfDate/size.js":
/*!***************************************************!*\
  !*** ./resources/js/modules/structOfDate/size.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = class Size {
	constructor(width = 0, height = 0) {
		this.width = width;
		this.height = height;
	}
}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map