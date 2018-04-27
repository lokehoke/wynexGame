'use strict';
/*
border: 2
dirt: 1
player: 9
chest: 3
*/

class ControllerGame {
	constructor (players = null, enemy = null) {
		this.state = (new State({
			width: 12,
			height: 12
		}));
		setPlayers(players, this.state);
		setEnemys(enemy, this.state);
		this.world = new World (this.state);

		function setPlayers(players, state) {
			if (players !== null) {
				players.forEach((val, i) => {
					state.setPlayer(i, val);
				});
				return true;
			} else {
				return false;
			}
		}

		function setEnemys(players, state) {
			if (players !== null) {
				enemy.forEach((val, i) => {
					state.setEnemy(i, val);
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
	}
}

let game = new ControllerGame(
[{
	x: 1,
	y: 1,
	type: 'mage'
}]);

document.onkeypress = function (e) {
	if (e.keyCode === 100 || e.keyCode === 1074) {
		setTimeout(function () {
			game.getState()._creature[0].move('right');
		}, 0);
	} else if (e.keyCode === 115 || e.keyCode === 1099) {
		setTimeout(function () {
			game.getState()._creature[0].move('down');
		}, 0);
	} else if (e.keyCode === 119 || e.keyCode === 1094) {
		setTimeout(function () {
			game.getState()._creature[0].move('up');
		}, 0);
	} else if (e.keyCode === 97 || e.keyCode === 1092) {
		setTimeout(function () {
			game.getState()._creature[0].move('left');
		}, 0);
	}
	game.tactOfGame();
}