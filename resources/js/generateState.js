'use strict';
class generateState {
	constructor (config) {
		let state = {};
		generatePlace(state);
		state.players = [];
		state.enemy = [];

		this.state = state;

		function generatePlace(state) {
			const N = config.height;
			const M = config.width;
			state.place = [];
			for (let i = 0; i < N; i++) {
				state.place[i] = [];
				for (let j = 0; j < M; j++) {
					if (i === 0 || i + 1 === N || j === 0 || j + 1 === M) {
						state.place[i][j] = 2;
					} else {
						state.place[i][j] = 1;
					}
				}
			}
			// addRoom(state);
			return state;
			// function addRoom(state) {
			// 	for (let i = 0; i < N; i+= 8) {
			// 		for (let j = 0; j < M; j++) {
			// 			let randDigit = Math.floor(Math.random() * 11);
			// 			if (randDigit > 9) {
			// 				for (let k = j; k < j+randDigit && k < M; k++) {
			// 					if (k === j) {
			// 						for (let n = i; n < i+randDigit+1 && n < N; n++) {
			// 							state.place[n][k] = 2;
			// 						}
			// 					} else {
			// 						state.place[i][k] = 2;
			// 						state.place[(i+randDigit >= N ? i : i+randDigit)][k] = 2;
			// 					}
			// 				}
			// 				j+= 8;
			// 			}
			// 		}
			// 	}
			// }
		}
	}
}