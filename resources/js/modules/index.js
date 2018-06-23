'use strict';
/*
	task:
		0.bias weapon after bais world
		1.reRender without bais and reRender All world
*/
function startGame() {
	const GLOBAL_SETTING = new require('./setting/globalSetting.js');
	const ControllerGame = require('./globalClass/game.js');

	const game = new ControllerGame([{
		coor: {
			x: 1,
			y: 1
		},
		type: 'mage',
		watcher: true
	}]);

	const state = game.getState();
	const player = state.getCreature(0);

	let timer = false;

	document.onkeydown = function (e) {

		if (timer) {
			return 0;
		} else {
			timer = true;
			setTimeout(() => {
				timer = false;
			}, 50);
		}

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

	setInterval(() => {
		game.tactOfGame();
	}, 50)

	console.log(state);
}

startGame();