'use strict';

/*
border: 2
dirt: 1
player: 9
chest: 3
*/

let state = (new generateState({
	width: 128,
	height: 128
})).state;
console.log(state);
let player1 = new Player(state, {x:1, y: 1});
let newWorld = new World(state , player1);

document.onkeypress = function (e) {
	// alert(e.keyCode);
	if (e.keyCode === 100 || e.keyCode === 1074) {
		player1.move('right');
	} else if (e.keyCode === 115 || e.keyCode === 1099) {
		player1.move('down');
	} else if (e.keyCode === 119 || e.keyCode === 1094) {
		player1.move('up');
	} else if (e.keyCode === 97 || e.keyCode === 1092) {
		player1.move('left');
	}
}