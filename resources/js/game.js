'use strict';
/*
	task:
		0.bias weapon after bais world
		1.reRender without bais and reRender All world
		2.rewrite bais function
*/

const GLOBAL_SETTING = {
	sizeBlock: {
		width: 50,
		height: 50
	},
	numBlocks: {
		width: 2 ** 10,
		height: 2 ** 10
	}
};

class ControllerGame {
	constructor (players = null, enemy = []) {
		let numCreature = 0;

		this.state = new State(GLOBAL_SETTING.numBlocks);
		setPlayers(players, this.state);

		const startPoint = getStartPiointWatch(players);

		if (startPoint === false) {
			throw "2 or more main player or null";
		} else {
			this.state.setStartPointWatch(startPoint);
		}

		enemy = enemy.concat(World.makeAroayWihtEnemy(1000));
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

		function getStartPiointWatch(players) {
			let watcher = players.filter(player => {
				return player.watcher;
			});

			if (watcher.length !== 1) {
				return false;
			} else {
				watcher = watcher[0];
			}

			const size = World.getSize();

			let x = watcher.x;
			let y = watcher.y;
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

const game = new ControllerGame([{
	x: 1,
	y: 1,
	type: 'mage',
	watcher: true
}]);
const state = game.getState();
const player = state.getCreature(0);

document.onkeydown = function (e) {
	if (e.keyCode === 68) {
		player.movePerformance('right');
	} else if (e.keyCode === 83) {
		player.movePerformance('down');
	} else if (e.keyCode === 87) {
		player.movePerformance('up');
	} else if (e.keyCode === 65) {
		player.movePerformance('left');
	} else if (e.keyCode === 39) {
		player.doAttack('right');
	} else if (e.keyCode === 40) {
		player.doAttack('down');
	} else if (e.keyCode === 38) {
		player.doAttack('up');
	} else if (e.keyCode === 37) {
		player.doAttack('left');
	}
	game.tactOfGame();
}

console.log(state);