'use strict';
function createCreature() {
	let num = 0;
	class Creature {
		constructor (state, coor) {
			this.state = state;
			this.id = num;
			this.img = null;
			this.x = coor.x;
			this.y = coor.y;
			state.setCoorPlayer(coor, num++);
		}


		move(direction) {
			let id = this.id;
			let ownObject = this;
			let x = this.state._creature[id].x;
			let y = this.state._creature[id].y;
			switch(direction) {
				case 'right':
					moveRight(this.state);
					break;
				case 'left':
					moveLeft(this.state);
					break;
				case 'up':
					moveUp(this.state);
					break;
				case 'down':
					moveDown(this.state);
					break;
			}

			function moveRight (state) {
				let newPosition = state._place[x][y+1];
				if (canImove(newPosition)) {
					moving(state, {
							x: x,
							y: y,
							newX: x,
							newY: y+1
					})
				}
			}

			function moveLeft (state) {
				let newPosition = state._place[x][y-1];
				if (canImove(newPosition)) {
					moving(state, {
							x: x,
							y: y,
							newX: x,
							newY: y-1
					})
				}
			}

			function moveUp (state) {
				let newPosition = state._place[x-1][y];
				if (canImove(newPosition)) {
					moving(state, {
							x: x,
							y: y,
							newX: x-1,
							newY: y
					})
				}
			}

			function moveDown (state) {
				let newPosition = state._place[x+1][y];
				if (canImove(newPosition)) {
					moving(state, {
							x: x,
							y: y,
							newX: x+1,
							newY: y
					})
				}
			}

			function moving(state, coor) {
				let win = false;
				checkWin();
				changeClassOld();
				changeClassForNew();
				changeCoordinate(state._creature[id]);
				if (win === true) {
					setTimeout(()=> {
						alert('you win');
					}, 500);
				}

				function changeCoordinate(player) {
					state._place[state._creature[id].x][state._creature[id].y] = 1;
					state._creature[id].x = coor.newX;
					state._creature[id].y = coor.newY;
					state._place[state._creature[id].x][state._creature[id].y] = player;
				}

				function changeClassForNew() {
					let newBlock = document.querySelectorAll('.world .row')[coor.newX].querySelectorAll('.standartPlace')[coor.newY];
					newBlock.children[0].className = 'magePlayer';				}

				function changeClassOld() {
					let last = document.querySelectorAll('.world .row')[coor.x].querySelectorAll('.standartPlace')[coor.y];
					last.children[0].className = '';
				}

				function checkWin() {
					if (state._place[coor.newX][coor.newY] === 3) {
						win = true;
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
		}
	}

	class Player extends Creature {
		constructor (state, coor, profession) {
			super(state, coor);
			this.type = 'player';
			switch(profession) {
				case 'mage':
					this.img = 'resources/img/iconCreature/player/mage.svg';
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