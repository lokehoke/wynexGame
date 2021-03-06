'use strict';

const State = require('./state/state.js');
const World = require('./world.js');

module.exports = class ControllerGame {
	constructor (store, players = null, enemy = []) {
		this.state = new State(store);
		this._settings = this.state.getSetting();
		this._setPlayers(players, this.state);

		this._definedAndSetStartPointWatch(players);

		let newEnemys = World.makeAroayWihtEnemy(this._settings.numEnemy, this.state);
		// enemy = enemy.concat(newEnemys);
		enemy = [...enemy, ...newEnemys];
		this._setEnemys(enemy, this.state);

		this.world = new World(this.state);
		const worldDiv = this.world.renderWorld(true);

		this.state.setWorldDiv(worldDiv);
		this.state.setWorldObject(this.world);
	}

	getState() {
		return this.state;
	}

	async tactOfGame(onlyRender = false) {
		if (!this.state.gameIsActive()) {
			throw "game is end";
		}

		const state = this.getState();

		this.world.renderWorld();

		if (!onlyRender) {
			moveAllenemy();
		}

		async function moveEnemy(item) {
			await item.movePerformance('rand');
		}

		async function moveAllenemy() {
			state.getAllCreature().forEach((item) => {
				if (item.watcher !== true) {
					moveEnemy(item);
				}
			});
		}
	}

	_definedAndSetStartPointWatch(players) {
		const startPoint = this._getStartPiointWatch(players, this.state);

		if (startPoint === false) {
			throw "2 or more main player or null";
		} else {
			this.state.setStartPointWatch(startPoint);
		}
	}

	_setPlayers(players, state) {
		let setting = this._settings;

		if (players !== null) {
			players.forEach((val) => {
				state.setPlayer(val);
			});

			return true;
		} else {
			return false;
		}
	}

	_setEnemys(enemys, state) {
		if (enemys !== null) {
			enemys.forEach((val) => {
				state.setEnemy(val);
			});

			return true;
		} else {
			return false;
		}
	}

	_getStartPiointWatch(players, state) {
		let watcher = players.filter(player => {
			return player.watcher;
		});

		let setting = this._settings;

		if (watcher.length !== 1) {
			return false;
		} else {
			watcher = watcher[0];
		}

		const size = World.getSize(state);

		let x = watcher.coor.x;
		let y = watcher.coor.y;

		let startPointWatch = {};

		startPointWatch.x = findX(x, size);
		startPointWatch.y = findY(y, size);

		return startPointWatch;

		function findX (x, size) {
			let newX = 0;

			if (x < Math.floor(size.heightBlocks / 2)) {
				newX = 0;
			} else if (x >= (setting.numBlocks.height - Math.floor(size.heightBlocks / 2))) {
				newX = setting.numBlocks.height - Math.floor(size.heightBlocks / 2);
			} else {
				newX = x - Math.floor(size.heightBlocks / 2) + 1;
			}

			return newX;
		}

		function findY (y, size) {
			let newY = 0;

			if (y < Math.floor(size.widthBlocks / 2)) {
				newY = 0;
			} else if (y >= (setting.numBlocks.width - Math.floor(size.widthBlocks / 2))) {
				newY = setting.numBlocks.width - Math.floor(size.widthBlocks / 2);
			} else {
				newY = y - Math.floor(size.widthBlocks / 2) + 1;
			}

			return newY;
		}
	}

}
