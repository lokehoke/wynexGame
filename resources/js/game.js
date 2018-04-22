'use strict';
/*
border: 2
dirt: 1
player: 9
chest: 3
*/
let state = (new generateState({
	width: 64,
	height: 64
})).state;
console.log(state);
let player1 = new Player(state, {x:1, y: 1});
let player2 = new Player(state, {x:2, y: 2});
let enemy1 = new Enemy(state, {x:3, y: 3});
let enemy2 = new Enemy(state, {x:4, y: 4});
let newWorld = new World(state , player1);

document.onkeypress = function (e) {
	// alert(e.keyCode);
	if (e.keyCode === 100 || e.keyCode === 1074) {
		enemy1.move('right');
	} else if (e.keyCode === 115 || e.keyCode === 1099) {
		enemy1.move('down');
	} else if (e.keyCode === 119 || e.keyCode === 1094) {
		enemy1.move('up');
	} else if (e.keyCode === 97 || e.keyCode === 1092) {
		enemy1.move('left');
	}
	console.log(state);
}