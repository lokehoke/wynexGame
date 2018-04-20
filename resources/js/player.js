function createPlayer() {
	let num = 0;
	class Player {
		constructor (state, coor) {
			this.state = state;
			this.id = num;
			state.players[num] = {};
			state.players[num].x = coor.x;
			state.players[num].y = coor.y;
			state.place[coor.x][coor.y] = 9;
			num++;
		}

		move(direction) {
			let id = this.id;
			let x = this.state.players[id].x;
			let y = this.state.players[id].y;
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
				changeCoordinate();
				if (win === true) {
					setTimeout(()=> {
						alert('you win');
					}, 500);
				}

				function changeCoordinate() {
					state.place[state.players[id].x][state.players[id].y] = 1;
					state.players[id].x = coor.newX;
					state.players[id].y = coor.newY;
					state.place[state.players[id].x][state.players[id].y] = 9;
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

	return Player;
};

let Player = createPlayer();