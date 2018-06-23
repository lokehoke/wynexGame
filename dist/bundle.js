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

/***/ "./resources/js/modules/creatures/creature.js":
/*!****************************************************!*\
  !*** ./resources/js/modules/creatures/creature.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const GLOBAL_SETTING = new (__webpack_require__(/*! ../setting/globalSetting.js */ "./resources/js/modules/setting/globalSetting.js"))();
const Coor = __webpack_require__(/*! ../structOfDate/coordinate.js */ "./resources/js/modules/structOfDate/coordinate.js");
const ExCoor = __webpack_require__(/*! ../structOfDate/ExCoordinate.js */ "./resources/js/modules/structOfDate/ExCoordinate.js");
const World = __webpack_require__(/*! ../globalClass/world.js */ "./resources/js/modules/globalClass/world.js");
const ControllerBlock = __webpack_require__(/*! ../globalClass/state/inerState/place/blocks/controllerBlock.js */ "./resources/js/modules/globalClass/state/inerState/place/blocks/controllerBlock.js");

module.exports = class Creature {
	constructor (id, state, coor) {
		this.isCreature = true;
		this.patency = false;
		this.nesting = true;
		this.state = state;
		this.id = id;
		this.coor = coor;

		this.visable = {};
		this.visable.was = false;
		this.visable.now = false;
		this.visable = this._identifyVisable({newX: coor.x, newY: coor.y}, state);

		this.classNameCSS = '';
		this.classNameBackBlock = 'dirt';
		this.idBackBlock = 1;
		this.DOMObject = null;

		this.health = 100;
		this.attackDamage = 20;
		this.attackRange = 100;
		this.pursuitRange = 10;

		state.setCoorPlayer(coor, id);
	}

	movePerformance(direction) {
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
		const creature = this;
		const state = this.state;
		const world = state.getWorldObject();

		makeAnimation(direction);
		checkCreatureForAttack(direction);

		function makeAnimation(direction) {
			const coor = creature.DOMObject.getBoundingClientRect();

			let weapon = document.createElement('div');
			weapon.className = 'stackWeaponBall';
			weapon.style.left = coor.x + 'px';
			weapon.style.top = coor.y + 'px';
			creature.state.getWeaponDiv().appendChild(weapon);

			setTimeout(() => {
				let needCoor = 0;
				let max = 0;
				switch(direction) {
					case 'left':
						needCoor = coor.x - creature.attackRange * GLOBAL_SETTING.sizeBlock.width;
						weapon.style.left = (needCoor < 0 ? 0 : needCoor) + 'px';
						break;
					case 'right':
						needCoor = coor.x + creature.attackRange * GLOBAL_SETTING.sizeBlock.width;
						max = GLOBAL_SETTING.sizeBlock.width * (World.getSize(state).widthBlocks - 1);
						weapon.style.left = (needCoor > max ? max : needCoor) + 'px';
						break;
					case 'up':
						needCoor = coor.y - creature.attackRange * GLOBAL_SETTING.sizeBlock.height;
						weapon.style.top = (needCoor < 0 ? 0 : needCoor ) + 'px';
						break;
					case 'down':
						needCoor = coor.y + creature.attackRange * GLOBAL_SETTING.sizeBlock.height;
						max = GLOBAL_SETTING.sizeBlock.height * (World.getSize(state).heightBlocks - 1);
						weapon.style.top = (needCoor > max ? max : needCoor) + 'px';
						break;
				}
				setTimeout(() => {
					weapon.remove();
				} ,2000);
			}, 100);

			if (lisenAttack === false) {
				world.setAfterWorldRenderDoing(() => {
					const weapon = state.getWeaponDiv();
				});
				lisenAttack = true;
			}
		}

		function checkCreatureForAttack(direction) {
		}
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
		return visable;
	}

	_move(direction) {
		const id = this.id;
		const ownObject = this;
		const state = this.state;


		let x = state.getCreature(id).coor.x;
		let y = state.getCreature(id).coor.y;

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

		if (newPosition.patency === true) {
			return moving(curCoor, this);
		} else {
			return false;
		}

		function moving(coor, creature) {
			if (creature.watcher === true) {
				movingPointAndBais(coor, creature, direction);
			}

			const state = creature.state;

			creature.visable = creature._identifyVisable(coor, state);
			creature._movingVisableSwapingIcon(coor, state);
			changeCoordinate(creature.state.getCreature(id), coor);
			return true;

			function changeCoordinate(player, coor) {
				player.state.setCellPlace({
					x: player.state.getCreature(id).coor.x,
					y: player.state.getCreature(id).coor.y
				}, ControllerBlock.getBlockObject(player.idBackBlock));

				player.state.changeCoorPlayer({
					x: coor.newX,
					y: coor.newY
				}, id);

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


		let localPlace = getLocalPlace();

		function getLocalPlace() {
			let localPlace = [];

			let cell = null;

			for (let i = 0; i < side; i++) {
				localPlace[i] = [];

				for (let j = 0; j < side; j++) {
					if (i === 0 || i === side - 1 || j === i || j === side - 1) {
						localPlace[i][j] = Infinity;
					} else {
						cell = place[startX + i][startY + j];

						if (cell.patency === true) {
							localPlace[i][j] = 0;
						} else {
							localPlace[i][j] = Infinity;
						}
					}
				}
			}

			return localPlace;
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
}

/***/ }),

/***/ "./resources/js/modules/creatures/enemy.js":
/*!*************************************************!*\
  !*** ./resources/js/modules/creatures/enemy.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Creature = __webpack_require__(/*! ./creature */ "./resources/js/modules/creatures/creature.js");

module.exports = class Enemy extends Creature {
	constructor (id, state, coor) {
		super(id, state, coor);
		this.type = 'enemy';
		this.classNameCSS = 'slimeEnemy';
		this.watcher = false;
	}
}

/***/ }),

