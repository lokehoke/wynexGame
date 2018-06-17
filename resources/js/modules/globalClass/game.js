'use strict';

const State = require('./state/state.js');
const World = require('./world.js');
const GLOBAL_SETTING_CLASS = require('../setting/globalSetting.js');
const GLOBAL_SETTING = new GLOBAL_SETTING_CLASS();

module.exports = class ControllerGame {
	constructor (players = null, enemy = []) {
		let numCreature = 0;

		this.state = new State(GLOBAL_SETTING.numBlocks);
		setPlayers(players, this.state);

		const startPoint = getStartPiointWatch(players, this.state);

		if (startPoint === false) {
			throw "2 or more main player or null";
		} else {
			this.state.setStartPointWatch(startPoint);
		}

		enemy = enemy.concat(World.makeAroayWihtEnemy(1000, this.state));
		setEnemys(enemy, this.state);

		this.world = new World(this.state);
		const worldDiv = this.world.renderWorld(true);
		this.weaponDiv = createWeaponDiv();

		this.state.setWeaponDiv(this.weaponDiv);
		this.state.setWorldDiv(worldDiv);
		this.state.setWorldObject(this.world);

		function createWeaponDiv() {
			let weapon = document.createElement('div');
			weapon.className = 'weapon';
			document.querySelector('body').appendChild(weapon);
			return weapon;
		}

		function setPlayers(players, state) {
			if (players !== null) {
				players.forEach((val) => {
					state.setPlayer(numCreature++, val);
				});
				return true;
			} else {
				return false;
			}
		}

		function setEnemys(enemys, state) {
			if (enemys !== null) {
				enemys.forEach((val) => {
					state.setEnemy(numCreature++, val);
				});
				return true;
			} else {
				return false;
			}
		}

		function getStartPiointWatch(players, state) {
			let watcher = players.filter(player => {
				return player.watcher;
			});

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
				} else if (x >= (GLOBAL_SETTING.numBlocks.height - Math.floor(size.heightBlocks / 2))) {
					newX = GLOBAL_SETTING.numBlocks.height - Math.floor(size.heightBlocks / 2);
				} else {
					newX = x - Math.floor(size.heightBlocks / 2) + 1;
				}

				return newX;
			}

			function findY (y, size) {
				let newY = 0;

				if (y < Math.floor(size.widthBlocks / 2)) {
					newY = 0;
				} else if (y >= (GLOBAL_SETTING.numBlocks.width - Math.floor(size.widthBlocks / 2))) {
					newY = GLOBAL_SETTING.numBlocks.width - Math.floor(size.widthBlocks / 2);
				} else {
					newY = y - Math.floor(size.widthBlocks / 2) + 1;
				}

				return newY;
			}
		}
	}

	getState() {
		return this.state;
	}

	tactOfGame() {
		this.world.renderWorld();
		this.state._creature.forEach((item) => {
			if (item.watcher !== true) {
				item.movePerformance('rand');
			}
		});
	}
}