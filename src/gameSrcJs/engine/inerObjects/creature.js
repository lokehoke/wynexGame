'use strict';

const InnerObject = require('./innerObject.js');
const Weapon = require('./weapon.js');

const GLOBAL_SETTING = new (require('../setting/globalSetting.js'))();

const Coor = require('../structOfDate/coordinate.js');
const ExCoor = require('../structOfDate/ExCoordinate.js');

const ControllerBlock = require('../globalClass/state/inerState/place/blocks/controllerBlock.js');

const World = require('../globalClass/world.js');

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