'use strict';
/*
border: 2
dirt: 1
player: 9
chest: 3
*/

let GLOBAL_SETTING = {
	sizeBlock: {
		width: 50,
		height: 50
	},
	numBlocks: {
		width: 51,
		height: 51
	}
};

class ControllerGame {
	constructor (players = null, enemy = null) {
		let numCreature = 0;
		this.state = (new State(GLOBAL_SETTING.numBlocks));
		setPlayers(players, this.state);
		setEnemys(enemy, this.state);
		this.state.setStartPointWatch({x:0, y:0});
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
	}

	getState () {
		return this.state;
	}

	tactOfGame() {
		this.state._creature.forEach((item) => {
			// if (item.type === 'enemy') {
			// }
		});
		this.world.renderWorld();
	}
}

let game = new ControllerGame([{
	x: 4,
	y: 6,
	type: 'mage',
	main: true
}],[{
	x:2,
	y:2,
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