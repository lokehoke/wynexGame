'use strict';
function createCreature() {
	let num = 0;
	class Creature {
		constructor (state) {
			this.state = state;
			this.id = num;
			num++;
		}

		move(direction) {
			let id = this.id;
			let ownObject = this;
			let x = null;
			let y = null;
			if (ownObject.type === 'player') {
				x = this.state.players[id].x;
				y = this.state.players[id].y;
			} else if (ownObject.type === 'enemy') {
				x = this.state.enemy[id].x;
				y = this.state.enemy[id].y;
			}
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
				let newPosition = state.place[x][y+1];
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
				let newPosition = state.place[x][y-1];
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
				let newPosition = state.place[x-1][y];
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
				let newPosition = state.place[x+1][y];
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
				if (ownObject.type === 'player') {
					changeCoordinate(state.players[id]);
				} else if (ownObject.type === 'enemy') {
					changeCoordinate(state.enemy[id]);
				}
				if (win === true) {
					setTimeout(()=> {
						alert('you win');
					}, 500);
				}

				function changeCoordinate(player) {
					state.place[state.players[id].x][state.players[id].y] = 1;
					state.players[id].x = coor.newX;
					state.players[id].y = coor.newY;
					state.place[state.players[id].x][state.players[id].y] = player;
				}

				function changeClassForNew() {
					let newBlock = document.querySelectorAll('.world .row')[coor.newX].querySelectorAll('.standartPlace')[coor.newY];
					newBlock.className = newBlock.className.replace(' dirt', ' player');
				}

				function changeClassOld() {
					let last = document.querySelectorAll('.world .row')[coor.x].querySelectorAll('.standartPlace')[coor.y];
					last.className = last.className.replace(' player' , ' dirt');
				}

				function checkWin() {
					if (state.place[coor.newX][coor.newY] === 3) {
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
			super(state);
			this.type = 'enemy';
			state.enemy[num - 1] = {};
			state.enemy[num - 1].x = coor.x;
			state.enemy[num - 1].y = coor.y;
			state.place[coor.x][coor.y] = this;
		}
	}

	class Player extends Creature {
		constructor (state, coor) {
			super(state);
			this.type = 'player';
			state.players[num - 1] = {};
			state.players[num - 1].x = coor.x;
			state.players[num - 1].y = coor.y;
			state.place[coor.x][coor.y] = this;
		}
	}

	let Obj = {};
	Obj.player = Player;
	Obj.enemy = Enemy;

	return Obj;
};
let ALLCLASSES = createCreature();
let Player = ALLCLASSES.player;
let Enemy = ALLCLASSES.enemy;