'use strict';
/*
	task:
		0.Defind DOMObject after moving
		1.bias weapon after bais world
		2.reRender without bais and reRender All world

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
		this.state = (new State(GLOBAL_SETTING.numBlocks));
		setPlayers(players, this.state);
		let startPoint = getStartPiointWatch(players);
		if (startPoint === false) {
			throw "2 or more main player or null";
		} else {
			this.state.setStartPointWatch(startPoint);
		}
		enemy = enemy.concat(World.makeAroayWihtEnemy(1000));
		setEnemys(enemy, this.state);
		this.world = new World(this.state);
		this.world.renderWorld();
		this.tempDiv = createTempDiv();

		function createTempDiv() {
			let temp = document.createElement('div');
			temp.className = 'temp';
			document.querySelector('body').appendChild(temp);
			return temp;
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
			players.filter(player => {
				return player.watcher;
			});
			if (players.length !== 1) {
				return false;
			}
			let x = players[0].x;
			let y = players[0].y;
			let size = World.getSize();
			let startPointWatch = {};

			findX(startPointWatch, x, size);
			findY(startPointWatch, y, size);

			return startPointWatch;

			function findX (startPointWatch, x, size) {
				if (x < Math.floor(size.heightBlocks / 2)) {
					startPointWatch.x = 0;
				} else if (x >= (GLOBAL_SETTING.numBlocks.height - Math.floor(size.heightBlocks / 2))) {
					startPointWatch.x = GLOBAL_SETTING.numBlocks.height - Math.floor(size.heightBlocks / 2);
				} else {
					startPointWatch.x = x - Math.floor(size.heightBlocks / 2) + 1;
				}
				return startPointWatch;
			}

			function findY (startPointWatch, y, size) {
				if (y < Math.floor(size.widthBlocks / 2)) {
					startPointWatch.y = 0;
				} else if (y >= (GLOBAL_SETTING.numBlocks.width - Math.floor(size.widthBlocks / 2))) {
					startPointWatch.y = GLOBAL_SETTING.numBlocks.width - Math.floor(size.widthBlocks / 2);
				} else {
					startPointWatch.y = y - Math.floor(size.widthBlocks / 2) + 1;
				}
				return startPointWatch;
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
				item.randMove();
			}
		});
	}
}

let game = new ControllerGame([{
	x: 1,
	y: 1,
	type: 'mage',
	watcher: true
}]);

document.onkeydown = function (e) {
	e.preventDefault();
	let player = game.getState().getCreature(0);
	if (e.keyCode === 68) {
		player.move('right');
	} else if (e.keyCode === 83) {
		player.move('down');
	} else if (e.keyCode === 87) {
		player.move('up');
	} else if (e.keyCode === 65) {
		player.move('left');
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

console.log(game.state);