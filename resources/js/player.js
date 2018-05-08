'use strict';
function createCreature() {
	let num = 0;
	class Creature {
		constructor (state, coor) {
			this.isCreature = true;
			this.nesting = true;
			this.state = state;
			this.id = num;
			this.x = coor.x;
			this.y = coor.y;
			this.visable = {};
			this.visable.was = false;
			this.visable.now = false;
			this.visable = this.identifyVisable(this, state, {newX: coor.x, newY: coor.y});
			this.classNameCSS = '';
			this.classNameBackBlock = 'dirt';
			this.idBackBlock = 1;
			state.setCoorPlayer(coor, num++);
		}

		identifyVisable(creature, state, coor) {
			let startPointWatch = state.getStartPiointWatch();
			let size = World.getSize();
			let visable = {};
			visable.was = creature.visable.now;
			if (coor.newX - startPointWatch.x <= size.heightBlocks
			&&
				coor.newY - startPointWatch.y <= size.widthBlocks
			&&
				coor.newX - startPointWatch.x > 0
			&&
				coor.newY - startPointWatch.y > 0
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
					moveRight(this.state, this);
					break;
				case 'left':
					moveLeft(this.state, this);
					break;
				case 'up':
					moveUp(this.state, this);
					break;
				case 'down':
					moveDown(this.state, this);
					break;
				default:
					throw 'empty direction on move creature: ' + this.id;
			}

			function moveRight (state, creature) {
				let newPosition = state.getCellPlace({x:x, y:(y+1)});
				if (canImove(newPosition)) {
					moving(state, {
						x: x,
						y: y,
						newX: x,
						newY: y+1
					}, creature);
				}
			}

			function moveLeft (state, creature) {
				let newPosition = state.getCellPlace({x:x, y:(y-1)});
				if (canImove(newPosition)) {
					moving(state, {
						x: x,
						y: y,
						newX: x,
						newY: y-1
					}, creature);
				}
			}

			function moveUp (state, creature) {
				let newPosition = state.getCellPlace({x:(x-1), y:y});
				if (canImove(newPosition)) {
					moving(state, {
						x: x,
						y: y,
						newX: x-1,
						newY: y
					}, creature);
				}
			}

			function moveDown (state, creature) {
				let newPosition = state.getCellPlace({x:(x+1), y:y});
				if (canImove(newPosition)) {
					moving(state, {
						x: x,
						y: y,
						newX: x+1,
						newY: y
					}, creature);
				}
			}

			function moving(state, coor, creature) {
				if (creature.watcher === true) {
					movingPointAndBais(coor, creature, direction, state);
				}
				creature.visable = foundVisable(creature, state, coor);
				movingVisableSwapingIcon(state, creature, coor);
				changeCoordinate(state.getCreature(id), coor);

				function changeCoordinate(player, coor) {
					state.setCellPlace({
						x: state.getCreature(id).x,
						y: state.getCreature(id).y
					}, State.getBlockObject(player.idBackBlock));
					state.changeCoorPlayer({
						x: coor.newX,
						y: coor.newY
					}, id);
					state.setCellPlace({
						x: coor.newX,
						y: coor.newY
					}, player);
					player.x = coor.newX;
					player.y = coor.newY;
				}

				function getBlockWithCreature(creature) {
					let div = document.createElement('div');
					div.className = creature.classNameCSS;
					return div;
				}

				function movingPointAndBais(coor, creature, direction, state) {
					state.setBias(direction);
					state.setPointWatch({x:coor.newX, y:coor.newY}, creature);
				}

				function movingVisableSwapingIcon(state, creature, coor) {
					let startPointWatch = state.getStartPiointWatch();
					let div = getBlockWithCreature(creature);
					let world = document.querySelector('.world');
					let size = World.getSize();
					if (creature.visable.was === true) {
						world.children[coor.x - startPointWatch.x].children[coor.y - startPointWatch.y].children[0].remove();
					}
					if (creature.visable.now === true){
						world.children[coor.newX - startPointWatch.x].children[coor.newY - startPointWatch.y].appendChild(div);
					}
				}

				function foundVisable(creature, state, coor) {
					if (creature.watcher === true) {
						return creature.visable;
					} else {
						return creature.identifyVisable(creature, state, coor);
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