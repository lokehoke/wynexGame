'use strict';
/*
	tasks:
		0.break when enemy leave screen
		1.small numsBlock
*/

const GLOBAL_SETTING = {
	sizeBlock: {
		width: 50,
		height: 50
	},
	numBlocks: {
		width: 2 ** 8,
		height: 2 ** 8
	}
};

class ControllerGame {
	constructor (players = null, enemy = null) {
		let numCreature = 0;
		this.state = (new State(GLOBAL_SETTING.numBlocks));
		setPlayers(players, this.state);
		setEnemys(enemy, this.state);
		let startPoint = getStartPiointWatch(players);
		if (startPoint === false) {
			throw "2 or more main player or null";
		} else {
			this.state.setStartPointWatch(startPoint);
		}
		this.world = new World(this.state);
		this.world.renderWorld();

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
			let lastIdPlayer = players.length;
			if (enemys !== null) {
				enemy.forEach((val) => {
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
				} else if (x >= (GLOBAL_SETTING.numBlocks.height - Math.floor(size.heightBlocks / 2) - 1)) {
					startPointWatch.x = GLOBAL_SETTING.numBlocks.height - Math.floor(size.heightBlocks / 2) - 1;
				} else {
					startPointWatch.x = x - Math.floor(size.heightBlocks / 2);
				}
				return startPointWatch;
			}

			function findY (startPointWatch, y, size) {
				if (y < Math.floor(size.widthBlocks / 2)) {
					startPointWatch.y = 0;
				} else if (y >= (GLOBAL_SETTING.numBlocks.width - Math.floor(size.widthBlocks / 2) - 1)) {
					startPointWatch.y = GLOBAL_SETTING.numBlocks.width - Math.floor(size.widthBlocks / 2) - 1;
				} else {
					startPointWatch.y = y - Math.floor(size.widthBlocks / 2);
				}
				return startPointWatch;
			}
		}
	}

	getState () {
		return this.state;
	}

	tactOfGame() {
		this.state._creature.forEach((item) => {
			if (item.watcher !== true) {
				item.randMove();
			}
		});
		this.world.renderWorld();
	}
}

let game = new ControllerGame([{
	x: 100,
	y: 100,
	type: 'mage',
	watcher: true
}],[{
	x:2,
	y:2,
	type: 'slime'
},{
	x:2,
	y:3,
	type: 'slime'
},{
	x:2,
	y:4,
	type: 'slime'
}]);

document.onkeypress = function (e) {
	e.preventDefault();
	let player = game.getState().getCreature(0);
	if (e.keyCode === 100 || e.keyCode === 1074) {
		player.move('right');
	} else if (e.keyCode === 115 || e.keyCode === 1099) {
		player.move('down');
	} else if (e.keyCode === 119 || e.keyCode === 1094) {
		player.move('up');
	} else if (e.keyCode === 97 || e.keyCode === 1092) {
		player.move('left');
	}
	game.tactOfGame();
}

console.log(game.state);