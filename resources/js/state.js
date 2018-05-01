'use strict';
class State {
	constructor (config = {height: 12, width: 12}) {
		generatePlace(this);
		this._creature = [];
		this._watcher = {};
		this._pointWatch = {};
		this._startPointWatch = {x:0,y:0};
		this._bias = null;

		function generatePlace(state) {
			const N = config.height;
			const M = config.width;
			state._place = [];
			for (let i = 0; i < N; i++) {
				state._place[i] = [];
				for (let j = 0; j < M; j++) {
					if (i === 0
					||
						i + 1 === N
					||
						j === 0
					||
						j + 1 === M
					){
						state._place[i][j] = 2;
					} else {
						state._place[i][j] = 1;
					}
				}
			}
			addRoom(state);
			return state;

			function addRoom(state) {
				for (let i = 0; i < N; i+= 8) {
					for (let j = 0; j < M; j++) {
						let randDigit = Math.floor(Math.random() * 11);
						if (randDigit > 9) {
							for (let k = j; k < j+randDigit && k < M; k++) {
								if (k === j) {
									for (let n = i; n < i+randDigit+1 && n < N; n++) {
										state._place[n][k] = 2;
									}
								} else {
									state._place[i][k] = 2;
									state._place[(i+randDigit >= N ? i : i+randDigit)][k] = 2;
								}
							}
							j+= 8;
						}
					}
				}
			}
		}
	}

	setCoorPlayer (coor = {x:1, y:1}, num = 0) {
		this._creature[num] = {};
		this._creature[num].x = coor.x;
		this._creature[num].y = coor.y;
		return true;
	}

	setPlayer (id = 0 , val) {
		this._creature[id] = new Player(this, val.main, {x: val.x, y: val.y}, val.type);
		this._place[val.x][val.y] = this._creature[id];
		return true;
	}

	setEnemy (id = 0 , val) {
		this._creature[id] = new Enemy(this, {x: val.x, y: val.y}, val.type);
		this._place[val.x][val.y] = this._creature[id];
		return true;
	}

	getCreature (id = 0) {
		if (typeof +id !== 'number') {
			return false;
		} else {
			return this._creature[id];
		}
	}

	getAllPlace() {
		return this._place;
	}

	getCellPlace(coor = {x:0, y:0}) {
		return this._place[coor.x][coor.y];
	}

	setCellPlace(coor = {x:0, y:0}, val) {
		this._place[coor.x][coor.y] = val;
		return true;
	}

	changeCoorPlayer (coor = {x:1, y:1}, id = 0) {
		this._creature[id].x = coor.x;
		this._creature[id].y = coor.y;
		return true;
	}

	setWatcher(coor, who) {
		this._watcher.x = coor.x;
		this._watcher.y = coor.y;
		if (
			typeof who === 'object'
		&&
			who !== null
		) {
			this._watcher.player = who;
		}
	}

	getWatcher() {
		return this._watcher;
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

	setPointWatch(coor) {
		this._pointWatch.x = coor.x;
		this._pointWatch.y = coor.y;
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
	}

	getPiointWatch() {
		return this._pointWatch;
	}

	setStartPointWatch(coor) {
		this._startPointWatch.x = coor.x;
		this._startPointWatch.y = coor.y;
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
	}
}