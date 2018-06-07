'use strict';
function createCreature() {
	let num = 0;
	let lisenAttack = false;
	class Creature {
		constructor (state, coor) {
			this.isCreature = true;
			this.patency = false;
			this.nesting = true;
			this.state = state;
			this.id = num;
			this.x = coor.x;
			this.y = coor.y;

			this.visable = {};
			this.visable.was = false;
			this.visable.now = false;
			this.visable = this._identifyVisable({newX: coor.x, newY: coor.y});

			this.classNameCSS = '';
			this.classNameBackBlock = 'dirt';
			this.idBackBlock = 1;
			this.DOMObject = null;

			this.health = 100;
			this.attackDamage = 20;
			this.attackRange = 100;
			this.pursuitRange = 10;

			state.setCoorPlayer(coor, num++);
		}

		movePerformance(direction) {
			if (direction === 'rand') {
				const state = this.state;
				const watcher = state.getWatcher();
				const watcherX = watcher.x;
				const watcherY = watcher.y;
				const x = this.x;
				const y = this.y;
				const range = this.pursuitRange;
				if (
					watcherX < x + range
				&&
					watcherX > x - range
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
							max = GLOBAL_SETTING.sizeBlock.width * (World.getSize().widthBlocks - 1);
							weapon.style.left = (needCoor > max ? max : needCoor) + 'px';
							break;
						case 'up':
							needCoor = coor.y - creature.attackRange * GLOBAL_SETTING.sizeBlock.height;
							weapon.style.top = (needCoor < 0 ? 0 : needCoor ) + 'px';
							break;
						case 'down':
							needCoor = coor.y + creature.attackRange * GLOBAL_SETTING.sizeBlock.height;
							max = GLOBAL_SETTING.sizeBlock.height * (World.getSize().heightBlocks - 1);
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
						// weapon.
					});
					lisenAttack = true;
				}
			}

			function checkCreatureForAttack(direction) {
			}
		}

		_identifyVisable(coor) {
			const visable = {};
			if (this.watcher === true) {
				visable.now = true;
				visable.was = true;
			} else {
				const startPointWatch = this.state.getStartPiointWatch();
				const size = World.getSize();
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

			let x = state.getCreature(id).x;
			let y = state.getCreature(id).y;
			let newX = x;
			let newY = y;
			let newPosition = null;

			switch(direction) {
				case 'right':
					if (GLOBAL_SETTING.numBlocks.width <= y+1) {
						return false;
					} else {
						newY++;
						newPosition = state.getCellPlace({x:x, y:(y+1)});
					}
					break;
				case 'left':
					if (0 > y - 1) {
						return false;
					} else {
						newY--;
						newPosition = state.getCellPlace({x:x, y:(y-1)});
					}
					break;
				case 'up':
					if (0 > x-1) {
						return false;
					} else {
						newX--;
						newPosition = state.getCellPlace({x:(x-1), y:y});
					}
					break;
				case 'down':
					if (GLOBAL_SETTING.numBlocks.height <= x+1) {
						return false;
					} else {
						newX++;
						newPosition = state.getCellPlace({x:(x+1), y:y});
					}
					break;
				default:
					throw 'empty direction on move creature: ' + this.id;
			}

			if (newPosition.patency === true) {
				return moving({
					x: x,
					y: y,
					newX: newX,
					newY: newY
				}, this);
			} else {
				return false;
			}

			function moving(coor, creature) {
				if (creature.watcher === true) {
					movingPointAndBais(coor, creature, direction);
				}
				creature.visable = creature._identifyVisable(coor);
				creature._movingVisableSwapingIcon(coor);
				changeCoordinate(creature.state.getCreature(id), coor);
				return true;

				function changeCoordinate(player, coor) {
					player.state.setCellPlace({
						x: player.state.getCreature(id).x,
						y: player.state.getCreature(id).y
					}, State.getBlockObject(player.idBackBlock));
					player.state.changeCoorPlayer({
						x: coor.newX,
						y: coor.newY
					}, id);
					player.state.setCellPlace({
						x: coor.newX,
						y: coor.newY
					}, player);
					player.x = coor.newX;
					player.y = coor.newY;
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
			
		}

		_movingVisableSwapingIcon(coor) {
			const startPointWatch = this.state.getStartPiointWatch();
			const world = this.state.getWorldDiv();
			const size = World.getSize();

			let div = getBlockWithCreature(this);
			if (this.visable.was === true) {
				world.children[coor.x - startPointWatch.x].children[coor.y - startPointWatch.y].children[0].remove();
				this.DOMObject = null;
			}
			if (this.visable.now === true){
				world.children[coor.newX - startPointWatch.x].children[coor.newY - startPointWatch.y].appendChild(div);
				this.DOMObject = div;
			}
			return true;

			function getBlockWithCreature(creature) {
				let div = document.createElement('div');
				div.className = creature.classNameCSS;
				return div;
			}
		}
	}

	class Enemy extends Creature {
		constructor (state, coor) {
			super(state, coor);
			this.type = 'enemy';
			this.classNameCSS = 'slimeEnemy';
			this.watcher = false;
		}
	}

	class Player extends Creature {
		constructor (state, watcher, coor, profession) {
			super(state, coor);
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

	let Obj = {};
	Obj.player = Player;
	Obj.enemy = Enemy;

	return Obj;
};
const ALL_CLASSES = createCreature();
const Player = ALL_CLASSES.player;
const Enemy = ALL_CLASSES.enemy;