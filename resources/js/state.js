'use strict';
class State {
	constructor (config) {
		generatePlace(this);
		this._creature = [];
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
						state._place[i][j] = State.getBlockObject(2);
					} else {
						state._place[i][j] = State.getBlockObject(1);
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
										state._place[n][k] = State.getBlockObject(2);
									}
								} else {
									state._place[i][k] = State.getBlockObject(2);
									state._place[(i+randDigit >= N ? i : i+randDigit)][k] = State.getBlockObject(2);
								}
							}
							j+= 8;
						}
					}
				}
			}
		}
	}

	static getBlockObject(id) {
		switch(id) {
			case 1:
				return {
					type: 'dirt',
					patency: true,
					classNameCSS: 'dirt',
					nesting: false,
					idBlock: 1,
					isCreature: false
				};
			case 2:
				return {
					type: 'border',
					patency: false,
					classNameCSS: 'border',
					nesting: false,
					idBlock: 2,
					isCreature: false
				}
		}
	}

	setCoorPlayer (coor, num = 0) {
		this._creature[num] = {};
		this._creature[num].x = coor.x;
		this._creature[num].y = coor.y;
		return true;
	}

	setPlayer (id = 0 , val) {
		this._creature[id] = new Player(this, val.watcher, {x: val.x, y: val.y}, val.type);
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

	getAllCreature() {
		return this._creature;
	}

	getAllPlace() {
		return this._place;
	}

	getCellPlace(coor) {
		return this._place[coor.x][coor.y];
	}

	setCellPlace(coor, val) {
		if (val.isCreature === true) {
			val.idBackBlock = this._place[coor.x][coor.y].idBlock;
			val.classNameBackBlock = this._place[coor.x][coor.y].classNameCSS;
		}
		this._place[coor.x][coor.y] = val;
		return true;
	}

	changeCoorPlayer(coor, id = 0) {
		this._creature[id].x = coor.x;
		this._creature[id].y = coor.y;
		return true;
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

	setPointWatch(coor, watcher) {
		this._pointWatch.x = coor.x;
		this._pointWatch.y = coor.y;
		this._pointWatch.watcher = watcher;
		return true;
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
		return true;
	}

	getPiointWatch() {
		return this._pointWatch;
	}

	setStartPointWatch(coor) {
		this._startPointWatch.x = coor.x;
		this._startPointWatch.y = coor.y;
		return true;
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
		return true;
	}
}