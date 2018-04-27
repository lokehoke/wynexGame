class State {
	constructor (config) {
		generatePlace(this);
		this._creature = [];

		function generatePlace(state) {
			const N = config.height;
			const M = config.width;
			state._place = [];
			for (let i = 0; i < N; i++) {
				state._place[i] = [];
				for (let j = 0; j < M; j++) {
					if (i === 0 || i + 1 === N || j === 0 || j + 1 === M) {
						state._place[i][j] = 2;
					} else {
						state._place[i][j] = 1;
					}
				}
			}
			// addRoom(state);
			return state;

			function addRoom(state) {
				for (let i = 0; i < N; i+= 8) {
					for (let j = 0; j < M; j++) {
						let randDigit = Math.floor(Math.random() * 11);
						if (randDigit > 9) {
							for (let k = j; k < j+randDigit && k < M; k++) {
								if (k === j) {
									for (let n = i; n < i+randDigit+1 && n < N; n++) {
										state.place[n][k] = 2;
									}
								} else {
									state.place[i][k] = 2;
									state.place[(i+randDigit >= N ? i : i+randDigit)][k] = 2;
								}
							}
							j+= 8;
						}
					}
				}
			}
		}
	}

	setCoorPlayer (coor, num) {
		this._creature[num] = {};
		this._creature[num].x = coor.x;
		this._creature[num].y = coor.y;
	}

	setPlayer (i , val) {
		this._creature[i] = new Player(this, {x: val.x, y: val.y}, val.type);
		this._place[val.x][val.y] = this._creature[i];
	}

	setEnemy (i , val) {
		this._creature[i] = new Enemy(this, {x: val.x, y: val.y}, val.type);
		this._place[val.x][val.y] = this._creature[i];
	}
}