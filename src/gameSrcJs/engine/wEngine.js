'use strict';

module.exports = class WEnginAPI {
	constructor(store) {
		this._GLOBAL_SETTING = require('./setting/globalSetting.js');
		this._ControllerGame = require('./globalClass/game.js');

		this._game = null;

		this._state = null;
		this._player = null;

		this._store = store;
	}

	startGame() {
		this._game = new this._ControllerGame(this._store, [{
			coor: {
				x: 3,
				y: 3
			},
			type: 'mage',
			watcher: true
		}]);

		this._state = this._game.getState();
		this._player = this._state.getCreature(0);
		this._store.dispatch({
			type: 'INITIAL_STATE',
			stateGame: this._state
		});

		let timer = false;

		document.addEventListener("keydown", (e) => {
			e.preventDefault();
			if (timer) {
				return 0;
			} else {
				timer = true;
				setTimeout(() => {
					timer = false;
				}, this._GLOBAL_SETTING.timeOfTactPlayer);
			}

			if (e.keyCode === 68) {
				this._player.movePerformance('right');
			} else if (e.keyCode === 83) {
				this._player.movePerformance('down');
			} else if (e.keyCode === 87) {
				this._player.movePerformance('up');
			} else if (e.keyCode === 65) {
				this._player.movePerformance('left');
			} else if (e.keyCode === 39) {
				this._player.doAttack('right');
			} else if (e.keyCode === 40) {
				this._player.doAttack('down');
			} else if (e.keyCode === 38) {
				this._player.doAttack('up');
			} else if (e.keyCode === 37) {
				this._player.doAttack('left');
			}
			this._game.tactOfGame(true);
			return false;
		});

		setInterval(() => {
			this._game.tactOfGame();
		}, this._GLOBAL_SETTING.timeOfTactOther);

		return this._state;
	}

	getState() {
		return this._state;
	}
}