/***/ "./resources/js/modules/creatures/player.js":
/*!**************************************************!*\
  !*** ./resources/js/modules/creatures/player.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Creature = __webpack_require__(/*! ./creature */ "./resources/js/modules/creatures/creature.js");

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

/***/ }),

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
		let numCreature = 0;

		this.state = new State(GLOBAL_SETTING.numBlocks);
		setPlayers(players, this.state);

		const startPoint = getStartPiointWatch(players, this.state);

		if (startPoint === false) {
			throw "2 or more main player or null";
		} else {
			this.state.setStartPointWatch(startPoint);
		}

		enemy = enemy.concat(World.makeAroayWihtEnemy(1000, this.state));
		setEnemys(enemy, this.state);

		this.world = new World(this.state);
		const worldDiv = this.world.renderWorld(true);
		this.weaponDiv = createWeaponDiv();

		this.state.setWeaponDiv(this.weaponDiv);
		this.state.setWorldDiv(worldDiv);
		this.state.setWorldObject(this.world);

		function createWeaponDiv() {
			let weapon = document.createElement('div');
			weapon.className = 'weapon';
			document.querySelector('body').appendChild(weapon);
			return weapon;
		}

		function setPlayers(players, state) {
			if (players !== null) {
				players.forEach((val) => {
					state.setPlayer(numCreature++, val);
				});
				return true;
			} else {
				return false;
			}
		}

		function setEnemys(enemys, state) {
			if (enemys !== null) {
				enemys.forEach((val) => {
					state.setEnemy(numCreature++, val);
				});
				return true;
			} else {
				return false;
			}
		}

		function getStartPiointWatch(players, state) {
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
	}

	getState() {
		return this.state;
	}

	tactOfGame() {
		this.world.renderWorld();
		this.state._creature.forEach((item) => {
			if (item.watcher !== true) {
				item.movePerformance('rand');
			}
		});
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

const Player = __webpack_require__(/*! ../../creatures/player.js */ "./resources/js/modules/creatures/player.js");
const Enemy = __webpack_require__(/*! ../../creatures/enemy.js */ "./resources/js/modules/creatures/enemy.js");

const Coor = __webpack_require__(/*! ../../structOfDate/coordinate.js */ "./resources/js/modules/structOfDate/coordinate.js");

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

/***/ }),

/***/ "./resources/js/modules/globalClass/world.js":
/*!***************************************************!*\
  !*** ./resources/js/modules/globalClass/world.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const GLOBAL_SETTING = new (__webpack_require__(/*! ../setting/globalSetting.js */ "./resources/js/modules/setting/globalSetting.js"))();
const State = __webpack_require__(/*! ./state/state.js */ "./resources/js/modules/globalClass/state/state.js")

const Coor = __webpack_require__(/*! ../structOfDate/coordinate.js */ "./resources/js/modules/structOfDate/coordinate.js");

module.exports = class World {
	constructor(state) {
		this.state = state;
		this.size = World.getSize(state);
		this.afterWorldRenderDoing = [];
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

	setAfterWorldRenderDoing(func) {
		this.afterWorldRenderDoing.push(func);
	}

	doAfterWorldRenderDoing() {
		this.afterWorldRenderDoing.forEach((func) => {
			func();
		});
	}

	renderWorld(startRender) {
		const state = this.state;
		const size = this.size;
		const bias = state.getBias(true);

		if (bias === null && startRender === true) {
			let world = getEmptyWorld();

			rendersBlocks(world, state, size);
			deliteOldWorld();
			pushNewWorld(world);

			return world;
		} else if (canIBias(size, state, bias) === true) {
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

			world.doAfterWorldRenderDoing();

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
					block = getBlock(place[i][y], {newX:i,newY:y}, true);

					let line = oldWorld.children[i-x];
					let idBlockForRemove = 0;

					if (bias === 'right') {
						idBlockForRemove = 0;

						line.children[idBlockForRemove].remove();
						line.appendChild(block);
					} else if (bias === 'left') {
						idBlockForRemove = line.children.length - 1;

						line.children[idBlockForRemove].remove();
						line.insertBefore(block, oldWorld.children[i-x].children[0]);
					}

				}

				return true;
			}

			function upDownBias() {
				const y = state.getStartPiointWatch().y;

				let row = document.createElement('div');
				row.className = 'row';

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

					let block = getBlock(place[x][i], {newX:x,newY:i}, true);
					row.appendChild(block);


					if (place[newX][i].isCreature === true) {
						visableHideCreature(place[newX][i]);
					}
				}

				if (bias === 'up') {
					oldWorld.children[oldWorld.children.length-1].remove();
					oldWorld.insertBefore(row, oldWorld.children[0]);
				} else if (bias === 'down') {
					oldWorld.children[0].remove();
					oldWorld.appendChild(row);
				}

				return true;
			}
		}

		function getBlock(blockObject, coor, bias) {
			let block = document.createElement('div');

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

/*
	task:
		0.bias weapon after bais world
		1.reRender without bais and reRender All world
*/

const GLOBAL_SETTING = new __webpack_require__(/*! ./setting/globalSetting.js */ "./resources/js/modules/setting/globalSetting.js");
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

document.onkeydown = function (e) {
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
	game.tactOfGame();
}

console.log(state);

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
		this.sizeBlock = new Size(50, 50);
		this.numBlocks = new Size(2 ** 10, 2 ** 10);
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