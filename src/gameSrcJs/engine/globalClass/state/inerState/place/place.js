const ControllerBlock = require('./blocks/controllerBlock.js');

module.exports = class Place {
	constructor (config) {
		const N = config.height;
		const M = config.width;
		this.height = N;
		this.width = M;

		for (let i = 0; i < N; i++) {
			this[i] = [];
			for (let j = 0; j < M; j++) {
				if (i < 3 || i + 1 > N - 3 || j < 3 || j + 1 > M - 3){
					this[i][j] = ControllerBlock.getBlockObject(2);
				} else {
					this[i][j] = ControllerBlock.getBlockObject(1);
				}
			}
		}
	}

	addRoom () {
		const N = this.height;
		const M = this.width;

		for (let i = 0; i < N; i+= 8) {
			for (let j = 0; j < M; j++) {
				const randDigit = Math.floor(Math.random() * 400);
				if (randDigit > 9 && randDigit < 25) {
					for (let k = j; k < j+randDigit && k < M; k++) {
						if (k === j) {
							for (let n = i; n < i+randDigit+1 && n < N; n++) {
								this[n][k] = ControllerBlock.getBlockObject(2);
							}
						} else {
							this[i][k] = ControllerBlock.getBlockObject(2);
							this[(i+randDigit >= N ? i : i+randDigit)][k] = ControllerBlock.getBlockObject(2);
						}
					}
					j+= 8;
				}
			}
		}
	}

	getCell(x, y) {
		return this[x][y];
	}

	setCell(x, y, val) {
		if (typeof val === 'object') {
			this[x][y] = val;
			return true;
		} else {
			return false;
		}
	}

	getAllPlace() {
		return this;
	}

	createNewBlock(id = 0) {
		return ControllerBlock.getBlockObject(id);
	}
}