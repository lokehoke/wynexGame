'use strict';
function createCreature() {
	let num = 0;
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
			this.visable = this.identifyVisable({newX: coor.x, newY: coor.y});
			this.classNameCSS = '';
			this.classNameBackBlock = 'dirt';
			this.idBackBlock = 1;
			this.DOMObject = null;

			this.health = 100;
			this.attackDamage = 20;
			this.range = 100;

			state.setCoorPlayer(coor, num++);
		}

		identifyVisable(coor) {
			let startPointWatch = this.state.getStartPiointWatch();
			let size = World.getSize();
			let visable = {};
			visable.was = this.visable.now;
			if (coor.newX - startPointWatch.x < size.heightBlocks
			&&
				coor.newY - startPointWatch.y < size.widthBlocks
			&&
				coor.newX - startPointWatch.x >= 0
			&&
				coor.newY - startPointWatch.y >= 0
			){
				visable.now = true;
			} else {
				visable.now = false;
			}
			return visable;
		}

		move(direction) {
			let id = this.id;
			let ownObject = this;
			let x = this.state.getCreature(id).x;
			let y = this.state.getCreature(id).y;
			switch(direction) {
				case 'right':
					moveRight(this);
					break;
				case 'left':
					moveLeft(this);
					break;
				case 'up':
					moveUp(this);
					break;
				case 'down':
					moveDown(this);
					break;
				default:
					throw 'empty direction on move creature: ' + this.id;
			}

			function moveRight (creature) {
				if (GLOBAL_SETTING.numBlocks.width <= y+1) {
					return false;
				}
				let newPosition = creature.state.getCellPlace({x:x, y:(y+1)});
				if (canImove(newPosition)) {
					moving({
						x: x,
						y: y,
						newX: x,
						newY: y+1
					}, creature);
				}
			}

			function moveLeft (creature) {
				if (0 > y - 1) {
					return false;
				}
				let newPosition = creature.state.getCellPlace({x:x, y:(y-1)});
				if (canImove(newPosition)) {
					moving({
						x: x,
						y: y,
						newX: x,
						newY: y-1
					}, creature);
				}
			}

			function moveUp (creature) {
				if (0 > x-1) {
					return false;
				}
				let newPosition = creature.state.getCellPlace({x:(x-1), y:y});
				if (canImove(newPosition)) {
					moving({
						x: x,
						y: y,
						newX: x-1,
						newY: y
					}, creature);
				}
			}

			function moveDown (creature) {
				if (GLOBAL_SETTING.numBlocks.height <= x+1) {
					return false;
				}
				let newPosition = creature.state.getCellPlace({x:(x+1), y:y});
				if (canImove(newPosition)) {
					moving({
						x: x,
						y: y,
						newX: x+1,
						newY: y
					}, creature);
				}
			}

			function moving(coor, creature) {
				if (creature.watcher === true) {
					movingPointAndBais(coor, creature, direction);
				}
				creature.visable = foundVisable(creature, coor);
				creature.movingVisableSwapingIcon(coor);
				changeCoordinate(creature.state.getCreature(id), coor);

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

				function foundVisable(creature, coor) {
					if (creature.watcher === true) {
						return creature.visable;
					} else {
						return creature.identifyVisable(coor);
					}
				}
			}

			function canImove(newPosition) {
				return newPosition.patency;
			}
		}

		randMove() {
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
			this.move(direction);
			return true;
		}

		movingVisableSwapingIcon(coor) {
			let startPointWatch = this.state.getStartPiointWatch();
			let div = getBlockWithCreature(this);
			let world = document.querySelector('.world');
			let size = World.getSize();
			if (this.visable.was === true) {
				world.children[coor.x - startPointWatch.x].children[coor.y - startPointWatch.y].children[0].remove();
			}
			if (this.visable.now === true){
				world.children[coor.newX - startPointWatch.x].children[coor.newY - startPointWatch.y].appendChild(div);
			}

			function getBlockWithCreature(creature) {
				let div = document.createElement('div');
				div.className = creature.classNameCSS;
				return div;
			}
		}

		doAttack(direction) {
			let creature = this;
			makeAnimation(direction);
			checkCreatureForAttack(direction);

			function makeAnimation(direction) {
				let coor = creature.DOMObject.getBoundingClientRect();
				let weapon = document.createElement('div');
				weapon.className = 'stackWeaponBall';
				weapon.style.left = coor.x + 'px';
				weapon.style.top = coor.y + 'px';
				document.querySelector('.temp').appendChild(weapon);
				setTimeout(() => {
					let needCoor = 0;
					let max = 0;
					switch(direction) {
						case 'left':
							needCoor = coor.x - creature.range * GLOBAL_SETTING.sizeBlock.width;
							weapon.style.left = (needCoor < 0 ? 0 : needCoor) + 'px';
							break;
						case 'right':
							needCoor = coor.x + creature.range * GLOBAL_SETTING.sizeBlock.width;
							max = GLOBAL_SETTING.sizeBlock.width * (World.getSize().widthBlocks - 1);
							weapon.style.left = (needCoor > max ? max : needCoor) + 'px';
							break;
						case 'up':
							needCoor = coor.y - creature.range * GLOBAL_SETTING.sizeBlock.height;
							weapon.style.top = (needCoor < 0 ? 0 : needCoor ) + 'px';
							break;
						case 'down':
							needCoor = coor.y + creature.range * GLOBAL_SETTING.sizeBlock.height;
							max = GLOBAL_SETTING.sizeBlock.height * (World.getSize().heightBlocks - 1);
							weapon.style.top = (needCoor > max ? max : needCoor) + 'px';
							break;
					}
					setTimeout(() => {
						weapon.remove();
					} ,2000);
				}, 100);
			}

			function checkCreatureForAttack(direction) {
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
let ALL_CLASSES = createCreature();
let Player = ALL_CLASSES.player;
let Enemy = ALL_CLASSES.enemy;