'use strict';
function createCreature() {
	let num = 0;
	class Creature {
		constructor (state, coor) {
			this.state = state;
			this.id = num;
			this.x = coor.x;
			this.y = coor.y;
			this.visable = false;
			this.className = '';
			state.setCoorPlayer(coor, num++);
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
				state.setBias(direction);
				let win = checkWin();
				if (creature.watcher === true) {
					state.setPointWatch({x:coor.newX, y:coor.newY});
					let startPointWatch = state.getStartPiointWatch();
					let div = document.createElement('div');
					div.className = creature.className;
					let world = document.querySelector('.world');
					world.children[coor.x - startPointWatch.x].children[coor.y - startPointWatch.y].children[0].remove();
					world.children[coor.newX - startPointWatch.x].children[coor.newY - startPointWatch.y].appendChild(div);
				}
				changeCoordinate(state.getCreature(id), coor);
				if (win === true) {
					setTimeout(()=> {
						alert('you win');
					}, 500);
				}

				function changeCoordinate(player, coor) {
					state.setCellPlace({
						x: state.getCreature(id).x,
						y: state.getCreature(id).y
					}, 1);
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

				function checkWin() {
					if (
						state.getCellPlace({x:coor.newX, y:coor.newY}) === 3
					&&
						this.type === 'player'
					) {
						return true;
					} else {
						return false;
					}
				}
			}

			function canImove(newPosition) {
				if (newPosition === 1 || newPosition === 3) {
					return true;
				} else {
					return false;
				}
			}
		}
	}

	class Enemy extends Creature {
		constructor (state, coor) {
			super(state, coor);
			this.type = 'enemy';
			this.className = 'slimeEnemy';
		}
	}

	class Player extends Creature {
		constructor (state, main, coor, profession) {
			super(state, coor);
			this.type = 'player';
			this.watcher = true;
			state.setPointWatch(coor);
			state.setWatcher(coor, this);
			switch(profession) {
				case 'mage':
					this.className = 'magePlayer';
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