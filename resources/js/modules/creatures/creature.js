'use strict';

const GLOBAL_SETTING = new (require('../setting/globalSetting.js'))();
const Coor = require('../structOfDate/coordinate.js');
const ExCoor = require('../structOfDate/ExCoordinate.js');
const World = require('../globalClass/world.js');
const ControllerBlock = require('../globalClass/state/inerState/place/blocks/controllerBlock.js');

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
		this.pursuitRange = 50;

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
		const watcher = state.getWatcher();

		let localPlace = getLocalPlace();
		let direction = wave(localPlace);

		if (direction === false) {
			creature._randMove();
		} else {
			creature._move(direction);
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